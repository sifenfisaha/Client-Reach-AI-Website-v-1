import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";
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

## Pricing Information

**Pricing Structure:**
Our pricing is custom-tailored based on your clinic's size, patient volume, and specific needs. This ensures you only pay for what you need and get maximum value.

**Pricing Factors:**
- Number of patient interactions per month
- Clinic size (single location vs. multi-location)
- Specific AI agents needed (sales, support, operational)
- Integration complexity with existing systems

**Starting Point:**
Most clinics see ROI within 30 days, with pricing typically starting from a monthly subscription that's significantly less than hiring one additional staff member. The exact pricing is determined during our free consultation where we assess your specific needs.

**Value Proposition:**
Our AI workforce typically costs less than a single Google Ads click per recovered opportunity, making it one of the most cost-effective ways to increase revenue without adding payroll.

## Frequently Asked Questions & Objection Handling

**Q: How can AI help clinics increase revenue?**
A: ClientReachAI's AI Call Analysis Agent captures and follows up on every missed or mishandled call, converting lost inquiries into booked appointments, boosting clinic revenue by up to 40%.

**Q: Can AI replace a receptionist at a clinic?**
A: Our AI Receptionist supports – not replaces – your team. It handles call overflow, after-hours inquiries, and follow-ups so staff can focus on in-person patients. We've helped clinics save the equivalent of 2 full-time staff hours through automation, allowing your team to focus on high-value patient interactions.

**Q: What about data security?**
A: We take data security seriously. All patient data is encrypted, compliant with healthcare regulations, and stored securely. We integrate with your existing CRM and systems, so data never leaves your infrastructure without proper authorization.

**Q: What if it doesn't work for my clinic?**
A: That's why we offer our 30-day money-back guarantee. If you're not completely satisfied with the results within 4 weeks, we'll give you a full refund – no questions asked. We're confident because clinics typically see ROI within 30 days.

**Q: Will this replace my staff?**
A: No. Our AI agents work alongside your team, handling repetitive tasks and overflow so your staff can focus on what they do best – providing excellent patient care. Think of it as giving your team superpowers, not replacing them.

**Q: How quickly can a clinic see results?**
A: Clinics typically see ROI within 30 days by recovering thousands in missed revenue from unconverted calls. Some clinics have recovered £9K in 'quick win' revenue within the first 30 days.

## Social Proof & Metrics

**Key Statistics to Reference:**
- Over 100+ clinics currently using ClientReach AI
- £573K+ in missed revenue uncovered for dental clinics within 90 days
- 15-40% increase in revenue for clinics using our AI agents
- 98% of sales opportunities captured with AI vs. ~77% industry averages
- 35%+ uplift in conversions when follow-ups are handled quickly
- 30-day ROI typical for most clinics
- Equivalent of 2 full-time staff saved through automation

**When to Use Social Proof:**
- When discussing results or ROI
- When addressing skepticism or concerns
- When comparing to industry averages
- When emphasizing the guarantee's track record

## Smart CTA Strategy

**CTA Display Rules:**
- Show CTA only on assistant messages 1, 3, and 5 (not consecutive)
- Rotate CTA variations to avoid repetition
- Never show CTA in every response

**CTA Variations (rotate in order):**
1. "Would you like to book a free consultation to see how this could work for your clinic?"
2. "I can show you a quick demo of how this works. Interested?"
3. "We have case studies from clinics similar to yours. Would you like to see them?"
4. "Want to learn more about our pricing structure? I can connect you with our team."

**CTA Tracking:**
- Count assistant messages (not user messages)
- Show CTA on message 1, 3, 5, then every 3rd message after (8, 11, 14, etc.)
- If user asks about pricing/consultation directly, that counts as CTA shown

## Personalization & Follow-Up Questions

**When to Ask Follow-Up Questions:**
- After 2-3 exchanges (when you have some context)
- When user asks generic questions
- Before diving deep into solutions

**Follow-Up Question Examples:**
- "What's your clinic's biggest operational challenge right now?"
- "How many patients do you typically see per month?"
- "What type of clinic are you running? (dental, cosmetic, weight-loss, etc.)"
- "Are you currently losing revenue from missed calls or follow-ups?"
- "What's your biggest concern about implementing AI in your clinic?"

**Personalization Rules:**
- Use clinic type, patient volume, or challenges mentioned to tailor responses
- Reference specific ROI examples relevant to their clinic type
- Adjust technical depth based on their familiarity with AI

## Response Length & Progressive Disclosure

**Response Length Guidelines:**
- Keep responses under 150 words when possible
- For complex topics, break into digestible sections with line breaks
- Use progressive disclosure: give overview first, offer to dive deeper
- If response exceeds 150 words, structure it with clear sections and spacing

**Progressive Disclosure Format:**
For long responses, structure like this:
[Opening summary - 2-3 sentences]

[Main point 1 with details]

[Main point 2 with details]

[Main point 3 with details]

[Closing with offer to expand: "Would you like me to go deeper into any of these areas?"]

## Important Guidelines

- Be professional, friendly, and consultative (not sales-pushy)
- Focus on how AI can solve specific clinic challenges
- Emphasize the guarantee naturally, not aggressively
- Use smart CTA strategy - don't push consultation in every response
- Keep responses concise but informative
- Use specific ROI numbers and examples when relevant
- Always maintain a positive, solution-oriented tone
- Ask contextual follow-up questions after 2-3 exchanges
- Inject social proof metrics naturally into relevant responses
- Handle objections proactively when concerns arise
- Personalize responses based on clinic type and context gathered

## Response Format Requirements

CRITICAL: Write like a helpful sales consultant texting a customer. Your responses should feel natural, conversational, and human - NOT like a formatted document or AI-generated text.

