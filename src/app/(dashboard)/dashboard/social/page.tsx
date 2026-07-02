"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  MessageCircle,
  Briefcase,
  Users,
  Camera,
  Heart,
  Repeat2,
  MessageSquare,
  Share2,
  ThumbsUp,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  CalendarClock,
  ImageIcon,
  MousePointerClick,
  TrendingUp,
  Eye,
} from "lucide-react"

import { cn, formatNumber } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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
}

/* ------------------------------------------------------------------ */
/*  Types & mock data                                                  */
/* ------------------------------------------------------------------ */

interface SocialAccount {
  id: string
  platform: string
  icon: React.ElementType | null
  iconLabel?: string
  handle: string
  followers: string
  connected: boolean
  color: string
  bgColor: string
}

interface ScheduleItem {
  id: string
  platform: string
  title: string
  day: number // 0=Mon .. 6=Sun
  hour: number // 9-17
  color: string
}

interface PlatformAnalytics {
  platform: string
  icon: React.ElementType | null
  iconLabel?: string
  color: string
  impressions: number
  engagementRate: number
  clicks: number
  growth: number
}

const initialAccounts: SocialAccount[] = [
  {
    id: "twitter",
    platform: "Twitter / X",
    icon: null,
    iconLabel: "X",
    handle: "@ghostops",
    followers: "24.5K",
    connected: true,
    color: "text-zinc-900 dark:text-zinc-100",
    bgColor: "bg-zinc-100 dark:bg-zinc-800",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    icon: Briefcase,
    handle: "GhostOps AI",
    followers: "18.2K",
    connected: true,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: "facebook",
    platform: "Facebook",
    icon: Users,
    handle: "GhostOps",
    followers: "32.1K",
    connected: false,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: "instagram",
    platform: "Instagram",
    icon: Camera,
    handle: "@ghostops.ai",
    followers: "15.8K",
    connected: false,
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950",
  },
]

const scheduleItems: ScheduleItem[] = [
  { id: "s1", platform: "Twitter", title: "Product launch teaser", day: 0, hour: 10, color: "bg-zinc-700 dark:bg-zinc-500" },
  { id: "s2", platform: "LinkedIn", title: "Case study share", day: 1, hour: 14, color: "bg-blue-600" },
  { id: "s3", platform: "Twitter", title: "Tips thread", day: 2, hour: 11, color: "bg-zinc-700 dark:bg-zinc-500" },
  { id: "s4", platform: "Facebook", title: "Community poll", day: 3, hour: 15, color: "bg-blue-500" },
  { id: "s5", platform: "LinkedIn", title: "Team spotlight", day: 5, hour: 9, color: "bg-blue-600" },
]

