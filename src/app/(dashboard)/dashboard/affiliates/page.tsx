"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  MousePointerClick,
  Percent,
  ShoppingCart,
  Link2,
  BarChart3,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { cn, formatNumber, formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { affiliateData } from "@/lib/mock-data"

/* ------------------------------------------------------------------ */
/*  Local Mock Data                                                    */
/* ------------------------------------------------------------------ */

const monthlyRevenueData = [
  { month: "Jul", revenue: 2800 },
  { month: "Aug", revenue: 3200 },
  { month: "Sep", revenue: 3800 },
  { month: "Oct", revenue: 4250 },
  { month: "Nov", revenue: 3900 },
  { month: "Dec", revenue: 4600 },
]

interface LinkRule {
  id: string
  name: string
  description: string
  enabled: boolean
}

const defaultRules: LinkRule[] = [
  {
    id: "rule-1",
    name: "Auto-insert Amazon links for product mentions",
    description:
      "Automatically detects product names in published articles and inserts Amazon Associates affiliate links with your tracking ID.",
    enabled: true,
  },
  {
    id: "rule-2",
    name: "Add ShareASale links to hosting reviews",
    description:
      "Scans hosting-related content and replaces plain URLs with ShareASale deep links to maximize commission earnings.",
    enabled: true,
  },
  {
    id: "rule-3",
    name: "Insert CJ links on software comparison pages",
    description:
      "Identifies software comparison articles and adds CJ Affiliate links to product names, CTAs, and pricing tables.",
    enabled: false,
  },
]

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
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
/*  Custom Tooltip                                                     */
/* ------------------------------------------------------------------ */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        border: "1px solid #2a2a4a",
        borderRadius: "8px",
        color: "#fff",
        padding: "10px 14px",
      }}
    >
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-violet-400 font-semibold">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function AffiliatesPage() {
  const [rules, setRules] = React.useState<LinkRule[]>(defaultRules)

  function toggleRule(id: string) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    )
  }

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
          Affiliate Manager
        </h1>
        <p className="text-muted-foreground mt-1">
          Track and optimize your affiliate partnerships.
        </p>
      </motion.div>

      {/* ── Affiliate Program Cards ────────────────────────────── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={cardStagger}
        initial="hidden"
        animate="show"
      >
        {affiliateData.programs.map((program) => (
          <motion.div key={program.name} variants={cardChild}>
            <Card className="relative group hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:border-violet-500/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold">
                    {program.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium",
                      program.status === "active"
                        ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/25"
                        : "bg-amber-500/15 text-amber-600 border-amber-500/25"
                    )}
                  >
                    <span
                      className={cn(
                        "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
                        program.status === "active"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      )}
                    />
                    {program.status === "active" ? "Active" : "Paused"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MousePointerClick className="h-3 w-3" />
                      Clicks
                    </div>
                    <p className="text-sm font-semibold">
                      {formatNumber(program.clicks)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ShoppingCart className="h-3 w-3" />
                      Conversions
                    </div>
                    <p className="text-sm font-semibold">
                      {formatNumber(program.conversions)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      Revenue
                    </div>
                    <p className="text-sm font-semibold text-emerald-600">
                      {formatCurrency(program.revenue)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Percent className="h-3 w-3" />
                      Commission
                    </div>
                    <p className="text-sm font-semibold">{program.rate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Monthly Revenue Chart ──────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-violet-500" />
              <CardTitle>Monthly Affiliate Revenue</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenueData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickFormatter={(v: number) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "hsl(var(--muted))", radius: 4 }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#8b5cf6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Link Insertion Rules ───────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Link2 className="h-5 w-5 text-violet-500" />
            Link Insertion Rules
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Automate affiliate link placement across your content.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rules.map((rule) => (
            <motion.div key={rule.id} variants={cardChild}>
              <Card
                className={cn(
                  "transition-all duration-300 hover:shadow-md",
                  rule.enabled
                    ? "border-violet-500/20 hover:shadow-violet-500/5"
                    : "opacity-75 hover:opacity-100"
                )}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-sm font-semibold leading-snug">
                      {rule.name}
                    </h3>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                      className="shrink-0 data-[state=checked]:bg-violet-500"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Top Converting Pages ───────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Top Converting Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Conversions</TableHead>
                    <TableHead className="text-right">
                      Conversion Rate
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliateData.topPages.map((page, index) => {
                    const conversionRate =
                      (page.conversions / page.clicks) * 100

                    return (
                      <motion.tr
                        key={page.title}
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
                        <TableCell className="text-right">
                          {formatNumber(page.clicks)}
                        </TableCell>
                        <TableCell className="text-right text-emerald-600 font-medium">
                          {formatCurrency(page.revenue)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(page.conversions)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className="bg-violet-500/10 text-violet-600 border-violet-500/25"
                          >
                            {conversionRate.toFixed(1)}%
                          </Badge>
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
  )
}
