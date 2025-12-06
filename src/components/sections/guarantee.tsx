"use client";

import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { openCalendlyPopup } from "@/utils/calendly";
import Image from "next/image";

const steps = [
  {
    number: "Step 1",
    title: "Consultation",
    description:
      "Book a 1-on-1 consultation with one of the Client Reach AI team to pinpoint exactly where AI can create the biggest impact in your clinic - from capturing more bookings to streamlining patient communication and reducing admin load.",
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
      "If you're not completely satisfied with the results within 4 weeks of using our AI systems, we'll give you a full refund - no questions asked.",
    image: "/guarentee.jpg",
  },
];

interface StepCardProps {
  i: number;
  step: (typeof steps)[0];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const StepCard: React.FC<StepCardProps> = ({
  i,
  step,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement>(null);

  // useScroll will work properly since component is client-only
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        initial={false}
        className="flex flex-col relative -top-[25%] h-[450px] md:h-[550px] w-[90%] md:w-[80%] lg:w-[70%] rounded-2xl md:rounded-3xl lg:p-10 md:p-8 p-6 origin-top bg-gradient-to-br from-gray-50 to-white dark:from-dark-card dark:to-dark-bg border border-gray-200 dark:border-dark-border shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 h-full">
          {/* Left Side - Content */}
          <div className="space-y-4 md:space-y-6 flex flex-col justify-center">
            <div>
              <span className="inline-block text-brand-500 font-bold text-xs md:text-sm uppercase tracking-wider mb-2">
                {step.number}
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                {step.title}
              </h3>
              <div className="w-16 md:w-20 h-1 bg-brand-500 rounded-full mb-4 md:mb-6"></div>
            </div>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {step.description}
            </p>

            {/* CTA Button on last step */}
            {i === steps.length - 1 && (
              <div className="pt-4 md:pt-6">
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

          {/* Right Side - Image */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
            <motion.div
              className="w-full h-full relative"
              style={{ scale: imageScale }}
              initial={false}
            >
              <Image
                fill
                src={step.image}
                alt={`${step.title} - ${step.description.substring(0, 100)}`}
                className="object-cover object-top"
                loading="lazy"
              />
            </motion.div>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 to-transparent"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Guarantee = () => {
  const container = useRef<HTMLDivElement>(null);

  // useScroll will work properly since component is client-only (via dynamic import)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={container}
      className="relative bg-white dark:bg-dark-bg w-full"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          CLIENT REACH AI GUARANTEE
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-brand-500 font-semibold mb-2">
          See Real Results in 30 Days or Get Your Money Back
        </p>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
          Launch your AI workforce within your clinic, with no risk.
        </p>
      </div>

      {/* Stacking Cards Section */}
      <div className="text-white w-full bg-white dark:bg-dark-bg">
        {steps.map((step, i) => {
          const targetScale = 1 - (steps.length - i) * 0.05;

          return (
            <StepCard
              key={`step_${i}`}
              i={i}
              step={step}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};
