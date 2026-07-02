"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Bell, BellOff } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Notifications
            </h1>
            <p className="text-zinc-400 mt-1">
              Stay up to date with your content, team, and platform activity.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-zinc-800/50 p-4 mb-4">
            <BellOff className="h-8 w-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium text-zinc-300">No notifications yet</h3>
          <p className="text-zinc-500 mt-1 max-w-sm">
            When you receive notifications about your content, team activity, or billing, they will appear here.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
