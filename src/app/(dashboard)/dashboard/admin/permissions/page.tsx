"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Plus,
  Edit,
  Lock,
  Unlock,
  Settings,
  Check,
  X,
  Eye,
  Pencil,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  color: "violet" | "blue" | "amber" | "emerald";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  permissions: string[];
}

interface NewRoleForm {
  name: string;
  description: string;
  permissions: string[];
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const PERMISSIONS: Permission[] = [
  {
    id: "create_content",
    name: "Create Content",
    description: "Create new articles, pages, and media",
    category: "Content",
  },
  {
    id: "edit_content",
    name: "Edit Content",
    description: "Edit existing articles and pages",
    category: "Content",
  },
  {
    id: "delete_content",
    name: "Delete Content",
    description: "Permanently delete content",
    category: "Content",
  },
  {
    id: "publish",
    name: "Publish Content",
    description: "Publish or unpublish content",
    category: "Content",
  },
  {
    id: "manage_users",
    name: "Manage Users",
    description: "Add, edit, suspend, or remove users",
    category: "Users",
  },
  {
    id: "view_analytics",
    name: "View Analytics",
    description: "Access analytics dashboards and reports",
    category: "Analytics",
  },
  {
    id: "manage_billing",
    name: "Manage Billing",
    description: "View and manage billing, invoices, subscriptions",
    category: "Billing",
  },
  {
    id: "api_access",
    name: "API Access",
    description: "Use API keys and programmatic access",
    category: "System",
  },
  {
    id: "admin_panel",
    name: "Admin Panel",
    description: "Access the admin panel and system settings",
    category: "System",
  },
];

const DEFAULT_ROLES: Role[] = [
  {
    id: "admin",
    name: "Admin",
    description:
      "Full system access. Can manage all settings, users, and content.",
    userCount: 3,
    color: "violet",
    icon: ShieldCheck,
    permissions: [
      "create_content",
      "edit_content",
      "delete_content",
      "publish",
      "manage_users",
      "view_analytics",
      "manage_billing",
      "api_access",
      "admin_panel",
    ],
  },
  {
    id: "editor",
    name: "Editor",
    description:
      "Can create, edit, and publish content. Access to analytics.",
    userCount: 12,
    color: "blue",
    icon: Pencil,
    permissions: [
      "create_content",
      "edit_content",
      "delete_content",
      "publish",
      "view_analytics",
    ],
  },
  {
    id: "author",
    name: "Author",
    description:
      "Can create and edit own content. Cannot publish or delete.",
    userCount: 45,
    color: "amber",
    icon: Edit,
    permissions: ["create_content", "edit_content", "view_analytics"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description:
      "Read-only access to published content and analytics.",
    userCount: 128,
    color: "emerald",
    icon: Eye,
    permissions: ["view_analytics"],
  },
];

const CATEGORIES = ["Content", "Users", "Analytics", "Billing", "System"];

const CATEGORY_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Content: Edit,
  Users: Users,
  Analytics: Eye,
  Billing: Settings,
  System: Lock,
};

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------

const colorMap: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-500",
    border: "border-violet-500/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
  },
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function PermissionsPage() {
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<NewRoleForm>({
    name: "",
    description: "",
    permissions: [],
  });

  // ---- Permission toggle in the matrix ----
  const togglePermission = (roleId: string, permissionId: string) => {
    setRoles((prev) =>
      prev.map((role) => {
        if (role.id !== roleId) return role;
        const has = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: has
            ? role.permissions.filter((p) => p !== permissionId)
            : [...role.permissions, permissionId],
        };
      })
    );
  };

  // ---- New-role permission toggle ----
  const toggleNewRolePermission = (permissionId: string) => {
    setNewRole((prev) => {
      const has = prev.permissions.includes(permissionId);
      return {
        ...prev,
        permissions: has
          ? prev.permissions.filter((p) => p !== permissionId)
          : [...prev.permissions, permissionId],
      };
    });
  };

  // ---- Create custom role ----
  const handleCreateRole = () => {
    if (!newRole.name.trim()) return;
    const id = newRole.name.toLowerCase().replace(/\s+/g, "_");
    const created: Role = {
      id,
      name: newRole.name.trim(),
      description: newRole.description.trim(),
      userCount: 0,
      color: "violet",
      icon: Shield,
      permissions: [...newRole.permissions],
    };
    setRoles((prev) => [...prev, created]);
    setNewRole({ name: "", description: "", permissions: [] });
    setDialogOpen(false);
  };

  // ---- Helpers ----
  const permissionsByCategory = (category: string) =>
    PERMISSIONS.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-zinc-950 p-6 lg:p-10 space-y-8">
      {/* ================================================================= */}
      {/* Header                                                            */}
      {/* ================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
            <Shield className="h-5 w-5 text-violet-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Roles &amp; Permissions
            </h1>
            <p className="text-sm text-zinc-400">
              Manage roles and fine-tune what each role can do across the
              platform.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Custom Role
        </Button>
      </motion.div>

      {/* ================================================================= */}
      {/* Role overview cards                                               */}
      {/* ================================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {roles.map((role) => {
          const colors = colorMap[role.color] ?? colorMap.violet;
          const Icon = role.icon;
          return (
            <motion.div key={role.id} variants={itemVariants}>
              <Card
                className={`border ${colors.border} bg-zinc-900/60 backdrop-blur-sm hover:bg-zinc-900 transition-colors`}
              >
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.bg}`}
                    >
                      <Icon className={`h-4 w-4 ${colors.text}`} />
                    </div>
                    <CardTitle className="text-base font-semibold text-zinc-100">
                      {role.name}
                    </CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300 border-zinc-700 text-xs"
                  >
                    <Users className="mr-1 h-3 w-3" />
                    {role.userCount}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {role.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {role.permissions.slice(0, 3).map((pid) => {
                      const perm = PERMISSIONS.find((p) => p.id === pid);
                      return perm ? (
                        <Badge
                          key={pid}
                          variant="outline"
                          className={`text-[10px] ${colors.text} ${colors.border}`}
                        >
                          {perm.name}
                        </Badge>
                      ) : null;
                    })}
                    {role.permissions.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-[10px] text-zinc-500 border-zinc-700"
                      >
                        +{role.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ================================================================= */}
      {/* Permission matrix                                                 */}
      {/* ================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-zinc-800 bg-zinc-900/60 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-zinc-100">
              <Lock className="h-4 w-4 text-violet-400" />
              Permission Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 font-medium w-[320px] pl-6">
                      Permission
                    </TableHead>
                    {roles.map((role) => {
                      const colors = colorMap[role.color] ?? colorMap.violet;
                      return (
                        <TableHead
                          key={role.id}
                          className="text-center min-w-[100px]"
                        >
                          <span className={`font-semibold ${colors.text}`}>
                            {role.name}
                          </span>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CATEGORIES.map((category) => {
                    const perms = permissionsByCategory(category);
                    if (perms.length === 0) return null;
                    const CatIcon = CATEGORY_ICONS[category] ?? Settings;
                    return (
                      <>
                        {/* Category header row */}
                        <TableRow
                          key={`cat-${category}`}
                          className="border-zinc-800 bg-zinc-800/40 hover:bg-zinc-800/40"
                        >
                          <TableCell
                            colSpan={roles.length + 1}
                            className="pl-6 py-2"
                          >
                            <div className="flex items-center gap-2">
                              <CatIcon className="h-3.5 w-3.5 text-violet-400" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                {category}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Permission rows */}
                        {perms.map((perm) => (
                          <TableRow
                            key={perm.id}
                            className="border-zinc-800/60 hover:bg-zinc-800/30 transition-colors"
                          >
                            <TableCell className="pl-6 py-3">
                              <div>
                                <p className="text-sm font-medium text-zinc-200">
                                  {perm.name}
                                </p>
                                <p className="text-xs text-zinc-500 mt-0.5">
                                  {perm.description}
                                </p>
                              </div>
                            </TableCell>
                            {roles.map((role) => {
                              const checked = role.permissions.includes(perm.id);
                              return (
                                <TableCell
                                  key={`${role.id}-${perm.id}`}
                                  className="text-center"
                                >
                                  <div className="flex justify-center">
                                    <Checkbox
                                      checked={checked}
                                      onCheckedChange={() =>
                                        togglePermission(role.id, perm.id)
                                      }
                                      className={
                                        checked
                                          ? "border-violet-500 bg-violet-600 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-500"
                                          : "border-zinc-700 bg-zinc-800"
                                      }
                                    />
                                  </div>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ================================================================= */}
      {/* Create Custom Role Dialog                                         */}
      {/* ================================================================= */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-zinc-100">
              <Shield className="h-5 w-5 text-violet-500" />
              Create Custom Role
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Define a new role with a custom set of permissions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Role Name */}
            <div className="space-y-2">
              <Label htmlFor="role-name" className="text-zinc-300">
                Role Name
              </Label>
              <Input
                id="role-name"
                placeholder="e.g. Moderator"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-violet-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="role-desc" className="text-zinc-300">
                Description
              </Label>
              <Input
                id="role-desc"
                placeholder="Briefly describe this role's purpose"
                value={newRole.description}
                onChange={(e) =>
                  setNewRole((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-violet-500"
              />
            </div>

            {/* Permissions checklist */}
            <div className="space-y-2">
              <Label className="text-zinc-300">Permissions</Label>
              <div className="max-h-52 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-800/40 p-3 space-y-2">
                {PERMISSIONS.map((perm) => {
                  const checked = newRole.permissions.includes(perm.id);
                  return (
                    <label
                      key={perm.id}
                      className="flex items-center gap-3 cursor-pointer rounded-md px-2 py-1.5 hover:bg-zinc-700/40 transition-colors"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() =>
                          toggleNewRolePermission(perm.id)
                        }
                        className={
                          checked
                            ? "border-violet-500 bg-violet-600 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-500"
                            : "border-zinc-700 bg-zinc-800"
                        }
                      />
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {perm.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {perm.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateRole}
                disabled={!newRole.name.trim()}
                className="bg-violet-600 hover:bg-violet-700 text-white gap-2 disabled:opacity-40"
              >
                <Check className="h-4 w-4" />
                Create Role
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
