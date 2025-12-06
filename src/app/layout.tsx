import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { ChatWidget } from "@/components/chat/chat-widget";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" /> {/* <--- This works too */}
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
      </head>
      <body className="bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider>
          {children}
          {/* Chat Widget */}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
