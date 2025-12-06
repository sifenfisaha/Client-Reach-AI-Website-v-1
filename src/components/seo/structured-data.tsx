"use client";

import { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientreach.ai";

export function StructuredData() {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ClientReach.ai",
      alternateName: "Client Reach AI",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description:
        "AI-powered client acquisition and lead generation platform for aesthetic, dental, and healthcare clinics. Automated client outreach, AI receptionist agents, and intelligent lead management.",
      foundingDate: "2024",
      founders: [
        {
          "@type": "Person",
          name: "Mahbhir Mahmud",
          jobTitle: "CEO & Co-Founder",
        },
        {
          "@type": "Person",
          name: "Alfie Tilson",
          jobTitle: "Co-Founder",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        availableLanguage: "English",
      },
      sameAs: [],
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
    };

    // WebSite Schema with SearchAction
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ClientReach.ai",
      url: baseUrl,
      description:
        "AI-powered client acquisition and lead generation platform for clinics",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Client Acquisition & Lead Generation",
      provider: {
        "@type": "Organization",
        name: "ClientReach.ai",
      },
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
      description:
        "AI-powered client acquisition, automated client outreach, AI receptionist agents, and intelligent lead management for aesthetic, dental, and healthcare clinics.",
      offers: {
        "@type": "Offer",
        description: "AI Workforce Solutions for Clinics",
      },
    };

    // Add schemas to page
    const addSchema = (schema: object) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      script.id = `schema-${Math.random().toString(36).substr(2, 9)}`;
      document.head.appendChild(script);
    };

    addSchema(organizationSchema);
    addSchema(websiteSchema);
    addSchema(serviceSchema);

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      scripts.forEach((script) => {
        if (script.id?.startsWith("schema-")) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}
