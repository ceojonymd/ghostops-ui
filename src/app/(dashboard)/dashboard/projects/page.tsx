"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Plus,
  LayoutGrid,
  Columns,
  FileText,
  Calendar,
  GripVertical,
} from "lucide-react"

import { cn, getInitials } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { projects, teamMembers } from "@/lib/mock-data"

// ── Animation variants ──────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// ── Kanban mock tasks ───────────────────────────────────────────────

type KanbanTask = {
  id: string
  title: string
  priority: "high" | "medium" | "low" | "none"
  assignee: string
}

const kanbanColumns: {
  id: string
  title: string
  tasks: KanbanTask[]
}[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "t1", title: "Write comparison article", priority: "medium", assignee: "Emma Wilson" },
      { id: "t2", title: "Keyword research for Q1", priority: "high", assignee: "Sarah Chen" },
      { id: "t3", title: "Update old blog posts", priority: "low", assignee: "Alex Rivera" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "t4", title: "SEO audit for top 20 pages", priority: "high", assignee: "Mike Johnson" },
      { id: "t5", title: "Create infographics", priority: "medium", assignee: "Jordan Lee" },
      { id: "t6", title: "Email newsletter draft", priority: "low", assignee: "Sarah Chen" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "t7", title: "Publish affiliate guide", priority: "none", assignee: "Mike Johnson" },
      { id: "t8", title: "Set up analytics tracking", priority: "none", assignee: "Alex Rivera" },
    ],
  },
]

// ── Priority styling helper ─────────────────────────────────────────

function priorityBadge(priority: KanbanTask["priority"]) {
  switch (priority) {
    case "high":
      return (
        <Badge variant="outline" className="border-red-500/40 bg-red-500/10 text-red-500 text-[10px] px-1.5 py-0">
          High
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="border-amber-500/40 bg-amber-500/10 text-amber-500 text-[10px] px-1.5 py-0">
          Medium
        </Badge>
      )
    case "low":
      return (
        <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-500 text-[10px] px-1.5 py-0">
          Low
        </Badge>
      )
    default:
      return null
  }
}

function priorityBorderColor(priority: KanbanTask["priority"]) {
  switch (priority) {
    case "high":
      return "border-l-red-500"
    case "medium":
      return "border-l-amber-500"
    case "low":
      return "border-l-emerald-500"
    default:
      return "border-l-violet-500"
  }
}

// ── Main page ───────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [viewMode, setViewMode] = React.useState<"cards" | "kanban">("cards")
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // Form state
  const [formName, setFormName] = React.useState("")
  const [formDescription, setFormDescription] = React.useState("")
  const [formDeadline, setFormDeadline] = React.useState("")
  const [formMembers, setFormMembers] = React.useState<string[]>([])

  function toggleMember(memberId: string) {
    setFormMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    )
  }

  function resetForm() {
    setFormName("")
    setFormDescription("")
    setFormDeadline("")
    setFormMembers([])
  }

  function handleCreate() {
    // In a real app this would POST to the API
    setDialogOpen(false)
    resetForm()
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ── Page Header ─────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage campaigns, track progress, and collaborate with your team.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center rounded-lg border bg-muted/50 p-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("cards")}
              className={cn(
                "h-8 px-2.5 rounded-md",
                viewMode === "cards" && "bg-background shadow-sm text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("kanban")}
              className={cn(
                "h-8 px-2.5 rounded-md",
                viewMode === "kanban" && "bg-background shadow-sm text-foreground"
              )}
            >
              <Columns className="h-4 w-4" />
            </Button>
          </div>

          {/* Create Project button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-1.5">
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Set up a new project to organize your content pipeline.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="e.g. Q1 Content Campaign"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="project-desc">Description</Label>
                  <Textarea
                    id="project-desc"
                    placeholder="Brief description of the project goals..."
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="project-deadline">Deadline</Label>
                  <Input
                    id="project-deadline"
                    type="date"
                    value={formDeadline}
                    onChange={(e) => setFormDeadline(e.target.value)}
                  />
                </div>

                {/* Team Members */}
                <div className="space-y-3">
                  <Label>Team Members</Label>
                  <div className="grid gap-2">
                    {teamMembers.map((member) => (
                      <label
                        key={member.id}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors hover:bg-muted/50",
                          formMembers.includes(member.id) && "border-violet-500/50 bg-violet-500/5"
                        )}
                      >
                        <Checkbox
                          checked={formMembers.includes(member.id)}
                          onCheckedChange={() => toggleMember(member.id)}
                          className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                        />
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="bg-violet-500/10 text-violet-600 text-xs">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-none">{member.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                  onClick={handleCreate}
                  disabled={!formName.trim()}
                >
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* ── View Content ────────────────────────────────────────── */}
      {viewMode === "cards" ? <CardsView /> : <KanbanView />}
    </motion.div>
  )
}

// ── Cards View ──────────────────────────────────────────────────────

function CardsView() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants}>
          <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            {/* Violet top accent */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet-600 to-violet-400" />

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
                <StatusDot status={project.status} />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <Progress
                  value={project.progress}
                  className="h-2 [&>div]:bg-violet-600"
                />
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  <span>{project.articles} articles</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{project.deadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>

              {/* Team + avatars */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-2">
                  {teamMembers.slice(0, 3).map((member, i) => (
                    <Avatar
                      key={member.id}
                      className={cn(
                        "h-8 w-8 border-2 border-background ring-0",
                        i > 0 && "-ml-2"
                      )}
                    >
                      <AvatarFallback className="bg-violet-500/15 text-violet-700 dark:text-violet-400 text-xs font-medium">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {teamMembers.length > 3 && (
                    <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground">
                      +{teamMembers.length - 3}
                    </div>
                  )}
                </div>

                <StatusBadge status={project.status} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ── Status helpers ──────────────────────────────────────────────────

function StatusDot({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          status === "active" && "bg-emerald-500",
          status === "completed" && "bg-blue-500"
        )}
      />
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <Badge variant="outline" className="border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400 gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        Completed
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Active
    </Badge>
  )
}

// ── Kanban View ─────────────────────────────────────────────────────

function KanbanView() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 lg:grid-cols-3"
    >
      {kanbanColumns.map((column) => (
        <motion.div key={column.id} variants={itemVariants}>
          <div className="rounded-xl border bg-muted/30 p-4 min-h-[420px]">
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{column.title}</h3>
                <Badge variant="secondary" className="h-5 px-1.5 text-[10px] rounded-full">
                  {column.tasks.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Task cards */}
            <div className="space-y-2.5">
              {column.tasks.map((task) => (
                <KanbanCard key={task.id} task={task} isDone={column.id === "done"} />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

function KanbanCard({ task, isDone }: { task: KanbanTask; isDone: boolean }) {
  const member = teamMembers.find(
    (m) => m.name === task.assignee
  )

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group cursor-grab rounded-lg border bg-background p-3 shadow-sm transition-shadow hover:shadow-md border-l-[3px]",
        priorityBorderColor(task.priority),
        isDone && "opacity-75"
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex-1 min-w-0 space-y-2">
          <p className={cn("text-sm font-medium leading-snug", isDone && "line-through text-muted-foreground")}>
            {task.title}
          </p>
          <div className="flex items-center justify-between">
            {priorityBadge(task.priority)}
            {member && (
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-medium">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
