import { supabase, isSupabaseClientAvailable } from "./client";
import type {
  InsertNewsletterSubscriber,
  InsertWeeklyInsiderSubscriber,
  InsertCallRequest,
} from "./types";

/**
 * Result type for service operations
 */
export type ServiceResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; code?: string };

/**
 * Create a promise that times out after specified milliseconds
 */
function withTimeout<T>(
  promise: Promise<T> | any,
  timeoutMs: number = 10000
): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
    ),
  ]);
}

/**
 * Subscribe to Newsletter
 * Inserts a new email into the newsletter_subscribers table
 *
 * @param email - Email address to subscribe
 * @param options - Optional parameters including source, ip_address, and user_agent
 * @returns ServiceResult indicating success or failure with error message
 */
export async function subscribeToNewsletter(
  email: string,
  options?: {
    source?: string;
    ip_address?: string | null;
    user_agent?: string | null;
  }
): Promise<ServiceResult<InsertNewsletterSubscriber>> {
  try {
    // Check if Supabase client is available
    if (!isSupabaseClientAvailable() || !supabase) {
      return {
        success: false,
        error: "Service is temporarily unavailable. Please try again later.",
        code: "SERVICE_UNAVAILABLE",
      };
    }

    // Validate email format
    if (!email || typeof email !== "string") {
      return {
        success: false,
        error: "Email is required and must be a valid string",
        code: "INVALID_EMAIL",
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return {
        success: false,
        error: "Invalid email format",
        code: "INVALID_EMAIL_FORMAT",
      };
    }

    // Prepare insert data
    const insertData: InsertNewsletterSubscriber = {
      email: email.trim().toLowerCase(),
      subscribed_at: new Date().toISOString(),
      status: "active",
      source: options?.source || "website",
      ip_address: options?.ip_address || null,
      user_agent: options?.user_agent || null,
    };

    // Insert into database with timeout
    let data, error;
    try {
      const queryBuilder = supabase
        .from("newsletter_subscribers")
        .insert(insertData)
        .select()
        .single();

      const result = (await withTimeout(queryBuilder, 10000)) as {
        data: any;
        error: any;
      }; // 10 second timeout
      data = result.data;
      error = result.error;
    } catch (timeoutError) {
      if (
        timeoutError instanceof Error &&
        timeoutError.message === "Request timed out"
      ) {
        return {
          success: false,
          error: "Request timed out. Please try again.",
          code: "TIMEOUT",
        };
      }
      // Re-throw if it's not a timeout error
      throw timeoutError;
    }

    if (error) {
      // Handle duplicate email error (PostgreSQL unique constraint violation)
      if (
        error.code === "23505" ||
        error.message?.includes("duplicate") ||
        error.message?.toLowerCase().includes("unique")
      ) {
        return {
          success: false,
          error: "This email is already subscribed to the newsletter",
          code: "DUPLICATE_EMAIL",
        };
      }

      // Handle RLS (Row Level Security) policy errors
      // PostgreSQL error code 42501 = insufficient_privilege
      // Also check for common RLS-related error messages
      const isRLSError =
        error.code === "42501" ||
        error.code === "PGRST301" || // PostgREST permission denied
        error.message?.toLowerCase().includes("permission denied") ||
        error.message
          ?.toLowerCase()
          .includes("new row violates row-level security policy") ||
        error.message?.toLowerCase().includes("policy violation") ||
        error.message?.toLowerCase().includes("row-level security") ||
        error.message?.toLowerCase().includes("insufficient privilege") ||
        error.hint?.toLowerCase().includes("policy") ||
        error.hint?.toLowerCase().includes("row-level security");

      if (isRLSError) {
        return {
          success: false,
          error:
            "Permission denied. This may be a configuration issue. Please contact support if this persists.",
          code: "RLS_ERROR",
        };
      }

      // Handle other database errors
      return {
        success: false,
        error: error.message || "Failed to subscribe to newsletter",
        code: error.code || "DATABASE_ERROR",
      };
    }

    return {
      success: true,
      data: data as InsertNewsletterSubscriber,
    };
  } catch (error) {
    // Handle unexpected errors
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while subscribing to newsletter",
      code: "UNEXPECTED_ERROR",
    };
  }
}

