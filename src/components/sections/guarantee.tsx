"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { openCalendlyPopup } from "@/utils/calendly";

const steps = [
  {
    number: "Step 1",
    title: "Consultation",
    description:
      "Book a 1-on-1 consultation with one of the Client Reach AI team to pinpoint exactly where AI can create the biggest impact in your clinic — from capturing more bookings to streamlining patient communication and reducing admin load.",
    image: "/consultation.jpeg",
  },
  {
    number: "Step 2",
    title: "Integration",
    description:
      "After we have your consultation and confirm the right AI setup for your clinic, we get everything built and installed for you. If you already use a CRM, we plug the system straight into it. If you don't have one yet, don't worry, our team will set everything up for you and connect your clinic to the CRM you prefer.",
    image: "/integrations.png",
  },
  {
    number: "Step 3",
    title: "The Client Reach Guarantee",
    description:
      "If you're not completely satisfied with the results within 4 weeks of using our AI systems, we'll give you a full refund — no questions asked.",
    image: "/guarentee.jpg",
  },
];

export const Guarantee = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the section (0 to 1)
      const start = sectionTop - windowHeight / 2;
      const end = sectionTop + sectionHeight - windowHeight / 2;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate each step's animation state based on scroll progress
  const getStepStyle = (index: number) => {
    const totalSteps = steps.length;
    const stepProgress = scrollProgress * totalSteps;
    
    // Determine if this step is active, previous, or upcoming
    const isActive = stepProgress >= index && stepProgress < index + 1;
    const isPrevious = stepProgress >= index + 1;
    const isUpcoming = stepProgress < index;

    if (isPrevious) {
      // Step has passed - shrink and fade out upward
      return {
        opacity: 0,
        transform: `translateY(-100px) scale(0.8)`,
        zIndex: index,
      };
    } else if (isActive) {
      // Currently active step - calculate transition to next
      const progress = stepProgress - index; // 0 to 1 within this step
      const scale = 1 - progress * 0.02; // Shrink from 1 to 0.8
      const translateY = -progress * 100; // Move up
      const opacity = 1 - progress * 0.5; // Fade out slightly

      return {
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        zIndex: totalSteps - index,
      };
    } else {
      // Upcoming step - slide in from bottom of viewport
      const distance = (index - stepProgress); // Steps away from active
      const translateY = distance * 100 + 600; // Start from bottom of screen (600px below)
      
      return {
        opacity: 1,
        transform: `translateY(${translateY}px) scale(0.95)`,
        zIndex: totalSteps - index,
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white dark:bg-dark-bg py-24 min-h-[360vh] md:min-h-[240vh]"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          CLIENT REACH AI GUARANTEE
        </h2>
        <p className="text-xl md:text-2xl text-brand-500 font-semibold mb-2">
          See Real Results in 30 Days or Get Your Money Back
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Launch your AI workforce within your clinic, with no risk.
        </p>
      </div>

      {/* Sticky Steps Container */}
      <div className="sticky top-40 max-w-7xl mx-auto px-4">
        <div className="relative min-h-[600px] flex items-center justify-center">
          {steps.map((step, index) => {
            const style = getStepStyle(index);
            
            return (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  opacity: style.opacity,
                  transform: style.transform,
                  zIndex: style.zIndex,
                }}
              >
              <div className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-gray-50 to-white dark:from-dark-card dark:to-dark-bg rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-dark-border shadow-2xl">
                {/* Left Side - Content */}
                <div className="space-y-6">
                  <div>
                    <span className="inline-block text-brand-500 font-bold text-sm uppercase tracking-wider mb-2">
                      {step.number}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <div className="w-20 h-1 bg-brand-500 rounded-full mb-6"></div>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* CTA Button on last step */}
                  {index === steps.length - 1 && (
                    <div className="pt-6">
                      <button
                        onClick={openCalendlyPopup}
                        className="inline-flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 bg-brand-500 text-white text-sm md:text-base font-semibold rounded-full hover:bg-brand-600 transition-all duration-300 shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105"
                      >
                        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
                        Start Your Risk-Free Trial
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Side - Image Placeholder */}
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden dark:from-brand-900/20 dark:to-brand-950/20 border-2 border-brand-200 dark:border-brand-800 shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-6">
                      {/*<div className="w-24 h-24 mx-auto rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center">
                        <ShieldCheck className="w-12 h-12 text-brand-500" />
                      </div>
                       <p className="text-brand-600 dark:text-brand-400 font-medium text-lg">
                        Image Placeholder
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm px-8">
                        {step.number} - {step.title}
                      </p> */}
                      <img src={step.image} alt="" className=" w-[600px] h-[500px] object-cover" />
                    </div>
                  </div>
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 to-transparent"></div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      {/* <div className="fixed right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-3">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeStep === index
                ? "bg-brand-500 scale-125 shadow-lg shadow-brand-500/50"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div> */}
    </section>
  );
};
