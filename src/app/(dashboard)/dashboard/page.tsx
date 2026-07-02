"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Edit,
  Clock,
  Globe,
  CheckCircle,
  Sparkles,
  Plus,
  Upload,
  Send,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { cn, formatNumber, timeAgo, getInitials } from "@/lib/utils";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  dashboardStats,
  trafficData,
  recentActivity,
  notifications,
  teamMembers,
} from "@/lib/mock-data";

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

const activityIcons: Record<string, { icon: typeof CheckCircle; color: string }> = {
  publish: { icon: CheckCircle, color: "text-emerald-500" },
  ai: { icon: Sparkles, color: "text-violet-500" },
  edit: { icon: Edit, color: "text-amber-500" },
  schedule: { icon: Clock, color: "text-blue-500" },
  draft: { icon: FileText, color: "text-zinc-500" },
};

const notificationDotColors: Record<string, string> = {
  success: "bg-emerald-500",
  info: "bg-blue-500",
  warning: "bg-amber-500",
};

const sparklineData = [45, 52, 38, 65, 72, 58, 82, 75, 90, 85, 95, 88];

export default function DashboardPage() {
  const aiCreditsPercentage = (dashboardStats.aiCredits.value / dashboardStats.aiCredits.max) * 100;
  const storagePercentage = (dashboardStats.storage.value / dashboardStats.storage.max) * 100;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (aiCreditsPercentage / 100) * circumference;

  const sparklinePoints = sparklineData
    .map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * 200;
      const y = 60 - (value / 100) * 50;
      return `${x},${y}`;
    })
    .join(" ");

  const sparklineAreaPoints = `0,60 ${sparklinePoints} 200,60`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here&apos;s what&apos;s happening with your content.
        </p>
      </motion.div>

      {/* Top Row - Stat Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          icon={FileText}
          label={dashboardStats.published.label}
          value={dashboardStats.published.value}
          change={dashboardStats.published.change}
          delay={0}
        />
        <StatCard
          icon={Edit}
          label={dashboardStats.drafts.label}
          value={dashboardStats.drafts.value}
          change={dashboardStats.drafts.change}
          delay={0.1}
        />
        <StatCard
          icon={Clock}
          label={dashboardStats.scheduled.label}
          value={dashboardStats.scheduled.value}
          change={dashboardStats.scheduled.change}
          delay={0.2}
        />
        <StatCard
          icon={Globe}
          label={dashboardStats.indexed.label}
          value={dashboardStats.indexed.value}
          change={dashboardStats.indexed.change}
          delay={0.3}
        />
      </motion.div>

      {/* Charts Row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Traffic Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ChartCard title="Traffic Overview">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a2e",
                    border: "1px solid #2a2a4a",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="traffic"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#trafficGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ChartCard title="Revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a2e",
                    border: "1px solid #2a2a4a",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      </motion.div>

      {/* Middle Row - Small Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* AI Credits Gauge */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Credits</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 60 60)"
                  className="transition-all duration-1000 ease-out"
                />
                <text
                  x="60"
                  y="56"
                  textAnchor="middle"
                  className="fill-foreground text-lg font-bold"
                  fontSize="18"
                >
                  {aiCreditsPercentage.toFixed(1)}%
                </text>
                <text
                  x="60"
                  y="72"
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  fontSize="10"
                >
                  used
                </text>
              </svg>
            </div>
            <p className="text-sm font-medium mt-2">
              {formatNumber(dashboardStats.aiCredits.value)} /{" "}
              {formatNumber(dashboardStats.aiCredits.max)}
            </p>
            <p className="text-xs text-muted-foreground">credits remaining</p>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Progress value={storagePercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{storagePercentage.toFixed(1)}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                {dashboardStats.storage.value} GB / {dashboardStats.storage.max} GB
              </p>
              <p className="text-xs text-muted-foreground">used</p>
            </div>
          </CardContent>
        </Card>

        {/* API Usage Sparkline */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Usage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <svg width="200" height="65" viewBox="0 0 200 65" className="w-full">
              <defs>
                <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <polygon
                points={sparklineAreaPoints}
                fill="url(#sparklineGradient)"
              />
              <polyline
                points={sparklinePoints}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs text-muted-foreground mt-2">
              Last 12 hours
            </p>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              {teamMembers.slice(0, 5).map((member, index) => (
                <Avatar
                  key={member.id}
                  className={cn(
                    "h-9 w-9 border-2 border-background",
                    index > 0 && "-ml-2"
                  )}
                >
                  <AvatarFallback className="text-xs bg-violet-500/10 text-violet-500">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {teamMembers.length > 5 && (
                <Badge
                  variant="secondary"
                  className="-ml-2 h-9 w-9 rounded-full flex items-center justify-center text-xs"
                >
                  +{teamMembers.length - 5}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {teamMembers.length} members
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom Section - Activity & Notifications */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentActivity.map((activity) => {
              const iconConfig = activityIcons[activity.type] || activityIcons.draft;
              const IconComponent = iconConfig.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={cn("mt-0.5", iconConfig.color)}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      <span className="font-medium">{activity.title}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {activity.user}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        &middot;
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(activity.time)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg transition-colors",
                  !notification.read && "bg-primary/5"
                )}
              >
                <div className="mt-1.5">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      notificationDotColors[notification.type] || "bg-zinc-500"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {timeAgo(notification.time)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
              <Button variant="outline" className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Generate
              </Button>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
              <Button variant="outline" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Status */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>All Systems Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>API</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>CDN</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
