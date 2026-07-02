"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  RefreshCw,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Heart,
  ImagePlus,
  HelpCircle,
  Braces,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  Link,
  Image as ImageIcon,
  Code,
  Quote,
  Clock,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { SeoScoreRing } from "@/components/dashboard/seo-score-ring";
import { ScrollArea } from "@/components/ui/scroll-area";

const defaultEditorContent = `# 10 Best AI Writing Tools for 2025: A Comprehensive Guide

## Introduction

In the rapidly evolving landscape of content creation, AI writing tools have become indispensable for bloggers, marketers, and content creators. This comprehensive guide explores the top AI writing tools available in 2025, helping you choose the perfect solution for your content needs.

## 1. GhostOps AI Writer

GhostOps stands out as the premier AI writing platform, offering seamless integration with popular CMS platforms and advanced SEO optimization capabilities. With its intuitive interface and powerful AI models, GhostOps enables content creators to produce high-quality, SEO-optimized articles in minutes.

### Key Features:
- Multi-model AI support (GPT-4, Claude, Gemini)
- Real-time SEO analysis and optimization
- Automated internal linking
- Plagiarism detection
- Content scheduling and publishing

## 2. Jasper AI

Jasper continues to be a strong contender in the AI writing space, offering robust templates and brand voice customization...

## 3. Copy.ai

Copy.ai excels at short-form content generation, making it ideal for social media posts, email subject lines, and ad copy...`;

const aiActions = [
  { label: "Generate", icon: Sparkles, className: "text-violet-500" },
  { label: "Improve", icon: Wand2, className: "" },
  { label: "Rewrite", icon: RefreshCw, className: "" },
  { label: "Expand", icon: Maximize2, className: "" },
  { label: "Shorten", icon: Minimize2, className: "" },
  { label: "Fact Check", icon: ShieldCheck, className: "" },
  { label: "Humanize", icon: Heart, className: "" },
  { label: "Gen Image", icon: ImagePlus, className: "" },
  { label: "Gen FAQ", icon: HelpCircle, className: "" },
  { label: "Gen Schema", icon: Braces, className: "" },
];

const toolbarGroups = [
  [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
  ],
  [
    { icon: Heading1, label: "Heading 1" },
    { icon: Heading2, label: "Heading 2" },
    { icon: Heading3, label: "Heading 3" },
  ],
  [
    { icon: List, label: "List" },
    { icon: Link, label: "Link" },
    { icon: ImageIcon, label: "Image" },
    { icon: Code, label: "Code" },
    { icon: Quote, label: "Quote" },
  ],
];


const recentGenerations = [
  {
    id: "1",
    title: "10 Best AI Writing Tools for 2025",
    date: "2025-06-28",
    wordCount: 3240,
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Complete Guide to SEO in 2025",
    date: "2025-06-25",
    wordCount: 4510,
    status: "completed" as const,
  },
  {
    id: "3",
    title: "How to Start a Profitable Blog",
    date: "2025-06-22",
    wordCount: 2870,
    status: "completed" as const,
  },
  {
    id: "4",
    title: "Content Marketing Strategy Playbook",
    date: "2025-06-19",
    wordCount: 3680,
    status: "completed" as const,
  },
  {
    id: "5",
    title: "Affiliate Marketing for Beginners",
    date: "2025-06-15",
    wordCount: 2950,
    status: "completed" as const,
  },
];

