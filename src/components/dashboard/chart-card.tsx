"use client";

import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  dateRanges?: string[];
  onDateRangeChange?: (range: string) => void;
  loading?: boolean;
}

const rangeLabels: Record<string, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
  "1y": "1 year",
};

export function ChartCard({
  title,
  children,
  className,
  dateRanges,
  onDateRangeChange,
  loading = false,
}: ChartCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {dateRanges && dateRanges.length > 0 && (
          <Select
            defaultValue={dateRanges[0]}
            onValueChange={onDateRangeChange}
          >
            <SelectTrigger
              className={cn(
                "w-[100px] h-8 border-none bg-transparent text-xs",
                "shadow-none focus:ring-0 focus:ring-offset-0",
                "hover:bg-muted/50 transition-colors"
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {dateRanges.map((range) => (
                <SelectItem key={range} value={range} className="text-xs">
                  {rangeLabels[range] || range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[200px] w-full rounded-lg" />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
