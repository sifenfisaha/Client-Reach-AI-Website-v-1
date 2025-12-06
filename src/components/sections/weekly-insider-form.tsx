"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { subscribeToWeeklyInsider } from "@/lib/supabase/services";
import { trackWeeklyInsiderSubscription } from "@/lib/analytics";

export const WeeklyInsiderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
  }>({});
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateName = (nameValue: string): string | null => {
    if (!nameValue.trim()) {
      return "Name is required";
    }
    if (nameValue.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return null;
  };

  const validateEmail = (emailValue: string): string | null => {
    if (!emailValue.trim()) {
      return "Valid email is required";
    }
    if (!emailRegex.test(emailValue.trim())) {
      return "Please enter a valid email";
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[id as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id as keyof typeof fieldErrors];
        return newErrors;
      });
    }
    // Clear general error
    if (error) setError(null);
    
    // Re-validate if field was previously touched
    if (touched[id as keyof typeof touched]) {
      if (id === "name") {
        const validationError = validateName(value);
        setFieldErrors((prev) => ({
          ...prev,
          name: validationError || undefined,
        }));
      } else if (id === "email") {
        const validationError = validateEmail(value);
        setFieldErrors((prev) => ({
          ...prev,
          email: validationError || undefined,
        }));
      }
    }
  };

  const handleBlur = (fieldId: string) => {
    setTouched((prev) => ({ ...prev, [fieldId]: true }));
    
    if (fieldId === "name") {
      const validationError = validateName(formData.name);
      setFieldErrors((prev) => ({
        ...prev,
        name: validationError || undefined,
      }));
    } else if (fieldId === "email") {
      const validationError = validateEmail(formData.email);
      setFieldErrors((prev) => ({
        ...prev,
        email: validationError || undefined,
      }));
    }
  };

  // Rate limiting countdown effect with cleanup
  useEffect(() => {
    if (rateLimitCountdown > 0) {
      const timer = setTimeout(() => {
        setRateLimitCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (rateLimitCountdown === 0 && isRateLimited) {
      setIsRateLimited(false);
    }
    return undefined;
  }, [rateLimitCountdown, isRateLimited]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => {
      if (error && error.includes('offline')) {
        setError(null);
      }
    };
    const handleOffline = () => {
      if (isSubmitting) {
        setError("You're offline. Please check your connection.");
        setIsSubmitting(false);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [error, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is offline
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setError("You're offline. Please check your connection.");
      return;
    }

    // Check rate limit
    if (isRateLimited) {
      return;
    }

    // Mark all required fields as touched
    setTouched({ name: true, email: true });

    // Clear previous errors
    setError(null);

    // Validate all required fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);

    const newFieldErrors: { name?: string; email?: string } = {};
    if (nameError) newFieldErrors.name = nameError;
    if (emailError) newFieldErrors.email = emailError;

    setFieldErrors(newFieldErrors);

    // Prevent submission if validation fails
    if (nameError || emailError) {
      return;
    }

    // Prevent duplicate submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the subscription service
      const result = await subscribeToWeeklyInsider(
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || null,
          phone: formData.phone.trim() || null,
        },
        {
          source: "weekly-insider-form",
        }
      );

      if (result.success) {
        // Success: Clear form and show success animation
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
        });
        setSubmitted(true);
        
        // Track analytics (fire-and-forget)
        try {
          trackWeeklyInsiderSubscription(
            "weekly-insider-form",
            !!formData.company,
            !!formData.phone
          );
        } catch (analyticsError) {
          // Silently fail - analytics should never break functionality
          if (process.env.NODE_ENV === 'development') {
            console.warn('Analytics tracking failed:', analyticsError);
          }
        }
        
        // Apply rate limiting
        setIsRateLimited(true);
        setRateLimitCountdown(3);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsRateLimited(false);
          setRateLimitCountdown(0);
        }, 3000);
      } else {
        // Handle different error scenarios
        if (result.code === "DUPLICATE_EMAIL") {
          setError("This email is already subscribed!");
        } else if (result.code === 'TIMEOUT') {
          setError("Request timed out. Please try again.");
        } else if (result.code === 'RLS_ERROR') {
          setError("Permission denied. Please contact support if this persists.");
        } else if (result.code === 'SERVICE_UNAVAILABLE') {
          setError("Service is temporarily unavailable. Please try again later.");
        } else if (result.code === 'DATABASE_ERROR' || result.error?.toLowerCase().includes('network') || result.error?.toLowerCase().includes('connection')) {
          setError("Connection failed. Please try again.");
        } else {
          setError(result.error || "Something went wrong. Please try again.");
        }
        
        // Log error in development only
        if (process.env.NODE_ENV === 'development') {
          console.error("Weekly Insider subscription error:", result);
        }
      }
    } catch (err) {
      // Handle unexpected errors
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      
      // Check for network/offline errors
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setError("You're offline. Please check your connection.");
      } else if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch') || errorMessage.toLowerCase().includes('connection')) {
        setError('Connection failed. Please try again.');
      } else if (errorMessage.toLowerCase().includes('timeout')) {
        setError('Request timed out. Please try again.');
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        console.error("Weekly Insider subscription error:", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-dark-card border-t border-gray-100 dark:border-dark-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-900/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-brand-600 dark:text-brand-400 font-semibold tracking-wider uppercase text-sm mb-2 block">
              Join the Community
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get the Weekly Insider
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of medical professionals growing their practice with
              AI. Get exclusive tips, strategies, and updates delivered to your
              inbox.
            </p>
          </motion.div>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 dark:bg-dark-bg p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm"
          >
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                You're on the list!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Thanks for subscribing. Keep an eye on your inbox for our next
                update.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 dark:bg-dark-bg p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("name")}
                  aria-invalid={fieldErrors.name ? "true" : "false"}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  disabled={isSubmitting || isRateLimited}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none ${
                    fieldErrors.name
                      ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  } ${isSubmitting || isRateLimited ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
                <AnimatePresence>
                  {fieldErrors.name && (
                    <motion.div
                      id="name-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                      role="alert"
                    >
                      <AlertCircle size={16} />
                      <span>{fieldErrors.name}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Business Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={isSubmitting || isRateLimited}
                  placeholder="Acme Clinic"
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-400 ${
                    isSubmitting || isRateLimited ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={fieldErrors.email ? "true" : "false"}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  disabled={isSubmitting || isRateLimited}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none ${
                    fieldErrors.email
                      ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  } ${isSubmitting || isRateLimited ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
                <AnimatePresence>
                  {fieldErrors.email && (
                    <motion.div
                      id="email-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                      role="alert"
                    >
                      <AlertCircle size={16} />
                      <span>{fieldErrors.email}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting || isRateLimited}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-400 ${
                    isSubmitting || isRateLimited ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                  role="alert"
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6 mb-8">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition-colors duration-300"
                  disabled={isSubmitting || isRateLimited}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  By checking this box, I consent to receive transactional
                  messages related to my account, orders, or services I have
                  requested. These messages may include appointment reminders,
                  order confirmations, and account notifications among others.
                  Message frequency may vary. Message & Data rates may apply.
                  Reply HELP for help or STOP to opt-out.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition-colors duration-300"
                  disabled={isSubmitting || isRateLimited}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  By checking this box, I consent to receive marketing and
                  promotional messages, including special offers, discounts, new
                  product updates among others. Message frequency may vary.
                  Message & Data rates may apply. Reply HELP for help or STOP
                  to opt-out.
                </span>
              </label>
            </div>

            <div className="flex flex-col items-center gap-6">
              <button
                type="submit"
                disabled={isSubmitting || isRateLimited}
                className="w-full md:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-brand-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : isRateLimited ? (
                  <span>Form submitted successfully!</span>
                ) : (
                  "Subscribe to Insider"
                )}
              </button>

              <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-500">
                <a
                  href="#"
                  className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </a>
                <span>|</span>
                <a
                  href="#"
                  className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};
