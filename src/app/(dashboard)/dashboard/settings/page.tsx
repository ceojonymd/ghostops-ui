"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Settings,
  Upload,
  Copy,
  Eye,
  EyeOff,
  Key,
  Shield,
  Bell,
  Mail,
  Palette,
  Globe,
  Lock,
  Smartphone,
  Monitor,
  Trash2,
  Plus,
  Check,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const presetColors = [
  { name: "Violet", value: "bg-violet-500", ring: "ring-violet-500" },
  { name: "Blue", value: "bg-blue-500", ring: "ring-blue-500" },
  { name: "Emerald", value: "bg-emerald-500", ring: "ring-emerald-500" },
  { name: "Rose", value: "bg-rose-500", ring: "ring-rose-500" },
  { name: "Amber", value: "bg-amber-500", ring: "ring-amber-500" },
  { name: "Slate", value: "bg-slate-500", ring: "ring-slate-500" },
];

const initialApiKeys = [
  {
    id: "1",
    label: "Production API Key",
    key: "sk-prod-xxxx...xxxx4f2a",
    fullKey: "sk-prod-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0xxxx4f2a",
    created: "Jan 15, 2025",
    lastUsed: "2 hours ago",
  },
  {
    id: "2",
    label: "Staging API Key",
    key: "sk-stag-xxxx...xxxx8b1c",
    fullKey: "sk-stag-z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0xxxx8b1c",
    created: "Mar 3, 2025",
    lastUsed: "5 days ago",
  },
  {
    id: "3",
    label: "Development API Key",
    key: "sk-dev-xxxx...xxxxa3e7",
    fullKey: "sk-dev-f0e1d2c3b4a5z6y7x8w9v0u1t2s3r4q5p6o7n8m9xxxxa3e7",
    created: "May 20, 2025",
    lastUsed: "1 hour ago",
  },
];

const activeSessions = [
  {
    id: "1",
    browser: "Chrome on macOS",
    icon: Monitor,
    ip: "192.168.1.1",
    location: "San Francisco, CA",
    lastActive: "Current session",
    current: true,
  },
  {
    id: "2",
    browser: "Firefox on Windows",
    icon: Monitor,
    ip: "10.0.0.42",
    location: "New York, NY",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "3",
    browser: "Safari on iPhone",
    icon: Smartphone,
    ip: "172.16.0.8",
    location: "London, UK",
    lastActive: "3 days ago",
    current: false,
  },
];

