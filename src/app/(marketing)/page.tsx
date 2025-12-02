import React from "react";
import { Hero } from "@/components/sections/hero";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { Features } from "@/components/sections/features";
import { Guarantee } from "@/components/sections/guarantee";
import { Testimonials } from "@/components/sections/testimonials";
import { EfficiencyCallout } from "@/components/sections/efficiency-callout";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ComparisonSection />
      <Features />
      <Guarantee />
      <Testimonials />
      <EfficiencyCallout />
    </>
  );
}
