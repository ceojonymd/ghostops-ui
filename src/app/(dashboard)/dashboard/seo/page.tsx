"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  ArrowUp,
  ArrowDown,
  Minus,
  Copy,
  Check,
  Search,
  FileWarning,
  Link2,
  Code2,
  Database,
  ClipboardCheck,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react"

import { cn, formatNumber } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SeoScoreRing } from "@/components/dashboard/seo-score-ring"
import { seoData } from "@/lib/mock-data"

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

/* ------------------------------------------------------------------ */
/*  Mock data for tabs that need extra data beyond seoData             */
/* ------------------------------------------------------------------ */

const serpResults = [
  {
    title: "10 Best AI Writing Tools for 2025 - InkFleet Blog",
    url: "https://inkfleet.com/blog/ai-writing-tools",
    description:
      "Discover the top AI writing tools that will transform your content creation workflow. We tested 50+ tools and ranked the best options for bloggers, marketers, and businesses.",
  },
  {
    title: "Complete Guide to SEO in 2025: Rankings, Traffic & Beyond",
    url: "https://inkfleet.com/blog/seo-guide-2025",
    description:
      "Master modern SEO with our comprehensive guide. Learn keyword research, on-page optimization, technical SEO, link building strategies, and how to leverage AI for better rankings.",
  },
  {
    title: "How to Start a Profitable Blog in 2025 (Step-by-Step)",
    url: "https://inkfleet.com/blog/start-a-blog",
    description:
      "Start your blogging journey the right way. From choosing a niche and domain to monetization strategies, this guide covers everything you need to build a profitable blog.",
  },
  {
    title: "Content Marketing Strategy: The Ultimate Playbook",
    url: "https://inkfleet.com/blog/content-marketing-strategy",
    description:
      "Build a content marketing strategy that drives results. Learn how to plan, create, distribute, and measure content that attracts and converts your target audience.",
  },
  {
    title: "Affiliate Marketing for Beginners: Earn Your First $1,000",
    url: "https://inkfleet.com/blog/affiliate-marketing-beginners",
    description:
      "Learn affiliate marketing from scratch. This beginner-friendly guide walks you through choosing programs, creating content, driving traffic, and earning commissions.",
  },
]

const linkNodes = [
  { id: "home", label: "Homepage", x: 300, y: 60, color: "#8b5cf6" },
  { id: "blog", label: "Blog", x: 140, y: 170, color: "#3b82f6" },
  { id: "about", label: "About", x: 460, y: 170, color: "#3b82f6" },
  { id: "products", label: "Products", x: 60, y: 300, color: "#10b981" },
  { id: "services", label: "Services", x: 220, y: 300, color: "#10b981" },
  { id: "contact", label: "Contact", x: 380, y: 300, color: "#10b981" },
  { id: "faq", label: "FAQ", x: 540, y: 300, color: "#f59e0b" },
  { id: "pricing", label: "Pricing", x: 460, y: 60, color: "#f59e0b" },
]

const linkEdges = [
  { from: "home", to: "blog" },
  { from: "home", to: "about" },
  { from: "home", to: "pricing" },
  { from: "home", to: "services" },
  { from: "blog", to: "products" },
  { from: "blog", to: "services" },
  { from: "about", to: "contact" },
  { from: "about", to: "faq" },
  { from: "services", to: "pricing" },
  { from: "services", to: "contact" },
  { from: "pricing", to: "faq" },
  { from: "products", to: "blog" },
]

const indexedPages = [
  { url: "/blog/ai-writing-tools", status: "indexed" as const, lastCrawled: new Date(Date.now() - 86400000) },
  { url: "/blog/seo-guide-2025", status: "indexed" as const, lastCrawled: new Date(Date.now() - 172800000) },
  { url: "/blog/start-a-blog", status: "indexed" as const, lastCrawled: new Date(Date.now() - 259200000) },
  { url: "/blog/content-marketing", status: "indexed" as const, lastCrawled: new Date(Date.now() - 345600000) },
  { url: "/blog/affiliate-tips", status: "not_indexed" as const, lastCrawled: new Date(Date.now() - 432000000) },
  { url: "/tools/keyword-checker", status: "error" as const, lastCrawled: new Date(Date.now() - 518400000) },
  { url: "/blog/email-marketing", status: "indexed" as const, lastCrawled: new Date(Date.now() - 604800000) },
  { url: "/blog/social-media-trends", status: "not_indexed" as const, lastCrawled: new Date(Date.now() - 691200000) },
]

