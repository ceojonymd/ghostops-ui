"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Plus,
  X,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Globe,
  Link2,
  Search,
} from "lucide-react"

import { cn, formatNumber } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { SeoScoreRing } from "@/components/dashboard/seo-score-ring"

/* ------------------------------------------------------------------ */
/*  Mock Data                                                         */
/* ------------------------------------------------------------------ */

interface Competitor {
  id: string
  domain: string
  da: number
  monthlyTraffic: number
  topKeywords: number
  backlinks: number
}

const competitors: Competitor[] = [
  {
    id: "1",
    domain: "techblog.io",
    da: 72,
    monthlyTraffic: 245000,
    topKeywords: 1840,
    backlinks: 12400,
  },
  {
    id: "2",
    domain: "contentking.com",
    da: 68,
    monthlyTraffic: 189000,
    topKeywords: 1420,
    backlinks: 8900,
  },
  {
    id: "3",
    domain: "blogmaster.io",
    da: 61,
    monthlyTraffic: 156000,
    topKeywords: 980,
    backlinks: 6200,
  },
  {
    id: "4",
    domain: "writepro.co",
    da: 55,
    monthlyTraffic: 98000,
    topKeywords: 640,
    backlinks: 3800,
  },
]

interface ContentGapRow {
  keyword: string
  yourPosition: number | null
  competitorPosition: number
  volume: number
  opportunity: "High" | "Medium" | "Low"
}

const contentGapData: ContentGapRow[] = [
  {
    keyword: "best seo tools 2025",
    yourPosition: null,
    competitorPosition: 3,
    volume: 22000,
    opportunity: "High",
  },
  {
    keyword: "ai content generator",
    yourPosition: 18,
    competitorPosition: 2,
    volume: 33000,
    opportunity: "High",
  },
  {
    keyword: "blog post templates",
    yourPosition: 12,
    competitorPosition: 5,
    volume: 18500,
    opportunity: "Medium",
  },
  {
    keyword: "content calendar tool",
    yourPosition: 25,
    competitorPosition: 4,
    volume: 14200,
    opportunity: "Medium",
  },
  {
    keyword: "seo writing assistant",
    yourPosition: 8,
    competitorPosition: 1,
    volume: 9800,
    opportunity: "Low",
  },
  {
    keyword: "automated blog posting",
    yourPosition: null,
    competitorPosition: 7,
    volume: 7600,
    opportunity: "High",
  },
]

interface CompetingPage {
  title: string
  domain: string
  traffic: number
  keywords: number
  backlinks: number
}

const topCompetingPages: CompetingPage[] = [
  {
    title: "Ultimate SEO Guide 2025",
    domain: "techblog.io",
    traffic: 45200,
    keywords: 342,
    backlinks: 890,
  },
  {
    title: "AI Writing Tools Compared",
    domain: "contentking.com",
    traffic: 38100,
    keywords: 256,
    backlinks: 654,
  },
  {
    title: "Content Marketing Playbook",
    domain: "blogmaster.io",
    traffic: 29800,
    keywords: 198,
    backlinks: 432,
  },
  {
    title: "How to Start a Blog",
    domain: "techblog.io",
    traffic: 24500,
    keywords: 167,
    backlinks: 321,
  },
  {
    title: "Email Marketing Automation",
    domain: "writepro.co",
    traffic: 18900,
    keywords: 134,
    backlinks: 245,
  },
]

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

const cardStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardChild = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function opportunityBadge(level: "High" | "Medium" | "Low") {
  const classes: Record<string, string> = {
    High: "bg-emerald-500/15 text-emerald-600 border-emerald-500/25",
    Medium: "bg-amber-500/15 text-amber-600 border-amber-500/25",
    Low: "bg-zinc-500/15 text-zinc-600 border-zinc-500/25",
  }
  return (
    <Badge variant="outline" className={classes[level]}>
      {level}
    </Badge>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                    */
/* ------------------------------------------------------------------ */

export default function CompetitorsPage() {
  const [newCompetitor, setNewCompetitor] = React.useState("")

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* ── Page Header ─────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">
          Competitor Analysis
        </h1>
        <p className="text-muted-foreground mt-1">
          Track and analyze your competitors&apos; content strategies.
        </p>
      </motion.div>

      {/* ── Add Competitor ──────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <Input
          className="flex-1"
          placeholder="Enter a competitor domain (e.g., competitor.com)"
          value={newCompetitor}
          onChange={(e) => setNewCompetitor(e.target.value)}
        />
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
      </motion.div>

      {/* ── Competitor Domain Cards ─────────────────────────────── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={cardStagger}
        initial="hidden"
        animate="show"
      >
        {competitors.map((c) => (
          <motion.div key={c.id} variants={cardChild}>
            <Card className="relative group">
              {/* Remove button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove {c.domain}</span>
              </Button>

              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  {c.domain}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* DA Score Ring */}
                <div className="flex justify-center">
                  <SeoScoreRing score={c.da} size={64} strokeWidth={5} />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Traffic</p>
                    <p className="font-semibold text-sm">
                      {formatNumber(c.monthlyTraffic)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Keywords</p>
                    <p className="font-semibold text-sm">
                      {formatNumber(c.topKeywords)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Backlinks</p>
                    <p className="font-semibold text-sm">
                      {formatNumber(c.backlinks)}
                    </p>
                  </div>
                </div>

                {/* View Details */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between"
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Content Gap Analysis ────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Content Gap Analysis</CardTitle>
            <CardDescription>
              Keywords your competitors rank for that you don&apos;t.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Your Position</TableHead>
                    <TableHead>Competitor Position</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead>Opportunity Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentGapData.map((row, index) => {
                    const yourIsBetter =
                      row.yourPosition !== null &&
                      row.yourPosition < row.competitorPosition
                    const yourIsWorse =
                      row.yourPosition === null ||
                      row.yourPosition > row.competitorPosition

                    return (
                      <motion.tr
                        key={row.keyword}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: index * 0.05,
                        }}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Search className="h-3.5 w-3.5 text-muted-foreground" />
                            {row.keyword}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {row.yourPosition === null ? (
                              <span className="text-red-500 font-medium">
                                &ndash;
                              </span>
                            ) : (
                              <span
                                className={cn(
                                  "font-semibold",
                                  yourIsBetter
                                    ? "text-primary"
                                    : "text-red-500"
                                )}
                              >
                                #{row.yourPosition}
                              </span>
                            )}
                            {yourIsWorse ? (
                              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                            ) : (
                              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-primary">
                            #{row.competitorPosition}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(row.volume)}
                        </TableCell>
                        <TableCell>
                          {opportunityBadge(row.opportunity)}
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

      {/* ── Keyword Overlap ─────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Keyword Overlap</CardTitle>
            <CardDescription>
              Visualize the keyword overlap between you and your competitors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {/* Venn Diagram SVG */}
              <svg
                width="400"
                height="250"
                viewBox="0 0 400 250"
                className="max-w-full"
              >
                {/* Your site circle */}
                <circle
                  cx="155"
                  cy="130"
                  r="90"
                  fill="#8b5cf6"
                  fillOpacity="0.15"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
                {/* Competitor circle */}
                <circle
                  cx="245"
                  cy="130"
                  r="90"
                  fill="#3b82f6"
                  fillOpacity="0.15"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />

                {/* Label: You */}
                <text
                  x="110"
                  y="120"
                  textAnchor="middle"
                  className="fill-foreground text-sm font-semibold"
                  fontSize="14"
                >
                  You
                </text>
                <text
                  x="110"
                  y="140"
                  textAnchor="middle"
                  className="fill-violet-500 text-lg font-bold"
                  fontSize="18"
                >
                  1,240
                </text>

                {/* Label: Competitor */}
                <text
                  x="290"
                  y="120"
                  textAnchor="middle"
                  className="fill-foreground text-sm font-semibold"
                  fontSize="14"
                >
                  techblog.io
                </text>
                <text
                  x="290"
                  y="140"
                  textAnchor="middle"
                  className="fill-blue-500 text-lg font-bold"
                  fontSize="18"
                >
                  1,840
                </text>

                {/* Label: Overlap */}
                <text
                  x="200"
                  y="125"
                  textAnchor="middle"
                  className="fill-foreground text-xs font-medium"
                  fontSize="12"
                >
                  Shared
                </text>
                <text
                  x="200"
                  y="145"
                  textAnchor="middle"
                  className="fill-foreground text-base font-bold"
                  fontSize="16"
                >
                  486
                </text>
              </svg>

              {/* Stats Row */}
              <div className="flex items-center justify-center gap-8 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-violet-500" />
                  <span className="text-sm text-muted-foreground">
                    Unique to You:
                  </span>
                  <span className="font-semibold">754</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    Shared:
                  </span>
                  <span className="font-semibold">486</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    Unique to Competitor:
                  </span>
                  <span className="font-semibold">1,354</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Top Competing Pages ─────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Top Competing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page Title</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead className="text-right">Traffic</TableHead>
                    <TableHead className="text-right">Keywords</TableHead>
                    <TableHead className="text-right">Backlinks</TableHead>
                    <TableHead className="w-[80px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCompetingPages.map((page, index) => (
                    <motion.tr
                      key={`${page.domain}-${page.title}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.05,
                      }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        {page.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Link2 className="h-3.5 w-3.5" />
                          {page.domain}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(page.traffic)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(page.keywords)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(page.backlinks)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Analyze
                        </Button>
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
  )
}
