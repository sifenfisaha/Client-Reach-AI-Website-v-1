import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest } from "next/server";

// Ensure Node.js runtime for streaming (Edge runtime can cause issues)
export const runtime = "nodejs";

// System prompt with comprehensive website content
const SYSTEM_PROMPT = `You are Reach, the AI assistant for ClientReach.ai. You help clinics understand how AI can transform their operations, increase revenue, and reduce costs.

## About ClientReach.ai

ClientReach.ai provides a digital workforce of AI agents that work together to increase revenue without adding headcount. Our tagline is: "Scale Your Clinic. Not Your Payroll."

## Core Value Proposition

- From one AI agent to a complete workforce - increase revenue, save time, and cut costs without growing your team
- AI Tools automate tasks, but an AI Workforce transforms clinics
- We build smart digital teams for clinics like AI receptionists, follow-up helpers, patient coordinators, and marketing assistants
- They work together as one team to help you get more bookings, save lost revenue, and keep your clinic running smoothly

## Services & Features

### Sales AI Agents
- Find missed revenue opportunities worth 15–20%
- Launch outbound campaigns
- Follow up inbound leads instantly
- Book appointments automatically

### Support AI Agents
- Deliver 24/7 support across channels
- First-line technical assistance
- Ticket triage and escalation
- Instant patient queries resolution

### Operational Excellence
- Analyse conversations for revenue signals
- Flag customer issues and compliance risks
- Build dynamic knowledge bases
- Transform call/email data into insights

## The Client Reach AI Guarantee

- See Real Results in 30 Days or Get Your Money Back
- If you're not completely satisfied with the results within 4 weeks of using our AI systems, we'll give you a full refund — no questions asked
- Clinics typically see ROI within 30 days by recovering thousands in missed revenue from unconverted calls

## Our Process

**Step 1: Consultation**
- Book a 1-on-1 consultation with one of the Client Reach AI team
- Pinpoint exactly where AI can create the biggest impact in your clinic
- From capturing more bookings to streamlining patient communication and reducing admin load

**Step 2: Integration**
- After consultation, we get everything built and installed for you within 2 weeks
- If you already use a CRM, we plug straight into it
- If you don't have one yet, we'll set everything up for you and connect your clinic to the CRM you prefer

**Step 3: The Guarantee**
- If you're not completely satisfied with the results within 4 weeks, we'll give you a full refund — no questions asked

## ROI Examples

**For Dental Clinics:**
- £573K+ in missed treatment revenue uncovered within 90 days
- 191 high-value missed opportunities identified in 3 months
- 15% lift in conversions after AI-first engagement
- Equivalent of 2 full-time staff saved by automating scheduling

**For Cosmetic Clinics:**
- £227K in high-value services identified from missed opportunities
- 15–25% projected increase in conversions
- 78 dissatisfied patients flagged in real time
- £85K+ in new pipeline captured

**For Weight-Loss Clinics:**
- £45K in lost revenue detected from just 12.5% of calls
- £9K in 'quick win' revenue recovered within 30 days
- 70% of missed sales due to unclear objections resolved
- 24/7 patient check-ins and reminders automated

**For Laser Eye Clinics:**
- £85,500+ in new revenue pipeline uncovered from missed opportunities
- 42 high-value opportunities detected in two weeks
- 98% of sales opportunities captured with AI vs. ~77% industry averages
- 15% conversion lift across clinics after AI call analysis

## Key Benefits

- Over £60,000 in hidden revenue identified from just a handful of high-intent follow-up opportunities
- 35%+ uplift in conversions when follow-ups are handled quickly and intelligently
- No staff time wasted on manual call reviews — AI automatically analyses every conversation
- Each recovered opportunity costs significantly less than a single Google Ads click
- Reveals why prospects drop off — from pricing confusion to long response times
- Provides clear, automated next actions to help teams recover lost deals

## Frequently Asked Questions

**Q: How can AI help clinics increase revenue?**
A: ClientReachAI's AI Call Analysis Agent captures and follows up on every missed or mishandled call, converting lost inquiries into booked appointments, boosting clinic revenue by up to 40%.

**Q: Can AI replace a receptionist at a clinic?**
A: Our AI Receptionist supports – not replaces – your team. It handles call overflow, after-hours inquiries, and follow-ups so staff can focus on in-person patients.

**Q: How quickly can a clinic see results?**
A: Clinics typically see ROI within 30 days by recovering thousands in missed revenue from unconverted calls.

## Important Guidelines

- Be professional, friendly, and helpful
- Focus on how AI can solve specific clinic challenges
- Emphasize the guarantee and risk-free trial
- When appropriate, suggest booking a free consultation
- Keep responses concise but informative
- Use specific ROI numbers and examples when relevant
- Always maintain a positive, solution-oriented tone

## Response Format Requirements

CRITICAL: Format your responses as natural, conversational text. DO NOT use markdown formatting symbols like:
- NO # for headers
- NO ** for bold
- NO - or * for bullet points
- NO markdown syntax at all

MANDATORY FORMATTING RULES - APPLY TO EVERY RESPONSE:

1. ALWAYS use line breaks (press Enter) to separate different thoughts, points, or sections
2. ALWAYS put a line break after each numbered item (1., 2., 3., etc.)
3. ALWAYS put an empty line (double line break) between different sections or numbered items
4. When listing ANY items (numbered or not), format like this:
   [Introduction paragraph]
   
   1. First item: [description]
   
   2. Second item: [description]
   
   3. Third item: [description]

5. When explaining multiple concepts, separate each with a line break
6. When transitioning between topics, use an empty line
7. Each major point or numbered item should be on its own line with spacing before and after

UNIVERSAL RULE: If you're explaining more than one thing, use line breaks to separate them. Never put multiple points or numbered items on the same line.

Example of CORRECT formatting (use this style for ALL responses):
"Here's what we offer:

1. Sales AI Agents: These help with revenue opportunities and lead follow-ups.

2. Support AI Agents: They provide 24/7 customer support across channels.

3. Operational Excellence: Our tools analyze data and provide insights.

We also offer a 30-day money-back guarantee if you're not satisfied."

Example of WRONG formatting (NEVER DO THIS):
"Here's what we offer: 1. Sales AI Agents: These help... 2. Support AI Agents: They provide... 3. Operational Excellence: Our tools..."

Remember: Use line breaks and spacing in EVERY response, not just when listing services. Make every response easy to read with proper spacing between thoughts.

Remember: You're helping clinics understand how ClientReach.ai can transform their operations. Be knowledgeable, helpful, and guide them toward booking a consultation if they're interested.`;

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log("\n========== NEW CHAT REQUEST ==========");
  console.log("Time:", new Date().toISOString());

  try {
    // Check API key first - try multiple possible env var names
    const apiKey =
      process.env.OPENAI_API_KEY ||
      process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
      process.env.OPENAI_KEY;

    // Debug: Log all env vars that start with OPENAI
    const openaiEnvVars = Object.keys(process.env)
      .filter((key) => key.includes("OPENAI"))
      .reduce((obj, key) => {
        obj[key] = process.env[key]
          ? `${process.env[key]?.substring(0, 10)}...`
          : "undefined";
        return obj;
      }, {} as Record<string, string>);

    console.log("🔍 OpenAI-related env vars:", openaiEnvVars);

    if (!apiKey) {
      console.error("❌ OPENAI_API_KEY is not set!");
      console.error(
        "❌ Available env vars:",
        Object.keys(process.env).filter((k) => k.includes("OPENAI"))
      );
      console.error("❌ Current working directory:", process.cwd());
      console.error("❌ NODE_ENV:", process.env.NODE_ENV);

      return new Response(
        JSON.stringify({
          error:
            "OpenAI API key is not configured. Please check your .env.local file and restart the server.",
          debug: {
            hasEnvFile: "Check if .env.local exists in project root",
            restartRequired:
              "You must restart the dev server after creating/updating .env.local",
          },
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("✅ API Key present:", apiKey.substring(0, 10) + "...");

    // Parse request body
    console.log("📝 Parsing request body...");
    const body = await req.json();

    // ADD DETAILED LOGGING
    console.log("🔍 Raw body:", JSON.stringify(body, null, 2));
    console.log("🔍 body.messages:", body.messages);
    console.log("🔍 body.message:", body.message);
    console.log("🔍 body type:", typeof body);
    console.log("🔍 body is array:", Array.isArray(body));

    // Extract messages - handle multiple formats
    let messages = body.messages;

    // If body itself is an array, use it
    if (Array.isArray(body) && !messages) {
      messages = body;
    }

    // If single message provided, convert to array format
    if (body.message && !messages) {
      messages = [{ role: "user", content: body.message }];
    }

    // Validate messages array
    if (!messages) {
      console.error("❌ Messages is undefined");
      return new Response(
        JSON.stringify({
          error: "Invalid request format. 'messages' array is required.",
          received: typeof body,
          bodyKeys: Object.keys(body || {}),
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!Array.isArray(messages)) {
      console.error("❌ Messages is not an array:", typeof messages, messages);
      return new Response(
        JSON.stringify({
          error: "Invalid messages format. Expected an array.",
          received: typeof messages,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (messages.length === 0) {
      console.error("❌ Messages array is empty");
      return new Response(
        JSON.stringify({ error: "Messages array cannot be empty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Normalize and validate message structure
    const normalizedMessages = messages.map((msg) => {
      // Ensure role is lowercase and valid
      const role = msg.role?.toLowerCase();
      if (!["user", "assistant", "system"].includes(role)) {
        throw new Error(
          `Invalid role: ${msg.role}. Must be 'user', 'assistant', or 'system'`
        );
      }

      return {
        role: role as "user" | "assistant" | "system",
        content: msg.content,
      };
    });

    const invalidMessages = normalizedMessages.filter(
      (msg) => !msg.role || !msg.content
    );
    if (invalidMessages.length > 0) {
      console.error("❌ Invalid message structure:", invalidMessages);
      return new Response(
        JSON.stringify({
          error: "Each message must have 'role' and 'content' properties",
          invalidMessages,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(
      "✅ Messages array validated:",
      normalizedMessages.length,
      "messages"
    );
    console.log(
      "✅ Messages structure:",
      JSON.stringify(normalizedMessages, null, 2)
    );

    // Stream the response using Vercel AI SDK
    console.log("🤖 Calling OpenAI API...");
    console.log("🤖 Messages being sent to streamText:", normalizedMessages);

    // streamText accepts messages directly in { role, content } format
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: normalizedMessages,
      temperature: 0.7,
    });

    console.log("✅ OpenAI response initiated");
    console.log(`⏱️ Total time: ${Date.now() - startTime}ms`);
    console.log("========================================\n");

    // Return streaming response - use toTextStreamResponse() for AI SDK v5
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("\n========== CHAT API ERROR ==========");
    console.error("Time:", new Date().toISOString());
    console.error("Error Type:", error?.constructor?.name || "Unknown");
    console.error("Error Message:", error?.message || "No message");
    console.error("Error Stack:", error?.stack || "No stack trace");

    // Check for specific error types
    if (
      error?.message?.includes("API key") ||
      error?.message?.includes("authentication")
    ) {
      console.error("🔑 API Key Error detected");
      return new Response(
        JSON.stringify({
          error:
            "OpenAI API key is missing or invalid. Please check your .env.local file.",
          details: error.message,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (
      error?.message?.includes("rate limit") ||
      error?.message?.includes("quota")
    ) {
      console.error("⏱️ Rate Limit Error detected");
      return new Response(
        JSON.stringify({
          error: "OpenAI API rate limit exceeded. Please try again later.",
          details: error.message,
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    console.error("❌ Unexpected error occurred");
    console.error("========================================\n");

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
        details: error?.message || "Unknown error",
        type: error?.constructor?.name || "Error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
