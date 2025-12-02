import React from "react";
import { Zap, Users } from "lucide-react";

export const ComparisonSection = () => (
  <section className="py-20 bg-white dark:bg-dark-bg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-sm font-bold text-brand-500 uppercase tracking-wider mb-2">
            AI Tools Automate Tasks
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            An AI Workforce Transforms Clinics
          </h3>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            <p>
              Most AI tools and chatbots can only do one small job. But in a
              clinic, missing a call or replying too slowly can mean losing a
              patient to another clinic.
            </p>
            <p>
              That's why you need a team of AI systems that work together,
              helping with reception, follow-ups, patient messages, and
              after-care.
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              This isn't just basic automation. It's smart AI that learns, works
              across your whole clinic, and helps you grow.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-dark-card p-8 rounded-3xl border border-gray-100 dark:border-dark-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 flex-shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Multi-skilled Agents
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Role-specific operation across voice, messaging, email, and
                  CRM.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Complete Coverage
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sales, Support, Success, and Operations working in unison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
