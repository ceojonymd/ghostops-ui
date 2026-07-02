"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Download,
  Check,
  Shield,
  Zap,
  HardDrive,
  Activity,
  ArrowUpRight,
  Lock,
  X,
  Crown,
  Building2,
  Rocket,
  Star,
} from "lucide-react";

import { cn, formatCurrency } from "@/lib/utils";
import { invoices } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const currentPlanFeatures = [
  "Unlimited AI articles",
  "Full SEO suite",
  "25 team members",
  "500GB storage",
  "24/7 support",
  "White label",
  "API access",
];

const usageMeters = [
  {
    title: "AI Credits",
    used: 7840,
    total: 10000,
    unit: "",
    icon: Zap,
    color: "violet",
    percentage: 78,
  },
  {
    title: "Storage",
    used: 34.2,
    total: 50,
    unit: "GB",
    icon: HardDrive,
    color: "blue",
    percentage: 68,
  },
  {
    title: "API Calls",
    used: 145000,
    total: 200000,
    unit: "",
    icon: Activity,
    color: "emerald",
    percentage: 72,
  },
];

/* ------------------------------------------------------------------ */
/*  Plan comparison data                                               */
/* ------------------------------------------------------------------ */

interface PlanTier {
  id: string;
  name: string;
  icon: typeof Star;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  highlighted: boolean;
  buttonLabel: string;
  buttonVariant: "default" | "outline";
  features: Record<string, string | boolean>;
}

const featureList = [
  "AI Articles / month",
  "SEO Optimization",
  "Team Members",
  "Storage",
  "API Access",
  "Custom Templates",
  "White Label",
  "Priority Support",
  "Dedicated Account Manager",
];

