"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  Calendar,
  Database,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";

export default function AiAgentsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiry: "",
    consentMarketing: false,
    consentTransactional: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    inquiry?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    company?: boolean;
    inquiry?: boolean;
  }>({});
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateName = (nameValue: string): string | null => {
    if (!nameValue.trim()) {
      return "Name is required";
    }
    if (nameValue.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return null;
  };

  const validateEmail = (emailValue: string): string | null => {
    if (!emailValue.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(emailValue.trim())) {
      return "Please enter a valid email";
    }
    return null;
  };

  const validatePhone = (phoneValue: string): string | null => {
    if (!phoneValue.trim()) {
      return "Phone number is required";
    }
    if (phoneValue.trim().length < 10) {
      return "Phone number must be at least 10 characters";
    }
    return null;
  };

  const validateCompany = (companyValue: string): string | null => {
    if (!companyValue.trim()) {
      return "Company name is required";
    }
    return null;
  };

  const validateInquiry = (inquiryValue: string): string | null => {
    if (!inquiryValue.trim()) {
      return "Inquiry is required";
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof fieldErrors];
        return newErrors;
      });
    }
    // Clear general error
    if (error) setError(null);

    // Re-validate if field was previously touched
    if (touched[name as keyof typeof touched]) {
      if (name === "name") {
        const validationError = validateName(value);
        setFieldErrors((prev) => ({
          ...prev,
          name: validationError || undefined,
        }));
      } else if (name === "email") {
        const validationError = validateEmail(value);
        setFieldErrors((prev) => ({
          ...prev,
          email: validationError || undefined,
        }));
      } else if (name === "phone") {
        const validationError = validatePhone(value);
        setFieldErrors((prev) => ({
          ...prev,
          phone: validationError || undefined,
        }));
      } else if (name === "company") {
        const validationError = validateCompany(value);
        setFieldErrors((prev) => ({
          ...prev,
          company: validationError || undefined,
        }));
      } else if (name === "inquiry") {
        const validationError = validateInquiry(value);
        setFieldErrors((prev) => ({
          ...prev,
          inquiry: validationError || undefined,
        }));
      }
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    if (fieldName === "name") {
      const validationError = validateName(formData.name);
      setFieldErrors((prev) => ({
        ...prev,
        name: validationError || undefined,
      }));
    } else if (fieldName === "email") {
      const validationError = validateEmail(formData.email);
      setFieldErrors((prev) => ({
        ...prev,
        email: validationError || undefined,
      }));
    } else if (fieldName === "phone") {
      const validationError = validatePhone(formData.phone);
      setFieldErrors((prev) => ({
        ...prev,
        phone: validationError || undefined,
      }));
    } else if (fieldName === "company") {
      const validationError = validateCompany(formData.company);
      setFieldErrors((prev) => ({
        ...prev,
        company: validationError || undefined,
      }));
    } else if (fieldName === "inquiry") {
      const validationError = validateInquiry(formData.inquiry);
      setFieldErrors((prev) => ({
        ...prev,
        inquiry: validationError || undefined,
      }));
    }
  };

  // Rate limiting countdown effect
  useEffect(() => {
    if (rateLimitCountdown > 0) {
      const timer = setTimeout(() => {
        setRateLimitCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (rateLimitCountdown === 0 && isRateLimited) {
      setIsRateLimited(false);
    }
    return undefined;
  }, [rateLimitCountdown, isRateLimited]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => {
      if (error && error.includes("offline")) {
        setError(null);
      }
    };
    const handleOffline = () => {
      if (isSubmitting) {
        setError("You're offline. Please check your connection.");
        setIsSubmitting(false);
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [error, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is offline
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setError("You're offline. Please check your connection.");
      return;
    }

    // Check rate limit
    if (isRateLimited) {
      return;
    }

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      inquiry: true,
    });

    // Clear previous errors
    setError(null);

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const companyError = validateCompany(formData.company);
    const inquiryError = validateInquiry(formData.inquiry);

    if (nameError || emailError || phoneError || companyError || inquiryError) {
      setFieldErrors({
        name: nameError || undefined,
        email: emailError || undefined,
        phone: phoneError || undefined,
        company: companyError || undefined,
        inquiry: inquiryError || undefined,
      });
      return;
    }

    // Check consent
    if (!formData.consentTransactional) {
      setError("Please agree to be contacted to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            company: formData.company.trim(),
            inquiry: formData.inquiry.trim(),
            consentMarketing: formData.consentMarketing,
            consentTransactional: formData.consentTransactional,
          }),
        },
      );

      if (response.ok) {
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          inquiry: "",
          consentMarketing: false,
          consentTransactional: false,
        });
        setFieldErrors({});
        setTouched({});
        setSubmitted(true);

        // Apply rate limiting
        setIsRateLimited(true);
        setRateLimitCountdown(3);

        // Reset after 3 seconds
        setTimeout(() => {
          setIsRateLimited(false);
          setRateLimitCountdown(0);
        }, 3000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      // Handle unexpected errors
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      // Check for network/offline errors
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setError("You're offline. Please check your connection.");
      } else if (
        errorMessage.toLowerCase().includes("network") ||
        errorMessage.toLowerCase().includes("fetch") ||
        errorMessage.toLowerCase().includes("connection")
      ) {
        setError("Connection failed. Please try again.");
      } else if (errorMessage.toLowerCase().includes("timeout")) {
        setError("Request timed out. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Section - Full Height */}
      <section className="min-h-screen md:min-h-[60vh] bg-gradient-to-b from-brand-50 via-white to-white dark:from-brand-950 dark:via-dark-bg dark:to-dark-bg border-b border-gray-100 dark:border-dark-border flex justify-center items-center py-12 md:py-0 px-4">
        <FadeIn>
          <div className="w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left order-2 md:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                Unlock <br />{" "}
                <span className="text-brand-500">Hidden Revenue</span> <br /> in
                Your Clinics
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed">
                Every missed call is a missed opportunity. Client Reach AI's
                Receptionist & Call Analysis Agents help aesthetic, dental, and
                healthcare clinics recover lost leads.
              </p>
            </div>
            <div className="h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden order-1 md:order-2">
              <img
                src="/revenue.webp"
                alt="Unlock Hidden Revenue in Your Clinics - AI Receptionist and Call Analysis Agents recovering lost leads and increasing bookings"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>
      </section>

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
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-4"
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                    >
                      Request Sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      Our AI agent will be in touch shortly.
                    </motion.p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* General Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm"
                        >
                          <AlertCircle size={16} />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("name")}
                        aria-invalid={fieldErrors.name ? "true" : "false"}
                        aria-describedby={
                          fieldErrors.name ? "name-error" : undefined
                        }
                        disabled={isSubmitting || isRateLimited}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border outline-none transition-all ${
                          fieldErrors.name
                            ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                            : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500"
                        } ${
                          isSubmitting || isRateLimited
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                        placeholder="Jane Doe"
                      />
                      <AnimatePresence>
                        {fieldErrors.name && (
                          <motion.p
                            id="name-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          >
                            <AlertCircle size={14} />
                            {fieldErrors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("phone")}
                        aria-invalid={fieldErrors.phone ? "true" : "false"}
                        aria-describedby={
                          fieldErrors.phone ? "phone-error" : undefined
                        }
                        disabled={isSubmitting || isRateLimited}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border outline-none transition-all ${
                          fieldErrors.phone
                            ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                            : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500"
                        } ${
                          isSubmitting || isRateLimited
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                        placeholder="+1 (555) 000-0000"
                      />
                      <AnimatePresence>
                        {fieldErrors.phone && (
                          <motion.p
                            id="phone-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          >
                            <AlertCircle size={14} />
                            {fieldErrors.phone}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("email")}
                        aria-invalid={fieldErrors.email ? "true" : "false"}
                        aria-describedby={
                          fieldErrors.email ? "email-error" : undefined
                        }
                        disabled={isSubmitting || isRateLimited}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border outline-none transition-all ${
                          fieldErrors.email
                            ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                            : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500"
                        } ${
                          isSubmitting || isRateLimited
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                        placeholder="jane@clinic.com"
                      />
                      <AnimatePresence>
                        {fieldErrors.email && (
                          <motion.p
                            id="email-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          >
                            <AlertCircle size={14} />
                            {fieldErrors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("company")}
                        aria-invalid={fieldErrors.company ? "true" : "false"}
                        aria-describedby={
                          fieldErrors.company ? "company-error" : undefined
                        }
                        disabled={isSubmitting || isRateLimited}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border outline-none transition-all ${
                          fieldErrors.company
                            ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                            : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500"
                        } ${
                          isSubmitting || isRateLimited
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                        placeholder="Clinic Name"
                      />
                      <AnimatePresence>
                        {fieldErrors.company && (
                          <motion.p
                            id="company-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          >
                            <AlertCircle size={14} />
                            {fieldErrors.company}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label
                        htmlFor="inquiry"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Initial Inquiry/Interest{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="inquiry"
                        name="inquiry"
                        value={formData.inquiry}
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>,
                        ) => {
                          handleInputChange(
                            e as unknown as React.ChangeEvent<HTMLInputElement>,
                          );
                        }}
                        onBlur={() => handleBlur("inquiry")}
                        aria-invalid={fieldErrors.inquiry ? "true" : "false"}
                        aria-describedby={
                          fieldErrors.inquiry ? "inquiry-error" : undefined
                        }
                        disabled={isSubmitting || isRateLimited}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border outline-none transition-all ${
                          fieldErrors.inquiry
                            ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                            : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500"
                        } ${
                          isSubmitting || isRateLimited
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                        placeholder="I'm interested in..."
                      />
                      <AnimatePresence>
                        {fieldErrors.inquiry && (
                          <motion.p
                            id="inquiry-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          >
                            <AlertCircle size={14} />
                            {fieldErrors.inquiry}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-4 pt-2">
                      <label
                        className={`flex items-start gap-3 cursor-pointer group ${
                          isSubmitting || isRateLimited
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="consentTransactional"
                          checked={formData.consentTransactional}
                          onChange={handleInputChange}
                          disabled={isSubmitting || isRateLimited}
                          className="mt-1 w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500 shrink-0 disabled:cursor-not-allowed"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                          I agree to be contacted via phone, WhatsApp and email
                          and understand my information will be stored for
                          future marketing purposes and that I can opt out at
                          any time.
                        </span>
                      </label>
                      <label
                        className={`flex items-start gap-3 cursor-pointer group ${
                          isSubmitting || isRateLimited
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="consentMarketing"
                          checked={formData.consentMarketing}
                          onChange={handleInputChange}
                          disabled={isSubmitting || isRateLimited}
                          className="mt-1 w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500 shrink-0 disabled:cursor-not-allowed"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                          I would like to sign up to the newsletter.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || isRateLimited}
                      className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-500/20 mt-6 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Requesting...
                        </>
                      ) : (
                        <>
                          Request AI Call
                          <ArrowRight size={18} />
                        </>
                      )}
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
