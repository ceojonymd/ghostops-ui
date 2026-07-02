"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Search,
  Plus,
  Download,
  Star,
  X,
  ListPlus,
  Globe,
  Languages,
} from "lucide-react"

import { cn, formatNumber } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { keywords } from "@/lib/mock-data"

type ClusterType = "all" | "informational" | "commercial" | "transactional" | "navigational"

interface SavedKeyword {
  keyword: string
  volume: number
  difficulty: number
}

function getDifficultyColor(difficulty: number): string {
  if (difficulty < 40) return "bg-green-500"
  if (difficulty < 70) return "bg-amber-500"
  return "bg-red-500"
}

function getDifficultyTextColor(difficulty: number): string {
  if (difficulty < 40) return "text-green-600 dark:text-green-400"
  if (difficulty < 70) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

function getDifficultyLabel(difficulty: number): string {
  if (difficulty < 40) return "Easy"
  if (difficulty < 70) return "Medium"
  return "Hard"
}

function SparkLine({ data, className }: { data: number[]; className?: string }) {
  if (!data || data.length === 0) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 80
  const height = 32
  const padding = 2

  const points = data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2)
      const y = padding + (1 - (value - min) / range) * (height - padding * 2)
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("flex-shrink-0", className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const clusterMap: Record<ClusterType, string[]> = {
  all: keywords.map((k) => k.keyword),
  informational: ["how to start a blog", "content marketing strategy", "affiliate marketing guide"],
  commercial: ["best AI writing tools", "SEO tools 2025"],
  transactional: ["email marketing software"],
  navigational: [],
}

const clusterLabels: Record<ClusterType, string> = {
  all: "All Keywords",
  informational: "Informational",
  commercial: "Commercial",
  transactional: "Transactional",
  navigational: "Navigational",
}

export default function KeywordsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCluster, setActiveCluster] = React.useState<ClusterType>("all")
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([])
  const [savedKeywords, setSavedKeywords] = React.useState<SavedKeyword[]>([
    { keyword: "best AI writing tools", volume: 14800, difficulty: 62 },
    { keyword: "SEO tools 2025", volume: 22000, difficulty: 55 },
    { keyword: "content marketing strategy", volume: 18500, difficulty: 68 },
  ])
  const [country, setCountry] = React.useState("us")
  const [language, setLanguage] = React.useState("en")

  const filteredKeywords = React.useMemo(() => {
    let filtered = keywords

    if (activeCluster !== "all") {
      const clusterKeywords = clusterMap[activeCluster]
      filtered = filtered.filter((k) => clusterKeywords.includes(k.keyword))
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((k) => k.keyword.toLowerCase().includes(query))
    }

    return filtered
  }, [activeCluster, searchQuery])

  const toggleKeywordSelection = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    )
  }

  const toggleSelectAll = () => {
    if (selectedKeywords.length === filteredKeywords.length) {
      setSelectedKeywords([])
    } else {
      setSelectedKeywords(filteredKeywords.map((k) => k.keyword))
    }
  }

  const removeSavedKeyword = (keyword: string) => {
    setSavedKeywords((prev) => prev.filter((k) => k.keyword !== keyword))
  }

  const allSelected =
    filteredKeywords.length > 0 &&
    selectedKeywords.length === filteredKeywords.length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Keyword Research</h1>
        <p className="text-muted-foreground mt-1">
          Discover high-value keywords and track your rankings.
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter a keyword or topic to research..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full sm:w-40">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
              </SelectContent>
            </Select>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full sm:w-36">
                <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Research
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Keyword Clusters */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Keyword Clusters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {(Object.keys(clusterLabels) as ClusterType[]).map((cluster) => {
                const count = clusterMap[cluster].length
                const isActive = activeCluster === cluster

                return (
                  <div
                    key={cluster}
                    onClick={() => {
                      setActiveCluster(cluster)
                      setSelectedKeywords([])
                    }}
                    className={cn(
                      "flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/50"
                    )}
                  >
                    <span className="text-sm font-medium">
                      {clusterLabels[cluster]}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="text-base">Keyword Results</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Showing {filteredKeywords.length} keyword
                  {filteredKeywords.length !== 1 ? "s" : ""}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              {/* Bulk Action Bar */}
              <AnimatePresence>
                {selectedKeywords.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 mb-4">
                      <span className="text-sm font-medium">
                        {selectedKeywords.length} keyword
                        {selectedKeywords.length !== 1 ? "s" : ""} selected
                      </span>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export Selected
                        </Button>
                        <Button variant="outline" size="sm">
                          <ListPlus className="h-4 w-4 mr-2" />
                          Add to List
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Table */}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all keywords"
                        />
                      </TableHead>
                      <TableHead>Keyword</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-right">CPC</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>SERP Features</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence mode="popLayout">
                      {filteredKeywords.map((kw, index) => {
                        const isSelected = selectedKeywords.includes(kw.keyword)

                        return (
                          <motion.tr
                            key={kw.keyword}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                              "border-b transition-colors hover:bg-muted/50",
                              isSelected && "bg-primary/5"
                            )}
                          >
                            <TableCell>
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() =>
                                  toggleKeywordSelection(kw.keyword)
                                }
                                aria-label={`Select ${kw.keyword}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {kw.keyword}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {formatNumber(kw.volume)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="relative w-24 h-2 rounded-full bg-secondary">
                                  <div
                                    className={cn(
                                      "absolute inset-y-0 left-0 rounded-full transition-all",
                                      getDifficultyColor(kw.difficulty)
                                    )}
                                    style={{ width: `${kw.difficulty}%` }}
                                  />
                                </div>
                                <span
                                  className={cn(
                                    "text-sm font-medium tabular-nums",
                                    getDifficultyTextColor(kw.difficulty)
                                  )}
                                >
                                  {kw.difficulty}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${kw.cpc.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <SparkLine data={kw.trend} />
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {kw.serp.map((feature) => (
                                  <Badge
                                    key={feature}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="sm">
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        )
                      })}
                    </AnimatePresence>
                    {filteredKeywords.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No keywords found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Saved Keywords Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Saved Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          {savedKeywords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">
                No saved keywords yet
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Research and save keywords to track them here.
              </p>
              <Button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                Start Research
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {savedKeywords.map((sk) => (
                  <motion.div
                    key={sk.keyword}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      <span className="font-medium text-sm truncate">
                        {sk.keyword}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge variant="secondary" className="text-xs">
                        {formatNumber(sk.volume)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          getDifficultyTextColor(sk.difficulty)
                        )}
                      >
                        {sk.difficulty} - {getDifficultyLabel(sk.difficulty)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSavedKeyword(sk.keyword)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
