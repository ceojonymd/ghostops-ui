"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Shield,
  BarChart3,
  Search,
  Sparkles,
  Mail,
  CreditCard,
  MessageSquare,
  Code,
  Workflow,
  FileText,
  Plug,
  CheckCircle2,
  XCircle,
  Settings2,
  Zap,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { integrations } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Shield,
  BarChart3,
  Search,
  Sparkles,
  Mail,
  CreditCard,
  MessageSquare,
  Code,
  Workflow,
  FileText,
};

const categories = [
  "All",
  "CMS",
  "AI",
  "Analytics",
  "SEO",
  "Infrastructure",
  "Email",
  "Payments",
  "Automation",
  "Development",
  "Communication",
];

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [configOpen, setConfigOpen] = React.useState(false);
  const [selectedIntegration, setSelectedIntegration] = React.useState<
    (typeof integrations)[number] | null
  >(null);
  const [apiKey, setApiKey] = React.useState("");
  const [webhookUrl, setWebhookUrl] = React.useState("");

  const filteredIntegrations = integrations
    .filter((integration) => {
      const matchesSearch =
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || integration.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.connected === b.connected) return 0;
      return a.connected ? -1 : 1;
    });

  const handleConfigure = (
    integration: (typeof integrations)[number]
  ) => {
    setSelectedIntegration(integration);
    setApiKey("");
    setWebhookUrl("");
    setConfigOpen(true);
  };

  const handleSave = () => {
    setConfigOpen(false);
    setSelectedIntegration(null);
    setApiKey("");
    setWebhookUrl("");
  };

  const connectedCount = integrations.filter((i) => i.connected).length;

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
            <Plug className="h-7 w-7 text-violet-400" />
            Integrations
          </h1>
          <p className="text-sm text-zinc-400">
            Connect your favorite tools and services.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className="border-0 bg-violet-500/10 px-3 py-1.5 text-violet-400"
          >
            <Zap className="mr-1.5 h-3.5 w-3.5" />
            {connectedCount} of {integrations.length} connected
          </Badge>
        </div>
      </motion.div>

      {/* Search + Category filter */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-zinc-800 bg-zinc-900 pl-10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                activeCategory === category
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                  : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Integration cards grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredIntegrations.map((integration) => {
          const IconComponent = iconMap[integration.icon] || Globe;

          return (
            <motion.div key={integration.id} variants={itemVariants}>
              <Card className="group relative border-zinc-800 bg-zinc-900/60 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        integration.connected
                          ? "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20"
                          : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700"
                      )}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>

                    {/* Status badge */}
                    {integration.connected ? (
                      <Badge
                        variant="secondary"
                        className="border-0 bg-emerald-500/10 text-emerald-400"
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="border-0 bg-zinc-500/10 text-zinc-500"
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        Disconnected
                      </Badge>
                    )}
                  </div>

                  {/* Name & Description */}
                  <div className="mt-4 space-y-1.5">
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {integration.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-500">
                      {integration.description}
                    </p>
                  </div>

                  {/* Category + Action */}
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-800/60 pt-4">
                    <Badge
                      variant="secondary"
                      className="border-0 bg-zinc-800/80 text-xs text-zinc-400"
                    >
                      {integration.category}
                    </Badge>

                    {integration.connected ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfigure(integration)}
                        className="border-zinc-700 bg-transparent text-zinc-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
                      >
                        <Settings2 className="mr-1.5 h-3.5 w-3.5" />
                        Configure
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-violet-600 text-white hover:bg-violet-700"
                      >
                        <Zap className="mr-1.5 h-3.5 w-3.5" />
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty state */}
      {filteredIntegrations.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 py-16"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800/60">
            <Search className="h-6 w-6 text-zinc-600" />
          </div>
          <h3 className="mt-4 text-sm font-medium text-zinc-300">
            No integrations found
          </h3>
          <p className="mt-1 text-xs text-zinc-600">
            Try adjusting your search or filter criteria.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 text-violet-400 hover:text-violet-300"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
          >
            Clear filters
          </Button>
        </motion.div>
      )}

      {/* Configure Dialog */}
      <Dialog open={configOpen} onOpenChange={setConfigOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-zinc-100">
              {selectedIntegration && (
                <>
                  {(() => {
                    const Icon =
                      iconMap[selectedIntegration.icon] || Globe;
                    return (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                        <Icon className="h-4 w-4 text-violet-400" />
                      </div>
                    );
                  })()}
                  Configure {selectedIntegration.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              Manage your connection settings and credentials.
            </DialogDescription>
          </DialogHeader>

          <Separator className="bg-zinc-800" />

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-zinc-300">
                API Key
              </Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-url" className="text-zinc-300">
                Webhook URL
              </Label>
              <Input
                id="webhook-url"
                type="url"
                placeholder="https://your-webhook-url.com/hook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500"
              />
            </div>

            <Button
              variant="outline"
              className="w-full border-zinc-700 bg-transparent text-zinc-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <Zap className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
          </div>

          <Separator className="bg-zinc-800" />

          <DialogFooter className="flex-row gap-2 sm:justify-between">
            <Button
              variant="outline"
              className="border-red-500/30 bg-transparent text-red-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
              onClick={() => setConfigOpen(false)}
            >
              Disconnect
            </Button>
            <Button
              onClick={handleSave}
              className="bg-violet-600 text-white hover:bg-violet-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
