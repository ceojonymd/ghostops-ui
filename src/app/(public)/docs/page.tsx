"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  Search,
  BarChart3,
  Code,
  Plug,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavItem {
  label: string;
  slug: string;
}

interface NavSection {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

interface TocEntry {
  id: string;
  label: string;
  level: number;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const navSections: NavSection[] = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { label: "Introduction", slug: "introduction" },
      { label: "Quick Start", slug: "quick-start" },
      { label: "Installation", slug: "installation" },
      { label: "Authentication", slug: "authentication" },
    ],
  },
  {
    title: "Content",
    icon: FileText,
    items: [
      { label: "AI Writer", slug: "ai-writer" },
      { label: "Templates", slug: "templates" },
      { label: "Content Editor", slug: "content-editor" },
      { label: "Media Library", slug: "media-library" },
    ],
  },
  {
    title: "SEO",
    icon: Search,
    items: [
      { label: "SEO Score", slug: "seo-score" },
      { label: "Keywords", slug: "keywords" },
      { label: "Meta Tags", slug: "meta-tags" },
      { label: "Schema Markup", slug: "schema-markup" },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: [
      { label: "Dashboard", slug: "analytics-dashboard" },
      { label: "Reports", slug: "reports" },
      { label: "Custom Metrics", slug: "custom-metrics" },
      { label: "Exports", slug: "exports" },
    ],
  },
  {
    title: "API",
    icon: Code,
    items: [
      { label: "Overview", slug: "api-overview" },
      { label: "Authentication", slug: "api-authentication" },
      { label: "Endpoints", slug: "endpoints" },
      { label: "Rate Limits", slug: "rate-limits" },
    ],
  },
  {
    title: "Integrations",
    icon: Plug,
    items: [
      { label: "WordPress", slug: "wordpress" },
      { label: "Shopify", slug: "shopify" },
      { label: "Medium", slug: "medium" },
      { label: "Webhooks", slug: "webhooks" },
    ],
  },
];

const quickStartToc: TocEntry[] = [
  { id: "prerequisites", label: "Prerequisites", level: 2 },
  { id: "step-1-create-your-first-project", label: "Step 1: Create Your First Project", level: 2 },
  { id: "step-2-generate-your-first-article", label: "Step 2: Generate Your First Article", level: 2 },
  { id: "step-3-optimize-for-seo", label: "Step 3: Optimize for SEO", level: 2 },
  { id: "step-4-publish", label: "Step 4: Publish", level: 2 },
  { id: "api-quick-start", label: "API Quick Start", level: 2 },
  { id: "next-steps", label: "Next Steps", level: 2 },
];

// Flat list for prev/next navigation
const allPages = navSections.flatMap((s) =>
  s.items.map((item) => ({ ...item, section: s.title }))
);

// ---------------------------------------------------------------------------
// Code Block Component
// ---------------------------------------------------------------------------

