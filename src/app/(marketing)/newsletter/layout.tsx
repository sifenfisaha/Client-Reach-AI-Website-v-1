import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientreach.ai";

export const metadata: Metadata = {
  title: "Newsletter | Stay Updated on AI Clinic Automation",
  description:
    "Subscribe to the ClientReach.ai newsletter for the latest insights on AI-powered client acquisition, clinic automation, and lead generation strategies for aesthetic, dental, and healthcare clinics.",
  keywords: [
    "clinic AI newsletter",
    "healthcare AI updates",
    "dental automation news",
    "clinic automation insights",
    "AI client acquisition tips",
    "patient acquisition strategies",
  ],
  openGraph: {
    title: "Newsletter | Stay Updated on AI Clinic Automation",
    description:
      "Subscribe to the ClientReach.ai newsletter for the latest insights on AI-powered client acquisition and clinic automation.",
    url: `${baseUrl}/newsletter`,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "ClientReach.ai - Newsletter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter | Stay Updated on AI Clinic Automation",
    description:
      "Subscribe to the ClientReach.ai newsletter for the latest insights on AI-powered client acquisition.",
  },
  alternates: {
    canonical: `${baseUrl}/newsletter`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
