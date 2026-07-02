"use client";

import { cn } from "@/lib/utils";

type Status = "published" | "draft" | "scheduled" | "archived";

interface StatusBadgeProps {
  status: Status;
}

const statusStyles: Record<Status, { badge: string; dot: string }> = {
  published: {
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  draft: {
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    dot: "bg-amber-500",
  },
  scheduled: {
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    dot: "bg-blue-500",
  },
  archived: {
    badge: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    dot: "bg-zinc-500",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles.badge
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