/**
 * Subscribe to Weekly Insider
 * Inserts subscriber data into the weekly_insider_subscribers table
 *
 * @param data - Subscriber data with required name and email, optional fields
 * @param options - Optional parameters including source, ip_address, and user_agent
 * @returns ServiceResult indicating success or failure with error message
 */
export async function subscribeToWeeklyInsider(
  data: {
    name: string;
    email: string;
    company?: string | null;
    role?: string | null;
    phone?: string | null;
    message?: string | null;
  },
  options?: {
    source?: string;
    ip_address?: string | null;
    user_agent?: string | null;
  }
): Promise<ServiceResult<InsertWeeklyInsiderSubscriber>> {
  try {
    // Check if Supabase client is available
    if (!isSupabaseClientAvailable() || !supabase) {
      return {
        success: false,
        error: "Service is temporarily unavailable. Please try again later.",
        code: "SERVICE_UNAVAILABLE",
      };
    }

    // Validate required fields
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim().length === 0
    ) {
      return {
        success: false,
        error: "Name is required and cannot be empty",
        code: "MISSING_NAME",
      };
    }

    if (!data.email || typeof data.email !== "string") {
      return {
        success: false,
        error: "Email is required and must be a valid string",
        code: "MISSING_EMAIL",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return {
        success: false,
        error: "Invalid email format",
        code: "INVALID_EMAIL_FORMAT",
      };
    }

    // Prepare insert data
    const insertData: InsertWeeklyInsiderSubscriber = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() || null,
      role: data.role?.trim() || null,
      phone: data.phone?.trim() || null,
      message: data.message?.trim() || null,
      subscribed_at: new Date().toISOString(),
      status: "active",
      source: options?.source || "website",
      ip_address: options?.ip_address || null,
      user_agent: options?.user_agent || null,
    };

    // Insert into database with timeout
    let insertedData, error;
    try {
      const queryBuilder = supabase
        .from("weekly_insider_subscribers")
        .insert(insertData)
        .select()
        .single();

      const result = (await withTimeout(queryBuilder, 10000)) as {
        data: any;
        error: any;
      }; // 10 second timeout
      insertedData = result.data;
      error = result.error;
    } catch (timeoutError) {
      if (
        timeoutError instanceof Error &&
        timeoutError.message === "Request timed out"
      ) {
        return {
          success: false,
          error: "Request timed out. Please try again.",
          code: "TIMEOUT",
        };
      }
      // Re-throw if it's not a timeout error
      throw timeoutError;
    }

    if (error) {
      // Handle duplicate email error (PostgreSQL unique constraint violation)
      if (
        error.code === "23505" ||
        error.message?.includes("duplicate") ||
        error.message?.toLowerCase().includes("unique")
      ) {
        return {
          success: false,
          error: "This email is already subscribed to the Weekly Insider",
          code: "DUPLICATE_EMAIL",
        };
      }

      // Handle RLS (Row Level Security) policy errors
      // PostgreSQL error code 42501 = insufficient_privilege
      // Also check for common RLS-related error messages
      const isRLSError =
        error.code === "42501" ||
        error.code === "PGRST301" || // PostgREST permission denied
        error.message?.toLowerCase().includes("permission denied") ||
        error.message
          ?.toLowerCase()
          .includes("new row violates row-level security policy") ||
        error.message?.toLowerCase().includes("policy violation") ||
        error.message?.toLowerCase().includes("row-level security") ||
        error.message?.toLowerCase().includes("insufficient privilege") ||
        error.details?.toLowerCase().includes("policy") ||
        error.hint?.toLowerCase().includes("policy") ||
        error.hint?.toLowerCase().includes("row-level security");

      if (isRLSError) {
        return {
          success: false,
          error:
            "Permission denied. This may be a configuration issue. Please contact support if this persists.",
          code: "RLS_ERROR",
        };
      }

      // Handle other database errors
      return {
        success: false,
        error: error.message || "Failed to subscribe to Weekly Insider",
        code: error.code || "DATABASE_ERROR",
      };
    }

    return {
      success: true,
      data: insertedData as InsertWeeklyInsiderSubscriber,
    };
  } catch (error) {
    // Handle unexpected errors
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while subscribing to Weekly Insider",
      code: "UNEXPECTED_ERROR",
    };
  }
}

