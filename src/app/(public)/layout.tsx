"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Feather,
  Sparkles,
  Menu,
  X,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Docs", href: "/docs" },
];

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
    { label: "API", href: "/api" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Resources: [
    { label: "Docs", href: "/docs" },
    { label: "Guides", href: "/guides" },
    { label: "Help Center", href: "/help" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/ghostops", label: "Twitter" },
  { icon: Github, href: "https://github.com/ghostops", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/ghostops",
    label: "LinkedIn",
  },
  { icon: Youtube, href: "https://youtube.com/@ghostops", label: "YouTube" },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Navbar */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent backdrop-blur-sm"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Feather className="h-7 w-7 text-violet-500 transition-transform duration-300 group-hover:scale-110" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Ink
              <span className="text-violet-500">Fleet</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-zinc-400 rounded-lg transition-colors duration-200 hover:text-zinc-100 hover:bg-white/[0.05]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/25"
            >
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 1, height: "auto" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-zinc-300 rounded-lg hover:text-zinc-100 hover:bg-white/[0.05] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <Button
                    variant="ghost"
                    asChild
                    className="w-full justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]"
                  >
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full justify-center bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/25"
                  >
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Footer Top */}
          <div className="grid gap-12 py-16 lg:grid-cols-6">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <Feather className="h-7 w-7 text-violet-500" />
                <span className="text-xl font-bold tracking-tight">
                  Ink
                  <span className="text-violet-500">Fleet</span>
                </span>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                AI-powered publishing platform. Create, optimize, and
                publish content at scale with one dashboard.
              </p>

              {/* Newsletter */}
              <div className="pt-4 space-y-3">
                <p className="text-sm font-medium text-zinc-300">
                  Stay in the loop
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex gap-2"
                >
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="h-9 bg-white/[0.05] border-white/[0.08] text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-violet-600/50 focus-visible:border-violet-600/50"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="h-9 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/25 shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-sm font-semibold text-zinc-300">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col items-center gap-4 border-t border-white/[0.06] py-6 sm:flex-row sm:justify-between">
            <p className="text-sm text-zinc-600">
              &copy; 2025 InkFleet. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
