"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DelayedPopup } from "@/components/layout/delayed-popup";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
      <DelayedPopup />
    </div>
  );
}
