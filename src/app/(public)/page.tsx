"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Search,
  DollarSign,
  Globe,
  BarChart3,
  Users,
  PenTool,
  Target,
  Rocket,
  Star,
  ArrowRight,
  Play,
  TrendingUp,
  Eye,
  Zap,
  Check,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => {
    if (target >= 1000000) return `${(v / 1000000).toFixed(1)}M`
    if (target >= 1000) return `${(v / 1000).toFixed(1)}K`
    return `${Math.round(v)}`
  })

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, { duration, ease: "easeOut" })
    return controls.stop
  }, [inView, target, count, duration])

  return (
    <span ref={ref} className="gradient-text text-5xl font-extrabold tracking-tight md:text-6xl">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */
function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 1, y: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("relative w-full", className)}
    >
      {children}
    </motion.section>
  )
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description:
      "Generate high-quality, SEO-optimized articles in seconds. Our AI understands your niche, tone, and audience to create content that ranks.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Real-time SEO scoring, keyword analysis, and content optimization. Automatically improve your content's search visibility with AI-driven suggestions.",
  },
  {
    icon: DollarSign,
    title: "Affiliate Revenue",
    description:
      "Seamlessly integrate affiliate links, track conversions, and maximize revenue. Smart link placement powered by AI for optimal click-through rates.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Publishing",
    description:
      "Publish to WordPress, Medium, Shopify, and 20+ platforms with one click. Automatic formatting and platform-specific optimization.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive analytics with real-time traffic, revenue, and engagement metrics. AI-powered insights to grow your audience faster.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite your team, assign roles, and collaborate in real-time. Built-in editorial workflow with approval chains and content calendars.",
  },
]

const steps = [
  {
    icon: PenTool,
    title: "Write with AI",
    description:
      "Describe your topic and let our AI generate a complete, well-researched article with proper structure, headings, and formatting.",
  },
  {
    icon: Target,
    title: "Optimize for SEO",
    description:
      "Our AI analyzes your content against 50+ ranking factors, suggests improvements, and automatically optimizes meta tags, headers, and keywords.",
  },
  {
    icon: Rocket,
    title: "Publish Everywhere",
    description:
      "One click to publish across all your connected platforms. Automatic formatting, scheduling, and distribution to maximize reach.",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Content",
    company: "TechFlow",
    quote:
      "GhostOps transformed our content pipeline. We went from publishing 5 articles a month to 50, with better SEO scores across the board.",
    initials: "SC",
    color: "bg-violet-500",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder",
    company: "ContentScale",
    quote:
      "The AI writing quality is incredible. Our organic traffic increased 340% in just 3 months. The affiliate integration alone pays for the platform.",
    initials: "MR",
    color: "bg-fuchsia-500",
  },
  {
    name: "Emily Watson",
    role: "Marketing Director",
    company: "SaaS Weekly",
    quote:
      "Finally, a publishing platform that understands scale. The multi-platform publishing and analytics have saved us 20+ hours per week.",
    initials: "EW",
    color: "bg-purple-500",
  },
]

const stats = [
  { value: 10000000, suffix: "+", label: "Articles Published" },
  { value: 50000, suffix: "+", label: "Active Users" },
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 2000000, prefix: "$", suffix: "+", label: "Revenue Generated" },
]

const logos = ["TechCrunch", "Forbes", "Wired", "The Verge", "Mashable", "ProductHunt"]

