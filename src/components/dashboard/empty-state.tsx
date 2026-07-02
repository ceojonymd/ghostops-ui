"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <div className="rounded-2xl bg-muted/50 p-6">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold mt-6">{title}</h3>

      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="default" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
