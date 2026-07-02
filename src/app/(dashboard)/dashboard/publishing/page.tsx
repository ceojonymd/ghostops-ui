"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Globe,
  BookOpen,
  FileText,
  Code,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Pencil,
  Clock,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// ---------------------------------------------------------------------------
// Types & mock data
// ---------------------------------------------------------------------------

interface Platform {
  id: string
  name: string
  icon: React.ElementType
  connected: boolean
  enabled: boolean
}

interface QueueItem {
  id: string
  title: string
  date: Date
  platforms: string[]
  status: "scheduled" | "draft" | "published"
}

const INITIAL_PLATFORMS: Platform[] = [
  { id: "wordpress", name: "WordPress", icon: Globe, connected: true, enabled: true },
  { id: "medium", name: "Medium", icon: BookOpen, connected: true, enabled: true },
  { id: "ghost", name: "Ghost", icon: FileText, connected: false, enabled: false },
  { id: "custom", name: "Custom", icon: Code, connected: true, enabled: true },
]

const QUEUE_ITEMS: QueueItem[] = [
  {
    id: "q1",
    title: "10 Best Project Management Tools",
    date: new Date(2026, 6, 3, 9, 0),
    platforms: ["wordpress", "medium"],
    status: "scheduled",
  },
  {
    id: "q2",
    title: "Complete Guide to Remote Work",
    date: new Date(2026, 6, 7, 10, 0),
    platforms: ["wordpress"],
    status: "scheduled",
  },
  {
    id: "q3",
    title: "AI in Content Marketing",
    date: new Date(2026, 6, 10, 14, 0),
    platforms: ["wordpress", "medium", "ghost"],
    status: "draft",
  },
  {
    id: "q4",
    title: "SEO Trends for 2026",
    date: new Date(2026, 6, 14, 9, 0),
    platforms: ["wordpress"],
    status: "scheduled",
  },
  {
    id: "q5",
    title: "Email Marketing Automation",
    date: new Date(2026, 6, 18, 11, 0),
    platforms: ["wordpress", "medium"],
    status: "scheduled",
  },
  {
    id: "q6",
    title: "Social Media Strategy Guide",
    date: new Date(2026, 6, 22, 15, 0),
    platforms: ["wordpress"],
    status: "draft",
  },
]

// Days that have scheduled-post dots (1-indexed day of month)
const SCHEDULED_DAYS: Record<number, string[]> = {
  3: ["violet", "emerald"],
  7: ["violet"],
  10: ["violet", "emerald", "blue"],
  14: ["violet"],
  18: ["violet", "emerald"],
  22: ["violet"],
  25: ["blue", "emerald"],
  28: ["violet", "blue"],
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatQueueDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatQueueTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

const PLATFORM_BADGE_COLORS: Record<string, string> = {
  wordpress: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  medium: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  ghost: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  custom: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
}

const STATUS_BADGE_VARIANTS: Record<
  string,
  string
> = {
  scheduled:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  draft:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  published:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800",
}

const DOT_COLORS: Record<string, string> = {
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PublishingPage() {
  const [platforms, setPlatforms] = React.useState<Platform[]>(INITIAL_PLATFORMS)
  const [currentMonth, setCurrentMonth] = React.useState(6) // July (0-indexed)
  const [currentYear, setCurrentYear] = React.useState(2026)

  // --- Platform toggle handler ---
  const togglePlatform = (id: string) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    )
  }

  // --- Calendar navigation ---
  const goToPrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1)
        return 11
      }
      return prev - 1
    })
  }

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1)
        return 0
      }
      return prev + 1
    })
  }

  // --- Build calendar grid ---
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  // Previous month overflow
  const prevMonthDays = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  )

  const calendarCells: {
    day: number
    isCurrentMonth: boolean
    dots: string[]
  }[] = []

  // Leading days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarCells.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      dots: [],
    })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      dots: SCHEDULED_DAYS[d] ?? [],
    })
  }

  // Trailing days to fill last row
  const remaining = 7 - (calendarCells.length % 7)
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      calendarCells.push({ day: i, isCurrentMonth: false, dots: [] })
    }
  }

  // --- Today check ---
  const today = new Date()
  const isToday = (day: number, isCurrent: boolean) =>
    isCurrent &&
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Page Header                                                      */}
      {/* ---------------------------------------------------------------- */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Publishing Queue</h1>
        <p className="text-muted-foreground mt-1">
          Schedule and manage content across platforms.
        </p>
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* Platform Toggles                                                 */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {platforms.map((platform) => {
          const Icon = platform.icon
          return (
            <Card
              key={platform.id}
              className={cn(
                "transition-all duration-200",
                platform.enabled
                  ? "border-violet-500/40 shadow-sm shadow-violet-500/10"
                  : "border-border"
              )}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      platform.enabled
                        ? "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none">
                      {platform.name}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        platform.connected
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      )}
                    >
                      {platform.connected ? "Connected" : "Disconnected"}
                    </p>
                  </div>
                </div>

                <Switch
                  checked={platform.enabled}
                  onCheckedChange={() => togglePlatform(platform.id)}
                />
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* Calendar                                                         */}
      {/* ---------------------------------------------------------------- */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Content Calendar</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goToPrevMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous month</span>
                </Button>
                <span className="text-sm font-semibold min-w-[120px] text-center">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goToNextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next month</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Day names */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_NAMES.map((name) => (
                <div
                  key={name}
                  className="text-center text-xs font-medium text-muted-foreground py-2"
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 border-t border-l">
              {calendarCells.map((cell, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "min-h-[80px] border-r border-b p-1.5 transition-colors",
                    !cell.isCurrentMonth && "bg-muted/40",
                    cell.isCurrentMonth && "bg-background",
                    isToday(cell.day, cell.isCurrentMonth) &&
                      "ring-2 ring-inset ring-violet-500"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-medium",
                      !cell.isCurrentMonth && "text-muted-foreground/50",
                      isToday(cell.day, cell.isCurrentMonth) &&
                        "text-violet-600 dark:text-violet-400 font-bold"
                    )}
                  >
                    {cell.day}
                  </span>

                  {cell.dots.length > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      {cell.dots.map((color, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={cn(
                            "h-2 w-2 rounded-full",
                            DOT_COLORS[color]
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                WordPress
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Medium
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Ghost / Custom
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* Queue List                                                       */}
      {/* ---------------------------------------------------------------- */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scheduled Queue</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {QUEUE_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.06 }}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border p-4",
                  "hover:bg-muted/50 transition-colors group"
                )}
              >
                {/* Drag handle */}
                <GripVertical className="hidden sm:block h-5 w-5 shrink-0 text-muted-foreground/40 cursor-grab" />

                {/* Title + datetime */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatQueueDate(item.date)} at {formatQueueTime(item.date)}
                  </p>
                </div>

                {/* Platform badges */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.platforms.map((pid) => (
                    <span
                      key={pid}
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize",
                        PLATFORM_BADGE_COLORS[pid]
                      )}
                    >
                      {pid}
                    </span>
                  ))}
                </div>

                {/* Status badge */}
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize shrink-0",
                    STATUS_BADGE_VARIANTS[item.status]
                  )}
                >
                  {item.status}
                </Badge>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    Reschedule
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
                  >
                    <XCircle className="h-3.5 w-3.5 mr-1" />
                    Cancel
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