/**
 * Request a Call
 * Inserts a new call request into the call_requests table
 *
 * @param data - Call request data with name, email, and phone
 * @param options - Optional parameters including source, ip_address, and user_agent
 * @returns ServiceResult indicating success or failure with error message
 */
export async function requestCall(
  data: {
    name: string;
    email: string;
    phone: string;
  },
  options?: {
    source?: string;
    ip_address?: string | null;
    user_agent?: string | null;
  }
): Promise<ServiceResult<InsertCallRequest>> {
  try {
    // Check if Supabase client is available
    if (!isSupabaseClientAvailable() || !supabase) {
      return {
        success: false,
        error: "Service is temporarily unavailable. Please try again later.",
        code: "SERVICE_UNAVAILABLE",
      };
    }

    // Validate required fields
    if (!data.name || data.name.trim().length < 2) {
      return {
        success: false,
        error: "Name is required and must be at least 2 characters",
        code: "VALIDATION_ERROR",
      };
    }

    if (!data.email || typeof data.email !== "string") {
      return {
        success: false,
        error: "Email is required and must be a valid string",
        code: "INVALID_EMAIL",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return {
        success: false,
        error: "Invalid email format",
        code: "INVALID_EMAIL_FORMAT",
      };
    }

    if (!data.phone || data.phone.trim().length < 10) {
      return {
        success: false,
        error: "Phone number is required and must be at least 10 characters",
        code: "VALIDATION_ERROR",
      };
    }

    // Prepare insert data
    const insertData: InsertCallRequest = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      requested_at: new Date().toISOString(),
      status: "pending",
      source: options?.source || "call-request-form",
      ip_address: options?.ip_address || null,
      user_agent: options?.user_agent || null,
      notes: null,
    };

    // Insert into database with timeout
    let insertedData, error;
    try {
      const queryBuilder = supabase
        .from("call_requests")
        .insert(insertData)
        .select()
        .single();

      const result = (await withTimeout(queryBuilder, 10000)) as {
        data: any;
        error: any;
      };
      insertedData = result.data;
      error = result.error;
    } catch (timeoutError) {
      if (
        timeoutError instanceof Error &&
        timeoutError.message === "Request timed out"
      ) {
        return {
          success: false,
          error: "Request timed out. Please try again.",
          code: "TIMEOUT",
        };
      }
      throw timeoutError;
    }

    if (error) {
      // Handle duplicate email error (PostgreSQL unique constraint violation)
      if (
        error.code === "23505" ||
        error.message?.includes("duplicate") ||
        error.message?.toLowerCase().includes("unique")
      ) {
        return {
          success: false,
          error: "A call request with this email already exists",
          code: "DUPLICATE_EMAIL",
        };
      }

      // Handle RLS (Row Level Security) policy errors
      const isRLSError =
        error.code === "42501" ||
        error.code === "PGRST301" ||
        error.message?.toLowerCase().includes("permission denied") ||
        error.message
          ?.toLowerCase()
          .includes("new row violates row-level security policy") ||
        error.message?.toLowerCase().includes("policy violation") ||
        error.message?.toLowerCase().includes("row-level security") ||
        error.message?.toLowerCase().includes("insufficient privilege") ||
        error.details?.toLowerCase().includes("policy") ||
        error.hint?.toLowerCase().includes("policy") ||
        error.hint?.toLowerCase().includes("row-level security");

      if (isRLSError) {
        return {
          success: false,
          error:
            "Permission denied. This may be a configuration issue. Please contact support if this persists.",
          code: "RLS_ERROR",
        };
      }

      // Handle other database errors
      return {
        success: false,
        error: error.message || "Failed to submit call request",
        code: error.code || "DATABASE_ERROR",
      };
    }

    return {
      success: true,
      data: insertedData as InsertCallRequest,
    };
  } catch (error) {
    // Handle unexpected errors
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while submitting call request",
      code: "UNEXPECTED_ERROR",
    };
  }
}
