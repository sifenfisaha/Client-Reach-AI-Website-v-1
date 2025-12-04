import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

export const metadata: Metadata = {
  title: "ClientReach.ai - AI Workforce for Clinics",
  description:
    "Client Reach AI provides a digital workforce of AI agents that work together to increase revenue without adding headcount.",
  icons: {
    icon: "/favicon.png", // <--- Add this
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" /> {/* <--- This works too */}
        {/* Calendly Widget */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
      </head>
      <body className="bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>

        {/* Chat Widget */}
        <Script
          src="/chat-widget.js"
          strategy="lazyOnload"
          data-name="Reach"
          data-primary="#14A3F6"
          data-welcome="👋 Have any questions?"
          data-endpoint="/api/chat"
        />
      </body>
    </html>
  );
}
