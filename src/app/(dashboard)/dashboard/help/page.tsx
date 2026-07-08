"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  FileText,
  Code,
  CreditCard,
  Headphones,
  Mail,
  MessageCircle,
  Users,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const quickLinks = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description:
      "Learn the basics of setting up your workspace and publishing your first article",
    bgColor: "bg-violet-100 dark:bg-violet-900/40",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: FileText,
    title: "Content Management",
    description:
      "Master content creation, editing, scheduling, and organization",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Search,
    title: "SEO Tools",
    description:
      "Optimize your content for search engines and track rankings",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: CreditCard,
    title: "Billing & Plans",
    description:
      "Manage subscriptions, payments, and understand plan features",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Code,
    title: "API Documentation",
    description:
      "Integrate InkFleet with your apps using our REST API",
    bgColor: "bg-rose-100 dark:bg-rose-900/40",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    icon: Headphones,
    title: "Contact Support",
    description:
      "Get help from our support team via email or live chat",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

const popularArticles = [
  {
    title: "How to Create Your First AI-Generated Article",
    category: "Getting Started",
  },
  {
    title: "Understanding SEO Scores and Recommendations",
    category: "SEO",
  },
  {
    title: "Setting Up WordPress Integration",
    category: "Integrations",
  },
  {
    title: "Managing Team Roles and Permissions",
    category: "Teams",
  },
  {
    title: "Configuring Automated Publishing Workflows",
    category: "Automation",
  },
  {
    title: "Using the Keyword Research Tool",
    category: "SEO",
  },
  {
    title: "Connecting Your Custom Domain",
    category: "Setup",
  },
  {
    title: "Billing FAQ and Plan Comparisons",
    category: "Billing",
  },
];

const faqItems = [
  {
    question: "What AI models does InkFleet use?",
    answer:
      "InkFleet integrates with multiple AI providers including OpenAI's GPT-4, Anthropic's Claude, and custom fine-tuned models. You can choose your preferred model in Settings.",
  },
  {
    question: "How does the SEO scoring work?",
    answer:
      "Our SEO engine analyzes over 50 ranking factors including keyword density, meta tags, readability, internal linking, and more. Scores are updated in real-time as you edit.",
  },
  {
    question: "Can I import existing content?",
    answer:
      "Yes! You can import content from WordPress, Medium, Ghost, and other platforms. We support bulk import via CSV and our API.",
  },
  {
    question: "What happens if I exceed my AI credits?",
    answer:
      "You'll receive a notification at 80% usage. If you exceed your limit, AI generation pauses until the next billing cycle, or you can purchase additional credits.",
  },
  {
    question: "How do I set up automated publishing?",
    answer:
      "Navigate to Automation in the sidebar, create a new workflow, set your triggers and conditions, and activate it. We support time-based, event-based, and AI-driven triggers.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use AES-256 encryption at rest, TLS 1.3 in transit, and are SOC 2 Type II certified. Your data is never used for AI training.",
  },
];

const categoryColors: Record<string, string> = {
  "Getting Started":
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  SEO: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Integrations:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Teams:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Automation:
    "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Setup:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  Billing:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 p-6 md:p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40">
          <HelpCircle className="h-7 w-7 text-violet-600 dark:text-violet-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Help Center
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find answers, guides, and support resources.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="mx-auto max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="How can we help?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 rounded-xl border-border bg-background pl-12 text-lg shadow-sm transition-shadow focus-visible:shadow-md focus-visible:ring-violet-500"
          />
        </div>
      </motion.div>

      {/* Quick Links Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <motion.div
              key={link.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group cursor-pointer border-border/50 bg-card transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:border-violet-800 dark:hover:shadow-violet-500/10">
                <CardContent className="flex items-start gap-4 p-6">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                      link.bgColor
                    )}
                  >
                    <link.icon className={cn("h-6 w-6", link.iconColor)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {link.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-500" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Separator />

      {/* Popular Articles */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Popular Articles
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {popularArticles.map((article) => (
            <motion.div
              key={article.title}
              whileHover={{ x: 4 }}
              className="group cursor-pointer rounded-lg border border-transparent p-4 transition-colors hover:border-border hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-violet-500" />
                <span className="flex-1 text-sm font-medium text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400">
                  {article.title}
                </span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "shrink-0 text-xs font-normal",
                    categoryColors[article.category] || ""
                  )}
                >
                  {article.category}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Separator />

      {/* Contact Section */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Email Support */}
          <Card className="border-border/50 bg-card text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40">
                <Mail className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <CardTitle className="text-lg">Email Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                support@inkfleet.com
              </p>
              <p className="text-xs text-muted-foreground">
                Response within 24 hours
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </CardContent>
          </Card>

          {/* Live Chat */}
          <Card className="border-violet-200 bg-card text-center dark:border-violet-800">
            <CardHeader className="pb-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40">
                <MessageCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Online
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Average wait: 2 minutes
              </p>
              <Button
                size="sm"
                className="w-full bg-violet-600 text-white hover:bg-violet-700"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </CardContent>
          </Card>

          {/* Community Forum */}
          <Card className="border-border/50 bg-card text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40">
                <Users className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <CardTitle className="text-lg">Community Forum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                5,200+ members
              </p>
              <p className="text-xs text-muted-foreground">
                Join discussions and share knowledge
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Forum
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <Separator />

      {/* FAQ Section */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="overflow-hidden rounded-lg border border-border/50 bg-card transition-colors hover:border-border"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="pr-4 font-medium text-foreground">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3, ease: "easeOut" },
                        opacity: { duration: 0.25, delay: 0.05 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3, ease: "easeIn" },
                        opacity: { duration: 0.2 },
                      },
                    }}
                  >
                    <div className="border-t border-border/50 px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