const auditRecommendations = [
  { priority: "high" as const, title: "Add meta descriptions to 12 pages", description: "Several high-traffic pages are missing meta descriptions, which can impact CTR from search results." },
  { priority: "high" as const, title: "Fix 3 pages with duplicate title tags", description: "Duplicate title tags confuse search engines and dilute ranking potential across competing pages." },
  { priority: "medium" as const, title: "Compress 28 images over 500KB", description: "Large images are slowing down page load times. Use WebP format and lazy loading for better Core Web Vitals." },
  { priority: "medium" as const, title: "Add structured data to blog posts", description: "Implement Article schema markup on all blog posts to enable rich snippets in search results." },
  { priority: "low" as const, title: "Update 8 pages with thin content", description: "Pages with fewer than 300 words may be seen as low-quality. Expand or consolidate these pages." },
  { priority: "low" as const, title: "Add alt text to 45 images", description: "Missing alt text hurts accessibility and prevents images from appearing in Google Image search." },
]

const sampleSchema = JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "10 Best AI Writing Tools for 2025",
    description:
      "Discover the top AI writing tools that will transform your content creation workflow.",
    author: {
      "@type": "Person",
      name: "Sarah Chen",
    },
    publisher: {
      "@type": "Organization",
      name: "InkFleet",
      logo: {
        "@type": "ImageObject",
        url: "https://inkfleet.com/logo.png",
      },
    },
    datePublished: "2025-01-15",
    dateModified: "2025-06-20",
    image: "https://inkfleet.com/images/ai-writing-tools.jpg",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://inkfleet.com/blog/ai-writing-tools",
    },
  },
  null,
  2
)

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getPositionBadgeColor(pos: number) {
  if (pos <= 3) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
  if (pos <= 10) return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
  return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
}

