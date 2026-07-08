"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NAV_ITEMS } from "@/lib/constants";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  BarChart3,
  Menu,
  X,
  Feather,
  Search,
  Target,
  Image,
  Globe,
  DollarSign,
  Share2,
  Mail,
  Workflow,
  Send,
  FolderKanban,
  Users,
  Plug,
  CreditCard,
  Settings,
  Shield,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  Sparkles,
  BarChart3,
  Search,
  Target,
  Image,
  Globe,
  DollarSign,
  Share2,
  Mail,
  Workflow,
  Send,
  FolderKanban,
  Users,
  Plug,
  CreditCard,
  Settings,
  Shield,
  HelpCircle,
};

interface QuickNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const quickNavItems: QuickNavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Content", href: "/dashboard/content", icon: FileText },
  { name: "AI Writer", href: "/dashboard/ai-writer", icon: Sparkles },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div
          className={cn(
            "flex items-center justify-around",
            "bg-background/95 backdrop-blur-xl",
            "border-t border-border/50",
            "px-2 py-2 pb-[env(safe-area-inset-bottom)]"
          )}
        >
          {quickNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground active:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isActive && "scale-110"
                  )}
                />
                <span className="text-[10px] font-medium leading-none">
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors",
              isOpen
                ? "text-primary"
                : "text-muted-foreground active:text-foreground"
            )}
          >
            <Menu className="h-5 w-5" />
            <span className="text-[10px] font-medium leading-none">Menu</span>
          </button>
        </div>
      </nav>

      {/* Full-Screen Navigation Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Navigation Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
              }}
              className={cn(
                "md:hidden fixed bottom-0 left-0 right-0 z-50",
                "bg-background rounded-t-3xl",
                "max-h-[85vh] flex flex-col",
                "shadow-2xl shadow-black/20"
              )}
            >
              {/* Sheet Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Feather className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold tracking-tight">
                      InkFleet
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Navigation
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-9 w-9 rounded-full hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              {/* Drag Indicator */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
              </div>

              {/* Scrollable Nav Items */}
              <ScrollArea className="flex-1 overflow-hidden">
                <div className="px-4 py-4 space-y-6 pb-[env(safe-area-inset-bottom)]">
                  {NAV_ITEMS.map((group, groupIndex) => (
                    <motion.div
                      key={group.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 * groupIndex,
                        duration: 0.25,
                      }}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-3 mb-2">
                        {group.label}
                      </p>

                      <div className="space-y-0.5">
                        {group.items.map((item) => {
                          const Icon = iconMap[item.icon];
                          const isActive = pathname === item.href;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleClose}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                                isActive
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 active:bg-muted"
                              )}
                            >
                              {Icon && (
                                <div
                                  className={cn(
                                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                    isActive
                                      ? "bg-primary/15"
                                      : "bg-muted/50"
                                  )}
                                >
                                  <Icon
                                    className={cn(
                                      "h-4 w-4",
                                      isActive
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                    )}
                                  />
                                </div>
                              )}
                              <span>{item.name}</span>

                              {isActive && (
                                <motion.div
                                  layoutId="mobile-nav-active"
                                  className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                                  transition={{
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 30,
                                  }}
                                />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
