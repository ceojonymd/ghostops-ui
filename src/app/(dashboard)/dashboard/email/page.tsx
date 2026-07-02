"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Send,
  Users,
  Eye,
  MousePointerClick,
  MoreHorizontal,
  Pencil,
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Check,
  TrendingUp,
  Calendar,
  FileText,
  Clock,
  Search,
  Plus,
  Link2,
  Globe,
  Twitter,
  Linkedin,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { cn, formatNumber } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/* ------------------------------------------------------------------ */
/*  Local Mock Data                                                    */
/* ------------------------------------------------------------------ */

interface Campaign {
  id: string
  name: string
  status: "sent" | "scheduled" | "draft"
  recipients: number | null
  openRate: number | null
  clickRate: number | null
  date: string
  dateLabel: string
}

const campaigns: Campaign[] = [
  {
    id: "camp-1",
    name: "Summer Product Launch",
    status: "sent",
    recipients: 12450,
    openRate: 42.3,
    clickRate: 8.7,
    date: "Jun 15",
    dateLabel: "Sent Jun 15",
  },
  {
    id: "camp-2",
    name: "Weekly Newsletter #48",
    status: "sent",
    recipients: 8920,
    openRate: 38.1,
    clickRate: 6.2,
    date: "Jun 22",
    dateLabel: "Sent Jun 22",
  },
  {
    id: "camp-3",
    name: "Flash Sale Announcement",
    status: "scheduled",
    recipients: 15200,
    openRate: null,
    clickRate: null,
    date: "Jul 5",
    dateLabel: "Scheduled Jul 5",
  },
  {
    id: "camp-4",
    name: "Onboarding Series",
    status: "draft",
    recipients: null,
    openRate: null,
    clickRate: null,
    date: "",
    dateLabel: "Not sent",
  },
]

const subscriberGrowthData = [
  { month: "Jan", subscribers: 18200 },
  { month: "Feb", subscribers: 19100 },
  { month: "Mar", subscribers: 20400 },
  { month: "Apr", subscribers: 21800 },
  { month: "May", subscribers: 23200 },
  { month: "Jun", subscribers: 24580 },
]

interface Segment {
  name: string
  count: number
  percentage: number
  color: string
}

const segments: Segment[] = [
  { name: "Active Subscribers", count: 18420, percentage: 74.9, color: "bg-violet-500" },
  { name: "New Subscribers (30d)", count: 2340, percentage: 9.5, color: "bg-emerald-500" },
  { name: "Inactive (90d+)", count: 3820, percentage: 15.6, color: "bg-amber-500" },
  { name: "VIP Customers", count: 1250, percentage: 5.1, color: "bg-blue-500" },
]

