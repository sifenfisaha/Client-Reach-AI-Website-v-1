import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { ChatWidget } from "@/components/chat/chat-widget";
import { StructuredData } from "@/components/seo/structured-data";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientreach.ai";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      "ClientReach.ai - AI Workforce for Clinics | Automated Client Acquisition",
    template: "%s | ClientReach.ai",
  },
  description:
    "Transform your clinic with AI-powered client acquisition and lead generation. Automated client outreach, AI receptionist agents, and intelligent lead management to increase revenue without adding headcount. Trusted by aesthetic, dental, and healthcare clinics.",
  keywords: [
    "AI client acquisition",
    "AI lead generation",
    "automated client outreach",
    "AI receptionist",
    "AI workforce for clinics",
    "dental AI automation",
    "aesthetic clinic AI",
    "healthcare AI solutions",
    "automated patient booking",
    "AI call analysis",
    "clinic automation software",
    "digital workforce",
    "AI agents for healthcare",
    "patient acquisition AI",
    "clinic revenue optimization",
  ],
  authors: [{ name: "ClientReach AI" }],
  creator: "ClientReach AI",
  publisher: "ClientReach AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "ClientReach.ai",
    title:
      "ClientReach.ai - AI Workforce for Clinics | Automated Client Acquisition",
    description:
      "Transform your clinic with AI-powered client acquisition and lead generation. Automated client outreach, AI receptionist agents, and intelligent lead management to increase revenue without adding headcount.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "ClientReach.ai - AI Workforce for Clinics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClientReach.ai - AI Workforce for Clinics",
    description:
      "Transform your clinic with AI-powered client acquisition and lead generation. Increase revenue without adding headcount.",
    images: [`${baseUrl}/og-image.jpg`],
    creator: "@clientreachai",
    site: "@clientreachai",
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "any", type: "image/png" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="light dark" />
        {/* Theme initialization script - prevents flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'light' || savedTheme === 'dark') {
                    return savedTheme;
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                const theme = getInitialTheme();
                const root = document.documentElement;
                root.classList.remove('light', 'dark');
                if (theme === 'dark') {
                  root.classList.add('dark');
                } else {
                  root.classList.add('light');
                }
              })();
            `,
          }}
        />
        {/* Calendly Widget */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        ></script>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-brand-500 selection:text-white font-sans">
        <StructuredData />
        <ThemeProvider>
          {children}
          {/* Chat Widget */}
          <Analytics />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
