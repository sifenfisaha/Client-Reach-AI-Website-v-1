"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";

export const Transformation = () => {
  return (
    <section className="py-24 bg-gray-50 bg-white dark:bg-dark-bg/50">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              How Client Reach AI Agents{" "}
              <span className="text-brand-500">Transform Your Clinic</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              <span className="italic font-medium">Increase revenue, expand capacity, and cut operational costs</span> — with intelligent AI agents built to scale your clinic without increasing payroll.
            </p>
          </div>
        </FadeIn>

        {/* Before & After Diagram */}
        <FadeIn>
          <div className="relative w-full mb-16">
            <div className="relative w-full aspect-[2.5/1] overflow-hidden dark:border-dark-border dark:bg-dark-card">
              <Image
                src="/beforeandafter.png"
                alt="Before and After - Client Reach AI Transformation"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn>
          <div className="text-center">
            <Link
              href="/discover"
              className="inline-block px-12 py-5 bg-brand-500 text-white text-xl font-bold rounded-full hover:bg-brand-600 transition-all duration-300 shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105 uppercase tracking-wide"
            >
              HOW TO START
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
