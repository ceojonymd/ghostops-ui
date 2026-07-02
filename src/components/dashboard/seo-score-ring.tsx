"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SeoScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function SeoScoreRing({
  score,
  size = 80,
  strokeWidth = 6,
}: SeoScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const scoreColor =
    score > 80
      ? "stroke-emerald-500"
      : score > 60
        ? "stroke-amber-500"
        : "stroke-red-500";

  const scoreTextColor =
    score > 80
      ? "text-emerald-500"
      : score > 60
        ? "text-amber-500"
        : "text-red-500";

  const fontSize = size * 0.28;
  const labelSize = size * 0.13;

  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className={scoreColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference - (score / 100) * circumference,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            transformOrigin: `${center}px ${center}px`,
            transform: "rotate(-90deg)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn("font-bold leading-none", scoreTextColor)}
          style={{ fontSize }}
        >
          {score}
        </span>
        <span
          className="font-medium uppercase tracking-wider text-muted-foreground"
          style={{ fontSize: labelSize }}
        >
          SEO
        </span>
      </div>
    </div>
  );
}
