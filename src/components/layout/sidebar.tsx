"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/lib/constants"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Search,
  Target,
  Image,
  Globe,
  DollarSign,
  Share2,
  Mail,
  BarChart3,
  Workflow,
  Send,
  FolderKanban,
  Users,
  Plug,
  CreditCard,
  Settings,
  Shield,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Ghost,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileText,
  Sparkles,
  Search,
  Target,
  Image,
  Globe,
  DollarSign,
  Share2,
  Mail,
  BarChart3,
  Workflow,
  Send,
  FolderKanban,
  Users,
  Plug,
  CreditCard,
  Settings,
  Shield,
  HelpCircle,
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 h-screen z-40 flex flex-col",
          "border-r bg-sidebar text-sidebar-foreground",
          "dark:glass"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center border-b border-sidebar-border",
            collapsed ? "justify-center px-2 py-6" : "px-4 py-6"
          )}
        >
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div
              className={cn(
                "flex items-center justify-center rounded-xl",
                "bg-primary/10 transition-all duration-300",
                "group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20",
                collapsed ? "h-9 w-9" : "h-10 w-10"
              )}
            >
              <Ghost
                className={cn(
                  "text-primary transition-transform duration-300",
                  "group-hover:scale-110",
                  collapsed ? "h-5 w-5" : "h-6 w-6"
                )}
              />
            </div>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="gradient-text text-xl font-bold tracking-tight"
                >
                  GhostOps
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="py-2">
            {NAV_ITEMS.map((group) => (
              <div key={group.label} className="mb-1">
                {/* Group Label */}
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "px-4 mb-1 mt-4 first:mt-2",
                        "text-[10px] uppercase tracking-wider font-semibold",
                        "text-muted-foreground select-none"
                      )}
                    >
                      {group.label}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed separator line instead of label */}
                {collapsed && (
                  <div className="mx-3 my-3 border-t border-sidebar-border/50" />
                )}

                {/* Nav Items */}
                {group.items.map((item) => {
                  const IconComponent = iconMap[item.icon]
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href))

                  const linkContent = (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-3 rounded-lg mx-2 transition-all duration-200",
                        "text-sm font-medium",
                        collapsed
                          ? "justify-center px-0 py-2.5"
                          : "px-4 py-2.5",
                        isActive
                          ? "bg-primary/10 text-primary border-l-2 border-primary shadow-sm shadow-primary/5"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground border-l-2 border-transparent"
                      )}
                    >
                      {IconComponent && (
                        <IconComponent
                          className={cn(
                            "shrink-0 transition-colors duration-200",
                            collapsed ? "h-5 w-5" : "h-4 w-4",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-accent-foreground"
                          )}
                        />
                      )}
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.15 }}
                            className="truncate"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && !collapsed && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className="absolute inset-0 rounded-lg bg-primary/5"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  )

                  if (collapsed) {
                    return (
                      <Tooltip key={item.name}>
                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="font-medium"
                          sideOffset={8}
                        >
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    )
                  }

                  return (
                    <div key={item.name} className="group">
                      {linkContent}
                    </div>
                  )
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="border-t border-sidebar-border">
          <div
            className={cn(
              "flex items-center transition-all duration-300",
              collapsed ? "justify-center px-2 py-4" : "gap-3 px-4 py-4"
            )}
          >
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20 transition-all hover:ring-primary/40">
                    <AvatarImage src="" alt="Sarah Chen" />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                      SC
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  <div className="text-sm">
                    <p className="font-medium">Sarah Chen</p>
                    <p className="text-muted-foreground text-xs">Admin</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Avatar className="h-9 w-9 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
                  <AvatarImage src="" alt="Sarah Chen" />
                  <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                    SC
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-semibold truncate">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </motion.div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
                      asChild
                    >
                      <Link href="/dashboard/settings">
                        <Settings className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    Settings
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <div
          className={cn(
            "border-t border-sidebar-border",
            collapsed ? "px-2 py-3" : "px-4 py-3"
          )}
        >
          <Button
            variant="ghost"
            onClick={onToggle}
            className={cn(
              "w-full h-9 text-muted-foreground hover:text-foreground",
              "transition-colors duration-200",
              collapsed ? "px-0 justify-center" : "justify-start gap-2"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-medium"
                >
                  Collapse
                </motion.span>
              </>
            )}
          </Button>
        </div>
      </motion.aside>
    </TooltipProvider>
  )
}
