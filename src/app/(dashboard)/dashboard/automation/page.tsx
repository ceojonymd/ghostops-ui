"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Square,
  Search,
  FileText,
  Image,
  BarChart3,
  Link,
  Send,
  Share2,
  Mail,
  TrendingUp,
  RefreshCw,
  MoreHorizontal,
  GripVertical,
  Plus,
  Clock,
  Calendar,
  Zap,
  Repeat,
  Rss,
  MessageSquare,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Node palette data                                                  */
/* ------------------------------------------------------------------ */

const nodeTypes = [
  { id: "topic-research", label: "Topic Research", icon: Search, color: "border-violet-500", iconColor: "text-violet-500" },
  { id: "content-generation", label: "Content Generation", icon: FileText, color: "border-blue-500", iconColor: "text-blue-500" },
  { id: "image-generation", label: "Image Generation", icon: Image, color: "border-pink-500", iconColor: "text-pink-500" },
  { id: "seo-optimization", label: "SEO Optimization", icon: BarChart3, color: "border-emerald-500", iconColor: "text-emerald-500" },
  { id: "internal-linking", label: "Internal Linking", icon: Link, color: "border-cyan-500", iconColor: "text-cyan-500" },
  { id: "publish", label: "Publish", icon: Send, color: "border-amber-500", iconColor: "text-amber-500" },
  { id: "social-media", label: "Social Media", icon: Share2, color: "border-indigo-500", iconColor: "text-indigo-500" },
  { id: "email-blast", label: "Email Blast", icon: Mail, color: "border-rose-500", iconColor: "text-rose-500" },
  { id: "analytics-check", label: "Analytics Check", icon: TrendingUp, color: "border-teal-500", iconColor: "text-teal-500" },
  { id: "content-refresh", label: "Content Refresh", icon: RefreshCw, color: "border-orange-500", iconColor: "text-orange-500" },
] as const;

/* ------------------------------------------------------------------ */
/*  Canvas workflow nodes                                              */
/* ------------------------------------------------------------------ */

interface WorkflowNode {
  id: string;
  label: string;
  icon: typeof Search;
  iconColor: string;
  borderColor: string;
  status: "running" | "idle";
  x: number;
  y: number;
}

const workflowNodes: WorkflowNode[] = [
  { id: "n1", label: "Topic Research", icon: Search, iconColor: "text-violet-500", borderColor: "border-violet-500/50", status: "running", x: 60, y: 180 },
  { id: "n2", label: "Content Generation", icon: FileText, iconColor: "text-blue-500", borderColor: "border-blue-500/50", status: "running", x: 310, y: 120 },
  { id: "n3", label: "SEO Optimization", icon: BarChart3, iconColor: "text-emerald-500", borderColor: "border-emerald-500/50", status: "idle", x: 560, y: 200 },
  { id: "n4", label: "Publish", icon: Send, iconColor: "text-amber-500", borderColor: "border-amber-500/50", status: "idle", x: 810, y: 140 },
];

/* ------------------------------------------------------------------ */
/*  Saved workflows data                                               */
/* ------------------------------------------------------------------ */

type TriggerType = "schedule" | "webhook" | "manual" | "rss" | "event";

