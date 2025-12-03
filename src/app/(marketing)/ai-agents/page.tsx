"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageSquare,
  Calendar,
  Database,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";

export default function AiAgentsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consentMarketing: false,
    consentTransactional: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border pt-24 pb-16">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Unlock Hidden Revenue in Your Clinics
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every missed call is a missed opportunity. Client Reach AI's
              Receptionist & Call Analysis Agents help aesthetic, dental, and
              healthcare clinics recover lost leads.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StaggerItem>
            <Card
              title="Receptionist"
              description="Handles call overflow and FAQs 24/7."
              icon={<Phone />}
            />
          </StaggerItem>
          <StaggerItem>
            <Card
              title="Follow-up Agent"
              description="Chases leads instantly via SMS/Email."
              icon={<MessageSquare />}
            />
          </StaggerItem>
          <StaggerItem>
            <Card
              title="Booking Coordinator"
              description="Schedules directly into your CRM."
              icon={<Calendar />}
            />
          </StaggerItem>
          <StaggerItem>
            <Card
              title="Analyst"
              description="Reviews conversation data for insights."
              icon={<Database />}
            />
          </StaggerItem>
        </StaggerContainer>

        {/* Request Call Form */}
        <FadeIn>
          <div className="bg-white dark:bg-dark-card rounded-3xl border border-gray-200 dark:border-dark-border shadow-xl max-w-4xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 bg-brand-500 text-white flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Request a Call Now</h2>
                <p className="text-brand-100 mb-8 text-lg">
                  Test our service and try speaking to a live AI agent. See
                  firsthand how we handle inquiries with precision and warmth.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      1
                    </div>
                    <span>Fill out your details</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      2
                    </div>
                    <span>Receive an instant AI call</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      3
                    </div>
                    <span>Experience the future</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 md:p-12">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Request Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our AI agent will be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        placeholder="jane@clinic.com"
                      />
                    </div>

                    <div className="space-y-4 pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="consentTransactional"
                          checked={formData.consentTransactional}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500 shrink-0"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                          I agree to be contacted via phone, WhatsApp and email
                          and understand my information will be stored for future
                          marketing purposes and that I can opt out at any time.
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="consentMarketing"
                          checked={formData.consentMarketing}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500 shrink-0"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                          I would like to sign up to the newsletter.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-500/20 mt-6 flex items-center justify-center gap-2"
                    >
                      {loading ? "Sending Request..." : "Request AI Call"}{" "}
                      {!loading && <ArrowRight size={18} />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