export default function AIWriterPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [competitorUrls, setCompetitorUrls] = useState("");
  const [affiliateUrls, setAffiliateUrls] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [wordCount, setWordCount] = useState([3000]);
  const [aiModel, setAiModel] = useState("");
  const [editorContent, setEditorContent] = useState(defaultEditorContent);

  const wordCountDisplay = editorContent
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const charCount = editorContent.length;
  const readingTime = Math.max(1, Math.ceil(wordCountDisplay / 230));

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-theme(spacing.16))]">
      <div className="flex flex-1 min-h-0 gap-4">
      {/* Left Panel - Configuration */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-80 flex-shrink-0"
      >
        <Card className="h-full">
          <ScrollArea className="h-full">
            <CardContent className="space-y-5 p-6">
              {/* Topic */}
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Textarea
                  id="topic"
                  rows={3}
                  placeholder="Enter your article topic or title..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              {/* Target Keywords */}
              <div className="space-y-2">
                <Label htmlFor="keywords">Target Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="Add keywords separated by commas"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              {/* Competitor URLs */}
              <div className="space-y-2">
                <Label htmlFor="competitor-urls">Competitor URLs</Label>
                <Textarea
                  id="competitor-urls"
                  rows={3}
                  placeholder="Enter competitor URLs, one per line..."
                  value={competitorUrls}
                  onChange={(e) => setCompetitorUrls(e.target.value)}
                />
              </div>

              {/* Affiliate URLs */}
              <div className="space-y-2">
                <Label htmlFor="affiliate-urls">Affiliate URLs</Label>
                <Textarea
                  id="affiliate-urls"
                  rows={2}
                  placeholder="Enter affiliate links, one per line..."
                  value={affiliateUrls}
                  onChange={(e) => setAffiliateUrls(e.target.value)}
                />
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginners">Beginners</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="all-levels">All Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Word Count */}
              <div className="space-y-2">
                <Label>Word Count: {wordCount[0].toLocaleString()}</Label>
                <Slider
                  value={wordCount}
                  onValueChange={setWordCount}
                  min={500}
                  max={10000}
                  step={500}
                />
              </div>

              {/* AI Model */}
              <div className="space-y-2">
                <Label>AI Model</Label>
                <Select value={aiModel} onValueChange={setAiModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="claude-3.5-sonnet">
                      Claude 3.5 Sonnet
                    </SelectItem>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    <SelectItem value="llama-3">LLaMA 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Article
              </Button>
            </CardContent>
          </ScrollArea>
        </Card>
      </motion.div>

      {/* Center Panel - Editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        className="flex-1 flex flex-col min-w-0"
      >
        <Card className="h-full flex flex-col">
          {/* Toolbar */}
          <CardHeader className="flex-row items-center space-y-0 p-4 pb-0">
            <div className="flex items-center gap-1">
              {toolbarGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-1">
                  {groupIndex > 0 && (
                    <div className="w-px h-6 bg-border mx-1" />
                  )}
                  {group.map((tool) => (
                    <Button
                      key={tool.label}
                      variant="ghost"
                      size="icon"
                      title={tool.label}
                    >
                      <tool.icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </CardHeader>

          <Separator className="mt-4" />

          {/* Editor Area */}
          <CardContent className="flex-1 p-0 overflow-hidden">
            <textarea
              className="flex-1 w-full h-full resize-none border-0 focus:ring-0 focus:outline-none bg-transparent p-4 text-base leading-relaxed font-mono"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
            />
          </CardContent>

          {/* Bottom Bar */}
          <div className="flex justify-between items-center p-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{wordCountDisplay.toLocaleString()} words</span>
              <span>&middot;</span>
              <span>{charCount.toLocaleString()} characters</span>
              <span>&middot;</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Right Panel - AI Actions & SEO */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        className="w-72 flex-shrink-0"
      >
        <Card className="h-full">
          <ScrollArea className="h-full">
            <CardContent className="space-y-6 p-6">
              {/* AI Actions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">AI Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {aiActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      className="h-auto py-3 flex-col gap-1"
                    >
                      <action.icon
                        className={cn("h-4 w-4", action.className)}
                      />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* SEO Analysis */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">SEO Analysis</h3>

                {/* Keyword Density */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Keyword Density
                    </span>
                    <span className="font-medium text-emerald-500">2.4%</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    &quot;best ai writing tools&quot;
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: "48%" }}
                    />
                  </div>
                </div>

                {/* Readability */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Readability</span>
                    <span className="font-medium text-emerald-500">75%</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Grade 8 - Easy to Read
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>

                {/* Meta Description */}
                <div className="space-y-1.5">
                  <span className="text-sm text-muted-foreground">
                    Meta Description
                  </span>
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    Discover the 10 best AI writing tools for 2025. Compare
                    features, pricing, and capabilities to find the perfect AI
                    content creation solution.
                  </div>
                  <div className="text-xs text-muted-foreground">
                    142/160 characters
                  </div>
                </div>
              </div>

              <Separator />

              {/* Content Score */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-center">
                  Content Score
                </h3>
                <div className="flex flex-col items-center gap-2">
                  <SeoScoreRing score={85} size={100} strokeWidth={8} />
                  <span className="text-sm text-muted-foreground">
                    Content Score
                  </span>
                </div>
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </motion.div>
      </div>

      {/* History Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        className="flex-shrink-0"
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Recent Generations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentGenerations.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-violet-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge variant="secondary" className="text-xs">
                      {item.wordCount.toLocaleString()} words
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs"
                    >
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
