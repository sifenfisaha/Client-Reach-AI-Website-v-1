"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { subscribeToNewsletter } from '@/lib/supabase/services';
import { trackNewsletterSubscription } from '@/lib/analytics';

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (emailValue: string): string | null => {
    if (!emailValue.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(emailValue.trim())) {
      return "Please enter a valid email";
    }
    return null;
  };

  const handleEmailBlur = () => {
    setTouched(true);
    const validationError = validateEmail(email);
    setEmailError(validationError);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Clear errors when user starts typing
    if (emailError) {
      setEmailError(null);
    }
    if (error) {
      setError(null);
    }
    // Re-validate if field was previously touched
    if (touched) {
      const validationError = validateEmail(newEmail);
      setEmailError(validationError);
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
    
    // Mark as touched
    setTouched(true);
    
    // Clear previous errors
    setError(null);
    
    // Validate email format using regex
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    // Prevent duplicate submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the subscription service
      const result = await subscribeToNewsletter(email.trim(), {
        source: 'newsletter-page',
      });

      if (result.success) {
        // Success: Clear email and show success animation
        setEmail("");
        setSubmitted(true);
        
        // Track analytics (fire-and-forget)
        try {
          trackNewsletterSubscription('newsletter-page');
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
        if (result.code === 'DUPLICATE_EMAIL') {
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
          setError(result.error || 'Something went wrong. Please try again.');
        }
        
        // Log error in development only
        if (process.env.NODE_ENV === 'development') {
          console.error('Newsletter subscription error:', result);
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
        setError('An unexpected error occurred. Please try again later.');
      }
      
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        console.error('Newsletter subscription error:', err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg px-4 py-24">
      <div className="max-w-3xl mx-auto px-4 py-24">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
              <Mail size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Join the Inner Circle
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Get exclusive insights on how top clinics are using AI to automate growth, recover revenue, and save time. No spam, just value.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-dark-border relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 dark:bg-brand-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">You're on the list!</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Thanks for subscribing. Keep an eye on your inbox for our next update.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                      aria-invalid={emailError ? "true" : "false"}
                      aria-describedby={emailError ? "email-error" : undefined}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border transition-all duration-300 text-lg ${
                        emailError || error
                          ? 'border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500'
                      } ${isSubmitting || isRateLimited ? 'opacity-60 cursor-not-allowed' : ''} outline-none`}
                      placeholder="doctor@clinic.com"
                      disabled={isSubmitting || isRateLimited}
                    />
                  </div>
                  <AnimatePresence>
                    {emailError && (
                      <motion.div
                        id="email-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                        role="alert"
                      >
                        <AlertCircle size={16} />
                        <span>{emailError}</span>
                      </motion.div>
                    )}
                    {error && !emailError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                        role="alert"
                      >
                        <AlertCircle size={16} />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isRateLimited}
                  className="w-full py-4 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : isRateLimited ? (
                    <span>Form submitted successfully!</span>
                  ) : (
                    <>
                      <span>Subscribe Now</span>
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Join 2,000+ clinic owners. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
