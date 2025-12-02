import React from "react";
import Link from "next/link";
import { BarChart3, MessageSquare, Bot, CheckCircle2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Features = () => (
  <section className="py-20 bg-gray-50 dark:bg-dark-bg/50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Endless Possibilities
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Your AI workforce — powering Sales, Support, Success, and Operations —
          built to scale revenue, reduce costs, and deliver world-class customer
          experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          title="Sales AI Agents"
          description=""
          icon={<BarChart3 size={24} />}
          className="h-full"
        >
          <ul className="space-y-3 mt-4">
            {[
              "Find missed revenue opportunities worth 15–20%",
              "Launch outbound campaigns",
              "Follow up inbound leads instantly",
              "Book appointments automatically",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <CheckCircle2
                  size={16}
                  className="text-brand-500 shrink-0 mt-0.5"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card
          title="Support AI Agents"
          description=""
          icon={<MessageSquare size={24} />}
          className="h-full"
        >
          <ul className="space-y-3 mt-4">
            {[
              "Deliver 24/7 support across channels",
              "First-line technical assistance",
              "Ticket triage and escalation",
              "Instant patient queries resolution",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <CheckCircle2
                  size={16}
                  className="text-brand-500 shrink-0 mt-0.5"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card
          title="Operational Excellence"
          description=""
          icon={<Bot size={24} />}
          className="h-full"
        >
          <ul className="space-y-3 mt-4">
            {[
              "Analyse conversations for revenue signals",
              "Flag customer issues and compliance risks",
              "Build dynamic knowledge bases",
              "Transform call/email data into insights",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <CheckCircle2
                  size={16}
                  className="text-brand-500 shrink-0 mt-0.5"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/ai-agents"
          className="text-brand-500 font-medium hover:text-brand-600 inline-flex items-center gap-1"
        >
          Learn More <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);
