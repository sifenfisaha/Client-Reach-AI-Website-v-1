"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Cpu, Briefcase, Rocket } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { openCalendlyPopup } from "@/utils/calendly";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Consultation Intro */}
      <section className="py-20 px-4 bg-gradient-to-b from-brand-50 via-white to-white dark:from-brand-950 dark:via-dark-bg dark:to-dark-bg border-b border-gray-100 dark:border-dark-border">
        <FadeIn>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Consultation
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Book a consultation with the Client Reach AI founders and see
                how a smart AI team can help your clinic, from catching every
                lead to answering patient questions, follow-ups, and bookings
                automatically.
                <br />
                <br />
                In one call, we'll show you exactly where AI can bring back
                missed revenue, make your front desk run smoothly, and ease
                pressure on your staff, all without hiring more people or
                harming the patient experience.
              </p>
              <button
                onClick={openCalendlyPopup}
                className="inline-block px-8 py-4 bg-brand-500 text-white font-medium rounded-full transition-all shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105"
              >
                Get Your Free Consultation
              </button>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/both4.jpeg"
                alt="Client Reach AI Founders Mahbhir Mahmud and Alfie Tilson discussing AI solutions for clinics"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Client Reach AI was founded by Alfie Tilson and Mahbhir Mahmud —
              two young entrepreneurs on a mission to help clinics unlock the
              full power of AI. Client Reach AI builds smart systems made for
              clinics. They handle enquiries, follow-ups, lead checks, and
              recover missed revenue — keeping everything running smoothly. This
              boosts bookings and sales without needing more staff, so you can
              focus on great treatments while AI handles the rest.
            </p>
          </div>
        </FadeIn>

        {/* Mission / Vision Cards */}
        <FadeIn>
          <div className="space-y-16 mb-20">
            {/* Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
                <img
                  src="/both33.jpg"
                  alt="Client Reach AI Mission - Smart digital workers helping clinics increase revenue and scale operations"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold text-brand-500 mb-4">
                  MISSION
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  At Client Reach AI, we give clinics smart digital workers that
                  relieve teams hours of manual repetitive tasks whilst
                  increasing revenue and scaling their business. They take care
                  of admin, follow-ups, patient messages, and revenue tasks,
                  helping your clinic grow while your team focuses on what
                  matters most: amazing patient care.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-brand-500 mb-4">
                  VISION
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We believe clinics should have AI teams that work smoothly
                  alongside their staff, improving patient experience, saving
                  time, and helping the clinic grow. This means clinicians can
                  focus on treatments, while smart AI handles enquiries,
                  follow-ups, admin, and revenue tasks in the background.
                </p>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/consultation.jpeg"
                  alt="Client Reach AI Vision - AI teams working alongside clinic staff to improve patient experience and grow the business"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* What We Do */}
        <FadeIn>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card
                title="Digital Workers"
                description="We deliver fully integrated teams of intelligent AI agents — digital workers designed to collaborate, automate, and scale across every area of your clinic."
                icon={<Cpu size={24} />}
              />
              <Card
                title="Managed AI Agents"
                description="We handle the setup, onboarding, optimisation, and ongoing management of your digital workforce — ensuring your AI agents perform seamlessly and deliver measurable results."
                icon={<Briefcase size={24} />}
              />
              <Card
                title="AI Activate"
                description="We help clinics cut through the complexity and confidently adopt AI through guided strategy, piloting, and implementation."
                icon={<Rocket size={24} />}
              />
            </div>
          </div>
        </FadeIn>

        {/* Founders */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Meet the Co-Founders
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            The Client Reach AI team brings diverse professional and
            entrepreneurial experience, delivering advanced AI and automation
            solutions for clinics of all sizes — from founder-run clinics to
            large franchises — across industries such as aesthetics and
            dentistry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mahbhir Card */}
            <FadeIn delay={0.2}>
              <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-dark-border hover:shadow-xl transition-shadow md:h-[850px]">
                <div className="relative h-[500px] w-full">
                  <img
                    src="/mahabir1.jpeg"
                    alt="Mahbhir Mahmud - CEO & Co-Founder of Client Reach AI, overseeing AI development and operations"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Mahbhir Mahmud
                  </h3>
                  <p className="text-brand-500 font-medium mb-4">
                    CEO & Co-Founder
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Mahbhir Mahmud, Co-Founder of Client Reach AI, oversees
                    operations and AI development, ensuring the seamless
                    delivery of intelligent automation solutions for clients.
                    With a deep understanding of emerging technologies and
                    business systems, Mahbhir leads the design and
                    implementation of AI workforces that help organisations
                    operate more efficiently, scale faster, and achieve
                    measurable results across multiple sectors.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Alfie Card */}
            <FadeIn delay={0.4}>
              <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-dark-border hover:shadow-xl transition-shadow md:h-[850px]">
                <div className="relative h-[500px] w-full">
                  <img
                    src="/alfie1.jpeg"
                    alt="Alfie Tilson - Co-Founder of Client Reach AI, specializing in business efficiency and AI optimization"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Alfie Tilson
                  </h3>
                  <p className="text-brand-500 font-medium mb-4">Co-Founder</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Alfie Tilson, Co-Founder of Client Reach AI, is a driven
                    entrepreneur specialising in business efficiency and
                    optimisation. With a passion for connecting businesses to
                    the transformative power of AI, Alfie leads the company's
                    growth strategy, helping clients across sectors streamline
                    operations, enhance customer engagement, and scale
                    efficiently through intelligent automation.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