const steps = [
  { id: 1, label: "Template" },
  { id: 2, label: "Recipients" },
  { id: 3, label: "Schedule" },
  { id: 4, label: "Review" },
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

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Campaign["status"] }) {
  const config = {
    sent: {
      label: "Sent",
      dot: "bg-emerald-500",
      badge: "bg-emerald-500/15 text-emerald-600 border-emerald-500/25",
    },
    scheduled: {
      label: "Scheduled",
      dot: "bg-blue-500",
      badge: "bg-blue-500/15 text-blue-600 border-blue-500/25",
    },
    draft: {
      label: "Draft",
      dot: "bg-amber-500",
      badge: "bg-amber-500/15 text-amber-600 border-amber-500/25",
    },
  }

  const c = config[status]

  return (
    <Badge variant="outline" className={cn("text-xs font-medium", c.badge)}>
      <span className={cn("mr-1.5 inline-block h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </Badge>
  )
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
        {formatNumber(payload[0].value)} subscribers
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function EmailMarketingPage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* -- Page Header ------------------------------------------------- */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-muted-foreground mt-1">
            Create, manage, and track email campaigns.
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2 self-start">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </motion.div>

      {/* -- Campaign List ----------------------------------------------- */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-violet-500" />
                <CardTitle>Campaigns</CardTitle>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4 transition-all duration-200 hover:bg-muted/50 hover:border-violet-500/20 hover:shadow-sm"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                    <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                      {campaign.status === "sent" ? (
                        <Send className="h-4 w-4 text-violet-500" />
                      ) : campaign.status === "scheduled" ? (
                        <Clock className="h-4 w-4 text-blue-500" />
                      ) : (
                        <FileText className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{campaign.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={campaign.status} />
                        <span className="text-xs text-muted-foreground">
                          {campaign.dateLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8">
                    <div className="text-center min-w-[60px]">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                        <Users className="h-3 w-3" />
                        Recipients
                      </p>
                      <p className="text-sm font-semibold mt-0.5">
                        {campaign.recipients
                          ? formatNumber(campaign.recipients)
                          : "--"}
                      </p>
                    </div>
                    <div className="text-center min-w-[60px]">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                        <Eye className="h-3 w-3" />
                        Open Rate
                      </p>
                      <p className="text-sm font-semibold mt-0.5">
                        {campaign.openRate !== null
                          ? `${campaign.openRate}%`
                          : "--"}
                      </p>
                    </div>
                    <div className="text-center min-w-[60px]">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                        <MousePointerClick className="h-3 w-3" />
                        Click Rate
                      </p>
                      <p className="text-sm font-semibold mt-0.5">
                        {campaign.clickRate !== null
                          ? `${campaign.clickRate}%`
                          : "--"}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Copy className="h-3.5 w-3.5" />
                          Duplicate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}

              {filteredCampaigns.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No campaigns found matching your search.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* -- Template Editor Preview ------------------------------------- */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-violet-500" />
              <CardTitle>Template Preview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-muted/30 p-6 sm:p-8 flex justify-center">
              <div className="w-full max-w-[520px] bg-background rounded-lg shadow-lg border overflow-hidden">
                {/* Email header */}
                <div
                  className="px-6 py-8 text-center"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)",
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <Send className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">
                      GhostOps
                    </span>
                  </div>
                  <p className="text-violet-100 text-sm mt-1">
                    Your Weekly Product Update
                  </p>
                </div>

                {/* Email body */}
                <div className="px-6 py-6 space-y-4">
                  <p className="text-sm font-medium">
                    Hi{" "}
                    <span className="text-violet-600 bg-violet-500/10 px-1.5 py-0.5 rounded font-mono text-xs">
                      {"{{first_name}}"}
                    </span>
                    ,
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We are excited to share our latest platform updates with you.
                    This month, we have rolled out powerful new features designed
                    to supercharge your workflow and help you achieve better
                    results with less effort.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    From advanced analytics dashboards to AI-powered content
                    suggestions, there is something for everyone on your team.
                  </p>

                  {/* CTA */}
                  <div className="pt-2 pb-1 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer shadow-md shadow-violet-500/25">
                      Explore New Features
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <Separator />

                {/* Email footer */}
                <div className="px-6 py-5 bg-muted/50">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-violet-500/10 transition-colors cursor-pointer">
                      <Twitter className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-violet-500/10 transition-colors cursor-pointer">
                      <Linkedin className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-violet-500/10 transition-colors cursor-pointer">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                    GhostOps Inc. &middot; 123 Innovation Drive, San Francisco, CA 94105
                  </p>
                  <p className="text-[11px] text-center mt-1.5">
                    <span className="text-violet-600 hover:underline cursor-pointer">
                      Unsubscribe
                    </span>
                    <span className="text-muted-foreground mx-2">&middot;</span>
                    <span className="text-violet-600 hover:underline cursor-pointer">
                      Preferences
                    </span>
                    <span className="text-muted-foreground mx-2">&middot;</span>
                    <span className="text-violet-600 hover:underline cursor-pointer">
                      View in browser
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Template actions */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
                <Pencil className="h-4 w-4" />
                Edit Template
              </Button>
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* -- Subscriber Management --------------------------------------- */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-500" />
                <CardTitle>Subscriber Management</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-2xl font-bold tracking-tight">
                    {formatNumber(24580)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total Subscribers
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-500/15 text-emerald-600 border-emerald-500/25 gap-1 self-start"
                >
                  <TrendingUp className="h-3 w-3" />
                  +12.3%
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Growth Chart */}
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={subscriberGrowthData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="subscriberFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
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
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="subscribers"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    fill="url(#subscriberFill)"
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4, stroke: "#fff" }}
                    activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <Separator />

            {/* Segments */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Subscriber Segments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {segments.map((segment, index) => (
                  <motion.div
                    key={segment.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("h-3 w-3 rounded-full", segment.color)} />
                      <span className="text-sm font-medium">{segment.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">
                        {formatNumber(segment.count)}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs bg-violet-500/10 text-violet-600 border-violet-500/25 min-w-[52px] justify-center"
                      >
                        {segment.percentage}%
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* -- Send Campaign Flow ------------------------------------------ */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-violet-500" />
              <CardTitle>Send Campaign</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {/* Stepper */}
            <div className="flex items-center justify-center py-6">
              {steps.map((step, index) => {
                const isCompleted = step.id < currentStep
                const isActive = step.id === currentStep
                const isUpcoming = step.id > currentStep

                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                          isCompleted &&
                            "bg-emerald-500 border-emerald-500 text-white",
                          isActive &&
                            "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/30",
                          isUpcoming &&
                            "bg-transparent border-muted-foreground/30 text-muted-foreground"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium transition-colors",
                          isCompleted && "text-emerald-600",
                          isActive && "text-violet-600",
                          isUpcoming && "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 h-0.5 mx-3 mb-6 rounded-full transition-colors duration-300",
                          step.id < currentStep
                            ? "bg-emerald-500"
                            : step.id === currentStep
                              ? "bg-gradient-to-r from-violet-500 to-muted-foreground/20"
                              : "bg-muted-foreground/20"
                        )}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {/* Step content indicator */}
            <div className="rounded-lg border bg-muted/30 p-6 text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                {currentStep === 1 && <FileText className="h-5 w-5 text-violet-500" />}
                {currentStep === 2 && <Users className="h-5 w-5 text-violet-500" />}
                {currentStep === 3 && <Calendar className="h-5 w-5 text-violet-500" />}
                {currentStep === 4 && <Eye className="h-5 w-5 text-violet-500" />}
                <h3 className="text-lg font-semibold">
                  Step {currentStep}: {steps[currentStep - 1].label}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {currentStep === 1 &&
                  "Choose or customize an email template for your campaign. Select from pre-built designs or start from scratch."}
                {currentStep === 2 &&
                  "Select your target audience. Choose from existing segments or create a custom recipient list."}
                {currentStep === 3 &&
                  "Set the delivery schedule. Send immediately or schedule for the optimal time based on subscriber activity."}
                {currentStep === 4 &&
                  "Review all campaign details before sending. Verify template, recipients, and schedule settings."}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-xs text-muted-foreground">
                Step {currentStep} of {steps.length}
              </div>
              <Button
                onClick={() => setCurrentStep((s) => Math.min(steps.length, s + 1))}
                disabled={currentStep === steps.length}
                className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
              >
                {currentStep === steps.length ? "Send Campaign" : "Next"}
                {currentStep < steps.length && <ChevronRight className="h-4 w-4" />}
                {currentStep === steps.length && <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
