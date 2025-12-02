import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white dark:from-brand-950 dark:via-dark-bg dark:to-dark-bg pt-24 pb-16 md:pt-32 md:pb-24">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 mb-8 animate-fade-in-up">
        <span className="flex h-2 w-2 rounded-full bg-brand-500"></span>
        <span className="text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wide">
          Client Reach AI
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 animate-fade-in-up [animation-delay:200ms]">
        Scale Your Clinic. <br />
        <span className="text-brand-500">Not Your Payroll.</span>
      </h1>

      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10 animate-fade-in-up [animation-delay:400ms]">
        From one AI agent to a complete workforce — increase revenue, save time,
        and cut costs without growing your team.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
        <Link
          href="/discover"
          className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-full transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          Book a Free Consultation <ArrowRight size={18} />
        </Link>
        <Link
          href="/ai-agents"
          className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-full transition-all"
        >
          Try the AI Agent
        </Link>
      </div>
    </div>
  </section>
);
