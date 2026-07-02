"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ghost, ShieldCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow single digit
      const digit = value.replace(/\D/g, "").slice(-1);

      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      // Auto-focus next input
      if (digit && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (!otp[index] && index > 0) {
          // Move to previous input on backspace if current is empty
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          inputRefs.current[index - 1]?.focus();
        } else {
          const newOtp = [...otp];
          newOtp[index] = "";
          setOtp(newOtp);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      const newOtp = Array(6).fill("");
      pasted.split("").forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const nextEmpty = newOtp.findIndex((v) => !v);
      inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
    }
  }, []);

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const isComplete = otp.every((digit) => digit !== "");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

        {/* Shield icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4, type: "spring" }}
          className="mb-5 flex justify-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/15 ring-1 ring-violet-500/20">
            <ShieldCheck className="h-7 w-7 text-violet-400" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Verify your email
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            We&apos;ve sent a 6-digit code to your email address.
          </p>
        </motion.div>

        {/* OTP inputs */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          onSubmit={handleVerify}
          className="space-y-6"
        >
          <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoFocus={index === 0}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={cn(
                  "h-14 w-12 rounded-xl border text-center text-2xl font-bold outline-none transition-all duration-200",
                  "bg-white/[0.04] text-white caret-violet-400",
                  digit
                    ? "border-violet-500/50 shadow-sm shadow-violet-500/10"
                    : "border-white/[0.08]",
                  "focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20",
                  "placeholder:text-zinc-600"
                )}
                placeholder="-"
              />
            ))}
          </div>

          {/* Verify button */}
          <Button
            type="submit"
            disabled={!isComplete || isLoading}
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
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              "Verify"
            )}
          </Button>
        </motion.form>

        {/* Resend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-5 text-center"
        >
          <p className="text-sm text-zinc-500">
            Didn&apos;t receive a code?{" "}
            {canResend ? (
              <button
                onClick={handleResend}
                className="font-medium text-violet-400 transition-colors hover:text-violet-300"
              >
                Resend
              </button>
            ) : (
              <span className="font-medium text-zinc-400">
                Resend in{" "}
                <span className="tabular-nums text-violet-400">
                  {formatTime(countdown)}
                </span>
              </span>
            )}
          </p>
        </motion.div>

        {/* Back to login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-5 flex justify-center"
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
