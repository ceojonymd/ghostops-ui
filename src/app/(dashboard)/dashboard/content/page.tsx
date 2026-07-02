"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Search,
  Trash2,
  Send,
  FileEdit,
  Download,
  Pencil,
  Eye,
  Copy,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

import { cn, formatNumber, timeAgo, getInitials } from "@/lib/utils"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { SeoScoreRing } from "@/components/dashboard/seo-score-ring"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { articles } from "@/lib/mock-data"

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [authorFilter, setAuthorFilter] = React.useState("all")
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const filteredArticles = React.useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === "all" || article.status === statusFilter

      const matchesCategory =
        categoryFilter === "all" || article.category === categoryFilter

      const matchesAuthor =
        authorFilter === "all" || article.author.name === authorFilter

      return matchesSearch && matchesStatus && matchesCategory && matchesAuthor
    })
  }, [searchQuery, statusFilter, categoryFilter, authorFilter])

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / rowsPerPage))

  const paginatedArticles = React.useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredArticles.slice(start, end)
  }, [filteredArticles, currentPage, rowsPerPage])

  const paginationStart = filteredArticles.length === 0
    ? 0
    : (currentPage - 1) * rowsPerPage + 1
  const paginationEnd = Math.min(currentPage * rowsPerPage, filteredArticles.length)

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, categoryFilter, authorFilter, rowsPerPage])

  // Clear selected rows that are no longer visible
  React.useEffect(() => {
    const visibleIds = paginatedArticles.map((a) => a.id)
    setSelectedRows((prev) => prev.filter((id) => visibleIds.includes(id)))
  }, [paginatedArticles])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedArticles.map((a) => a.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id])
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id))
    }
  }

  const isAllSelected =
    paginatedArticles.length > 0 &&
    paginatedArticles.every((a) => selectedRows.includes(a.id))

  const isSomeSelected =
    paginatedArticles.some((a) => selectedRows.includes(a.id)) && !isAllSelected

  const pageNumbers = React.useMemo(() => {
    const pages: number[] = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }, [totalPages])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content</h1>
        <p className="text-muted-foreground mt-1">
          Manage and organize all your articles and content.
        </p>
      </div>

      {/* Toolbar Row */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="SEO">SEO</SelectItem>
            <SelectItem value="Blogging">Blogging</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Affiliate">Affiliate</SelectItem>
            <SelectItem value="Social Media">Social Media</SelectItem>
            <SelectItem value="CMS">CMS</SelectItem>
          </SelectContent>
        </Select>

        {/* Author Filter */}
        <Select value={authorFilter} onValueChange={setAuthorFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
            <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
            <SelectItem value="Emma Wilson">Emma Wilson</SelectItem>
            <SelectItem value="Alex Rivera">Alex Rivera</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Action Toolbar */}
      {selectedRows.length > 0 && (
        <div className="sticky top-0 z-10 bg-primary/10 rounded-lg p-3 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium">
            {selectedRows.length} selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button variant="default" size="sm">
              <Send className="h-4 w-4 mr-1" />
              Publish
            </Button>
            <Button variant="outline" size="sm">
              <FileEdit className="h-4 w-4 mr-1" />
              Move to Draft
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) {
                      ;(el as unknown as HTMLInputElement).indeterminate = isSomeSelected
                    }
                  }}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>SEO</TableHead>
              <TableHead>Words</TableHead>
              <TableHead>Traffic</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {paginatedArticles.map((article, index) => (
                <motion.tr
                  key={article.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    selectedRows.includes(article.id) && "bg-primary/5"
                  )}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(article.id)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(article.id, !!checked)
                      }
                      aria-label={`Select ${article.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium truncate block max-w-[300px]">
                      {article.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        article.status as
                          | "published"
                          | "draft"
                          | "scheduled"
                          | "archived"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{article.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 2 && (
                        <Badge variant="outline">
                          +{article.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {getInitials(article.author.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm whitespace-nowrap">
                        {article.author.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <SeoScoreRing
                      score={article.seoScore}
                      size={40}
                      strokeWidth={3}
                    />
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatNumber(article.wordCount)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatNumber(article.traffic)}
                  </TableCell>
                  <TableCell className="text-sm">
                    ${article.revenue}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {timeAgo(article.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>

            {paginatedArticles.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center">
                  <p className="text-muted-foreground">No articles found.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left: Showing info */}
        <p className="text-sm text-muted-foreground">
          Showing {paginationStart}-{paginationEnd} of {filteredArticles.length}{" "}
          articles
        </p>

        {/* Center: Page numbers */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>

        {/* Right: Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Rows per page
          </span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => setRowsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
