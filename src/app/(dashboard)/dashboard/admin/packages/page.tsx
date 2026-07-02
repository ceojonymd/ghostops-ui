"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  DollarSign,
  Users,
  Edit,
  Plus,
  Trash2,
  Crown,
  Zap,
  Building2,
  Check,
  X,
  Star,
  Rocket,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// ---------- types ----------
interface PackagePlan {
  id: number;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  subscribers: number;
  revenue: number;
  status: boolean;
  icon: React.ElementType;
  color: string;
  popular?: boolean;
  features: string[];
  aiLimit: number;
  storageLimit: number;
  teamLimit: number;
}

// ---------- animation ----------
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// ---------- color map ----------
const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
    badge: "bg-blue-500/20 text-blue-400",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-500",
    border: "border-violet-500/20",
    badge: "bg-violet-500/20 text-violet-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500/20",
    badge: "bg-amber-500/20 text-amber-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
    badge: "bg-emerald-500/20 text-emerald-400",
  },
};

// ---------- initial data ----------
const initialPackages: PackagePlan[] = [
  {
    id: 1,
    name: "Starter",
    monthlyPrice: 29,
    annualPrice: 23,
    subscribers: 487,
    revenue: 14123,
    status: true,
    icon: Zap,
    color: "blue",
    features: [
      "5 AI articles/month",
      "Basic SEO tools",
      "1 team member",
      "5GB storage",
      "Email support",
    ],
    aiLimit: 5,
    storageLimit: 5,
    teamLimit: 1,
  },
  {
    id: 2,
    name: "Pro",
    monthlyPrice: 79,
    annualPrice: 63,
    subscribers: 524,
    revenue: 41396,
    status: true,
    icon: Star,
    color: "violet",
    popular: true,
    features: [
      "50 AI articles/month",
      "Advanced SEO suite",
      "5 team members",
      "50GB storage",
      "Priority support",
      "Affiliate manager",
      "Social scheduling",
    ],
    aiLimit: 50,
    storageLimit: 50,
    teamLimit: 5,
  },
  {
    id: 3,
    name: "Business",
    monthlyPrice: 199,
    annualPrice: 159,
    subscribers: 198,
    revenue: 39402,
    status: true,
    icon: Building2,
    color: "amber",
    features: [
      "Unlimited AI articles",
      "Full SEO suite",
      "25 team members",
      "500GB storage",
      "24/7 support",
      "White label",
      "API access",
      "Custom integrations",
    ],
    aiLimit: -1,
    storageLimit: 500,
    teamLimit: 25,
  },
  {
    id: 4,
    name: "Enterprise",
    monthlyPrice: 499,
    annualPrice: 399,
    subscribers: 38,
    revenue: 18962,
    status: true,
    icon: Crown,
    color: "emerald",
    features: [
      "Everything in Business",
      "Unlimited team members",
      "Unlimited storage",
      "Dedicated account manager",
      "Custom AI models",
      "SLA guarantee",
      "On-premise option",
      "SSO/SAML",
    ],
    aiLimit: -1,
    storageLimit: -1,
    teamLimit: -1,
  },
];