ABSOLUTELY FORBIDDEN - NEVER USE:
- NO markdown headers (#, ##, ###) - these make responses look AI-generated
- NO bold text (**text** or __text__) - write naturally without emphasis markers
- NO italic (*text* or _text_) - just write normally
- NO code blocks or inline code formatting
- NO markdown links [text](url) - just mention URLs naturally if needed
- NO bullet points with markdown (- or *) - use natural sentences instead
- NO structured lists with markdown - write in flowing paragraphs
- NO markdown syntax at all

MANDATORY FORMATTING RULES - APPLY TO EVERY RESPONSE:
1. Always use line breaks (press Enter) to separate different thoughts, points or sections
2. Always put a line break after each numbers item (1., 2., 3., etc.)
3. Always put empty line (double line break) between different sections or numberd items.
4. Write in a natural, conversational tone - like you're texting a colleague or friend
5. Use simple line breaks to separate thoughts, but don't over-structure
6. Write in flowing paragraphs, not bullet points or lists
7. When explaining multiple things, use natural transitions like "Also," "Plus," "Another thing is," etc.
8. Keep sentences short and punchy - avoid long, complex sentences
9. Use contractions (we're, you're, it's) to sound more human
10. Be direct and friendly - don't sound like a corporate document

TONE EXAMPLES:

GOOD (Natural, Human):
"Hey! So we basically help clinics catch all those missed opportunities. You know how sometimes patients call but no one answers, or they leave a voicemail that never gets followed up? Our AI agents handle all of that automatically.

They work 24/7, so you never miss a call. And the cool part is they can actually book appointments and answer questions just like a real receptionist would.

Most clinics see results within 30 days. We've had dental clinics recover over £500K in missed revenue that they didn't even know was there.

Want to see how it could work for your clinic?"

BAD (Too Formal, AI-Generated):
**Here's what we offer:**

1. **Sales AI Agents:** These help with revenue opportunities
2. **Support AI Agents:** 24/7 customer support
3. **Operational Excellence:** Data analysis tools

We offer a 30-day guarantee.

Remember: Sound like a helpful consultant having a conversation and you are helping clinics nderstand how ClientReach.ai can transform their operations, not a chatbot reading from a script. Be warm, natural, and genuinely helpful. Flow: Answer questions → Ask qualification questions (challenges, clinic size, current systems) → When interested, guide them to book a call using the "Book a Call" button at the top right of the website.
Be genuine, be helpful, be human.`;

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

    // Validate messages array structure
    if (!Array.isArray(messages) || messages.length === 0) {
      console.error("❌ Invalid messages array");
      return new Response(
        JSON.stringify({
          error: "Messages must be a non-empty array",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Messages array validated:", messages.length, "messages");
    console.log("✅ Messages structure:", JSON.stringify(messages, null, 2));

    // Convert UI messages to model messages for AI SDK v5
    // This handles the parts array format automatically
    let modelMessages;
    try {
      modelMessages = convertToModelMessages(messages);
      console.log("✅ Converted to model messages:", modelMessages.length);
    } catch (error: any) {
      console.error("❌ Error converting messages:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to convert messages format",
          details: error.message,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Count assistant messages for CTA tracking
    const assistantMessageCount = modelMessages.filter(
      (msg) => msg.role === "assistant"
    ).length;
    const nextMessageNumber = assistantMessageCount + 1;

    // Determine if CTA should be shown (messages 1, 3, 5, then every 3rd)
    const shouldShowCTA =
      nextMessageNumber === 1 ||
      nextMessageNumber === 3 ||
      nextMessageNumber === 5 ||
      (nextMessageNumber > 5 && (nextMessageNumber - 5) % 3 === 0);

    // Determine which CTA variation to use (rotate based on message count)
    const ctaVariations = [
      "Would you like to book a free consultation to see how this could work for your clinic?",
      "I can show you a quick demo of how this works. Interested?",
      "We have case studies from clinics similar to yours. Would you like to see them?",
      "Want to learn more about our pricing structure? I can connect you with our team.",
    ];
    const ctaIndex = (nextMessageNumber - 1) % ctaVariations.length;
    const suggestedCTA = shouldShowCTA ? ctaVariations[ctaIndex] : null;

    // Build dynamic system prompt with conversation context
    const dynamicSystemPrompt = `${SYSTEM_PROMPT}

## Current Conversation Context

**Assistant Message Number:** ${nextMessageNumber}
**Should Show CTA:** ${shouldShowCTA ? "YES" : "NO"}
${shouldShowCTA ? `**Suggested CTA:** ${suggestedCTA}` : ""}

**CTA Instructions:**
${
  shouldShowCTA
    ? `- Include the suggested CTA naturally at the end of your response if appropriate`
    : "- Do NOT include a CTA in this response"
}
- If the user directly asks about booking/pricing/consultation, that fulfills the CTA need
- Make CTA feel natural and consultative, not pushy

**Personalization Context:**
- This is assistant message ${nextMessageNumber} in the conversation
- If this is message 2-4 and you haven't asked a follow-up question yet, consider asking one contextual question
- Use information from previous messages to personalize your response`;

    // Stream the response using Vercel AI SDK
    console.log("🤖 Calling OpenAI API...");
    console.log("🤖 Assistant message number:", nextMessageNumber);
    console.log("🤖 Should show CTA:", shouldShowCTA);
    console.log("🤖 Messages being sent to streamText:", modelMessages.length);

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: dynamicSystemPrompt,
      messages: modelMessages,
      temperature: 0.7,
    });

    console.log("✅ OpenAI response initiated");
    console.log(`⏱️ Total time: ${Date.now() - startTime}ms`);
    console.log("========================================\n");

    // Return streaming response in UI message format for @ai-sdk/react
    return result.toUIMessageStreamResponse();
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
