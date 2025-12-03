import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Hero } from "@/components/sections/hero";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { Features } from "@/components/sections/features";
import { Guarantee } from "@/components/sections/guarantee";
import { Transformation } from "@/components/sections/transformation";
import { Testimonials } from "@/components/sections/testimonials";
import { EfficiencyCallout } from "@/components/sections/efficiency-callout";

export default function HomePage() {
  return (
    <>
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn>
        <ComparisonSection />
      </FadeIn>
      <FadeIn>
        <Features />
      </FadeIn>
      <FadeIn>
        <Guarantee />
      </FadeIn>
      <FadeIn>
        <Transformation />
      </FadeIn>
      <FadeIn>
        <Testimonials />
      </FadeIn>
      <FadeIn>
        <EfficiencyCallout />
      </FadeIn>
    </>
  );
}