// ---------- component ----------
export default function PackagesPage() {
  const [packages, setPackages] = useState<PackagePlan[]>(initialPackages);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PackagePlan | null>(null);
  const [newFeature, setNewFeature] = useState("");

  // stat helpers
  const totalRevenue = packages.reduce((s, p) => s + p.revenue, 0);
  const totalSubscribers = packages.reduce((s, p) => s + p.subscribers, 0);
  const avgRevenue = totalSubscribers > 0 ? (totalRevenue / totalSubscribers).toFixed(2) : "0.00";

  const stats = [
    {
      label: "Total Revenue",
      value: `$${(127450).toLocaleString()}/mo`,
      icon: DollarSign,
      delta: "+12.5%",
    },
    {
      label: "Active Subscribers",
      value: (1247).toLocaleString(),
      icon: Users,
      delta: "+8.3%",
    },
    {
      label: "Avg Revenue/User",
      value: "$102.20",
      icon: Rocket,
      delta: "+3.1%",
    },
    {
      label: "Annual Contracts",
      value: "312",
      icon: Package,
      delta: "+15.7%",
    },
  ];

  // handlers
  const toggleStatus = (id: number) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p))
    );
  };

  const openEdit = (pkg: PackagePlan) => {
    setSelectedPkg({ ...pkg, features: [...pkg.features] });
    setNewFeature("");
    setEditOpen(true);
  };

  const handleEditField = (field: keyof PackagePlan, value: string | number) => {
    if (!selectedPkg) return;
    setSelectedPkg({ ...selectedPkg, [field]: value });
  };

  const addFeature = () => {
    if (!selectedPkg || !newFeature.trim()) return;
    setSelectedPkg({
      ...selectedPkg,
      features: [...selectedPkg.features, newFeature.trim()],
    });
    setNewFeature("");
  };

  const removeFeature = (idx: number) => {
    if (!selectedPkg) return;
    setSelectedPkg({
      ...selectedPkg,
      features: selectedPkg.features.filter((_, i) => i !== idx),
    });
  };

  const saveEdit = () => {
    if (!selectedPkg) return;
    setPackages((prev) =>
      prev.map((p) => (p.id === selectedPkg.id ? selectedPkg : p))
    );
    setEditOpen(false);
    setSelectedPkg(null);
  };

  const deletePkg = (id: number) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 p-6"
    >
      {/* ---- header ---- */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
            <Package className="h-5 w-5 text-violet-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Package Management
            </h1>
            <p className="text-sm text-zinc-400">
              Manage subscription plans and pricing
            </p>
          </div>
        </div>
        <Button
          className="gap-2 bg-violet-600 hover:bg-violet-700 text-white"
          onClick={() => {
            const newPkg: PackagePlan = {
              id: Date.now(),
              name: "New Plan",
              monthlyPrice: 0,
              annualPrice: 0,
              subscribers: 0,
              revenue: 0,
              status: false,
              icon: Zap,
              color: "blue",
              features: [],
              aiLimit: 0,
              storageLimit: 0,
              teamLimit: 1,
            };
            setPackages((prev) => [...prev, newPkg]);
            openEdit(newPkg);
          }}
        >
          <Plus className="h-4 w-4" />
          Create New Plan
        </Button>
      </motion.div>

      {/* ---- stats ---- */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <Card
            key={s.label}
            className="border-zinc-800 bg-zinc-900/60 backdrop-blur"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {s.label}
              </CardTitle>
              <s.icon className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">{s.value}</div>
              <p className="mt-1 text-xs text-emerald-500">{s.delta} from last month</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* ---- plan cards ---- */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 md:grid-cols-2"
      >
        {packages.map((pkg) => {
          const c = colorMap[pkg.color] ?? colorMap.blue;
          const Icon = pkg.icon;

          return (
            <motion.div key={pkg.id} variants={itemVariants}>
              <Card
                className={`relative overflow-hidden border-zinc-800 bg-zinc-900/60 backdrop-blur transition-shadow hover:shadow-lg hover:shadow-violet-500/5 ${
                  !pkg.status ? "opacity-60" : ""
                }`}
              >
                {/* popular ribbon */}
                {pkg.popular && (
                  <div className="absolute right-4 top-4">
                    <Badge className="bg-violet-600 text-white hover:bg-violet-600">
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`}
                    >
                      <Icon className={`h-5 w-5 ${c.text}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-zinc-100">
                        {pkg.name}
                      </CardTitle>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl font-bold text-zinc-100">
                          ${pkg.monthlyPrice}
                        </span>
                        <span className="text-sm text-zinc-500">/mo</span>
                        <span className="ml-2 text-sm text-zinc-500">
                          ${pkg.annualPrice}/mo billed annually
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* metrics */}
                  <div className="flex gap-6">
                    <div>
                      <p className="text-xs text-zinc-500">Subscribers</p>
                      <p className="text-lg font-semibold text-zinc-200">
                        {pkg.subscribers.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Monthly Revenue</p>
                      <p className="text-lg font-semibold text-zinc-200">
                        ${pkg.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* features */}
                  <div className="space-y-1.5">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className={`h-3.5 w-3.5 shrink-0 ${c.text}`} />
                        <span className="text-zinc-400">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* actions */}
                  <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={pkg.status}
                        onCheckedChange={() => toggleStatus(pkg.id)}
                      />
                      <span className="text-sm text-zinc-400">
                        {pkg.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                        onClick={() => openEdit(pkg)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 border-red-900/50 text-red-500 hover:bg-red-950 hover:text-red-400"
                        onClick={() => deletePkg(pkg.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ---- edit dialog ---- */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-zinc-100">
              {selectedPkg ? `Edit ${selectedPkg.name} Plan` : "Edit Plan"}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Update plan details, pricing, and included features.
            </DialogDescription>
          </DialogHeader>

          {selectedPkg && (
            <div className="space-y-5 pt-2">
              {/* name */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Plan Name</Label>
                <Input
                  value={selectedPkg.name}
                  onChange={(e) => handleEditField("name", e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-violet-500"
                />
              </div>

              {/* pricing row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Monthly Price ($)</Label>
                  <Input
                    type="number"
                    value={selectedPkg.monthlyPrice}
                    onChange={(e) =>
                      handleEditField("monthlyPrice", Number(e.target.value))
                    }
                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-violet-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Annual Price ($/mo)</Label>
                  <Input
                    type="number"
                    value={selectedPkg.annualPrice}
                    onChange={(e) =>
                      handleEditField("annualPrice", Number(e.target.value))
                    }
                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-violet-500"
                  />
                </div>
              </div>

              {/* limits row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">AI Articles Limit</Label>
                  <Input
                    type="number"
                    value={selectedPkg.aiLimit}
                    onChange={(e) =>
                      handleEditField("aiLimit", Number(e.target.value))
                    }
                    placeholder="-1 for unlimited"
                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-violet-500"
                  />
                  <p className="text-xs text-zinc-500">-1 = unlimited</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Storage (GB)</Label>
                  <Input
                    type="number"
                    value={selectedPkg.storageLimit}
                    onChange={(e) =>
                      handleEditField("storageLimit", Number(e.target.value))
                    }
                    placeholder="-1 for unlimited"
                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-violet-500"
                  />
                  <p className="text-xs text-zinc-500">-1 = unlimited</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Team Members</Label>
                  <Input
                    type="number"
                    value={selectedPkg.teamLimit}
                    onChange={(e) =>
                      handleEditField("teamLimit", Number(e.target.value))
                    }
                    placeholder="-1 for unlimited"
                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-violet-500"
                  />
                  <p className="text-xs text-zinc-500">-1 = unlimited</p>
                </div>
              </div>

              {/* features */}
              <div className="space-y-3">
                <Label className="text-zinc-300">Features</Label>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-violet-500"
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="shrink-0 gap-1 bg-violet-600 hover:bg-violet-700 text-white"
                    onClick={addFeature}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPkg.features.map((f, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="gap-1 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    >
                      {f}
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="ml-0.5 rounded-full p-0.5 hover:bg-zinc-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* save / cancel */}
              <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-white"
                  onClick={saveEdit}
                >
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
