"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Download,
  Shield,
  Ban,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  email: string;
  plan: "Starter" | "Pro" | "Business" | "Enterprise";
  status: "Active" | "Suspended" | "Banned";
  joined: string;
  lastActive: string;
  articles: number;
  storage: string;
  revenue: string;
  avatar: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Sarah Chen", email: "sarah@techcorp.io", plan: "Enterprise", status: "Active", joined: "Jan 12, 2024", lastActive: "2 min ago", articles: 156, storage: "45.2 GB", revenue: "$199/mo", avatar: "" },
  { id: 2, name: "Marcus Johnson", email: "marcus@startup.dev", plan: "Pro", status: "Active", joined: "Mar 5, 2024", lastActive: "1 hour ago", articles: 89, storage: "12.8 GB", revenue: "$79/mo", avatar: "" },
  { id: 3, name: "Emma Wilson", email: "emma@agency.co", plan: "Business", status: "Active", joined: "Feb 18, 2024", lastActive: "30 min ago", articles: 234, storage: "78.5 GB", revenue: "$199/mo", avatar: "" },
  { id: 4, name: "Alex Rivera", email: "alex@blog.com", plan: "Starter", status: "Suspended", joined: "Apr 2, 2024", lastActive: "3 days ago", articles: 12, storage: "1.2 GB", revenue: "$29/mo", avatar: "" },
  { id: 5, name: "Priya Patel", email: "priya@media.in", plan: "Pro", status: "Active", joined: "Jan 28, 2024", lastActive: "15 min ago", articles: 67, storage: "8.9 GB", revenue: "$79/mo", avatar: "" },
  { id: 6, name: "Jordan Lee", email: "jordan@creative.io", plan: "Business", status: "Active", joined: "Dec 10, 2023", lastActive: "5 min ago", articles: 312, storage: "120.3 GB", revenue: "$199/mo", avatar: "" },
  { id: 7, name: "Olivia Martinez", email: "olivia@news.org", plan: "Enterprise", status: "Active", joined: "Nov 5, 2023", lastActive: "Just now", articles: 445, storage: "200.1 GB", revenue: "$499/mo", avatar: "" },
  { id: 8, name: "Liam O'Brien", email: "liam@writer.co", plan: "Starter", status: "Banned", joined: "May 15, 2024", lastActive: "2 weeks ago", articles: 3, storage: "0.4 GB", revenue: "$0", avatar: "" },
  { id: 9, name: "Nina Kowalski", email: "nina@design.pl", plan: "Pro", status: "Active", joined: "Feb 8, 2024", lastActive: "45 min ago", articles: 98, storage: "15.6 GB", revenue: "$79/mo", avatar: "" },
  { id: 10, name: "David Kim", email: "david@tech.kr", plan: "Business", status: "Active", joined: "Mar 22, 2024", lastActive: "3 hours ago", articles: 178, storage: "55.8 GB", revenue: "$199/mo", avatar: "" },
  { id: 11, name: "Sofia Andersson", email: "sofia@content.se", plan: "Pro", status: "Suspended", joined: "Apr 10, 2024", lastActive: "1 week ago", articles: 45, storage: "6.3 GB", revenue: "$79/mo", avatar: "" },
  { id: 12, name: "James Wright", email: "james@publish.uk", plan: "Starter", status: "Active", joined: "May 1, 2024", lastActive: "2 hours ago", articles: 28, storage: "3.1 GB", revenue: "$29/mo", avatar: "" },
];

const planColors: Record<User["plan"], string> = {
  Starter: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Pro: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  Business: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Enterprise: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

const statusColors: Record<User["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Suspended: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Banned: "bg-red-500/10 text-red-500 border-red-500/20",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = planFilter === "all" || user.plan === planFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Plan", "Status", "Joined", "Last Active", "Articles", "Storage", "Revenue"];
    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      user.plan,
      user.status,
      user.joined,
      user.lastActive,
      user.articles.toString(),
      user.storage,
      user.revenue,
    ]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inkfleet_users_export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const stats = [
    { title: "Total Users", value: "1,247", icon: Users, change: "+12.5%", color: "text-violet-500" },
    { title: "Active Users", value: "1,180", icon: Shield, change: "+8.2%", color: "text-emerald-500" },
    { title: "New This Month", value: "64", icon: TrendingUp, change: "+23.1%", color: "text-blue-500" },
    { title: "Monthly Revenue", value: "$48,290", icon: DollarSign, change: "+15.3%", color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage users, roles, and permissions across the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800"
            onClick={handleExportCSV}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-emerald-500 mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-zinc-800 bg-zinc-900/50 focus:border-violet-500 focus:ring-violet-500/20"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 min-w-[130px]"
            >
              {planFilter === "all" ? "All Plans" : planFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-zinc-800 bg-zinc-900">
            <DropdownMenuItem onClick={() => setPlanFilter("all")}>
              All Plans
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem onClick={() => setPlanFilter("Starter")}>
              Starter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPlanFilter("Pro")}>
              Pro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPlanFilter("Business")}>
              Business
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPlanFilter("Enterprise")}>
              Enterprise
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 min-w-[140px]"
            >
              {statusFilter === "all" ? "All Statuses" : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-zinc-800 bg-zinc-900">
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Suspended")}>
              Suspended
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Banned")}>
              Banned
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Users Table */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">User</TableHead>
                <TableHead className="text-zinc-400">Email</TableHead>
                <TableHead className="text-zinc-400">Plan</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400">Joined</TableHead>
                <TableHead className="text-zinc-400">Last Active</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="contents"
              >
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    variants={itemVariants}
                    className="border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-violet-500/10 text-violet-500 text-xs">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-400">{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={planColors[user.plan]}
                      >
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusColors[user.status]}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400">{user.joined}</TableCell>
                    <TableCell className="text-zinc-400">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-zinc-800"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-zinc-800 bg-zinc-900"
                        >
                          <DropdownMenuItem
                            onClick={() => setSelectedUser(user)}
                            className="hover:bg-zinc-800 cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer text-amber-500">
                            <Shield className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer text-red-500">
                            <Ban className="mr-2 h-4 w-4" />
                            Ban
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </motion.tbody>
            </TableBody>
          </Table>
          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <Users className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No users found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Profile Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="border-zinc-800 bg-zinc-950 max-w-lg">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Detailed information about this user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback className="bg-violet-500/10 text-violet-500 text-lg">
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-zinc-400">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={planColors[selectedUser.plan]}
                    >
                      {selectedUser.plan}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={statusColors[selectedUser.status]}
                    >
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-500 mb-1">Joined</p>
                  <p className="text-sm font-medium">{selectedUser.joined}</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-500 mb-1">Last Active</p>
                  <p className="text-sm font-medium">{selectedUser.lastActive}</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-500 mb-1">Articles Published</p>
                  <p className="text-sm font-medium">{selectedUser.articles}</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-500 mb-1">Storage Used</p>
                  <p className="text-sm font-medium">{selectedUser.storage}</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 col-span-2">
                  <p className="text-xs text-zinc-500 mb-1">Revenue</p>
                  <p className="text-sm font-medium">{selectedUser.revenue}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </Button>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