function CodeBlock({
  code,
  language,
  filename,
}: {
  code: React.ReactNode;
  language: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const el = document.getElementById(`code-${language}-${Math.random()}`);
    // Fallback: extract text from the rendered code
    const text =
      typeof code === "string"
        ? code
        : (document.querySelector(`[data-code-lang="${language}"]`) as HTMLElement)
            ?.innerText ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code, language]);

  return (
    <div className="group relative my-6 rounded-xl border border-white/[0.06] bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
          </div>
          {filename && (
            <span className="ml-2 text-xs text-zinc-500 font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* Code */}
      <pre
        className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono"
        data-code-lang={language}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quick Start Content
// ---------------------------------------------------------------------------

function QuickStartContent() {
  return (
    <div className="prose-custom">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
        <span className="hover:text-zinc-300 cursor-pointer transition-colors">Docs</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="hover:text-zinc-300 cursor-pointer transition-colors">Getting Started</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-violet-400 font-medium">Quick Start</span>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3"
      >
        Quick Start Guide
      </motion.h1>
      <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
        Get up and running with InkFleet in under 5 minutes.
      </p>

      {/* Prerequisites */}
      <h2 id="prerequisites" className="scroll-mt-24 text-xl font-semibold text-zinc-200 mb-4 mt-12">
        Prerequisites
      </h2>
      <ul className="space-y-2 text-zinc-400 mb-8 pl-1">
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span>
            A InkFleet account &mdash;{" "}
            <span className="text-violet-400 hover:text-violet-300 cursor-pointer underline underline-offset-2">
              sign up for free
            </span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span>Node.js 18+ (for API integration)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span>npm or yarn package manager</span>
        </li>
      </ul>

      {/* Step 1 */}
      <h2
        id="step-1-create-your-first-project"
        className="scroll-mt-24 text-xl font-semibold text-zinc-200 mb-4 mt-12"
      >
        Step 1: Create Your First Project
      </h2>
      <p className="text-zinc-400 mb-4 leading-relaxed">
        After signing up, you&apos;ll be taken to your dashboard. Click{" "}
        <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-violet-400 text-sm font-mono">
          New Project
        </code>{" "}
        to create your first content project. You can also create a project via the API:
      </p>

      <CodeBlock
        language="json"
        filename="project-config.json"
        code={
          <>
            <span className="text-zinc-500">{"// Project configuration"}</span>
            {"\n"}
            <span className="text-zinc-300">{"{"}</span>
            {"\n"}
            {"  "}
            <span className="text-violet-400">&quot;name&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&quot;My First Blog&quot;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-violet-400">&quot;type&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&quot;blog&quot;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-violet-400">&quot;language&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&quot;en&quot;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-violet-400">&quot;seo&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-zinc-300">{"{"}</span>
            {"\n"}
            {"    "}
            <span className="text-violet-400">&quot;autoOptimize&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-sky-400">true</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"    "}
            <span className="text-violet-400">&quot;targetScore&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-amber-400">90</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"    "}
            <span className="text-violet-400">&quot;schemaMarkup&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-sky-400">true</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">{"}"}</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-violet-400">&quot;ai&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-zinc-300">{"{"}</span>
            {"\n"}
            {"    "}
            <span className="text-violet-400">&quot;model&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&quot;inkfleet-v1&quot;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"    "}
            <span className="text-violet-400">&quot;tone&quot;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&quot;professional&quot;</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">{"}"}</span>
            {"\n"}
            <span className="text-zinc-300">{"}"}</span>
          </>
        }
      />

      {/* Step 2 */}
      <h2
        id="step-2-generate-your-first-article"
        className="scroll-mt-24 text-xl font-semibold text-zinc-200 mb-4 mt-12"
      >
        Step 2: Generate Your First Article
      </h2>
      <p className="text-zinc-400 mb-4 leading-relaxed">
        Navigate to <strong className="text-zinc-200 font-medium">AI Writer</strong> and enter your topic. InkFleet
        will generate a complete, SEO-optimized article in seconds. You can also use the SDK:
      </p>

      <CodeBlock
        language="typescript"
        filename="generate-article.ts"
        code={
          <>
            <span className="text-violet-400">import</span>
            <span className="text-zinc-300">{" { InkFleet } "}</span>
            <span className="text-violet-400">from</span>{" "}
            <span className="text-emerald-400">&apos;@inkfleet/sdk&apos;</span>
            <span className="text-zinc-500">;</span>
            {"\n\n"}
            <span className="text-zinc-500">{"// Initialize the client"}</span>
            {"\n"}
            <span className="text-violet-400">const</span>{" "}
            <span className="text-zinc-300">client</span>{" "}
            <span className="text-zinc-500">=</span>{" "}
            <span className="text-violet-400">new</span>{" "}
            <span className="text-sky-400">InkFleet</span>
            <span className="text-zinc-300">({"{"}</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">apiKey</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&apos;gho_your_api_key&apos;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            <span className="text-zinc-300">{"})"}</span>
            <span className="text-zinc-500">;</span>
            {"\n\n"}
            <span className="text-zinc-500">{"// Generate an article"}</span>
            {"\n"}
            <span className="text-violet-400">const</span>{" "}
            <span className="text-zinc-300">article</span>{" "}
            <span className="text-zinc-500">=</span>{" "}
            <span className="text-violet-400">await</span>{" "}
            <span className="text-zinc-300">client</span>
            <span className="text-zinc-500">.</span>
            <span className="text-sky-400">articles</span>
            <span className="text-zinc-500">.</span>
            <span className="text-sky-400">generate</span>
            <span className="text-zinc-300">({"{"}</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">topic</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&apos;Best practices for cloud-native development&apos;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">length</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&apos;long&apos;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">seoOptimize</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-sky-400">true</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">keywords</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-zinc-300">[</span>
            <span className="text-emerald-400">&apos;cloud-native&apos;</span>
            <span className="text-zinc-500">,</span>{" "}
            <span className="text-emerald-400">&apos;kubernetes&apos;</span>
            <span className="text-zinc-500">,</span>{" "}
            <span className="text-emerald-400">&apos;microservices&apos;</span>
            <span className="text-zinc-300">]</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            <span className="text-zinc-300">{"})"}</span>
            <span className="text-zinc-500">;</span>
            {"\n\n"}
            <span className="text-zinc-300">console</span>
            <span className="text-zinc-500">.</span>
            <span className="text-sky-400">log</span>
            <span className="text-zinc-300">(</span>
            <span className="text-emerald-400">&apos;Article generated:&apos;</span>
            <span className="text-zinc-500">,</span>{" "}
            <span className="text-zinc-300">article</span>
            <span className="text-zinc-500">.</span>
            <span className="text-zinc-300">title</span>
            <span className="text-zinc-300">)</span>
            <span className="text-zinc-500">;</span>
            {"\n"}
            <span className="text-zinc-300">console</span>
            <span className="text-zinc-500">.</span>
            <span className="text-sky-400">log</span>
            <span className="text-zinc-300">(</span>
            <span className="text-emerald-400">&apos;SEO Score:&apos;</span>
            <span className="text-zinc-500">,</span>{" "}
            <span className="text-zinc-300">article</span>
            <span className="text-zinc-500">.</span>
            <span className="text-zinc-300">seoScore</span>
            <span className="text-zinc-300">)</span>
            <span className="text-zinc-500">;</span>
          </>
        }
      />

      {/* Step 3 */}
      <h2
        id="step-3-optimize-for-seo"
        className="scroll-mt-24 text-xl font-semibold text-zinc-200 mb-4 mt-12"
      >
        Step 3: Optimize for SEO
      </h2>
      <p className="text-zinc-400 mb-4 leading-relaxed">
        Your article is automatically analyzed for SEO. Check the SEO panel on the right side of the
        editor for real-time scoring and actionable suggestions. InkFleet evaluates:
      </p>
      <ul className="space-y-2 text-zinc-400 mb-6 pl-1">
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span>Keyword density and placement across headings, body, and meta</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span>Readability score (Flesch-Kincaid, Gunning Fog)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span>Internal and external link structure</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span>Schema markup generation and validation</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span>Meta title and description optimization</span>
        </li>
      </ul>

      <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.05] px-5 py-4 mb-8">
        <p className="text-sm text-violet-300 leading-relaxed">
          <strong className="text-violet-200">Tip:</strong> Aim for an SEO score above 85 before
          publishing. InkFleet will highlight exactly what to improve and can auto-fix most issues
          with a single click.
        </p>
      </div>

      {/* Step 4 */}
      <h2
        id="step-4-publish"
        className="scroll-mt-24 text-xl font-semibold text-zinc-200 mb-4 mt-12"
      >
        Step 4: Publish
      </h2>
      <p className="text-zinc-400 mb-4 leading-relaxed">
        Connect your publishing platforms in{" "}
        <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-violet-400 text-sm font-mono">
          Settings &gt; Integrations
        </code>
        , then click <strong className="text-zinc-200 font-medium">Publish</strong> to distribute your content
        across all connected channels simultaneously.
      </p>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        InkFleet supports one-click publishing to WordPress, Shopify, Medium, and custom webhooks.
        Each platform receives optimized formatting and metadata automatically.
      </p>

      {/* API Quick Start */}
      <h2
        id="api-quick-start"
        className="scroll-mt-24 text-xl font-semibold text-zinc-200 mb-4 mt-12"
      >
        API Quick Start
      </h2>
      <p className="text-zinc-400 mb-4 leading-relaxed">
        Prefer working with the REST API directly? Here&apos;s how to generate an article with a
        single cURL command:
      </p>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={
          <>
            <span className="text-zinc-500">{"# Generate an article via the REST API"}</span>
            {"\n"}
            <span className="text-sky-400">curl</span>
            <span className="text-zinc-300"> -X POST </span>
            <span className="text-emerald-400">https://api.inkfleet.com/v1/articles/generate</span>
            <span className="text-zinc-300"> \</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">-H </span>
            <span className="text-emerald-400">&quot;Authorization: Bearer gho_your_api_key&quot;</span>
            <span className="text-zinc-300"> \</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">-H </span>
            <span className="text-emerald-400">&quot;Content-Type: application/json&quot;</span>
            <span className="text-zinc-300"> \</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">-d </span>
            <span className="text-emerald-400">&apos;{"{"}</span>
            {"\n"}
            {"    "}
            <span className="text-emerald-400">
              &quot;topic&quot;: &quot;Getting started with serverless&quot;,
            </span>
            {"\n"}
            {"    "}
            <span className="text-emerald-400">&quot;length&quot;: &quot;medium&quot;,</span>
            {"\n"}
            {"    "}
            <span className="text-emerald-400">&quot;seoOptimize&quot;: true</span>
            {"\n"}
            {"  "}
            <span className="text-emerald-400">{"}"}&apos;</span>
          </>
        }
      />

      <p className="text-zinc-400 mb-4 leading-relaxed">
        Or using the JavaScript <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-violet-400 text-sm font-mono">fetch</code> API:
      </p>

      <CodeBlock
        language="javascript"
        filename="api-example.js"
        code={
          <>
            <span className="text-violet-400">const</span>{" "}
            <span className="text-zinc-300">response</span>{" "}
            <span className="text-zinc-500">=</span>{" "}
            <span className="text-violet-400">await</span>{" "}
            <span className="text-sky-400">fetch</span>
            <span className="text-zinc-300">(</span>
            <span className="text-emerald-400">&apos;https://api.inkfleet.com/v1/articles/generate&apos;</span>
            <span className="text-zinc-500">,</span>{" "}
            <span className="text-zinc-300">{"{"}</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">method</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&apos;POST&apos;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">headers</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-zinc-300">{"{"}</span>
            {"\n"}
            {"    "}
            <span className="text-emerald-400">&apos;Authorization&apos;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&apos;Bearer gho_your_api_key&apos;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"    "}
            <span className="text-emerald-400">&apos;Content-Type&apos;</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&apos;application/json&apos;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">{"}"}</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">body</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-zinc-300">JSON</span>
            <span className="text-zinc-500">.</span>
            <span className="text-sky-400">stringify</span>
            <span className="text-zinc-300">({"{"}</span>
            {"\n"}
            {"    "}
            <span className="text-zinc-300">topic</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&apos;Getting started with serverless&apos;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"    "}
            <span className="text-zinc-300">length</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-emerald-400">&apos;medium&apos;</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"    "}
            <span className="text-zinc-300">seoOptimize</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-sky-400">true</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            {"  "}
            <span className="text-zinc-300">{"})"}</span>
            <span className="text-zinc-500">,</span>
            {"\n"}
            <span className="text-zinc-300">{"})"}</span>
            <span className="text-zinc-500">;</span>
            {"\n\n"}
            <span className="text-violet-400">const</span>{" "}
            <span className="text-zinc-300">article</span>{" "}
            <span className="text-zinc-500">=</span>{" "}
            <span className="text-violet-400">await</span>{" "}
            <span className="text-zinc-300">response</span>
            <span className="text-zinc-500">.</span>
            <span className="text-sky-400">json</span>
            <span className="text-zinc-300">()</span>
            <span className="text-zinc-500">;</span>
            {"\n"}
            <span className="text-zinc-300">console</span>
            <span className="text-zinc-500">.</span>
            <span className="text-sky-400">log</span>
            <span className="text-zinc-300">(</span>
            <span className="text-zinc-300">article</span>
            <span className="text-zinc-300">)</span>
            <span className="text-zinc-500">;</span>
          </>
        }
      />

      {/* Next Steps */}
      <h2
        id="next-steps"
        className="scroll-mt-24 text-xl font-semibold text-zinc-200 mb-4 mt-12"
      >
        Next Steps
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 mb-10">
        {[
          {
            title: "Explore AI Writer",
            desc: "Learn advanced features like tone control, brand voice, and multi-language support.",
            slug: "ai-writer",
          },
          {
            title: "Set up SEO Monitoring",
            desc: "Track rankings, monitor competitors, and get automated optimization alerts.",
            slug: "seo-score",
          },
          {
            title: "Connect Integrations",
            desc: "Publish to WordPress, Shopify, Medium, and more with one click.",
            slug: "wordpress",
          },
          {
            title: "API Reference",
            desc: "Full API documentation with authentication, endpoints, and code examples.",
            slug: "api-overview",
          },
        ].map((card) => (
          <button
            key={card.slug}
            className="group text-left rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-200"
          >
            <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-violet-400 transition-colors mb-1">
              {card.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{card.desc}</p>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.06] my-10" />

      {/* Feedback */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm text-zinc-500">Was this helpful?</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 gap-1.5 border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            Yes
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 gap-1.5 border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/[0.05]"
          >
            <ThumbsDown className="h-3.5 w-3.5" />
            No
          </Button>
        </div>
      </div>

      {/* Last updated */}
      <p className="text-xs text-zinc-600 mb-10">Last updated: March 2024</p>

      {/* Prev / Next */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <button className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-200 text-left">
          <ArrowLeft className="h-4 w-4 text-zinc-500 group-hover:text-violet-400 transition-colors shrink-0" />
          <div>
            <span className="text-[11px] uppercase tracking-wider text-zinc-600 block">
              Previous
            </span>
            <span className="text-sm font-medium text-zinc-300 group-hover:text-violet-400 transition-colors">
              Introduction
            </span>
          </div>
        </button>
        <button className="group flex items-center justify-end gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-200 text-right">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-zinc-600 block">Next</span>
            <span className="text-sm font-medium text-zinc-300 group-hover:text-violet-400 transition-colors">
              Installation
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-violet-400 transition-colors shrink-0" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Docs Page
// ---------------------------------------------------------------------------

export default function DocsPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Getting Started": true,
  });
  const [activeSlug, setActiveSlug] = useState("quick-start");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>("");

  // Determine which section the current slug belongs to
  const activeSection = navSections.find((s) =>
    s.items.some((i) => i.slug === activeSlug)
  );

  // Toggle a sidebar section open / closed
  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Navigate to a doc page
  const navigateTo = (slug: string) => {
    setActiveSlug(slug);
    setSidebarOpen(false);
    // Open the parent section
    const parentSection = navSections.find((s) => s.items.some((i) => i.slug === slug));
    if (parentSection) {
      setOpenSections((prev) => ({ ...prev, [parentSection.title]: true }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Intersection observer for ToC highlighting
  useEffect(() => {
    const headings = document.querySelectorAll("h2[id]");
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [activeSlug]);

  // Filter nav items by search
  const filteredSections = navSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) =>
      searchQuery
        ? section.items.length > 0
        : true
    );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Search Bar */}
      <div className="sticky top-16 z-40 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 w-full rounded-xl border-white/[0.08] bg-white/[0.04] backdrop-blur-md text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-violet-600/50 focus-visible:border-violet-600/30"
            />
            <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center rounded border border-white/[0.08] bg-white/[0.04] px-1.5 text-[10px] font-medium text-zinc-500">
              /
            </kbd>
          </div>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden sticky top-[7.25rem] z-30 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 w-full px-4 sm:px-6 py-3 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span>{activeSection?.title ?? "Navigation"}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-zinc-200 font-medium">
            {navSections.flatMap((s) => s.items).find((i) => i.slug === activeSlug)?.label}
          </span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-0 lg:gap-10">
          {/* ----------------------------------------------------------------- */}
          {/* LEFT SIDEBAR                                                     */}
          {/* ----------------------------------------------------------------- */}
          <AnimatePresence>
            {(sidebarOpen || typeof window === "undefined") && (
              <motion.aside
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:!h-auto lg:!opacity-100 overflow-hidden w-full lg:w-auto"
              />
            )}
          </AnimatePresence>

          <aside
            className={cn(
              "shrink-0 w-64 lg:block",
              sidebarOpen ? "block absolute lg:relative z-20 left-0 right-0 bg-zinc-950 px-4 sm:px-6 lg:px-0 pb-6 border-b lg:border-b-0 border-white/[0.06]" : "hidden"
            )}
          >
            <nav className="sticky top-[8.5rem] max-h-[calc(100vh-9rem)] overflow-y-auto py-8 pr-2 -mr-2 scrollbar-thin scrollbar-thumb-white/[0.06] scrollbar-track-transparent">
              <div className="space-y-1">
                {filteredSections.map((section) => {
                  const Icon = section.icon;
                  const isOpen = openSections[section.title] ?? false;
                  const hasActiveItem = section.items.some(
                    (item) => item.slug === activeSlug
                  );

                  return (
                    <div key={section.title}>
                      <button
                        onClick={() => toggleSection(section.title)}
                        className={cn(
                          "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                          hasActiveItem
                            ? "text-zinc-200"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 text-left">{section.title}</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-0.5 mb-2 space-y-0.5 border-l border-white/[0.06] pl-3">
                              {section.items.map((item) => (
                                <button
                                  key={item.slug}
                                  onClick={() => navigateTo(item.slug)}
                                  className={cn(
                                    "block w-full text-left px-3 py-1.5 rounded-md text-sm transition-all duration-150",
                                    activeSlug === item.slug
                                      ? "text-violet-400 bg-violet-500/[0.08] border-l-2 border-violet-500 -ml-[13px] pl-[23px]"
                                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                                  )}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* ----------------------------------------------------------------- */}
          {/* MAIN CONTENT                                                      */}
          {/* ----------------------------------------------------------------- */}
          <main className="min-w-0 flex-1 py-8 lg:py-10">
            <motion.div
              key={activeSlug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuickStartContent />
            </motion.div>
          </main>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT SIDEBAR (Table of Contents)                                 */}
          {/* ----------------------------------------------------------------- */}
          <aside className="hidden xl:block shrink-0 w-56">
            <div className="sticky top-[8.5rem] py-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                On this page
              </h4>
              <nav className="space-y-1 border-l border-white/[0.06]">
                {quickStartToc.map((entry) => (
                  <a
                    key={entry.id}
                    href={`#${entry.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(entry.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        setActiveTocId(entry.id);
                      }
                    }}
                    className={cn(
                      "block pl-4 py-1 text-[13px] transition-all duration-150 border-l-2 -ml-px",
                      activeTocId === entry.id
                        ? "border-violet-500 text-violet-400"
                        : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-white/[0.15]"
                    )}
                  >
                    {entry.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}