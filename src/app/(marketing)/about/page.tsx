import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Cpu, Briefcase, Rocket } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

const TeamMember: React.FC<{ name: string; role: string; desc: string; }> = ({ name, role, desc }) => (
  <div className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 dark:bg-dark-card p-8 rounded-3xl border border-gray-100 dark:border-dark-border">
    <div className="w-full md:w-1/3 aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative group">
       {/* Placeholder for real image */}
       <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-300 dark:bg-gray-800">
          <img src={`https://picsum.photos/400/500?random=${name.replace(' ', '')}`} alt={name} className="object-cover w-full h-full opacity-90 transition-opacity hover:opacity-100" />
       </div>
    </div>
    <div className="w-full md:w-2/3">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
      <p className="text-brand-500 font-medium mb-4">{role}</p>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
        {desc}
      </p>
    </div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Consultation Intro */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-brand-50 to-white dark:from-dark-card dark:to-dark-bg border-b border-gray-100 dark:border-dark-border">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Consultation
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Book a consultation with the Client Reach AI founders and see how a smart AI team can help your clinic, from catching every lead to answering patient questions, follow-ups, and bookings automatically. In one call, we'll show you exactly where AI can bring back missed revenue, make your front desk run smoothly, and ease pressure on your staff.
              </p>
              <Link href="/discover" className="inline-block px-8 py-3 bg-brand-500 text-white font-medium rounded-full hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">
                  Get Your Free Consultation
              </Link>
          </div>
        </FadeIn>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
               <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Client Reach AI was founded by Alfie Tilson and Mahbhir Mahmud — two young entrepreneurs on a mission to help clinics unlock the full power of AI. Client Reach AI builds smart systems made for clinics. They handle enquiries, follow-ups, lead checks, and recover missed revenue — keeping everything running smoothly. This boosts bookings and sales without needing more staff, so you can focus on great treatments while AI handles the rest.
               </p>
          </div>
        </FadeIn>

        {/* Mission / Vision Cards */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card title="Mission" description="At Client Reach AI, we give clinics smart digital workers that relieve teams hours of manual repetitive tasks whilst increasing revenue and scaling their business. They take care of admin, follow-ups, patient messages, and revenue tasks, helping your clinic grow while your team focuses on what matters most: amazing patient care." className="bg-brand-50/50 dark:bg-brand-900/10">
            </Card>
            <Card title="Vision" description="We believe clinics should have AI teams that work smoothly alongside their staff, improving patient experience, saving time, and helping the clinic grow. This means clinicians can focus on treatments, while smart AI handles enquiries, follow-ups, admin, and revenue tasks in the background." className="bg-blue-50/50 dark:bg-blue-900/10">
            </Card>
          </div>
        </FadeIn>

        {/* What We Do */}
        <FadeIn>
          <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card title="Digital Workers" description="We deliver fully integrated teams of intelligent AI agents — digital workers designed to collaborate, automate, and scale across every area of your clinic." icon={<Cpu size={24}/>} />
                  <Card title="Managed AI Agents" description="We handle the setup, onboarding, optimisation, and ongoing management of your digital workforce — ensuring your AI agents perform seamlessly and deliver measurable results." icon={<Briefcase size={24}/>} />
                  <Card title="AI Activate" description="We help clinics cut through the complexity and confidently adopt AI through guided strategy, piloting, and implementation." icon={<Rocket size={24}/>} />
              </div>
          </div>
        </FadeIn>

        {/* Founders */}
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Meet the Co-Founders</h2>
          <div className="space-y-8">
            <TeamMember 
              name="Alfie Tilson"
              role="Co-Founder"
              desc="Alfie Tilson, Co-Founder of Client Reach AI, is a driven entrepreneur specialising in business efficiency and optimisation. With a passion for connecting businesses to the transformative power of AI, Alfie leads the company's growth strategy, helping clients across sectors streamline operations, enhance customer engagement, and scale efficiently through intelligent automation."
            />
            <TeamMember 
              name="Mahbhir Mahmud"
              role="CEO & Co-Founder"
              desc="Mahbhir Mahmud, Co-Founder of Client Reach AI, oversees operations and AI development, ensuring the seamless delivery of intelligent automation solutions for clients. With a deep understanding of emerging technologies and business systems, Mahbhir leads the design and implementation of AI workforces that help organisations operate more efficiently, scale faster, and achieve measurable results across multiple sectors."
            />
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
