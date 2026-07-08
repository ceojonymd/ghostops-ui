"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Search,
  DollarSign,
  Globe,
  BarChart3,
  Users,
  Zap,
  Code,
  Check,
  ArrowRight,
  TrendingUp,
  FileText,
  Link2,
  Share2,
  PieChart,
  Shield,
  Clock,
  Webhook,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const features = [
  {
    icon: Sparkles,
    title: "AI Content Engine",
    tagline: "Write 10x faster with AI that understands your brand",
    description:
      "Our AI engine learns your brand voice, writing style, and audience preferences. Generate complete articles, product reviews, listicles, and how-to guides that sound authentically you.",
    bullets: [
      "Brand voice training & consistency",
      "50+ content templates",
      "Multi-language support (30+ languages)",
      "Plagiarism-free guarantee",
    ],
  },
  {
    icon: Search,
    title: "Advanced SEO Suite",
    tagline: "Rank higher with AI-powered SEO optimization",
    description:
      "Real-time SEO analysis powered by machine learning. Get actionable recommendations, keyword suggestions, and content optimization that actually moves the needle.",
    bullets: [
      "Real-time SEO score (0-100)",
      "Keyword research & clustering",
      "Competitor content analysis",
      "Schema markup automation",
    ],
  },
  {
    icon: DollarSign,
    title: "Affiliate Revenue Engine",
    tagline: "Monetize every article with smart affiliate links",
    description:
      "Automatically identify monetization opportunities in your content. Our AI places affiliate links naturally, tracks conversions, and optimizes placement for maximum revenue.",
    bullets: [
      "Auto-link placement with AI",
      "50+ affiliate network integrations",
      "Revenue attribution & analytics",
      "A/B testing for link placement",
    ],
  },
  {
    icon: Globe,
    title: "Multi-Platform Publishing",
    tagline: "One click to publish everywhere",
    description:
      "Connect all your publishing channels and distribute content with a single click. Automatic formatting ensures your content looks perfect on every platform.",
    bullets: [
      "WordPress, Medium, Ghost, Shopify",
      "Webflow, HubSpot, Custom CMS",
      "Social media auto-posting",
      "Platform-specific formatting",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    tagline: "Data-driven decisions with AI-powered analytics",
    description:
      "Comprehensive analytics dashboard with AI-generated insights. Track traffic, engagement, revenue, and SEO performance across all your content and platforms.",
    bullets: [
      "Real-time traffic & engagement",
      "Revenue tracking per article",
      "AI-generated growth insights",
      "Custom report builder",
    ],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    tagline: "Scale your team with built-in workflows",
    description:
      "Enterprise-grade collaboration tools built for content teams. Assign roles, manage approvals, and maintain quality at scale with automated editorial workflows.",
    bullets: [
      "Role-based access control",
      "Editorial approval workflows",
      "Content calendar & scheduling",
      "Real-time collaborative editing",
    ],
  },
  {
    icon: Zap,
    title: "Automation & Workflows",
    tagline: "Automate your entire content pipeline",
    description:
      "Build custom automation workflows that handle repetitive tasks. From content generation to publishing to social promotion — put your content pipeline on autopilot.",
    bullets: [
      "Visual workflow builder",
      "Trigger-based automation",
      "Scheduled publishing",
      "Auto social media promotion",
    ],
  },
  {
    icon: Code,
    title: "API & Integrations",
    tagline: "Build custom solutions with our powerful API",
    description:
      "Full REST and GraphQL API access for custom integrations. Connect InkFleet with your existing tech stack and build custom workflows tailored to your business.",
    bullets: [
      "REST & GraphQL API",
      "Webhooks for real-time events",
      "SDKs for Python, Node, Go",
      "99.9% API uptime SLA",
    ],
  },
];

const integrations = [
  "WordPress",
  "Shopify",
  "Medium",
  "Ghost",
  "Webflow",
  "HubSpot",
  "Zapier",
  "Slack",
  "Google Analytics",
  "Ahrefs",
  "SEMrush",
  "Mailchimp",
  "Stripe",
  "AWS",
  "GitHub",
  "Notion",
];

/* -------------------------------------------------------------------------- */
/*  Mockup Mini-icons for each feature                                        */
/* -------------------------------------------------------------------------- */

const mockupIcons: Record<number, React.ElementType[]> = {
  0: [FileText, Sparkles, TrendingUp],
  1: [Search, TrendingUp, BarChart3],
  2: [DollarSign, Link2, PieChart],
  3: [Globe, Share2, FileText],
  4: [BarChart3, PieChart, TrendingUp],
  5: [Users, Shield, Clock],
  6: [Zap, Clock, Webhook],
  7: [Code, Webhook, Shield],
};

/* -------------------------------------------------------------------------- */
/*  Animated Section Wrapper                                                  */
/* -------------------------------------------------------------------------- */

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature Mockup (glassmorphism dashboard preview)                          */
/* -------------------------------------------------------------------------- */

function FeatureMockup({
  index,
  feature,
}: {
  index: number;
  feature: (typeof features)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const icons = mockupIcons[index] || [FileText, TrendingUp, BarChart3];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
      }
      transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-fuchsia-600/20 rounded-2xl" />
      <div className="absolute -inset-1 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl" />

      {/* Glass container */}
      <div className="relative h-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4">
        {/* Mockup top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="h-5 w-32 bg-white/[0.06] rounded-md" />
          <div className="h-5 w-5 rounded bg-white/[0.06]" />
        </div>

        {/* Mini stat cards row */}
        <div className="grid grid-cols-3 gap-3">
          {icons.map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-3 space-y-2"
            >
              <Icon className="h-4 w-4 text-violet-400" />
              <div className="h-5 w-12 bg-white/[0.1] rounded" />
              <div className="h-2 w-16 bg-white/[0.06] rounded" />
            </motion.div>
          ))}
        </div>

        {/* Progress bars */}
        <div className="space-y-3 flex-1">
          {[75, 58, 90, 42].map((width, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
              className="space-y-1.5"
            >
              <div className="flex justify-between">
                <div
                  className="h-2 bg-white/[0.08] rounded"
                  style={{ width: `${30 + i * 12}%` }}
                />
                <div className="h-2 w-8 bg-white/[0.06] rounded" />
              </div>
              <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${width}%` } : { width: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.8 + i * 0.1,
                    ease: "easeOut",
                  }}
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom mini action bar */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-8 flex-1 bg-violet-600/20 border border-violet-500/20 rounded-lg" />
          <div className="h-8 w-8 bg-white/[0.06] rounded-lg" />
          <div className="h-8 w-8 bg-white/[0.06] rounded-lg" />
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature Section (alternating layout)                                      */
/* -------------------------------------------------------------------------- */

function FeatureSection({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const isEven = index % 2 === 1;
  const Icon = feature.icon;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid gap-12 lg:gap-20 lg:grid-cols-2 items-center",
            isEven && "lg:[direction:rtl]"
          )}
        >
          {/* Image / Mockup side */}
          <div className={cn(isEven && "lg:[direction:ltr]")}>
            <FeatureMockup index={index} feature={feature} />
          </div>

          {/* Text side */}
          <div className={cn("space-y-6", isEven && "lg:[direction:ltr]")}>
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/20 px-4 py-1.5 text-sm font-medium text-violet-400">
                <Icon className="h-4 w-4" />
                {feature.title}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 leading-tight">
                {feature.tagline}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <ul className="space-y-3 pt-2">
                {feature.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + i * 0.08,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-3 text-zinc-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
                      <Check className="h-3 w-3" />
                    </span>
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function FeaturesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const intRef = useRef<HTMLDivElement>(null);
  const intInView = useInView(intRef, { once: true, margin: "-80px" });

  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute top-[40%] right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/[0.05] blur-[100px]" />
        <div className="absolute bottom-[20%] left-0 h-[400px] w-[400px] rounded-full bg-purple-600/[0.06] blur-[100px]" />
      </div>

      {/* ================================================================== */}
      {/*  Hero                                                              */}
      {/* ================================================================== */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div
          ref={heroRef}
          className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              <span className="gradient-text">
                Everything You Need to Publish at Scale
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Powerful AI tools, seamless integrations, and enterprise-grade
            analytics &mdash; all in one platform.
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={heroInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-12 h-px w-48 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
          />
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Feature Sections (alternating)                                    */}
      {/* ================================================================== */}
      {features.map((feature, index) => (
        <FeatureSection key={feature.title} feature={feature} index={index} />
      ))}

      {/* ================================================================== */}
      {/*  Integration Logos                                                 */}
      {/* ================================================================== */}
      <section className="relative py-24 sm:py-32">
        <div
          ref={intRef}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
              Integrates with your favorite tools
            </h2>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            animate={intInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04 } },
            }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
          >
            {integrations.map((name) => (
              <motion.div
                key={name}
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-5 transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 cursor-default"
              >
                <span className="text-sm font-medium text-zinc-500 transition-colors duration-300 group-hover:text-zinc-200">
                  {name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Bottom CTA                                                        */}
      {/* ================================================================== */}
      <section className="relative py-24 sm:py-32">
        <div
          ref={ctaRef}
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-32 flex justify-center">
            <div className="h-[300px] w-[600px] rounded-full bg-violet-600/[0.12] blur-[100px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              <span className="gradient-text">
                Ready to supercharge your publishing?
              </span>
            </h2>

            <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Start your free 14-day trial today. No credit card required.
            </p>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/25 text-base px-8 h-12 rounded-xl group"
              >
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
