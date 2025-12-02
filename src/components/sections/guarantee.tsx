import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const Guarantee = () => (
  <section className="py-24 bg-white dark:bg-dark-bg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-brand-50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
        <ShieldCheck className="w-16 h-16 text-brand-500 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Client Reach Guarantee
        </h2>
        <h3 className="text-xl font-bold text-brand-600 dark:text-brand-400 mb-4">
          See Real Results in 30 Days or Get Your Money Back
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          If you're not completely satisfied with the results within 4 weeks of
          using our AI systems, we'll give you a full refund — no questions
          asked. Launch your AI workforce with no risk.
        </p>
        <Link
          href="/discover"
          className="inline-block px-8 py-3 bg-brand-500 text-white font-medium rounded-full hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20"
        >
          Start Your Risk-Free Trial
        </Link>
      </div>
    </div>
  </section>
);
