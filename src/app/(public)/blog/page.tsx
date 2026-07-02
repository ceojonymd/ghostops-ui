"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["All", "Engineering", "Product", "Design", "Growth", "AI"];

const blogPosts = [
  {
    id: 1,
    title: "Building Autonomous AI Agents That Actually Work in Production",
    excerpt:
      "A deep dive into our architecture for deploying reliable AI agents at scale. Learn how we handle failure recovery, state management, and human-in-the-loop patterns that make autonomous systems production-ready.",
    author: "Sarah Chen",
    authorInitials: "SC",
    date: "Jun 28, 2026",
    readTime: "12 min read",
    category: "Engineering",
    featured: true,
  },
  {
    id: 2,
    title: "Why We Rebuilt Our Entire Prompt Pipeline From Scratch",
    excerpt:
      "After hitting scaling limits with our v1 prompt system, we embarked on a complete rewrite. Here is what we learned about prompt engineering at scale.",
    author: "Marcus Johnson",
    authorInitials: "MJ",
    date: "Jun 24, 2026",
    readTime: "8 min read",
    category: "Engineering",
    featured: false,
  },
  {
    id: 3,
    title: "The Product Manager's Guide to AI-Powered Workflows",
    excerpt:
      "How product teams can leverage GhostOps to automate repetitive tasks, improve decision-making, and ship faster without sacrificing quality.",
    author: "Priya Patel",
    authorInitials: "PP",
    date: "Jun 20, 2026",
    readTime: "6 min read",
    category: "Product",
    featured: false,
  },
  {
    id: 4,
    title: "Designing Human-AI Interfaces: Lessons From 1000 User Tests",
    excerpt:
      "Our design team shares key insights from extensive user research on how people interact with AI agents and what makes interfaces feel trustworthy.",
    author: "Alex Rivera",
    authorInitials: "AR",
    date: "Jun 16, 2026",
    readTime: "10 min read",
    category: "Design",
    featured: false,
  },
  {
    id: 5,
    title: "How We Grew From 0 to 10,000 Users in 6 Months",
    excerpt:
      "A transparent look at our growth playbook — from community-led acquisition to product-led growth loops that compound over time.",
    author: "Jordan Lee",
    authorInitials: "JL",
    date: "Jun 12, 2026",
    readTime: "7 min read",
    category: "Growth",
    featured: false,
  },
  {
    id: 6,
    title: "Fine-Tuning vs RAG: When to Use Each for Enterprise AI",
    excerpt:
      "We break down the trade-offs between fine-tuning and retrieval-augmented generation for different enterprise use cases based on real customer deployments.",
    author: "Dr. Wei Zhang",
    authorInitials: "WZ",
    date: "Jun 8, 2026",
    readTime: "14 min read",
    category: "AI",
    featured: false,
  },
  {
    id: 7,
    title: "Our Design System Journey: From Chaos to Consistency",
    excerpt:
      "How we built a scalable design system that keeps our UI consistent across 50+ components and supports both light and dark themes.",
    author: "Emma Torres",
    authorInitials: "ET",
    date: "Jun 4, 2026",
    readTime: "9 min read",
    category: "Design",
    featured: false,
  },
  {
    id: 8,
    title: "Launching GhostOps Enterprise: What We Learned About B2B Sales",
    excerpt:
      "The transition from developer tool to enterprise platform taught us hard lessons about sales cycles, procurement, and building for compliance.",
    author: "David Kim",
    authorInitials: "DK",
    date: "May 30, 2026",
    readTime: "11 min read",
    category: "Product",
    featured: false,
  },
  {
    id: 9,
    title: "The State of AI Agents in 2026: Trends and Predictions",
    excerpt:
      "Our annual analysis of the AI agent landscape — where the industry is heading, what is working, and what is still hype versus reality.",
    author: "Sarah Chen",
    authorInitials: "SC",
    date: "May 26, 2026",
    readTime: "15 min read",
    category: "AI",
    featured: false,
  },
];

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost.id);
  const totalPages = Math.max(1, Math.ceil(regularPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = regularPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            GhostOps{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            Insights on AI agents, engineering, product development, and growing
            an AI-native company.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-12 justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {activeCategory === "All" && searchQuery === "" && currentPage === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-12"
          >
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-all duration-300 overflow-hidden group">
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-br from-violet-600/20 to-purple-600/20 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <Badge className="bg-violet-600/20 text-violet-300 border-violet-500/30 mb-4">
                      Featured
                    </Badge>
                    <div className="text-6xl md:text-8xl font-bold text-violet-500/20">
                      01
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <Badge
                    variant="outline"
                    className="mb-4 border-violet-500/30 text-violet-300"
                  >
                    {featuredPost.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-zinc-400 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center text-xs font-bold text-violet-300">
                        {featuredPost.authorInitials}
                      </div>
                      <span className="text-zinc-300">
                        {featuredPost.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 p-0 group/btn"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Post Grid */}
        {paginatedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-all duration-300 h-full flex flex-col group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 text-xs"
                      >
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-zinc-600">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-violet-600/20 flex items-center justify-center text-xs font-bold text-violet-300">
                          {post.authorInitials}
                        </div>
                        <div>
                          <p className="text-xs text-zinc-300">
                            {post.author}
                          </p>
                          <p className="text-xs text-zinc-600 flex items-center gap-1">
                            <Calendar className="h-2.5 w-2.5" />
                            {post.date}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 p-0 h-auto group/btn"
                      >
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">
              No articles found
            </h3>
            <p className="text-zinc-600">
              Try adjusting your search or filter to find what you are looking
              for.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`w-9 ${
                  currentPage === page
                    ? "bg-violet-600 border-violet-600 text-white hover:bg-violet-700"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