function getIndexStatusBadge(status: "indexed" | "not_indexed" | "error") {
  switch (status) {
    case "indexed":
      return { label: "Indexed", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" }
    case "not_indexed":
      return { label: "Not Indexed", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" }
    case "error":
      return { label: "Error", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" }
  }
}

function getPriorityBadge(priority: "high" | "medium" | "low") {
  switch (priority) {
    case "high":
      return { label: "High", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" }
    case "medium":
      return { label: "Medium", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" }
    case "low":
      return { label: "Low", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" }
  }
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function SeoPage() {
  const [activeTab, setActiveTab] = React.useState("keywords")
  const [schemaCode, setSchemaCode] = React.useState(sampleSchema)
  const [schemaValid, setSchemaValid] = React.useState<null | boolean>(null)
  const [schemaCopied, setSchemaCopied] = React.useState(false)
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null)

  const handleValidateSchema = () => {
    try {
      JSON.parse(schemaCode)
      const parsed = JSON.parse(schemaCode)
      if (parsed["@context"] && parsed["@type"]) {
        setSchemaValid(true)
      } else {
        setSchemaValid(false)
      }
    } catch {
      setSchemaValid(false)
    }
  }

  const handleCopySchema = async () => {
    try {
      await navigator.clipboard.writeText(schemaCode)
      setSchemaCopied(true)
      setTimeout(() => setSchemaCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement("textarea")
      textarea.value = schemaCode
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setSchemaCopied(true)
      setTimeout(() => setSchemaCopied(false), 2000)
    }
  }

  const getNodeById = (id: string) => linkNodes.find((n) => n.id === id)

  const connectedEdges = React.useMemo(() => {
    if (!hoveredNode) return []
    return linkEdges.filter((e) => e.from === hoveredNode || e.to === hoveredNode)
  }, [hoveredNode])

  const connectedNodeIds = React.useMemo(() => {
    if (!hoveredNode) return new Set<string>()
    const ids = new Set<string>()
    ids.add(hoveredNode)
    connectedEdges.forEach((e) => {
      ids.add(e.from)
      ids.add(e.to)
    })
    return ids
  }, [hoveredNode, connectedEdges])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">SEO Center</h1>
        <p className="text-muted-foreground mt-1">
          Monitor rankings, fix issues, and optimize your search presence.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="keywords" className="gap-1.5 text-xs sm:text-sm">
              <Search className="h-3.5 w-3.5" />
              Keywords
            </TabsTrigger>
            <TabsTrigger value="serp" className="gap-1.5 text-xs sm:text-sm">
              <ExternalLink className="h-3.5 w-3.5" />
              SERP
            </TabsTrigger>
            <TabsTrigger value="links" className="gap-1.5 text-xs sm:text-sm">
              <Link2 className="h-3.5 w-3.5" />
              Internal Links
            </TabsTrigger>
            <TabsTrigger value="broken" className="gap-1.5 text-xs sm:text-sm">
              <FileWarning className="h-3.5 w-3.5" />
              Broken Links
            </TabsTrigger>
            <TabsTrigger value="schema" className="gap-1.5 text-xs sm:text-sm">
              <Code2 className="h-3.5 w-3.5" />
              Schema
            </TabsTrigger>
            <TabsTrigger value="indexing" className="gap-1.5 text-xs sm:text-sm">
              <Database className="h-3.5 w-3.5" />
              Indexing
            </TabsTrigger>
            <TabsTrigger value="audit" className="gap-1.5 text-xs sm:text-sm">
              <ClipboardCheck className="h-3.5 w-3.5" />
              Audit
            </TabsTrigger>
          </TabsList>

          {/* ============================================================ */}
          {/*  TAB 1 — Keyword Tracking                                     */}
          {/* ============================================================ */}
          <TabsContent value="keywords">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Keyword Rankings</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Track your keyword positions across search engines.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[80px]">Position</TableHead>
                            <TableHead>Keyword</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead className="text-right">Volume</TableHead>
                            <TableHead className="text-right">Change</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {seoData.rankings.map((ranking, index) => (
                            <motion.tr
                              key={ranking.keyword}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.08 }}
                              className="border-b transition-colors hover:bg-muted/50"
                            >
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "font-bold tabular-nums",
                                    getPositionBadgeColor(ranking.position)
                                  )}
                                >
                                  #{ranking.position}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">
                                {ranking.keyword}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm font-mono">
                                {ranking.url}
                              </TableCell>
                              <TableCell className="text-right font-semibold tabular-nums">
                                {formatNumber(ranking.volume)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {ranking.change > 0 ? (
                                    <>
                                      <ArrowUp className="h-4 w-4 text-emerald-500" />
                                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                                        +{ranking.change}
                                      </span>
                                    </>
                                  ) : ranking.change < 0 ? (
                                    <>
                                      <ArrowDown className="h-4 w-4 text-red-500" />
                                      <span className="text-sm font-semibold text-red-600 dark:text-red-400 tabular-nums">
                                        {ranking.change}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Minus className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm font-semibold text-muted-foreground tabular-nums">
                                        0
                                      </span>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ============================================================ */}
          {/*  TAB 2 — SERP Analysis                                        */}
          {/* ============================================================ */}
          <TabsContent value="serp">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Google Search Preview</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      See how your top articles appear in Google search results.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {serpResults.map((result, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group max-w-2xl"
                      >
                        <div className="space-y-1">
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-normal truncate">
                            {result.url}
                          </p>
                          <h3 className="text-lg font-normal leading-snug cursor-pointer group-hover:underline" style={{ color: "#1a0dab" }}>
                            {result.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        {index < serpResults.length - 1 && (
                          <div className="mt-5 border-b border-dashed" />
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ============================================================ */}
          {/*  TAB 3 — Internal Links                                       */}
          {/* ============================================================ */}
          <TabsContent value="links">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Internal Link Structure</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Visualize how your pages link to each other. Hover over a node to highlight its connections.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border bg-muted/20 p-4 overflow-x-auto">
                      <svg
                        viewBox="0 0 600 380"
                        className="w-full max-w-2xl mx-auto"
                        style={{ minWidth: 400 }}
                      >
                        {/* Edges */}
                        {linkEdges.map((edge, i) => {
                          const from = getNodeById(edge.from)
                          const to = getNodeById(edge.to)
                          if (!from || !to) return null

                          const isHighlighted =
                            hoveredNode !== null &&
                            (edge.from === hoveredNode || edge.to === hoveredNode)
                          const isDimmed = hoveredNode !== null && !isHighlighted

                          return (
                            <line
                              key={i}
                              x1={from.x}
                              y1={from.y}
                              x2={to.x}
                              y2={to.y}
                              stroke={isHighlighted ? "#8b5cf6" : "#6b7280"}
                              strokeWidth={isHighlighted ? 2.5 : 1.5}
                              strokeOpacity={isDimmed ? 0.15 : isHighlighted ? 0.9 : 0.3}
                              className="transition-all duration-200"
                            />
                          )
                        })}

                        {/* Nodes */}
                        {linkNodes.map((node) => {
                          const isActive = hoveredNode === node.id
                          const isConnected = connectedNodeIds.has(node.id)
                          const isDimmed = hoveredNode !== null && !isConnected

                          return (
                            <g
                              key={node.id}
                              onMouseEnter={() => setHoveredNode(node.id)}
                              onMouseLeave={() => setHoveredNode(null)}
                              className="cursor-pointer"
                            >
                              <circle
                                cx={node.x}
                                cy={node.y}
                                r={isActive ? 28 : 24}
                                fill={node.color}
                                fillOpacity={isDimmed ? 0.2 : isActive ? 1 : 0.85}
                                stroke={isActive ? "#fff" : "transparent"}
                                strokeWidth={isActive ? 3 : 0}
                                className="transition-all duration-200"
                              />
                              <text
                                x={node.x}
                                y={node.y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="#fff"
                                fontSize={10}
                                fontWeight={600}
                                opacity={isDimmed ? 0.3 : 1}
                                className="pointer-events-none select-none transition-opacity duration-200"
                              >
                                {node.label}
                              </text>
                            </g>
                          )
                        })}
                      </svg>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-violet-500" />
                        Root
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        Main Sections
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        Sub Pages
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        Utility Pages
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ============================================================ */}
          {/*  TAB 4 — Broken Links                                         */}
          {/* ============================================================ */}
          <TabsContent value="broken">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileWarning className="h-4 w-4 text-red-500" />
                      Broken Links
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Links returning error status codes that need attention.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>URL</TableHead>
                            <TableHead>Referrer</TableHead>
                            <TableHead className="text-center">Status Code</TableHead>
                            <TableHead>Last Checked</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {seoData.brokenLinks.map((link, index) => (
                            <motion.tr
                              key={link.url}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border-b transition-colors hover:bg-muted/50"
                            >
                              <TableCell className="font-mono text-sm text-red-600 dark:text-red-400">
                                {link.url}
                              </TableCell>
                              <TableCell className="font-mono text-sm text-muted-foreground">
                                {link.referrer}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant="outline"
                                  className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 font-bold"
                                >
                                  {link.statusCode}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {link.lastChecked.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="gap-1.5">
                                  <RefreshCw className="h-3.5 w-3.5" />
                                  Fix
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {seoData.brokenLinks.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3" />
                        <h3 className="text-lg font-semibold">No broken links found</h3>
                        <p className="text-sm text-muted-foreground mt-1">All your internal links are working correctly.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ============================================================ */}
          {/*  TAB 5 — Schema Editor                                        */}
          {/* ============================================================ */}
          <TabsContent value="schema">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <CardTitle className="text-base">JSON-LD Schema Editor</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Edit and validate your structured data markup.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={handleValidateSchema}
                          className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-white"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Validate
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCopySchema}
                          className="gap-1.5"
                        >
                          {schemaCopied ? (
                            <>
                              <Check className="h-4 w-4 text-emerald-500" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {schemaValid !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm",
                          schemaValid
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                        )}
                      >
                        {schemaValid ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            <span>
                              <strong>Valid schema.</strong> Your JSON-LD markup is well-formed and contains required @context and @type fields.
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 flex-shrink-0" />
                            <span>
                              <strong>Invalid schema.</strong> Please check that your JSON is well-formed and includes @context and @type fields.
                            </span>
                          </>
                        )}
                      </motion.div>
                    )}
                    <Textarea
                      value={schemaCode}
                      onChange={(e) => {
                        setSchemaCode(e.target.value)
                        setSchemaValid(null)
                      }}
                      className="font-mono text-sm min-h-[400px] resize-y leading-relaxed"
                      spellCheck={false}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ============================================================ */}
          {/*  TAB 6 — Indexing                                             */}
          {/* ============================================================ */}
          <TabsContent value="indexing">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              {/* Index Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div variants={itemVariants}>
                  <Card className="border-emerald-500/20 bg-emerald-500/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Indexed</p>
                          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                            {seoData.indexStatus.indexed}
                          </p>
                        </div>
                        <div className="rounded-full p-3 bg-emerald-500/10">
                          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="border-amber-500/20 bg-amber-500/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Not Indexed</p>
                          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                            {seoData.indexStatus.notIndexed}
                          </p>
                        </div>
                        <div className="rounded-full p-3 bg-amber-500/10">
                          <AlertTriangle className="h-6 w-6 text-amber-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="border-red-500/20 bg-red-500/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Errors</p>
                          <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                            {seoData.indexStatus.errors}
                          </p>
                        </div>
                        <div className="rounded-full p-3 bg-red-500/10">
                          <XCircle className="h-6 w-6 text-red-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Indexed Pages Table */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Page Index Status</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Detailed crawl and index status for each page.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page URL</TableHead>
                            <TableHead className="text-center">Index Status</TableHead>
                            <TableHead>Last Crawled</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {indexedPages.map((page, index) => {
                            const statusBadge = getIndexStatusBadge(page.status)
                            return (
                              <motion.tr
                                key={page.url}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b transition-colors hover:bg-muted/50"
                              >
                                <TableCell className="font-mono text-sm">
                                  {page.url}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="outline" className={statusBadge.className}>
                                    {statusBadge.label}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {page.lastCrawled.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="outline" size="sm" className="gap-1.5">
                                    <RefreshCw className="h-3.5 w-3.5" />
                                    Request Indexing
                                  </Button>
                                </TableCell>
                              </motion.tr>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ============================================================ */}
          {/*  TAB 7 — Audit                                                */}
          {/* ============================================================ */}
          <TabsContent value="audit">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              {/* Overall Score */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      {/* Main Score Ring */}
                      <div className="flex flex-col items-center gap-2">
                        <SeoScoreRing score={87} size={120} strokeWidth={8} />
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                          Overall SEO Score
                        </p>
                      </div>

                      {/* Category Scores Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1">
                        {[
                          { label: "Content", score: 92 },
                          { label: "Technical", score: 85 },
                          { label: "Performance", score: 88 },
                          { label: "Backlinks", score: 72 },
                        ].map((category) => (
                          <div
                            key={category.label}
                            className="flex flex-col items-center gap-2"
                          >
                            <SeoScoreRing
                              score={category.score}
                              size={72}
                              strokeWidth={5}
                            />
                            <span className="text-xs font-medium text-muted-foreground">
                              {category.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommendations */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recommendations</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Actionable items to improve your SEO performance.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {auditRecommendations.map((rec, index) => {
                        const priorityBadge = getPriorityBadge(rec.priority)
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                          >
                            <Badge
                              variant="outline"
                              className={cn(
                                "mt-0.5 flex-shrink-0 text-xs",
                                priorityBadge.className
                              )}
                            >
                              {priorityBadge.label}
                            </Badge>
                            <div className="min-w-0">
                              <h4 className="text-sm font-semibold leading-tight">
                                {rec.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {rec.description}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
