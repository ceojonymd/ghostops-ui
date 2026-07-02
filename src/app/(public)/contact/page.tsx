"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as React from "react";

// ── Inline Accordion (Radix-free) ──────────────────────────────────
function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="text-sm md:text-base font-medium text-zinc-200 group-hover:text-violet-300 transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-violet-400" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm text-zinc-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "What is GhostOps and how does it work?",
    answer:
      "GhostOps is an AI-powered autonomous operations platform that deploys intelligent agents to handle complex workflows. Our agents integrate with your existing tools and systems, learning your processes to automate repetitive tasks while keeping humans in the loop for critical decisions.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "Most teams are up and running within 24 hours. Our onboarding process includes a guided setup wizard, pre-built templates for common workflows, and dedicated support to help you configure your first AI agents. Enterprise deployments with custom integrations typically take 1-2 weeks.",
  },
  {
    question: "Is my data secure with GhostOps?",
    answer:
      "Absolutely. We are SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest and in transit using AES-256 encryption. We offer data residency options, role-based access controls, and complete audit logging. Enterprise plans include dedicated infrastructure and custom security configurations.",
  },
  {
    question: "Can I integrate GhostOps with my existing tools?",
    answer:
      "Yes, GhostOps integrates with 200+ popular tools out of the box, including Slack, Jira, GitHub, Salesforce, HubSpot, and many more. We also provide a robust API and webhook system for custom integrations. Our marketplace features community-built connectors for niche tools.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer tiered support based on your plan. All users get access to our comprehensive documentation, community forum, and email support. Pro plans include priority support with 4-hour response times. Enterprise customers receive dedicated account managers, 24/7 phone support, and custom SLAs.",
  },
];

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/ghostops", icon: "𝕏" },
  { name: "GitHub", href: "https://github.com/ghostops", icon: "GH" },
  { name: "LinkedIn", href: "https://linkedin.com/company/ghostops", icon: "in" },
  { name: "YouTube", href: "https://youtube.com/@ghostops", icon: "YT" },
];

const subjects = [
  "General Inquiry",
  "Sales & Pricing",
  "Technical Support",
  "Partnership",
  "Press & Media",
  "Other",
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Have a question, want a demo, or just want to say hello? We would
            love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-5 gap-8 mb-20">
          {/* Contact Form — left 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-violet-400" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-zinc-300 text-sm">
                        Name
                      </Label>
                      <Input
                        id="name"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500 focus:ring-violet-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300 text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500 focus:ring-violet-500/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-zinc-300 text-sm">
                      Subject
                    </Label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/20"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-zinc-300 text-sm">
                      Message
                    </Label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/20 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : isSubmitted ? (
                      "Message Sent!"
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar — right 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Info */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-600/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">Email</p>
                    <a
                      href="mailto:support@ghostops.ai"
                      className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      support@ghostops.ai
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-600/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">Address</p>
                    <p className="text-sm text-zinc-500">
                      123 AI Street
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-600/10 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">
                      Business Hours
                    </p>
                    <p className="text-sm text-zinc-500">
                      Mon - Fri: 9:00 AM - 6:00 PM PST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-800/50 hover:bg-violet-600/10 border border-zinc-700/50 hover:border-violet-500/30 transition-all text-sm text-zinc-400 hover:text-violet-300"
                    >
                      <span className="text-xs font-bold w-6 text-center">
                        {social.icon}
                      </span>
                      {social.name}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <div className="rounded-lg border border-violet-500/20 bg-violet-950/20 p-4 text-center">
              <p className="text-sm text-violet-300 font-medium mb-1">
                Average Response Time
              </p>
              <p className="text-2xl font-bold text-white">&lt; 4 hours</p>
              <p className="text-xs text-zinc-500 mt-1">
                During business hours
              </p>
            </div>
          </motion.div>
        </div>

        <Separator className="bg-zinc-800 mb-16" />

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-zinc-500 text-center mb-10">
            Quick answers to common questions about GhostOps.
          </p>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-6">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onToggle={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
