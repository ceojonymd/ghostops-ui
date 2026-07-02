"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { CommandPalette } from "@/components/layout/command-palette"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

  const [collapsed, setCollapsed] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    const stored = localStorage.getItem("ghostops-sidebar-collapsed")
    if (stored !== null) {
      setCollapsed(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ghostops-sidebar-collapsed", JSON.stringify(collapsed))
  }, [collapsed])

  const handleToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <QueryClientProvider client={queryClient}>
        <div className="relative min-h-screen bg-background">
          {/* Sidebar - hidden on mobile, visible on desktop */}
          <div className="hidden md:block">
            <Sidebar collapsed={collapsed} onToggle={handleToggle} />
          </div>

          {/* Main content area */}
          <div
            className={cn(
              "transition-all duration-300",
              isDesktop
                ? collapsed
                  ? "ml-16"
                  : "ml-64"
                : "ml-0"
            )}
          >
            <Topbar />

            <main className="p-6 pt-20 min-h-screen">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </main>
          </div>

          {/* Mobile bottom navigation */}
          <MobileNav />

          {/* Command palette - always mounted */}
          <CommandPalette />
        </div>
      </QueryClientProvider>
    </TooltipProvider>
  )
}
