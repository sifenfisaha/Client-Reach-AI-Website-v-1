import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientreach.ai";

export const metadata: Metadata = {
  title: "AI Agents for Clinics | Receptionist & Call Analysis Agents",
  description:
    "Unlock hidden revenue in your clinics with ClientReach.ai's AI Receptionist and Call Analysis Agents. Recover lost leads, automate patient inquiries, and increase bookings for aesthetic, dental, and healthcare clinics.",
  keywords: [
    "AI receptionist",
    "AI call analysis",
    "automated patient booking",
    "clinic AI agents",
    "dental AI receptionist",
    "aesthetic clinic AI",
    "healthcare AI automation",
    "patient inquiry automation",
    "missed call recovery",
    "AI lead capture",
  ],
  openGraph: {
    title: "AI Agents for Clinics | Receptionist & Call Analysis Agents",
    description:
      "Unlock hidden revenue in your clinics with AI Receptionist and Call Analysis Agents. Recover lost leads and automate patient inquiries.",
    url: `${baseUrl}/ai-agents`,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "ClientReach.ai - AI Agents for Clinics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents for Clinics | Receptionist & Call Analysis Agents",
    description:
      "Unlock hidden revenue in your clinics with AI Receptionist and Call Analysis Agents.",
  },
  alternates: {
    canonical: `${baseUrl}/ai-agents`,
  },
};

export default function AiAgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
