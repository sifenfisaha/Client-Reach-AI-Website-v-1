/**
 * Supabase Database Types
 * TypeScript interfaces for database tables and operations
 */

/**
 * Newsletter Subscriber interface
 * Represents a subscriber in the newsletter_subscribers table
 */
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  status: string;
  source: string;
  ip_address: string | null;
  user_agent: string | null;
}

/**
 * Weekly Insider Subscriber interface
 * Represents a subscriber in the weekly_insider_subscribers table
 */
export interface WeeklyInsiderSubscriber {
  id: string;
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  phone: string | null;
  message: string | null;
  subscribed_at: string;
  status: string;
  source: string;
  ip_address: string | null;
  user_agent: string | null;
}

/**
 * Insert Newsletter Subscriber interface
 * Used when inserting a new newsletter subscriber
 * All fields optional except email
 */
export interface InsertNewsletterSubscriber {
  id?: string;
  email: string;
  subscribed_at?: string;
  status?: string;
  source?: string;
  ip_address?: string | null;
  user_agent?: string | null;
}

/**
 * Insert Weekly Insider Subscriber interface
 * Used when inserting a new weekly insider subscriber
 * All fields optional except name and email
 */
export interface InsertWeeklyInsiderSubscriber {
  id?: string;
  name: string;
  email: string;
  company?: string | null;
  role?: string | null;
  phone?: string | null;
  message?: string | null;
  subscribed_at?: string;
  status?: string;
  source?: string;
  ip_address?: string | null;
  user_agent?: string | null;
}

