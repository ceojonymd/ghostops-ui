"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle,
  ExternalLink,
  Code,
  Globe,
  MessageCircle,
  FileText,
  MessageSquare,
  Calendar,
  Clock,
  AlertTriangle,
  Trash2,
  User,
  Link,
  Edit,
} from "lucide-react";
import { cn, getInitials, timeAgo } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const connectedAccounts = [
  {
    platform: "Google",
    icon: Globe,
    connected: true,
    username: "sarah.chen@gmail.com",
    iconLabel: "G",
  },
  {
    platform: "GitHub",
    icon: Code,
    connected: true,
    username: "@sarahchen",
    iconLabel: null,
  },
  {
    platform: "Twitter / X",
    icon: MessageCircle,
    connected: false,
    username: null,
    iconLabel: null,
  },
];

const activityHistory = [
  {
    action: "Published",
    article: "10 Best AI Writing Tools for 2025",
    time: "30 min ago",
    dotColor: "bg-emerald-500",
    icon: FileText,
  },
  {
    action: "Edited",
    article: "Complete Guide to SEO in 2025",
    time: "1h ago",
    dotColor: "bg-amber-500",
    icon: Edit,
  },
  {
    action: "Commented on",
    article: "Content Marketing Strategy",
    time: "3h ago",
    dotColor: "bg-blue-500",
    icon: MessageSquare,
  },
  {
    action: "Published",
    article: "Email Marketing Best Practices",
    time: "5h ago",
    dotColor: "bg-emerald-500",
    icon: FileText,
  },
  {
    action: "Scheduled",
    article: "Affiliate Marketing Guide",
    time: "1 day ago",
    dotColor: "bg-violet-500",
    icon: Calendar,
  },
  {
    action: "Created draft",
    article: "Social Media Trends 2025",
    time: "2 days ago",
    dotColor: "bg-zinc-500",
    icon: Clock,
  },
];

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Sarah Chen");
  const [bio, setBio] = useState(
    "Senior Content Strategist and AI enthusiast. Leading the content team at InkFleet to create high-quality, SEO-optimized articles at scale."
  );
  const [website, setWebsite] = useState("https://sarahchen.dev");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl space-y-8 p-6"
    >
      {/* Profile Header Section */}
      <motion.div variants={itemVariants} className="relative">
        {/* Cover Photo */}
        <div className="relative h-48 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute right-4 top-4 gap-2 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            <Camera className="h-4 w-4" />
            Change Cover
          </Button>
        </div>

        {/* Avatar + Info */}
        <div className="relative px-6">
          <div className="relative -mt-12 flex items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarFallback className="bg-violet-600 text-2xl font-semibold text-white">
                  SC
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-violet-600 text-white shadow-lg transition-colors hover:bg-violet-700">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Name + Role */}
            <div className="mb-2 flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">
                  Sarah Chen
                </h1>
                <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-400">
                  Admin
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <span>sarah@inkfleet.com</span>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-violet-500" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal details and public profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  value="sarah@inkfleet.com"
                  disabled
                  className="pr-24"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="pl-10"
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button className="gap-2 bg-violet-600 text-white hover:bg-violet-700">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Connected Accounts */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-violet-500" />
              Connected Accounts
            </CardTitle>
            <CardDescription>
              Manage your connected third-party accounts and integrations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {connectedAccounts.map((account, index) => (
              <div key={account.platform}>
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        account.platform === "Google" &&
                          "bg-red-50 dark:bg-red-900/20",
                        account.platform === "GitHub" &&
                          "bg-zinc-100 dark:bg-zinc-800",
                        account.platform === "Twitter / X" &&
                          "bg-sky-50 dark:bg-sky-900/20"
                      )}
                    >
                      {account.iconLabel ? (
                        <span
                          className={cn(
                            "text-lg font-bold",
                            account.platform === "Google" &&
                              "text-red-600 dark:text-red-400"
                          )}
                        >
                          {account.iconLabel}
                        </span>
                      ) : (
                        <account.icon
                          className={cn(
                            "h-5 w-5",
                            account.platform === "GitHub" &&
                              "text-zinc-900 dark:text-zinc-100",
                            account.platform === "Twitter / X" &&
                              "text-sky-500 dark:text-sky-400"
                          )}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{account.platform}</p>
                      {account.connected && account.username && (
                        <p className="text-xs text-muted-foreground">
                          {account.username}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {account.connected ? (
                      <>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        >
                          Connected
                        </Badge>
                        <button className="text-xs font-medium text-red-500 transition-colors hover:text-red-600 hover:underline">
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-2">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
                {index < connectedAccounts.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity History */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-violet-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest actions and content updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative ml-3">
              {/* Timeline line */}
              <div className="absolute bottom-0 left-0 top-0 w-px bg-border" />

              <div className="space-y-6">
                {activityHistory.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="relative pl-8"
                  >
                    {/* Dot */}
                    <div
                      className={cn(
                        "absolute left-0 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-background",
                        entry.dotColor
                      )}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">
                          <span className="text-muted-foreground">
                            {entry.action}{" "}
                          </span>
                          <span className="font-semibold">{entry.article}</span>
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {entry.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={itemVariants}>
        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Once you delete your account, there is no going back. Please be
              certain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="gap-2"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account, all your content, and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deleteConfirm">
                Type{" "}
                <span className="font-mono font-bold text-red-500">
                  DELETE
                </span>{" "}
                to confirm
              </Label>
              <Input
                id="deleteConfirm"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="border-red-200 focus-visible:ring-red-500 dark:border-red-900/50"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setDeleteConfirmation("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteConfirmation !== "DELETE"}
              className="gap-2"
              onClick={() => {
                setDeleteDialogOpen(false);
                setDeleteConfirmation("");
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
