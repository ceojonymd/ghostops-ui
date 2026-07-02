"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { formatNumber, formatPercentage } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change: number;
  prefix?: string;
  suffix?: string;
  sparklineData?: number[];
  delay?: number;
}

function buildSparklinePath(
  data: number[],
  width: number,
  height: number
): { linePath: string; areaPath: string } {
  if (data.length === 0) return { linePath: "", areaPath: "" };

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const padding = 2;
  const effectiveHeight = height - padding * 2;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = padding + effectiveHeight - ((value - min) / range) * effectiveHeight;
    return { x, y };
  });

  const linePath = points
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x},${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

  return { linePath, areaPath };
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  prefix = "",
  suffix = "",
  sparklineData,
  delay,
}: StatCardProps) {
  const isPositive = change >= 0;

  const displayValue =
    typeof value === "number"
      ? `${prefix}${formatNumber(value)}${suffix}`
      : `${prefix}${value}${suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay || 0, duration: 0.4 }}
    >
      <Card
        className={cn(
          "group transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                isPositive
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-red-500/10 text-red-500"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {formatPercentage(change)}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-bold tracking-tight">
              {displayValue}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>

          {sparklineData && sparklineData.length > 1 && (
            <div className="mt-3 h-8 w-full">
              <svg
                viewBox={`0 0 200 32`}
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`sparkline-gradient-${label.replace(/\s+/g, "-")}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <path
                  d={buildSparklinePath(sparklineData, 200, 32).areaPath}
                  fill={`url(#sparkline-gradient-${label.replace(/\s+/g, "-")})`}
                />
                <path
                  d={buildSparklinePath(sparklineData, 200, 32).linePath}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