const analyticsData: PlatformAnalytics[] = [
  {
    platform: "Twitter / X",
    icon: null,
    iconLabel: "X",
    color: "text-zinc-900 dark:text-zinc-100",
    impressions: 142300,
    engagementRate: 4.8,
    clicks: 3840,
    growth: 12.3,
  },
  {
    platform: "LinkedIn",
    icon: Briefcase,
    color: "text-blue-600",
    impressions: 98500,
    engagementRate: 6.2,
    clicks: 2150,
    growth: 8.7,
  },
  {
    platform: "Facebook",
    icon: Users,
    color: "text-blue-500",
    impressions: 215700,
    engagementRate: 3.1,
    clicks: 5420,
    growth: -2.4,
  },
  {
    platform: "Instagram",
    icon: Camera,
    color: "text-pink-500",
    impressions: 67200,
    engagementRate: 7.5,
    clicks: 1890,
    growth: 15.1,
  },
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17] as const
const MAX_CHARS = 280

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SocialPage() {
  const [accounts, setAccounts] = React.useState<SocialAccount[]>(initialAccounts)
  const [postContent, setPostContent] = React.useState("")

  const toggleConnection = (id: string) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, connected: !a.connected } : a))
    )
  }

  const charCount = postContent.length

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ---- Page Header ---- */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Social Media</h1>
        <p className="text-muted-foreground mt-1">
          Manage your social presence and schedule posts.
        </p>
      </motion.div>

      {/* ---- Connected Accounts ---- */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((account) => {
            const IconComp = account.icon
            return (
              <Card key={account.id} className="relative overflow-hidden">
                <CardContent className="pt-6 pb-5 flex flex-col items-center text-center gap-3">
                  {/* Icon */}
                  <div
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center",
                      account.bgColor
                    )}
                  >
                    {IconComp ? (
                      <IconComp className={cn("h-6 w-6", account.color)} />
                    ) : (
                      <span className={cn("text-xl font-bold", account.color)}>
                        {account.iconLabel}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="font-semibold">{account.platform}</p>
                    <p className="text-sm text-muted-foreground">
                      {account.handle}
                    </p>
                  </div>

                  {/* Followers */}
                  <p className="text-2xl font-bold">{account.followers}</p>
                  <p className="text-xs text-muted-foreground -mt-2">
                    followers
                  </p>

                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        account.connected ? "bg-emerald-500" : "bg-red-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium",
                        account.connected
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {account.connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>

                  {/* Toggle button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 w-full"
                    onClick={() => toggleConnection(account.id)}
                  >
                    {account.connected ? "Disconnect" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </motion.div>

      {/* ---- Post Composer ---- */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Post Composer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Textarea + counter */}
            <div>
              <Textarea
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={MAX_CHARS}
              />
              <p
                className={cn(
                  "text-xs mt-1.5 text-right",
                  charCount > MAX_CHARS * 0.9
                    ? "text-red-500"
                    : "text-muted-foreground"
                )}
              >
                {charCount}/{MAX_CHARS}
              </p>
            </div>

            {/* Platform preview tabs */}
            <Tabs defaultValue="twitter">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="twitter" className="gap-1.5">
                  <span className="font-bold text-xs">X</span>
                  Twitter
                </TabsTrigger>
                <TabsTrigger value="linkedin" className="gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  LinkedIn
                </TabsTrigger>
                <TabsTrigger value="facebook" className="gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Facebook
                </TabsTrigger>
                <TabsTrigger value="instagram" className="gap-1.5">
                  <Camera className="h-3.5 w-3.5" />
                  Instagram
                </TabsTrigger>
              </TabsList>

              {/* -- Twitter Preview -- */}
              <TabsContent value="twitter">
                <div className="rounded-lg border p-4 space-y-3 max-w-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-violet-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      G
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm">GhostOps</span>
                        <span className="text-xs text-muted-foreground">
                          @ghostops
                        </span>
                      </div>
                      <p className="text-sm mt-1 whitespace-pre-wrap break-words">
                        {postContent || (
                          <span className="text-muted-foreground italic">
                            Your post will appear here...
                          </span>
                        )}
                      </p>
                      {/* Engagement row */}
                      <div className="flex items-center gap-6 mt-3 text-muted-foreground">
                        <button className="flex items-center gap-1 text-xs hover:text-blue-500 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span>0</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs hover:text-emerald-500 transition-colors">
                          <Repeat2 className="h-4 w-4" />
                          <span>0</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span>0</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs hover:text-blue-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* -- LinkedIn Preview -- */}
              <TabsContent value="linkedin">
                <div className="rounded-lg border p-4 space-y-3 max-w-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      G
                    </div>
                    <div>
                      <p className="font-semibold text-sm">GhostOps AI</p>
                      <p className="text-xs text-muted-foreground">
                        AI-Powered Content Platform &middot; 18,200 followers
                      </p>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {postContent || (
                      <span className="text-muted-foreground italic">
                        Your post will appear here...
                      </span>
                    )}
                  </p>
                  <div className="border-t pt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      Like
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      Comment
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </TabsContent>

              {/* -- Facebook Preview -- */}
              <TabsContent value="facebook">
                <div className="rounded-lg border p-4 space-y-3 max-w-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      G
                    </div>
                    <div>
                      <p className="font-semibold text-sm">GhostOps</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {postContent || (
                      <span className="text-muted-foreground italic">
                        Your post will appear here...
                      </span>
                    )}
                  </p>
                  <div className="border-t pt-2 grid grid-cols-3 text-center text-xs text-muted-foreground">
                    <button className="flex items-center justify-center gap-1 py-1 hover:bg-muted rounded transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      Like
                    </button>
                    <button className="flex items-center justify-center gap-1 py-1 hover:bg-muted rounded transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      Comment
                    </button>
                    <button className="flex items-center justify-center gap-1 py-1 hover:bg-muted rounded transition-colors">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </TabsContent>

              {/* -- Instagram Preview -- */}
              <TabsContent value="instagram">
                <div className="rounded-lg border overflow-hidden max-w-lg">
                  {/* Header */}
                  <div className="flex items-center gap-2 p-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      G
                    </div>
                    <span className="font-semibold text-sm">ghostops.ai</span>
                  </div>
                  {/* Image placeholder */}
                  <div className="w-full aspect-square bg-muted flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImageIcon className="h-10 w-10" />
                      <span className="text-xs">Image preview</span>
                    </div>
                  </div>
                  {/* Engagement */}
                  <div className="p-3 space-y-2">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <Heart className="h-5 w-5 cursor-pointer hover:text-red-500 transition-colors" />
                      <MessageSquare className="h-5 w-5 cursor-pointer hover:text-foreground transition-colors" />
                      <Send className="h-5 w-5 cursor-pointer hover:text-foreground transition-colors" />
                    </div>
                    <p className="text-sm">
                      <span className="font-semibold">ghostops.ai</span>{" "}
                      <span className="whitespace-pre-wrap break-words">
                        {postContent || (
                          <span className="text-muted-foreground italic">
                            Your caption will appear here...
                          </span>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" className="gap-2">
                <CalendarClock className="h-4 w-4" />
                Schedule
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
                <Send className="h-4 w-4" />
                Post Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ---- Weekly Schedule ---- */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Day headers */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-px">
                <div /> {/* spacer for time column */}
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground pb-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Time grid */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-px rounded-lg border overflow-hidden bg-border">
                {HOURS.map((hour) => (
                  <React.Fragment key={hour}>
                    {/* Time label */}
                    <div className="bg-background p-2 text-xs text-muted-foreground text-right pr-3 flex items-start justify-end">
                      {hour <= 12
                        ? `${hour} AM`
                        : `${hour - 12} PM`}
                    </div>

                    {/* 7 day cells */}
                    {DAYS.map((_, dayIdx) => {
                      const item = scheduleItems.find(
                        (s) => s.day === dayIdx && s.hour === hour
                      )
                      return (
                        <div
                          key={`${hour}-${dayIdx}`}
                          className="bg-background min-h-[48px] p-1 relative"
                        >
                          {item && (
                            <div
                              className={cn(
                                "rounded px-2 py-1 text-[11px] text-white leading-tight truncate",
                                item.color
                              )}
                            >
                              <span className="font-medium block truncate">
                                {item.platform}
                              </span>
                              <span className="opacity-80 block truncate">
                                {item.title}
                              </span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ---- Platform Analytics ---- */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold mb-4">Platform Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.map((data) => {
            const IconComp = data.icon
            const isPositive = data.growth >= 0
            return (
              <Card key={data.platform}>
                <CardContent className="pt-5 pb-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {IconComp ? (
                        <IconComp className={cn("h-5 w-5", data.color)} />
                      ) : (
                        <span className={cn("text-base font-bold", data.color)}>
                          {data.iconLabel}
                        </span>
                      )}
                      <span className="text-sm font-medium">{data.platform}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[11px] gap-0.5",
                        isPositive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(data.growth)}%
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        Impressions
                      </span>
                      <span className="font-medium">
                        {formatNumber(data.impressions)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Engagement
                      </span>
                      <span className="font-medium">{data.engagementRate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <MousePointerClick className="h-3.5 w-3.5" />
                        Clicks
                      </span>
                      <span className="font-medium">
                        {formatNumber(data.clicks)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
