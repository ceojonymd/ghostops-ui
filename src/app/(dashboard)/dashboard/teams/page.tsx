"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  MoreHorizontal,
  CheckCircle,
  X,
  Clock,
  Send,
  UserCog,
  UserMinus,
} from "lucide-react";
import { cn, getInitials, timeAgo } from "@/lib/utils";
import { teamMembers } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const roleColors: Record<string, { bg: string; text: string; avatar: string }> = {
  Admin: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    avatar: "bg-violet-600",
  },
  Editor: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    avatar: "bg-blue-600",
  },
  Author: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    avatar: "bg-green-600",
  },
  Viewer: {
    bg: "bg-zinc-500/10",
    text: "text-zinc-400",
    avatar: "bg-zinc-600",
  },
};

const statusConfig: Record<string, { color: string; label: string }> = {
  active: { color: "bg-emerald-500", label: "Active" },
  away: { color: "bg-amber-500", label: "Away" },
  offline: { color: "bg-zinc-400", label: "Offline" },
};

const permissions = [
  {
    name: "Create Content",
    admin: true,
    editor: true,
    author: true,
    viewer: false,
  },
  {
    name: "Edit Content",
    admin: true,
    editor: true,
    author: true,
    viewer: false,
  },
  {
    name: "Publish",
    admin: true,
    editor: true,
    author: false,
    viewer: false,
  },
  {
    name: "Delete",
    admin: true,
    editor: false,
    author: false,
    viewer: false,
  },
  {
    name: "Manage Team",
    admin: true,
    editor: false,
    author: false,
    viewer: false,
  },
  {
    name: "Billing",
    admin: true,
    editor: false,
    author: false,
    viewer: false,
  },
  {
    name: "Admin Panel",
    admin: true,
    editor: false,
    author: false,
    viewer: false,
  },
];

export default function TeamsPage() {
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState("");
  const [inviteMessage, setInviteMessage] = React.useState("");

  const handleSendInvitation = () => {
    setInviteEmail("");
    setInviteRole("");
    setInviteMessage("");
    setInviteOpen(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            <Users className="h-7 w-7 text-violet-400" />
            Team Management
          </h1>
          <p className="text-sm text-zinc-400">
            Manage your team members and permissions.
          </p>
        </div>
        <Button
          onClick={() => setInviteOpen(true)}
          className="bg-violet-600 text-white hover:bg-violet-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </motion.div>

      {/* Team Member Cards Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {teamMembers.map((member) => {
          const role = roleColors[member.role] || roleColors.Viewer;
          const status = statusConfig[member.status] || statusConfig.offline;

          return (
            <motion.div key={member.id} variants={itemVariants}>
              <Card className="group relative border-zinc-800 bg-zinc-900/60 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5">
                <CardContent className="p-6">
                  {/* More Menu */}
                  <div className="absolute right-4 top-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-500 opacity-0 transition-opacity hover:text-zinc-300 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-zinc-800 bg-zinc-900"
                      >
                        <DropdownMenuItem className="cursor-pointer text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100">
                          <UserCog className="mr-2 h-4 w-4" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400">
                          <UserMinus className="mr-2 h-4 w-4" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-start gap-4">
                    <Avatar className={cn("h-12 w-12 shrink-0", role.avatar)}>
                      <AvatarFallback
                        className={cn(
                          "text-sm font-semibold text-white",
                          role.avatar
                        )}
                      >
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="truncate text-sm font-semibold text-zinc-100">
                        {member.name}
                      </h3>
                      <p className="flex items-center gap-1 truncate text-xs text-zinc-500">
                        <Mail className="h-3 w-3 shrink-0" />
                        {member.email}
                      </p>
                    </div>
                  </div>

                  {/* Role & Status */}
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border-0 font-medium",
                        role.bg,
                        role.text
                      )}
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      {member.role}
                    </Badge>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          status.color
                        )}
                      />
                      <span className="text-xs text-zinc-500">
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Last Active */}
                  <div className="mt-3 flex items-center gap-1 border-t border-zinc-800/60 pt-3">
                    <Clock className="h-3 w-3 text-zinc-600" />
                    <span className="text-xs text-zinc-600">
                      Last active {timeAgo(member.lastActive)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Invite Member Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-zinc-100">
              <UserPlus className="h-5 w-5 text-violet-400" />
              Invite Member
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              Send an invitation to join your InkFleet team.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="invite-email" className="text-zinc-300">
                Email Address
              </Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-role" className="text-zinc-300">
                Role
              </Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="border-zinc-800 bg-zinc-900 text-zinc-100 focus:ring-violet-500">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-zinc-900">
                  <SelectItem value="Admin" className="text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100">
                    Admin
                  </SelectItem>
                  <SelectItem value="Editor" className="text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100">
                    Editor
                  </SelectItem>
                  <SelectItem value="Author" className="text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100">
                    Author
                  </SelectItem>
                  <SelectItem value="Viewer" className="text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100">
                    Viewer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-message" className="text-zinc-300">
                Custom Message (optional)
              </Label>
              <Textarea
                id="invite-message"
                placeholder="Add a personal note to the invitation..."
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                rows={3}
                className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setInviteOpen(false)}
              className="text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendInvitation}
              className="bg-violet-600 text-white hover:bg-violet-700"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Permissions Matrix */}
      <motion.div variants={itemVariants}>
        <Card className="border-zinc-800 bg-zinc-900/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-zinc-100">
              <Shield className="h-5 w-5 text-violet-400" />
              Role Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400">Permission</TableHead>
                    <TableHead className="text-center text-violet-400">
                      Admin
                    </TableHead>
                    <TableHead className="text-center text-blue-400">
                      Editor
                    </TableHead>
                    <TableHead className="text-center text-green-400">
                      Author
                    </TableHead>
                    <TableHead className="text-center text-zinc-400">
                      Viewer
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((perm) => (
                    <TableRow
                      key={perm.name}
                      className="border-zinc-800/60 hover:bg-zinc-800/30"
                    >
                      <TableCell className="font-medium text-zinc-300">
                        {perm.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {perm.admin ? (
                          <CheckCircle className="mx-auto h-4 w-4 text-emerald-500" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-red-500/40" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {perm.editor ? (
                          <CheckCircle className="mx-auto h-4 w-4 text-emerald-500" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-red-500/40" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {perm.author ? (
                          <CheckCircle className="mx-auto h-4 w-4 text-emerald-500" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-red-500/40" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {perm.viewer ? (
                          <CheckCircle className="mx-auto h-4 w-4 text-emerald-500" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-red-500/40" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