export default function SettingsPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [createKeyOpen, setCreateKeyOpen] = useState(false);
  const [newKeyLabel, setNewKeyLabel] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([]);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [generatedKeyCopied, setGeneratedKeyCopied] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState({
    newArticle: true,
    seoScore: true,
    teamMentions: true,
    weeklyDigest: true,
    billingAlerts: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    contentUpdates: true,
    teamActivity: false,
    systemAlerts: true,
  });

  const handleCopyKey = (id: string, fullKey: string) => {
    navigator.clipboard.writeText(fullKey);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleToggleReveal = (id: string) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!revealedKeys[id]) {
      setTimeout(() => {
        setRevealedKeys((prev) => ({ ...prev, [id]: false }));
      }, 5000);
    }
  };

  const handleGenerateKey = () => {
    setGeneratedKey("sk-new-abc123def456ghi789");
    setGeneratedKeyCopied(false);
  };

  const handleCopyGeneratedKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setGeneratedKeyCopied(true);
      setTimeout(() => setGeneratedKeyCopied(false), 2000);
    }
  };

  const handlePermissionToggle = (permission: string) => {
    setNewKeyPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const resetCreateKeyDialog = () => {
    setNewKeyLabel("");
    setNewKeyPermissions([]);
    setGeneratedKey(null);
    setGeneratedKeyCopied(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
            <Settings className="h-5 w-5 text-violet-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your workspace preferences and configuration.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="general" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Branding</span>
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="gap-2">
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* ==================== GENERAL TAB ==================== */}
          <TabsContent value="general">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure your workspace name, URL, and regional preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="workspace-name">Workspace Name</Label>
                      <Input
                        id="workspace-name"
                        defaultValue="InkFleet Workspace"
                        className="max-w-md"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workspace-url">Workspace URL</Label>
                      <div className="flex max-w-md">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                          inkfleet.com/
                        </span>
                        <Input
                          id="workspace-url"
                          defaultValue="my-workspace"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger className="max-w-md">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">EST</SelectItem>
                          <SelectItem value="pst">PST</SelectItem>
                          <SelectItem value="cst">CST</SelectItem>
                          <SelectItem value="gmt">GMT</SelectItem>
                          <SelectItem value="cet">CET</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="english">
                        <SelectTrigger className="max-w-md">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ==================== BRANDING TAB ==================== */}
          <TabsContent value="branding">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Branding</CardTitle>
                    <CardDescription>
                      Customize the look and feel of your workspace.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <Label>Logo</Label>
                      <div className="border-dashed border-2 rounded-lg p-8 text-center cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-colors">
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm font-medium">
                          Drop your logo here
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          PNG, SVG up to 2MB
                        </p>
                      </div>
                    </div>

                    {/* Primary Color */}
                    <div className="space-y-3">
                      <Label>Primary Color</Label>
                      <div className="flex items-center gap-3 flex-wrap">
                        {presetColors.map((color, index) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(index)}
                            className={cn(
                              "h-9 w-9 rounded-full transition-all duration-200",
                              color.value,
                              selectedColor === index
                                ? `ring-2 ${color.ring} ring-offset-2 ring-offset-background scale-110`
                                : "hover:scale-105"
                            )}
                            title={color.name}
                          />
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 text-xs"
                        >
                          Custom
                        </Button>
                      </div>
                    </div>

                    {/* Favicon Upload */}
                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <div className="border-dashed border-2 rounded-lg p-6 text-center cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-colors max-w-xs">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">
                          Drop your favicon here
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          PNG, ICO up to 512KB
                        </p>
                      </div>
                    </div>

                    {/* Brand Name */}
                    <div className="space-y-2">
                      <Label htmlFor="brand-name">Brand Name</Label>
                      <Input
                        id="brand-name"
                        defaultValue="InkFleet"
                        className="max-w-md"
                      />
                    </div>

                    <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ==================== API KEYS TAB ==================== */}
          <TabsContent value="api-keys">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>
                          Manage your API keys for programmatic access.
                        </CardDescription>
                      </div>
                      <Button
                        className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
                        onClick={() => {
                          resetCreateKeyDialog();
                          setCreateKeyOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        Create New Key
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {initialApiKeys.map((apiKey) => (
                        <motion.div
                          key={apiKey.id}
                          variants={itemVariants}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4"
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Key className="h-4 w-4 text-violet-500 shrink-0" />
                              <p className="font-medium text-sm">
                                {apiKey.label}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                                {revealedKeys[apiKey.id]
                                  ? apiKey.fullKey
                                  : apiKey.key}
                              </code>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0"
                                onClick={() => handleToggleReveal(apiKey.id)}
                              >
                                {revealedKeys[apiKey.id] ? (
                                  <EyeOff className="h-3.5 w-3.5" />
                                ) : (
                                  <Eye className="h-3.5 w-3.5" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0"
                                onClick={() =>
                                  handleCopyKey(apiKey.id, apiKey.fullKey)
                                }
                              >
                                {copiedKeyId === apiKey.id ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </Button>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Created: {apiKey.created}</span>
                              <span>Last used: {apiKey.lastUsed}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Revoke
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Create New Key Dialog */}
            <Dialog
              open={createKeyOpen}
              onOpenChange={(open) => {
                setCreateKeyOpen(open);
                if (!open) resetCreateKeyDialog();
              }}
            >
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Generate a new API key with specific permissions.
                  </DialogDescription>
                </DialogHeader>
                {!generatedKey ? (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="key-label">Label</Label>
                      <Input
                        id="key-label"
                        placeholder="e.g. Production API Key"
                        value={newKeyLabel}
                        onChange={(e) => setNewKeyLabel(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Permissions</Label>
                      <div className="space-y-3">
                        {["Read", "Write", "Delete", "Admin"].map(
                          (permission) => (
                            <div
                              key={permission}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`perm-${permission.toLowerCase()}`}
                                checked={newKeyPermissions.includes(permission)}
                                onCheckedChange={() =>
                                  handlePermissionToggle(permission)
                                }
                              />
                              <Label
                                htmlFor={`perm-${permission.toLowerCase()}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {permission}
                              </Label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-violet-600 hover:bg-violet-700 text-white w-full"
                        onClick={handleGenerateKey}
                        disabled={!newKeyLabel.trim()}
                      >
                        Generate Key
                      </Button>
                    </DialogFooter>
                  </div>
                ) : (
                  <div className="space-y-4 py-2">
                    <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                      <p className="text-sm font-medium">
                        Your new API key has been generated:
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-background px-3 py-2 rounded border flex-1 break-all">
                          {generatedKey}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={handleCopyGeneratedKey}
                        >
                          {generatedKeyCopied ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Make sure to copy your key now. You will not be able to
                        see it again.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCreateKeyOpen(false);
                          resetCreateKeyDialog();
                        }}
                        className="w-full"
                      >
                        Done
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ==================== SECURITY TAB ==================== */}
          <TabsContent value="security">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Change Password */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-violet-500" />
                      Change Password
                    </CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="max-w-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="max-w-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="max-w-md"
                      />
                    </div>
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Two-Factor Authentication */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-violet-500" />
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account by enabling
                      two-factor authentication.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between max-w-md">
                      <div className="space-y-0.5">
                        <Label htmlFor="2fa-switch">
                          Enable Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Use an authenticator app for additional security.
                        </p>
                      </div>
                      <Switch
                        id="2fa-switch"
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>
                    {twoFactorEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <div className="rounded-lg border bg-muted/30 p-6 max-w-xs text-center space-y-3">
                          <div className="mx-auto w-40 h-40 bg-background rounded-lg border-2 flex items-center justify-center">
                            <div className="grid grid-cols-5 gap-1">
                              {Array.from({ length: 25 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-5 h-5 rounded-sm",
                                    Math.random() > 0.5
                                      ? "bg-foreground"
                                      : "bg-transparent"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Scan this QR code with your authenticator app
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Active Sessions */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-violet-500" />
                      Active Sessions
                    </CardTitle>
                    <CardDescription>
                      Manage your active sessions across devices.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Browser</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activeSessions.map((session) => {
                            const IconComponent = session.icon;
                            return (
                              <TableRow key={session.id}>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium text-sm">
                                      {session.browser}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <code className="text-xs font-mono text-muted-foreground">
                                    {session.ip}
                                  </code>
                                </TableCell>
                                <TableCell className="text-sm">
                                  {session.location}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {session.lastActive}
                                </TableCell>
                                <TableCell className="text-right">
                                  {session.current ? (
                                    <Badge
                                      variant="secondary"
                                      className="bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400"
                                    >
                                      Current
                                    </Badge>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                                    >
                                      Revoke
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ==================== NOTIFICATIONS TAB ==================== */}
          <TabsContent value="notifications">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-violet-500" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how and when you want to be notified.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email Notifications */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-violet-500" />
                        <h3 className="text-sm font-semibold">
                          Email Notifications
                        </h3>
                      </div>
                      <div className="space-y-4 ml-6">
                        <div className="flex items-center justify-between max-w-lg">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="notif-new-article"
                              className="text-sm font-medium"
                            >
                              New article published
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Get notified when a team member publishes
                            </p>
                          </div>
                          <Switch
                            id="notif-new-article"
                            checked={emailNotifications.newArticle}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({
                                ...prev,
                                newArticle: checked,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between max-w-lg">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="notif-seo-score"
                              className="text-sm font-medium"
                            >
                              SEO score changes
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Alerts when SEO scores change significantly
                            </p>
                          </div>
                          <Switch
                            id="notif-seo-score"
                            checked={emailNotifications.seoScore}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({
                                ...prev,
                                seoScore: checked,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between max-w-lg">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="notif-team-mentions"
                              className="text-sm font-medium"
                            >
                              Team mentions
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              When someone mentions you in comments
                            </p>
                          </div>
                          <Switch
                            id="notif-team-mentions"
                            checked={emailNotifications.teamMentions}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({
                                ...prev,
                                teamMentions: checked,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between max-w-lg">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="notif-weekly-digest"
                              className="text-sm font-medium"
                            >
                              Weekly digest
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Weekly summary of content performance
                            </p>
                          </div>
                          <Switch
                            id="notif-weekly-digest"
                            checked={emailNotifications.weeklyDigest}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({
                                ...prev,
                                weeklyDigest: checked,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between max-w-lg">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="notif-billing-alerts"
                              className="text-sm font-medium"
                            >
                              Billing alerts
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Payment confirmations and billing issues
                            </p>
                          </div>
                          <Switch
                            id="notif-billing-alerts"
                            checked={emailNotifications.billingAlerts}
                            onCheckedChange={(checked) =>
                              setEmailNotifications((prev) => ({
                                ...prev,
                                billingAlerts: checked,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Push Notifications */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-violet-500" />
                        <h3 className="text-sm font-semibold">
                          Push Notifications
                        </h3>
                      </div>
                      <div className="space-y-4 ml-6">
                        <div className="flex items-center justify-between max-w-lg">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="push-content-updates"
                              className="text-sm font-medium"
                            >
                              Content updates
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Real-time push for content changes
                            </p>
                          </div>
                          <Switch
                            id="push-content-updates"
                            checked={pushNotifications.contentUpdates}
                            onCheckedChange={(checked) =>
                              setPushNotifications((prev) => ({
                                ...prev,
                                contentUpdates: checked,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between max-w-lg">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="push-team-activity"
                              className="text-sm font-medium"
                            >
                              Team activity
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Push notifications for team actions
                            </p>
                          </div>
                          <Switch
                            id="push-team-activity"
                            checked={pushNotifications.teamActivity}
                            onCheckedChange={(checked) =>
                              setPushNotifications((prev) => ({
                                ...prev,
                                teamActivity: checked,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between max-w-lg">
                          <div className="space-y-0.5">
                            <Label
                              htmlFor="push-system-alerts"
                              className="text-sm font-medium"
                            >
                              System alerts
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Critical system notifications
                            </p>
                          </div>
                          <Switch
                            id="push-system-alerts"
                            checked={pushNotifications.systemAlerts}
                            onCheckedChange={(checked) =>
                              setPushNotifications((prev) => ({
                                ...prev,
                                systemAlerts: checked,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
