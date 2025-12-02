import React from 'react';

export default function NewsletterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg px-4 py-24">
      <div className="max-w-xl w-full bg-white dark:bg-dark-card p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-dark-border">
        <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
                Weekly AI Insider
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Stay Ahead of the Curve
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
                Join 2,000+ clinic owners leveraging AI for growth.
            </p>
        </div>

        <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="John Doe" />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name <span className="text-red-500">*</span></label>
                <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Your Clinic Name" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="john@clinic.com" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone <span className="text-red-500">*</span></label>
                <input type="tel" required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800 mt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500 shrink-0" />
                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                        By checking this box, I consent to receive transactional messages related to my account, orders, or services I have requested. These messages may include appointment reminders, order confirmations, and account notifications among others. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out.
                    </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500 shrink-0" />
                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                        By checking this box, I consent to receive marketing and promotional messages, including special offers, discounts, new product updates among others. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out.
                    </span>
                </label>
            </div>

            <button type="submit" className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-500/20 mt-6">
                Subscribe Now
            </button>
            <div className="text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    Privacy Policy | Terms of Service
                </p>
            </div>
        </form>
      </div>
    </div>
  );
}
