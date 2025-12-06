import { FadeIn } from "@/components/ui/fade-in";

export const ComparisonSection = () => (
  <section className="py-20 bg-white dark:bg-dark-bg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2">
          <FadeIn direction="left">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider mb-2">
              AI Tools Automate Tasks
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              An AI Workforce Transforms Clinics
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Most AI tools and chatbots can only do one small job. But in a
                clinic, missing a call or replying too slowly can mean losing a
                patient to another clinic.
              </p>
              <p>
                That's why you need a team of AI systems that work together,
                helping with reception, follow-ups, patient messages, and
                after-care.
              </p>
              <p>
                This isn't just basic automation. It's smart AI that learns,
                works across your whole clinic, and helps you grow, get more
                patients saying yes, and keep everything running smoothly.
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-3 bg-gray-50 dark:bg-dark-card p-2 rounded-3xl border border-gray-100 dark:border-dark-border relative overflow-hidden">
          <FadeIn direction="right" className="h-full">
            <div className="w-full h-full">
              <img
                src="/tools_dis.png"
                alt="AI Workforce vs Traditional AI Tools - Multi-skilled AI agents working together to transform clinic operations"
                className="w-full h-auto rounded-xl"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);
