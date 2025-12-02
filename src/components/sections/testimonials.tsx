import React from "react";

export const Testimonials = () => (
  <section className="py-24 bg-gray-50 dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Don't take our word for it
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          See what medical professionals are saying.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            quote:
              "Client Reach AI helped us uncover £20,000 in missed bookings within weeks. The system follows up automatically and books consultations without our team lifting a finger.",
            author: "Aesthetic Clinic Owner",
            label: "Loved everything so far",
          },
          {
            quote:
              "Our conversions jumped 35% after Client Reach automated our lead follow-ups. We save hours every day and the ROI speaks for itself.",
            author: "Dental Practice Director",
            label: "My life changed forever",
          },
          {
            quote:
              "We saw a 3x return in two months. Client Reach streamlined our leads, improved communication, and removed all the manual chasing.",
            author: "Aesthetic Clinic Owner",
            label: "Highly recommend this",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border"
          >
            <div className="flex text-brand-500 mb-4">★★★★★</div>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              {item.label}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 italic mb-6 leading-relaxed">
              "{item.quote}"
            </p>
            <div className="text-sm font-semibold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-4">
              {item.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
