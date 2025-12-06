"use client";

import React from "react";
import { motion } from "framer-motion";

export const Testimonials = () => (
  <section className="py-24 bg-gray-50 dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-brand-600 dark:text-brand-400 font-semibold tracking-wider uppercase text-sm mb-2 block">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What others are saying
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            quote:
              "Client Reach AI helped us uncover £20,000 in missed bookings within weeks. The system follows up automatically and books consultations without our team lifting a finger.",
            author: "Aesthetic Clinic Owner",
            label: "Loved everything so far",
            image: "/testimonial1.jpg",
          },
          {
            quote:
              "Our conversions jumped 35% after Client Reach automated our lead follow-ups. We save hours every day and the ROI speaks for itself.",
            author: "Dental Practice Director",
            label: "My life changed forever",
            image: "/testimonial2.jpg",
          },
          {
            quote:
              "We saw a 3x return in two months. Client Reach streamlined our leads, improved communication, and removed all the manual chasing.",
            author: "Aesthetic Clinic Owner",
            label: "Highly recommend this",
            image: "/testimonial3.jpg",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-dark-card shadow-lg">
                <img
                  src={item.image}
                  alt={`${item.author} - ${item.label} testimonial for Client Reach AI`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              "{item.label}"
            </h4>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-sm">
              "{item.quote}"
            </p>

            <div className="font-semibold text-gray-900 dark:text-white mb-4">
              - {item.author}
            </div>

            <div
              className="flex text-yellow-400 gap-1"
              suppressHydrationWarning
            >
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                  suppressHydrationWarning
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
