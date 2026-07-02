"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RequestaDemoPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center space-y-6"
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Request a Demo
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          See GhostOps in action. Our team will walk you through the full platform capabilities including AI content generation, SEO optimization, multi-channel publishing, and team collaboration features. Schedule your personalized demo today.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
