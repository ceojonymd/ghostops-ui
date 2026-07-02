"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Cpu,
  HardDrive,
  Clock,
  Activity,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Users,
  Pencil,
  Trash2,
  Ban,
  Package,
  Key,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Link from "next/link";
import { cn, timeAgo } from "@/lib/utils";
import { adminData } from "@/lib/mock-data";
import { ChartCard } from "@/components/dashboard/chart-card";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const aiCreditsData = [
  { day: "Mon", credits: 1200 },
  { day: "Tue", credits: 980 },
  { day: "Wed", credits: 1450 },
  { day: "Thu", credits: 1100 },
  { day: "Fri", credits: 1340 },
  { day: "Sat", credits: 780 },
  { day: "Sun", credits: 990 },
];

const mockUsers = [
  {
    name: "Sarah Chen",
    email: "sarah@ghostops.ai",
    role: "Admin",
    status: true,
    lastLogin: "5 min ago",
  },
  {
    name: "Mike Johnson",
    email: "mike@ghostops.ai",
    role: "Editor",
    status: true,
    lastLogin: "30 min ago",
  },
  {
    name: "Emma Wilson",
    email: "emma@ghostops.ai",
    role: "Author",
    status: true,
    lastLogin: "2 hours ago",
  },
  {
    name: "Alex Rivera",
    email: "alex@ghostops.ai",
    role: "Author",
    status: false,
    lastLogin: "1 day ago",
  },
  {
    name: "Jordan Lee",
    email: "jordan@ghostops.ai",
    role: "Viewer",
    status: false,
    lastLogin: "2 days ago",
  },
];

const queueData = [
  {
    title: "Content Queue",
    inQueue: 12,
    processing: 3,
    estimated: "~15 min est.",
    progress: 20,
  },
  {
    title: "SEO Queue",
    inQueue: 28,
    processing: 5,
    estimated: "~35 min est.",
    progress: 15,
  },
  {
    title: "Image Queue",
    inQueue: 8,
    processing: 2,
    estimated: "~10 min est.",
    progress: 20,
  },
];

function CircularProgress({
  value,
  color,
  label,
  icon: Icon,
}: {
  value: number;
  color: string;
  label: string;
  icon: React.ElementType;
}) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colorMap: Record<string, { stroke: string; text: string; bg: string }> = {
    violet: {
      stroke: "stroke-violet-500",
      text: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    blue: {
      stroke: "stroke-blue-500",
      text: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    emerald: {
      stroke: "stroke-emerald-500",
      text: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  };

  const colors = colorMap[color] || colorMap.violet;

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex flex-col items-center gap-3 p-6">
        <div className={cn("rounded-lg p-2", colors.bg)}>
          <Icon className={cn("h-5 w-5", colors.text)} />
        </div>
        <div className="relative">
          <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="8"
              className="stroke-muted/20"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn(colors.stroke, "transition-all duration-1000 ease-out")}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{value}%</span>
          </div>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

export default function AdminPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
            <Shield className="h-5 w-5 text-violet-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">
              System monitoring, worker management, and administration.
            </p>
          </div>
        </div>
      </motion.div>


      {/* Admin Sub-sections */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/dashboard/admin/users" className="group">
            <Card className="relative overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 transition-colors group-hover:bg-violet-500/20">
                  <Users className="h-6 w-6 text-violet-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">User Management</h3>
                  <p className="text-xs text-muted-foreground">Manage users, roles & access</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-violet-500" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/packages" className="group">
            <Card className="relative overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                  <Package className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">Package Management</h3>
                  <p className="text-xs text-muted-foreground">Plans, pricing & subscriptions</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/permissions" className="group">
            <Card className="relative overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                  <Key className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">Roles & Permissions</h3>
                  <p className="text-xs text-muted-foreground">Access control & role matrix</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-emerald-500" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </motion.div>

      {/* System Health Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <CircularProgress
            value={adminData.systemHealth.cpu}
            color="violet"
            label="CPU Usage"
            icon={Cpu}
          />
          <CircularProgress
            value={adminData.systemHealth.memory}
            color="blue"
            label="Memory"
            icon={HardDrive}
          />
          <CircularProgress
            value={adminData.systemHealth.disk}
            color="emerald"
            label="Disk"
            icon={HardDrive}
          />
          <Card className="relative overflow-hidden">
            <CardContent className="flex flex-col items-center gap-3 p-6">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <Clock className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex h-24 w-24 items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold">
                    {adminData.systemHealth.uptime}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-sm font-medium text-muted-foreground">
                  Uptime
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Worker Status Cards */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-4 text-lg font-semibold">Worker Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {adminData.workers.map((worker) => {
            const total = worker.processed + worker.errors;
            const successRate = total > 0 ? (worker.processed / total) * 100 : 0;
            const isRunning = worker.status === "running";

            return (
              <Card key={worker.name} className="relative overflow-hidden">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold leading-tight">
                      {worker.name}
                    </h3>
                    {isRunning ? (
                      <Play className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Pause className="h-3.5 w-3.5 text-amber-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "relative flex h-2 w-2",
                      )}
                    >
                      {isRunning && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      )}
                      <span
                        className={cn(
                          "relative inline-flex h-2 w-2 rounded-full",
                          isRunning ? "bg-emerald-500" : "bg-amber-500"
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium capitalize",
                        isRunning ? "text-emerald-500" : "text-amber-500"
                      )}
                    >
                      {worker.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>{worker.processed.toLocaleString()} processed</span>
                      <span
                        className={cn(
                          worker.errors > 0 ? "text-red-500 font-medium" : ""
                        )}
                      >
                        {worker.errors} errors
                      </span>
                    </div>
                  </div>
                  <Progress value={successRate} className="h-1.5" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* AI Usage Chart */}
      <motion.div variants={itemVariants}>
        <ChartCard title="AI Credits Usage (7 Days)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aiCreditsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted/20"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #2a2a4a",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                cursor={{ fill: "hsl(var(--muted)/0.1)" }}
              />
              <Bar
                dataKey="credits"
                fill="hsl(263, 70%, 58%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </motion.div>

      {/* System Logs */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-violet-500" />
              <CardTitle>System Logs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Time</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[120px]">Service</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminData.recentLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs text-muted-foreground">
                      {timeAgo(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs font-medium capitalize",
                          log.level === "info" &&
                            "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
                          log.level === "warning" &&
                            "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
                          log.level === "error" &&
                            "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        )}
                      >
                        {log.level === "warning" && (
                          <AlertTriangle className="mr-1 h-3 w-3" />
                        )}
                        {log.level === "error" && (
                          <AlertTriangle className="mr-1 h-3 w-3" />
                        )}
                        {log.level === "info" && (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}
                        {log.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{log.message}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-xs font-mono"
                      >
                        {log.service}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Management */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-violet-500" />
              <CardTitle>User Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[140px]">Role</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-[60px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Select defaultValue={user.role}>
                        <SelectTrigger className="h-8 w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Author">Author</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked={user.status} />
                        <span
                          className={cn(
                            "text-xs",
                            user.status
                              ? "text-emerald-500"
                              : "text-muted-foreground"
                          )}
                        >
                          {user.status ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500 focus:text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Queue Monitor */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-4 text-lg font-semibold">Queue Monitor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {queueData.map((queue) => (
            <Card key={queue.title} className="relative overflow-hidden">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{queue.title}</h3>
                  <Badge
                    variant="secondary"
                    className="bg-violet-500/10 text-violet-500"
                  >
                    {queue.inQueue} in queue
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {queue.processing} processing
                  </span>
                </div>
                <Progress value={queue.progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{queue.estimated}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
