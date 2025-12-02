"use client";

import React from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  CheckSquare,
} from "lucide-react";

const AccordionItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
      <button
        className="flex justify-between items-center w-full py-5 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="text-brand-500 shrink-0" />
        ) : (
          <ChevronDown className="text-gray-400 shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const ROICard: React.FC<{ sector: string; stats: string[] }> = ({
  sector,
  stats,
}) => (
  <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-800 transition-all">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
      {sector}
    </h3>
    <ul className="space-y-4">
      {stats.map((stat, i) => (
        <li key={i} className="flex items-start gap-3">
          <Check className="text-brand-500 mt-1 flex-shrink-0" size={18} />
          <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {stat}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default function DiscoverPage() {
  return (
    <div className="bg-white dark:bg-dark-bg">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-slate-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 mb-8">
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wide">
              Free Audit
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Unlock Hidden Revenue in Your Clinics <br /> Without Spending More
            on Marketing
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Booking a consultation with Client Reach AI helps you clearly see
            where your clinic is losing time, money, and potential patients —
            and how AI can fix it fast.
          </p>
          <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(20,163,246,0.3)] flex items-center gap-2 mx-auto">
            Book My Free Audit Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ROI Stats */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            High-ROI Opportunities
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Implemented by our AI teams across various sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ROICard
            sector="For Dental Clinics"
            stats={[
              "£573K+ in missed treatment revenue uncovered within 90 days",
              "191 high-value missed opportunities identified in 3 months",
              "15% lift in conversions after AI-first engagement",
              "Equivalent of 2 full-time staff saved by automating scheduling",
            ]}
          />
          <ROICard
            sector="For Cosmetic Clinics"
            stats={[
              "£227K in high-value services identified from missed opportunities",
              "15–25% projected increase in conversions",
              "78 dissatisfied patients flagged in real time",
              "£85K+ in new pipeline captured",
            ]}
          />
          <ROICard
            sector="For Weight-Loss Clinics"
            stats={[
              "£45K in lost revenue detected from just 12.5% of calls",
              "£9K in 'quick win' revenue recovered within 30 days",
              "70% of missed sales due to unclear objections resolved",
              "24/7 patient check-ins and reminders automated",
            ]}
          />
          <ROICard
            sector="For Laser Eye Clinics"
            stats={[
              "£85,500+ in new revenue pipeline uncovered from missed opportunities",
              "42 high-value opportunities detected in two weeks",
              "98% of sales opportunities captured with AI vs. ~77% industry averages",
              "15% conversion lift across clinics after AI call analysis",
            ]}
          />
        </div>
      </section>

      {/* No Guesswork */}
      <section className="bg-brand-50 dark:bg-brand-900/10 py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your ROI – No Guesswork
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's what businesses are achieving with AI-powered automation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {[
              "Over £60,000 in hidden revenue identified from just a handful of high-intent follow-up opportunities",
              "35%+ uplift in conversions when follow-ups are handled quickly and intelligently",
              "No staff time wasted on manual call reviews — AI automatically analyses every conversation",
              "Each recovered opportunity costs significantly less than a single Google Ads click",
              "Reveals why prospects drop off — from pricing confusion to long response times",
              "Provides clear, automated next actions to help teams recover lost deals",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckSquare
                  className="text-brand-500 shrink-0 mt-1"
                  size={20}
                />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md">
              Get Your Free Audit
            </button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-white dark:bg-dark-bg py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our Proven Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Book a 1-on-1 consultation to pinpoint exactly where AI can create the biggest impact in your clinic — from capturing more bookings to streamlining patient communication and reducing admin load.",
              },
              {
                step: "02",
                title: "Integration",
                desc: "After consultation, we get everything built and installed for you within 2 weeks. If you already use a CRM, we plug straight into it. If not, we set one up for you.",
              },
              {
                step: "03",
                title: "The Guarantee",
                desc: "If you're not completely satisfied with the results within 4 weeks of using our AI systems, we'll give you a full refund — no questions asked.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative pl-8 border-l-2 border-brand-200 dark:border-brand-900"
              >
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-white dark:ring-dark-bg"></span>
                <span className="text-brand-500 font-bold text-sm tracking-wider uppercase mb-2 block">
                  Step {item.step}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border">
          <AccordionItem
            question="How can AI help clinics increase revenue?"
            answer="ClientReachAI's AI Call Analysis Agent captures and follows up on every missed or mishandled call, converting lost inquiries into booked appointments, boosting clinic revenue by up to 40%."
          />
          <AccordionItem
            question="Can AI replace a receptionist at a clinic?"
            answer="Our AI Receptionist supports – not replaces – your team. It handles call overflow, after-hours inquiries, and follow-ups so staff can focus on in-person patients."
          />
          <AccordionItem
            question="Is this solution suitable for multi-location clinics?"
            answer="With the right SaaS tools, you can expect increased operational efficiency, cost savings, and improved customer satisfaction. We focus on delivering measurable results that align with your business goals, such as higher conversion rates and improved productivity."
          />
          <AccordionItem
            question="How quickly can a clinic see results?"
            answer="Clinics typically see ROI within 30 days by recovering thousands in missed revenue from unconverted calls."
          />
        </div>
      </section>
    </div>
  );
}
