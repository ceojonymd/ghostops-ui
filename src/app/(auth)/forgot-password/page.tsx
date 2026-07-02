"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Ghost, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto w-full max-w-sm"
    >
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6 flex flex-col items-center"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 ring-1 ring-violet-500/20">
            <Ghost className="h-6 w-6 text-violet-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            GhostOps
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mail icon */}
              <div className="mb-5 flex justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4, type: "spring" }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/15 ring-1 ring-violet-500/20"
                >
                  <Mail className="h-7 w-7 text-violet-400" />
                </motion.div>
              </div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-6 text-center"
              >
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Forgot your password?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  No worries. Enter your email and we&apos;ll send you a reset
                  link.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/[0.08] bg-white/[0.04] text-white placeholder:text-zinc-500 focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full bg-violet-600 font-semibold text-white shadow-lg shadow-violet-600/25",
                    "hover:bg-violet-500 hover:shadow-violet-500/30",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-all duration-200"
                  )}
                >
                  {isLoading ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Success icon */}
              <div className="mb-5 flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/15 ring-1 ring-emerald-500/20"
                >
                  <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                </motion.div>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Check your email
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-zinc-300">{email}</span>.
                Please check your inbox and follow the instructions.
              </p>
              <p className="mt-4 text-xs text-zinc-500">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setSent(false)}
                  className="text-violet-400 transition-colors hover:text-violet-300"
                >
                  try again
                </button>
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 flex justify-center"
        >
          <Link
            href="/login"
            className="group flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to login
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
