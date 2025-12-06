import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientreach.ai";

export const metadata: Metadata = {
  title: "Free Clinic Revenue Audit | Unlock Hidden Revenue with AI",
  description:
    "Book a free consultation with ClientReach.ai to discover where your clinic is losing time, money, and potential patients. Get a comprehensive audit showing how AI can fix revenue leaks and increase bookings without spending more on marketing.",
  keywords: [
    "free clinic audit",
    "clinic revenue audit",
    "AI clinic consultation",
    "revenue optimization",
    "clinic ROI analysis",
    "patient acquisition audit",
    "clinic efficiency audit",
    "dental clinic audit",
    "aesthetic clinic audit",
  ],
  openGraph: {
    title: "Free Clinic Revenue Audit | Unlock Hidden Revenue with AI",
    description:
      "Book a free consultation to discover where your clinic is losing revenue and how AI can fix it without spending more on marketing.",
    url: `${baseUrl}/discover`,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "ClientReach.ai - Free Clinic Revenue Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Clinic Revenue Audit | Unlock Hidden Revenue with AI",
    description:
      "Book a free consultation to discover where your clinic is losing revenue and how AI can fix it.",
  },
  alternates: {
    canonical: `${baseUrl}/discover`,
  },
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