const integrations = [
  { name: "WordPress", color: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
  { name: "Medium", color: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30" },
  { name: "Shopify", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { name: "Notion", color: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30" },
  { name: "Slack", color: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  { name: "Zapier", color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  { name: "HubSpot", color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  { name: "Mailchimp", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
]

const pricingPlans = [
  {
    name: "Starter",
    price: 29,
    yearlyPrice: 23,
    description: "Perfect for solo creators getting started with AI publishing.",
    popular: false,
    features: [
      "5 AI articles/month",
      "Basic SEO tools",
      "1 team member",
      "5GB storage",
      "Email support",
      "1 publishing platform",
    ],
  },
  {
    name: "Pro",
    price: 79,
    yearlyPrice: 63,
    description: "For growing teams that need advanced tools and more capacity.",
    popular: true,
    features: [
      "50 AI articles/month",
      "Advanced SEO suite",
      "5 team members",
      "50GB storage",
      "Priority support",
      "Affiliate manager",
    ],
  },
  {
    name: "Business",
    price: 199,
    yearlyPrice: 159,
    description: "For large teams and agencies scaling content operations.",
    popular: false,
    features: [
      "Unlimited AI articles",
      "Full SEO suite",
      "25 team members",
      "500GB storage",
      "24/7 support",
      "White label & API access",
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Stagger container                                                  */
/* ------------------------------------------------------------------ */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function LandingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground dark">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[160px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[160px]" />
      </div>

      {/* ============================================================ */}
      {/*  1 - HERO                                                     */}
      {/* ============================================================ */}
      <Section className="relative flex min-h-[100vh] items-center justify-center px-4 pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
              <Zap className="h-3.5 w-3.5" />
              Now with GPT-4o &amp; Claude&nbsp;3.5 integration
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="gradient-text text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            >
              AI-Powered Publishing at Scale
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Transform your content workflow with AI that writes, optimizes, and publishes.
              Generate SEO-perfect articles, manage affiliate revenue, and scale across
              platforms&nbsp;&mdash; all from one dashboard.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-full bg-violet-600 px-8 text-base font-semibold hover:bg-violet-500">
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-border/60 px-8 text-base font-semibold hover:border-violet-500/50 hover:bg-violet-500/5"
              >
                <Link href="/demo">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating UI mockup cards */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[480px] w-full">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute left-8 top-8 w-72 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Traffic Overview</span>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-foreground">12.4K</p>
                <p className="text-sm text-muted-foreground">views today</p>
                <div className="mt-4 flex gap-1">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-violet-500/60"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* SEO card */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute right-4 top-0 w-56 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
              >
                <span className="text-xs font-medium text-muted-foreground">SEO Score</span>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-bold text-emerald-400">94</span>
                  <span className="mb-1 text-sm text-muted-foreground">/100</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />
                </div>
              </motion.div>

              {/* Revenue card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 right-12 w-60 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Revenue</span>
                  <DollarSign className="h-4 w-4 text-amber-400" />
                </div>
                <p className="text-3xl font-bold text-foreground">$2,340</p>
                <p className="mt-1 text-sm text-emerald-400">+18.2% this week</p>
              </motion.div>

              {/* Small floating badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-24 left-0 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
              >
                <Eye className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-medium">3 articles published</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  2 - LOGOS / TRUST                                            */}
      {/* ============================================================ */}
      <Section className="border-y border-border/40 py-12">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mb-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by 10,000+ publishers worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((name) => (
              <span
                key={name}
                className="select-none text-xl font-bold tracking-tight text-foreground/40 transition-opacity duration-300 hover:text-foreground/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  3 - FEATURES GRID                                           */}
      {/* ============================================================ */}
      <Section className="py-24 sm:py-32" id="features">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="gradient-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Everything You Need to Publish
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A complete AI-powered publishing suite that handles content creation, optimization, distribution, and monetization.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group relative rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/40 hover:shadow-[0_0_40px_-12px_hsl(263_70%_50%/0.3)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition-colors group-hover:bg-violet-500/20">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  3.5 - DEMO VIDEO (NEW)                                      */}
      {/* ============================================================ */}
      <Section className="py-24 sm:py-32" id="demo">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <h2 className="gradient-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              See GhostOps in Action
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Watch how GhostOps transforms your content workflow from idea to published article in minutes, not hours.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative mx-auto max-w-4xl cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-zinc-900 via-zinc-800/80 to-zinc-900 shadow-2xl shadow-violet-500/5"
          >
            {/* Aspect ratio wrapper */}
            <div className="relative aspect-video w-full">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-fuchsia-600/10" />

              {/* Fake UI elements in the background */}
              <div className="absolute inset-6 flex flex-col gap-3 opacity-30">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="h-4 w-48 rounded bg-white/10" />
                <div className="flex flex-1 gap-4">
                  <div className="w-48 space-y-2 rounded-lg bg-white/5 p-3">
                    <div className="h-3 w-full rounded bg-white/10" />
                    <div className="h-3 w-3/4 rounded bg-white/10" />
                    <div className="h-3 w-1/2 rounded bg-white/10" />
                  </div>
                  <div className="flex-1 space-y-2 rounded-lg bg-white/5 p-3">
                    <div className="h-3 w-full rounded bg-white/10" />
                    <div className="h-3 w-5/6 rounded bg-white/10" />
                    <div className="h-3 w-4/6 rounded bg-white/10" />
                    <div className="h-3 w-full rounded bg-white/10" />
                    <div className="h-3 w-3/4 rounded bg-white/10" />
                  </div>
                </div>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/20 bg-violet-600/90 shadow-2xl shadow-violet-600/40 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 group-hover:bg-violet-500/90 group-hover:shadow-violet-500/50"
                >
                  <Play className="ml-1 h-8 w-8 fill-white text-white" />
                </motion.div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                2:34
              </div>
            </div>
          </motion.div>

          {/* Setup time stat */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-2 text-muted-foreground"
          >
            <Clock className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium">Average setup time: <span className="text-foreground">5 minutes</span></span>
          </motion.div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  4 - STATS                                                    */}
      {/* ============================================================ */}
      <Section className="border-y border-border/40 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              {stat.value === 99.9 ? (
                <span className="gradient-text text-5xl font-extrabold tracking-tight md:text-6xl">
                  99.9%
                </span>
              ) : (
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={2.5}
                />
              )}
              <span className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  4.5 - INTEGRATIONS (NEW)                                    */}
      {/* ============================================================ */}
      <Section className="py-24 sm:py-32" id="integrations">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <h2 className="gradient-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Connects With Your Favorite Tools
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Seamlessly integrate with the platforms you already use. Publish, sync, and automate across your entire stack.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {integrations.map((integration) => (
              <motion.div
                key={integration.name}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -4 }}
                className={cn(
                  "flex items-center justify-center rounded-xl border px-6 py-5 text-center font-semibold transition-all duration-300 backdrop-blur-sm cursor-default",
                  integration.color
                )}
              >
                {integration.name}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center text-sm font-medium text-muted-foreground"
          >
            <span className="text-violet-400">20+ integrations</span> and counting
          </motion.p>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  5 - HOW IT WORKS                                             */}
      {/* ============================================================ */}
      <Section className="py-24 sm:py-32" id="how-it-works">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="gradient-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Three simple steps to transform your publishing workflow.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative grid gap-12 md:grid-cols-3"
          >
            {/* Connector line (desktop) */}
            <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent md:block" />

            {steps.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} className="relative flex flex-col items-center text-center">
                {/* Numbered circle */}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-violet-500/50 bg-background shadow-[0_0_30px_-6px_hsl(263_70%_50%/0.4)]">
                  <step.icon className="h-7 w-7 text-violet-400" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  6 - TESTIMONIALS                                             */}
      {/* ============================================================ */}
      <Section className="py-24 sm:py-32" id="testimonials">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="gradient-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Join thousands of publishers who have transformed their content workflow.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="group relative rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-lg"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white",
                      t.color
                    )}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  6.5 - PRICING PREVIEW (NEW)                                 */}
      {/* ============================================================ */}
      <Section className="py-24 sm:py-32" id="pricing">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="gradient-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Choose the plan that scales with your publishing needs. Start free, upgrade anytime.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  !isYearly ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={cn(
                  "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isYearly ? "bg-violet-600" : "bg-muted"
                )}
                role="switch"
                aria-checked={isYearly}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300",
                    isYearly ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  isYearly ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Annual
              </span>
              <AnimatePresence>
                {isYearly && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1, x: 0 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20">
                      Save 20%
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3"
          >
            {pricingPlans.map((plan) => {
              const displayPrice = isYearly ? plan.yearlyPrice : plan.price
              return (
                <motion.div
                  key={plan.name}
                  variants={fadeUp}
                  className={cn(
                    "relative rounded-2xl p-[1px]",
                    plan.popular
                      ? "bg-gradient-to-b from-violet-500 via-violet-500/50 to-violet-500/0"
                      : ""
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-violet-600 text-white border-0 shadow-lg shadow-violet-600/25 px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div
                    className={cn(
                      "relative h-full rounded-2xl p-6 flex flex-col",
                      "bg-background/70 backdrop-blur-xl border",
                      plan.popular
                        ? "border-violet-500/50 shadow-xl shadow-violet-500/10"
                        : "border-border/50",
                      plan.popular && "scale-[1.02] lg:scale-105"
                    )}
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          ${displayPrice}
                        </span>
                        <span className="text-muted-foreground text-sm">/mo</span>
                      </div>
                      {isYearly && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Billed annually (${displayPrice * 12}/yr)
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check
                            className={cn(
                              "h-4 w-4 mt-0.5 shrink-0",
                              plan.popular ? "text-violet-400" : "text-muted-foreground"
                            )}
                          />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      className={cn(
                        "w-full",
                        plan.popular
                          ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/25"
                          : ""
                      )}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Enterprise CTA + full pricing link */}
          <div className="mt-10 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Need more? <Link href="/contact" className="text-violet-400 hover:text-violet-300 font-medium underline underline-offset-4">Contact us for Enterprise pricing</Link>
            </p>
            <p>
              <Link href="/pricing" className="inline-flex items-center gap-1 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                View full pricing details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  7 - CTA                                                      */}
      {/* ============================================================ */}
      <Section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-fuchsia-600/10 px-6 py-16 text-center backdrop-blur-sm sm:px-12">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={fadeUp}
                className="gradient-text mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              >
                Ready to Transform Your Publishing?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground"
              >
                Join 50,000+ publishers who are already using GhostOps to create, optimize, and scale their content.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Button asChild size="lg" className="rounded-full bg-violet-600 px-10 text-base font-semibold hover:bg-violet-500">
                  <Link href="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-4 text-sm text-muted-foreground">
                No credit card required. 14-day free trial.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  )
}
