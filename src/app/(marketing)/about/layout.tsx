import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientreach.ai";

export const metadata: Metadata = {
  title: "About Us | ClientReach.ai Founders & Mission",
  description:
    "Meet the founders of ClientReach.ai - Mahbhir Mahmud and Alfie Tilson. Learn about our mission to help clinics unlock the full power of AI for client acquisition, lead generation, and automated patient management.",
  keywords: [
    "ClientReach.ai founders",
    "AI clinic founders",
    "Mahbhir Mahmud",
    "Alfie Tilson",
    "clinic AI mission",
    "healthcare AI vision",
    "dental AI company",
    "aesthetic clinic automation",
  ],
  openGraph: {
    title: "About Us | ClientReach.ai Founders & Mission",
    description:
      "Meet the founders of ClientReach.ai and learn about our mission to help clinics unlock the full power of AI for client acquisition and lead generation.",
    url: `${baseUrl}/about`,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "ClientReach.ai - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | ClientReach.ai Founders & Mission",
    description:
      "Meet the founders of ClientReach.ai and learn about our mission to help clinics unlock the full power of AI.",
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