const triggerStyles: Record<TriggerType, { label: string; icon: typeof Clock; className: string }> = {
  schedule: { label: "Scheduled", icon: Calendar, className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  webhook: { label: "Webhook", icon: Zap, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  manual: { label: "Manual", icon: Play, className: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20" },
  rss: { label: "RSS Feed", icon: Rss, className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  event: { label: "Event", icon: MessageSquare, className: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
};

interface SavedWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: TriggerType;
  enabled: boolean;
  lastRun: string;
  runs: number;
}

const initialWorkflows: SavedWorkflow[] = [
  { id: "w1", name: "Content Pipeline", description: "Research trending topics, generate articles, optimize SEO, and auto-publish.", trigger: "schedule", enabled: true, lastRun: "2h ago", runs: 145 },
  { id: "w2", name: "SEO Refresh Cycle", description: "Scan underperforming pages and automatically rewrite meta tags and headings.", trigger: "schedule", enabled: false, lastRun: "1d ago", runs: 89 },
  { id: "w3", name: "Social Distribution", description: "Share newly published articles across all connected social media accounts.", trigger: "event", enabled: true, lastRun: "4h ago", runs: 312 },
  { id: "w4", name: "RSS Content Ingester", description: "Monitor competitor RSS feeds and generate content briefs from new posts.", trigger: "rss", enabled: true, lastRun: "30m ago", runs: 67 },
  { id: "w5", name: "Weekly Analytics Report", description: "Compile traffic, revenue, and SEO data into a weekly summary email.", trigger: "schedule", enabled: false, lastRun: "7d ago", runs: 24 },
];

/* ------------------------------------------------------------------ */
/*  Pre-built workflow templates                                       */
/* ------------------------------------------------------------------ */

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  trigger: TriggerType;
  icon: typeof Calendar;
  iconColor: string;
  steps: string[];
}

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: "t1",
    name: "Auto-publish Weekly",
    description: "Automatically research, write, and publish one article every week on a set schedule.",
    trigger: "schedule",
    icon: Calendar,
    iconColor: "text-blue-500",
    steps: ["Topic Research", "Content Generation", "SEO Optimization", "Publish"],
  },
  {
    id: "t2",
    name: "Social Media Blast",
    description: "Distribute new articles across Twitter, LinkedIn, Facebook, and Pinterest instantly.",
    trigger: "event",
    icon: Share2,
    iconColor: "text-indigo-500",
    steps: ["Detect Publish", "Generate Snippets", "Post to Socials", "Track Engagement"],
  },
  {
    id: "t3",
    name: "Email Newsletter",
    description: "Curate top-performing articles into a weekly email newsletter for subscribers.",
    trigger: "schedule",
    icon: Mail,
    iconColor: "text-rose-500",
    steps: ["Collect Top Articles", "Generate Summary", "Build Email", "Send Campaign"],
  },
];

/* ------------------------------------------------------------------ */
/*  SVG connection helpers                                             */
/* ------------------------------------------------------------------ */

const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;

function getConnectionPath(from: WorkflowNode, to: WorkflowNode): string {
  const startX = from.x + NODE_WIDTH;
  const startY = from.y + NODE_HEIGHT / 2;
  const endX = to.x;
  const endY = to.y + NODE_HEIGHT / 2;
  const midX = (startX + endX) / 2;

  return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AutomationPage() {
  const [pipelineStatus, setPipelineStatus] = React.useState<"running" | "paused" | "stopped">("running");
  const [workflows, setWorkflows] = React.useState(initialWorkflows);

  const handleToggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation</h1>
          <p className="text-muted-foreground">
            Build and manage content workflows with drag-and-drop nodes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className={cn(
              "bg-violet-600 hover:bg-violet-700 text-white",
              pipelineStatus === "running" && "ring-2 ring-violet-400/50"
            )}
            onClick={() => setPipelineStatus("running")}
          >
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>
          <Button
            variant="outline"
            onClick={() => setPipelineStatus("paused")}
            className={cn(pipelineStatus === "paused" && "ring-2 ring-amber-400/50")}
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button
            variant="outline"
            onClick={() => setPipelineStatus("stopped")}
            className="text-red-500 hover:text-red-600 hover:border-red-500/50"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </div>
      </motion.div>

      {/* Builder: Sidebar + Canvas */}
      <motion.div variants={itemVariants} className="flex gap-4">
        {/* Left Sidebar - Node Palette */}
        <Card className="w-64 shrink-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Node Palette</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
            {nodeTypes.map((node) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border-l-4 border bg-card p-3 cursor-grab select-none",
                    "hover:bg-muted/60 hover:shadow-sm transition-all",
                    node.color
                  )}
                >
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                  <Icon className={cn("h-4 w-4 shrink-0", node.iconColor)} />
                  <span className="text-sm font-medium truncate">{node.label}</span>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>

        {/* Canvas Area */}
        <Card className="flex-1 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Workflow Canvas</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  pipelineStatus === "running" ? "bg-emerald-500 animate-pulse" :
                  pipelineStatus === "paused" ? "bg-amber-500" : "bg-zinc-500"
                )} />
                <span className="capitalize">{pipelineStatus}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div
              className="relative w-full overflow-auto"
              style={{
                height: 520,
                background:
                  "radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              {/* SVG connections layer */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ minWidth: 1100, minHeight: 520 }}
              >
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="#8b5cf6"
                      opacity="0.6"
                    />
                  </marker>
                </defs>

                {/* Connection lines */}
                {workflowNodes.slice(0, -1).map((node, index) => {
                  const nextNode = workflowNodes[index + 1];
                  return (
                    <motion.path
                      key={`conn-${node.id}-${nextNode.id}`}
                      d={getConnectionPath(node, nextNode)}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeDasharray="6 3"
                      markerEnd="url(#arrowhead)"
                      opacity="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.3, ease: "easeInOut" }}
                    />
                  );
                })}
              </svg>

              {/* Workflow nodes */}
              <div className="relative" style={{ minWidth: 1100, minHeight: 520 }}>
                {workflowNodes.map((node, index) => {
                  const Icon = node.icon;
                  return (
                    <motion.div
                      key={node.id}
                      className={cn(
                        "absolute rounded-xl border-2 bg-card shadow-lg p-4 cursor-pointer",
                        "hover:shadow-xl hover:scale-[1.02] transition-shadow",
                        node.borderColor
                      )}
                      style={{
                        left: node.x,
                        top: node.y,
                        width: NODE_WIDTH,
                        height: NODE_HEIGHT,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.15 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex items-center justify-center h-10 w-10 rounded-lg",
                          "bg-muted/50"
                        )}>
                          <Icon className={cn("h-5 w-5", node.iconColor)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{node.label}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              node.status === "running"
                                ? "bg-emerald-500 animate-pulse"
                                : "bg-zinc-400"
                            )} />
                            <span className="text-xs text-muted-foreground capitalize">
                              {node.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Workflow Templates */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Pre-built Templates</h2>
            <p className="text-sm text-muted-foreground">Start quickly with ready-made workflow templates.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflowTemplates.map((template) => {
            const Icon = template.icon;
            const trigger = triggerStyles[template.trigger];
            const TriggerIcon = trigger.icon;
            return (
              <motion.div key={template.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                        <Icon className={cn("h-5 w-5", template.iconColor)} />
                      </div>
                      <Badge variant="outline" className={cn("text-xs", trigger.className)}>
                        <TriggerIcon className="h-3 w-3 mr-1" />
                        {trigger.label}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {template.steps.map((step) => (
                        <Badge key={step} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {step}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="w-full group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-colors">
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Saved Workflows */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Saved Workflows</CardTitle>
                <CardDescription className="mt-1">Manage your automation workflows.</CardDescription>
              </div>
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Create New Workflow
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workflows.map((workflow) => {
                const trigger = triggerStyles[workflow.trigger];
                const TriggerIcon = trigger.icon;
                return (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    {/* Workflow info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold">{workflow.name}</h4>
                        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", trigger.className)}>
                          <TriggerIcon className="h-2.5 w-2.5 mr-0.5" />
                          {trigger.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {workflow.description}
                      </p>
                    </div>

                    {/* Last run */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{workflow.lastRun}</span>
                    </div>

                    {/* Runs count */}
                    <div className="text-xs text-muted-foreground flex-shrink-0 w-16 text-right">
                      {workflow.runs.toLocaleString()} runs
                    </div>

                    {/* Enable/Disable Switch */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Switch
                        checked={workflow.enabled}
                        onCheckedChange={() => handleToggleWorkflow(workflow.id)}
                        aria-label={`Toggle ${workflow.name}`}
                      />
                      <span className={cn(
                        "text-xs font-medium w-12",
                        workflow.enabled ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                      )}>
                        {workflow.enabled ? "Active" : "Off"}
                      </span>
                    </div>

                    {/* More actions */}
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
