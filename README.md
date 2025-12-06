# ClientReach.ai - AI Workforce for Clinics

AI-powered client acquisition and lead generation platform for aesthetic, dental, and healthcare clinics.

## Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase
- **AI**: OpenAI (via Vercel AI SDK)
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (package manager)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
pnpm dev
```

### Environment Variables

Required environment variables (add to `.env.local`):

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://clientreach.ai

# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_GOOGLE_VERIFICATION=...
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Marketing pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── layout/            # Layout components
│   ├── ui/                # UI components
│   └── seo/               # SEO components
├── lib/                   # Utilities and services
│   ├── supabase/         # Supabase client and services
│   └── analytics.ts      # Analytics utilities
└── contexts/              # React contexts
```

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Features

- ✅ AI-powered chatbot
- ✅ Newsletter subscription
- ✅ Weekly Insider form
- ✅ Calendly integration
- ✅ Dark/Light theme
- ✅ SEO optimized
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling

## SEO

Comprehensive SEO implementation including:

- Dynamic sitemap
- Robots.txt
- Structured data (JSON-LD)
- Open Graph tags
- Twitter Cards
- Meta optimization

See `SEO_IMPLEMENTATION.md` for details.

## License

Private - ClientReach.ai