const plans: PlanTier[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Star,
    monthlyPrice: 29,
    annualPrice: 24,
    description: "Perfect for individual bloggers and small projects.",
    highlighted: false,
    buttonLabel: "Downgrade",
    buttonVariant: "outline",
    features: {
      "AI Articles / month": "10",
      "SEO Optimization": "Basic",
      "Team Members": "1",
      "Storage": "5 GB",
      "API Access": false,
      "Custom Templates": false,
      "White Label": false,
      "Priority Support": false,
      "Dedicated Account Manager": false,
    },
  },
  {
    id: "pro",
    name: "Pro",
    icon: Rocket,
    monthlyPrice: 79,
    annualPrice: 66,
    description: "Ideal for growing content teams and agencies.",
    highlighted: false,
    buttonLabel: "Downgrade",
    buttonVariant: "outline",
    features: {
      "AI Articles / month": "50",
      "SEO Optimization": "Advanced",
      "Team Members": "5",
      "Storage": "50 GB",
      "API Access": true,
      "Custom Templates": true,
      "White Label": false,
      "Priority Support": false,
      "Dedicated Account Manager": false,
    },
  },
  {
    id: "business",
    name: "Business",
    icon: Crown,
    monthlyPrice: 199,
    annualPrice: 166,
    description: "For established businesses with high content demands.",
    highlighted: true,
    buttonLabel: "Current Plan",
    buttonVariant: "default",
    features: {
      "AI Articles / month": "Unlimited",
      "SEO Optimization": "Full Suite",
      "Team Members": "25",
      "Storage": "500 GB",
      "API Access": true,
      "Custom Templates": true,
      "White Label": true,
      "Priority Support": true,
      "Dedicated Account Manager": false,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    monthlyPrice: null,
    annualPrice: null,
    description: "Custom solutions for large organizations.",
    highlighted: false,
    buttonLabel: "Contact Sales",
    buttonVariant: "outline",
    features: {
      "AI Articles / month": "Unlimited",
      "SEO Optimization": "Full Suite + Custom",
      "Team Members": "Unlimited",
      "Storage": "Unlimited",
      "API Access": true,
      "Custom Templates": true,
      "White Label": true,
      "Priority Support": true,
      "Dedicated Account Manager": true,
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatUsageNumber(value: number): string {
  if (value >= 1000) {
    return value.toLocaleString();
  }
  return value.toString();
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getProgressColorClass(color: string): string {
  switch (color) {
    case "violet":
      return "[&>div]:bg-violet-500";
    case "blue":
      return "[&>div]:bg-blue-500";
    case "emerald":
      return "[&>div]:bg-emerald-500";
    default:
      return "[&>div]:bg-violet-500";
  }
}

function getIconBgClass(color: string): string {
  switch (color) {
    case "violet":
      return "bg-violet-500/10 text-violet-500";
    case "blue":
      return "bg-blue-500/10 text-blue-500";
    case "emerald":
      return "bg-emerald-500/10 text-emerald-500";
    default:
      return "bg-violet-500/10 text-violet-500";
  }
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription, usage, and payment methods.
        </p>
      </motion.div>

      {/* Current Plan Card */}
      <motion.div variants={itemVariants}>
        <Card className="border-violet-500/30 shadow-violet-500/5 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent pointer-events-none" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl">Current Plan</CardTitle>
                <Badge className="bg-violet-500/15 text-violet-500 hover:bg-violet-500/20 border-violet-500/20">
                  Business
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">
                  {formatCurrency(199)}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </p>
              </div>
            </div>
            <CardDescription>
              Next billing date:{" "}
              <span className="text-foreground font-medium">July 15, 2025</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Separator />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentPlanFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-violet-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Upgrade to Enterprise
              </Button>
              <button className="text-sm text-red-500 hover:text-red-600 hover:underline transition-colors">
                Cancel Plan
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Usage Meters */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold mb-4">Usage This Period</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usageMeters.map((meter) => {
            const Icon = meter.icon;
            return (
              <motion.div key={meter.title} variants={itemVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center",
                          getIconBgClass(meter.color)
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{meter.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatUsageNumber(meter.used)}
                          {meter.unit ? ` ${meter.unit}` : ""} of{" "}
                          {formatUsageNumber(meter.total)}
                          {meter.unit ? ` ${meter.unit}` : ""} used
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          meter.percentage >= 80
                            ? "text-amber-500"
                            : "text-muted-foreground"
                        )}
                      >
                        {meter.percentage}%
                      </span>
                    </div>
                    <Progress
                      value={meter.percentage}
                      className={cn("h-2", getProgressColorClass(meter.color))}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Plan Comparison */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Compare Plans</h2>
            <p className="text-sm text-muted-foreground">Choose the plan that fits your needs.</p>
          </div>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center gap-1 rounded-full bg-muted p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                billingCycle === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
                billingCycle === "annual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] px-1.5 py-0">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            return (
              <motion.div key={plan.id} variants={itemVariants}>
                <Card
                  className={cn(
                    "h-full relative",
                    plan.highlighted && "border-violet-500/50 shadow-lg shadow-violet-500/5"
                  )}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-violet-600 text-white hover:bg-violet-700">
                        Current Plan
                      </Badge>
                    </div>
                  )}
                  <CardContent className="pt-8 space-y-5">
                    {/* Plan header */}
                    <div className="text-center">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center mx-auto mb-3",
                        plan.highlighted ? "bg-violet-500/10 text-violet-500" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      {price !== null ? (
                        <p className="text-3xl font-bold">
                          ${price}
                          <span className="text-sm font-normal text-muted-foreground">/mo</span>
                        </p>
                      ) : (
                        <p className="text-2xl font-bold">Contact Us</p>
                      )}
                      {billingCycle === "annual" && price !== null && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Billed ${price * 12}/year
                        </p>
                      )}
                    </div>

                    <Separator />

                    {/* Features */}
                    <div className="space-y-2.5">
                      {featureList.map((feature) => {
                        const value = plan.features[feature];
                        return (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            {value === false ? (
                              <X className="h-3.5 w-3.5 text-muted-foreground/40 flex-shrink-0" />
                            ) : (
                              <Check className={cn(
                                "h-3.5 w-3.5 flex-shrink-0",
                                plan.highlighted ? "text-violet-500" : "text-emerald-500"
                              )} />
                            )}
                            <span className={cn(
                              "flex-1",
                              value === false ? "text-muted-foreground/40" : "text-muted-foreground"
                            )}>
                              {feature}
                            </span>
                            {typeof value === "string" && (
                              <span className="text-xs font-medium">{value}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    <Button
                      className={cn(
                        "w-full",
                        plan.highlighted
                          ? "bg-violet-600 hover:bg-violet-700 text-white cursor-default"
                          : plan.buttonLabel === "Contact Sales"
                          ? "border-violet-500/30 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10"
                          : ""
                      )}
                      variant={plan.buttonVariant}
                      disabled={plan.highlighted}
                    >
                      {plan.buttonLabel}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Payment Method */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-violet-500" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">
                    Expires 12/26
                  </p>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              <span>Secured by Stripe</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoice History */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoice History</CardTitle>
            <CardDescription>
              View and download your past invoices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "capitalize",
                            invoice.status === "paid" &&
                              "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/15",
                            invoice.status === "pending" &&
                              "bg-amber-500/10 text-amber-500 hover:bg-amber-500/15"
                          )}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{invoice.plan}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1.5" />
                          Download
                        </Button>
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
