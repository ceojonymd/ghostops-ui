"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PLANS } from "@/lib/constants"

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
  },
  {
    question: "What happens after my free trial?",
    answer:
      "After your 14-day trial, you'll be asked to choose a plan. No charges are made during the trial, and you won't lose any content if you need more time to decide.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee on all plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "Can I use my own AI models?",
    answer:
      "Enterprise plans support custom AI model integration. You can bring your own fine-tuned models or work with our team to create custom models tailored to your content needs.",
  },
  {
    question: "Is there a limit on team members?",
    answer:
      "Each plan has a team member limit as listed. Enterprise plans offer unlimited team members. You can always upgrade to add more seats.",
  },
  {
    question: "What platforms can I publish to?",
    answer:
      "InkFleet supports publishing to WordPress, Medium, Shopify, Ghost, Webflow, HubSpot, and 20+ other platforms. We're constantly adding new integrations.",
  },
]

const comparisonFeatures = [
  { name: "AI Articles/month", starter: "5", pro: "50", business: "Unlimited", enterprise: "Unlimited" },
  { name: "SEO Tools", starter: "Basic", pro: "Advanced", business: "Full Suite", enterprise: "Full Suite" },
  { name: "Team Members", starter: "1", pro: "5", business: "25", enterprise: "Unlimited" },
  { name: "Storage", starter: "5GB", pro: "50GB", business: "500GB", enterprise: "Unlimited" },
  { name: "Support Level", starter: "Email", pro: "Priority", business: "24/7", enterprise: "Dedicated" },
  { name: "Affiliate Manager", starter: false, pro: true, business: true, enterprise: true },
  { name: "Social Scheduling", starter: false, pro: true, business: true, enterprise: true },
  { name: "White Label", starter: false, pro: false, business: true, enterprise: true },
  { name: "API Access", starter: false, pro: false, business: true, enterprise: true },
  { name: "Custom Integrations", starter: false, pro: false, business: true, enterprise: true },
  { name: "Custom AI Models", starter: false, pro: false, business: false, enterprise: true },
  { name: "SLA", starter: false, pro: false, business: false, enterprise: true },
  { name: "SSO/SAML", starter: false, pro: false, business: false, enterprise: true },
  { name: "On-premise", starter: false, pro: false, business: false, enterprise: true },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[80px]" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Simple, Transparent Pricing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the plan that scales with your publishing needs. All plans
            include a 14-day free trial.
          </motion.p>

          {/* Monthly / Yearly Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center gap-4 mt-10"
          >
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
              Yearly
            </span>
            <AnimatePresence>
              {isYearly && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
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
          </motion.div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PLANS.map((plan, index) => {
            const isPopular = plan.popular
            const isEnterprise = plan.name === "Enterprise"
            const displayPrice = isYearly ? plan.yearlyPrice : plan.price

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: "easeOut",
                }}
                className={cn(
                  "relative rounded-2xl p-[1px]",
                  isPopular
                    ? "bg-gradient-to-b from-violet-500 via-violet-500/50 to-violet-500/0"
                    : ""
                )}
              >
                {isPopular && (
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
                    isPopular
                      ? "border-violet-500/50 shadow-xl shadow-violet-500/10"
                      : "border-border/50",
                    isPopular && "scale-[1.02] xl:scale-105"
                  )}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      {isEnterprise ? (
                        <span className="text-4xl font-bold text-foreground">
                          Custom
                        </span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-foreground">
                            ${displayPrice}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            /mo
                          </span>
                        </>
                      )}
                    </div>
                    {!isEnterprise && isYearly && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Billed annually (${displayPrice * 12}/yr)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4 mt-0.5 shrink-0",
                            isPopular
                              ? "text-violet-400"
                              : "text-muted-foreground"
                          )}
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={cn(
                      "w-full",
                      isPopular
                        ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/25"
                        : ""
                    )}
                    variant={isPopular ? "default" : "outline"}
                    size="lg"
                  >
                    {isEnterprise ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Feature Comparison</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/50 bg-background/70 backdrop-blur-xl">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-sm font-semibold text-foreground w-[200px]">
                    Feature
                  </th>
                  {PLANS.map((plan) => (
                    <th
                      key={plan.name}
                      className={cn(
                        "p-4 text-center text-sm font-semibold",
                        plan.popular ? "text-violet-400" : "text-foreground"
                      )}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr
                    key={feature.name}
                    className={cn(
                      "border-b border-border/30 transition-colors hover:bg-muted/30",
                      idx === comparisonFeatures.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="p-4 text-sm text-muted-foreground">
                      {feature.name}
                    </td>
                    {(
                      ["starter", "pro", "business", "enterprise"] as const
                    ).map((planKey) => {
                      const value = feature[planKey]
                      return (
                        <td key={planKey} className="p-4 text-center">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="h-4 w-4 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-foreground">
                              {value}
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className={cn(
                    "rounded-xl border transition-colors",
                    "bg-background/70 backdrop-blur-xl",
                    isOpen
                      ? "border-violet-500/30"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex items-center justify-between w-full p-5 text-left"
                  >
                    <span className="font-medium text-foreground pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
