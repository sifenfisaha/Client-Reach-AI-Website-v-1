"use client";

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
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
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none transition-all text-lg"
                      placeholder="doctor@clinic.com"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe Now</span>
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
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
