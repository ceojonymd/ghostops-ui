"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  MousePointerClick,
  Users,
  TrendingDown,
  Clock,
  Layers,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { cn, formatNumber, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trafficData, analyticsData } from "@/lib/mock-data";

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

const topArticles = [
  { title: "10 Best AI Writing Tools for 2025", pageviews: 28340, uniqueVisitors: 21200, avgTime: "4:12", bounceRate: 28.4 },
  { title: "Complete Guide to SEO in 2025", pageviews: 24100, uniqueVisitors: 18900, avgTime: "5:38", bounceRate: 22.1 },
  { title: "WordPress vs Ghost: Which is Better?", pageviews: 19850, uniqueVisitors: 15600, avgTime: "6:02", bounceRate: 19.8 },
  { title: "Affiliate Marketing for Beginners", pageviews: 17200, uniqueVisitors: 13400, avgTime: "3:55", bounceRate: 31.2 },
  { title: "Email Marketing Best Practices", pageviews: 15600, uniqueVisitors: 12100, avgTime: "3:28", bounceRate: 35.6 },
  { title: "How to Start a Profitable Blog", pageviews: 13400, uniqueVisitors: 10800, avgTime: "4:45", bounceRate: 26.3 },
  { title: "Content Marketing Strategy Guide", pageviews: 11200, uniqueVisitors: 8900, avgTime: "5:15", bounceRate: 24.7 },
  { title: "Social Media Marketing Trends", pageviews: 9800, uniqueVisitors: 7600, avgTime: "2:58", bounceRate: 38.9 },
];

const DEVICE_COLORS = ["#8b5cf6", "#10b981", "#f59e0b"];

const countryFlags: Record<string, string> = {
  "United States": "\u{1F1FA}\u{1F1F8}",
  "United Kingdom": "\u{1F1EC}\u{1F1E7}",
  "Canada": "\u{1F1E8}\u{1F1E6}",
  "Australia": "\u{1F1E6}\u{1F1FA}",
  "Germany": "\u{1F1E9}\u{1F1EA}",
};

const metricCards = [
  {
    label: "Pageviews",
    value: formatNumber(analyticsData.overview.pageviews),
    icon: Eye,
    color: "bg-violet-500/10 text-violet-500",
  },
  {
    label: "Sessions",
    value: formatNumber(analyticsData.overview.sessions),
    icon: MousePointerClick,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    label: "Users",
    value: formatNumber(analyticsData.overview.users),
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    label: "Bounce Rate",
    value: `${analyticsData.overview.bounceRate}%`,
    icon: TrendingDown,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    label: "Avg Duration",
    value: analyticsData.overview.avgDuration,
    icon: Clock,
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    label: "Pages/Session",
    value: analyticsData.overview.pagesPerSession.toString(),
    icon: Layers,
    color: "bg-cyan-500/10 text-cyan-500",
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your site performance, traffic, and audience insights.
          </p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        {metricCards.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        metric.color
                      )}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-2xl font-bold tracking-tight">
                        {metric.value}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Row: Traffic + Revenue */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Traffic AreaChart */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Traffic Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient
                    id="analyticsTrafficGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#8b5cf6"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => formatNumber(v)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a2e",
                    border: "1px solid #2a2a4a",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => [
                    formatNumber(value),
                    "Traffic",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="traffic"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#analyticsTrafficGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue BarChart */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${formatNumber(v)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a2e",
                    border: "1px solid #2a2a4a",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Articles Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Top Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Pageviews</TableHead>
                  <TableHead className="text-right">
                    Unique Visitors
                  </TableHead>
                  <TableHead className="text-right">Avg Time</TableHead>
                  <TableHead className="text-right">Bounce Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topArticles.map((article) => (
                  <TableRow key={article.title}>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      {article.title}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(article.pageviews)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(article.uniqueVisitors)}
                    </TableCell>
                    <TableCell className="text-right">
                      {article.avgTime}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          article.bounceRate < 25
                            ? "bg-emerald-500/10 text-emerald-500"
                            : article.bounceRate < 35
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-rose-500/10 text-rose-500"
                        )}
                      >
                        {article.bounceRate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom Row: Devices + Countries + Search Engines */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Devices PieChart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.devices}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  strokeWidth={0}
                >
                  {analyticsData.devices.map((_, index) => (
                    <Cell
                      key={`device-cell-${index}`}
                      fill={DEVICE_COLORS[index % DEVICE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a2e",
                    border: "1px solid #2a2a4a",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => [`${value}%`, "Share"]}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => (
                    <span className="text-sm text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Countries List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Top Countries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.countries.map((country) => (
              <div key={country.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {countryFlags[country.name] || "\u{1F30D}"}
                    </span>
                    <span className="text-sm font-medium">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {formatNumber(country.visitors)}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {country.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-violet-500 transition-all duration-500"
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Search Engines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Search Engines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {analyticsData.searchEngines.map((engine) => (
              <div key={engine.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{engine.name}</span>
                  <span className="text-sm font-semibold text-violet-500">
                    {engine.percentage}%
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500"
                    style={{ width: `${engine.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
