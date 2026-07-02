"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List,
  Upload,
  Search,
  FolderOpen,
  Image,
  Video,
  FileText,
  CloudUpload,
  Trash2,
  Download,
  FolderInput,
  Eye,
  X,
  Copy,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const gradients = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-purple-500",
  "from-sky-500 to-blue-500",
  "from-lime-500 to-green-500",
  "from-red-500 to-rose-500",
  "from-teal-500 to-emerald-500",
  "from-orange-500 to-amber-500",
];

interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video" | "document";
  dimensions: string;
  size: string;
  alt: string;
  gradient: number;
  uploadedAt: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    name: "hero-banner.jpg",
    type: "image",
    dimensions: "1920x1080",
    size: "245 KB",
    alt: "GhostOps hero banner",
    gradient: 0,
    uploadedAt: "2 days ago",
  },
  {
    id: "2",
    name: "blog-thumbnail.png",
    type: "image",
    dimensions: "800x600",
    size: "124 KB",
    alt: "AI writing tools comparison",
    gradient: 1,
    uploadedAt: "3 days ago",
  },
  {
    id: "3",
    name: "seo-infographic.png",
    type: "image",
    dimensions: "1200x2400",
    size: "890 KB",
    alt: "SEO optimization infographic",
    gradient: 2,
    uploadedAt: "5 days ago",
  },
  {
    id: "4",
    name: "team-photo.jpg",
    type: "image",
    dimensions: "2560x1440",
    size: "1.2 MB",
    alt: "GhostOps team photo",
    gradient: 3,
    uploadedAt: "1 week ago",
  },
  {
    id: "5",
    name: "product-demo.mp4",
    type: "video",
    dimensions: "1920x1080",
    size: "24.5 MB",
    alt: "Product demo video",
    gradient: 4,
    uploadedAt: "1 week ago",
  },
  {
    id: "6",
    name: "logo-dark.svg",
    type: "image",
    dimensions: "512x512",
    size: "12 KB",
    alt: "GhostOps dark logo",
    gradient: 5,
    uploadedAt: "2 weeks ago",
  },
  {
    id: "7",
    name: "feature-screenshot.png",
    type: "image",
    dimensions: "1440x900",
    size: "456 KB",
    alt: "AI writer feature screenshot",
    gradient: 6,
    uploadedAt: "2 weeks ago",
  },
  {
    id: "8",
    name: "social-banner.jpg",
    type: "image",
    dimensions: "1200x630",
    size: "189 KB",
    alt: "Social media banner",
    gradient: 7,
    uploadedAt: "3 weeks ago",
  },
  {
    id: "9",
    name: "tutorial-video.mp4",
    type: "video",
    dimensions: "1920x1080",
    size: "45.2 MB",
    alt: "Getting started tutorial",
    gradient: 8,
    uploadedAt: "3 weeks ago",
  },
  {
    id: "10",
    name: "api-docs.pdf",
    type: "document",
    dimensions: "A4",
    size: "2.1 MB",
    alt: "API documentation",
    gradient: 9,
    uploadedAt: "1 month ago",
  },
  {
    id: "11",
    name: "icon-set.svg",
    type: "image",
    dimensions: "256x256",
    size: "8 KB",
    alt: "Custom icon set",
    gradient: 10,
    uploadedAt: "1 month ago",
  },
  {
    id: "12",
    name: "og-image.jpg",
    type: "image",
    dimensions: "1200x630",
    size: "156 KB",
    alt: "Open graph default image",
    gradient: 11,
    uploadedAt: "1 month ago",
  },
];

interface Folder {
  id: string;
  label: string;
  icon: typeof FolderOpen;
  count: number;
  filterType?: "image" | "video" | "document";
}

const folders: Folder[] = [
  { id: "all", label: "All Media", icon: FolderOpen, count: 47 },
  { id: "images", label: "Images", icon: Image, count: 32, filterType: "image" },
  { id: "videos", label: "Videos", icon: Video, count: 8, filterType: "video" },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    count: 5,
    filterType: "document",
  },
  { id: "uploads", label: "Uploads", icon: Upload, count: 2 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const filteredMedia = useMemo(() => {
    let items = [...mediaItems];

    // Filter by folder
    const folder = folders.find((f) => f.id === activeFolder);
    if (folder && folder.filterType) {
      items = items.filter((item) => item.type === folder.filterType);
    }
    if (activeFolder === "uploads") {
      items = items.slice(0, 2);
    }

    // Filter by type select
    if (typeFilter !== "all") {
      items = items.filter((item) => item.type === typeFilter);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.alt.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      );
    }

    return items;
  }, [activeFolder, typeFilter, searchQuery]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(filteredMedia.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      const next = [...selectedItems, id];
      setSelectedItems(next);
      if (next.length === filteredMedia.length) {
        setSelectAll(true);
      }
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== id));
      setSelectAll(false);
    }
  };

  const handleMediaClick = (item: MediaItem) => {
    setSelectedMedia(item);
  };

  const typeBadgeVariant = (type: string) => {
    switch (type) {
      case "image":
        return "default";
      case "video":
        return "secondary";
      case "document":
        return "outline";
      default:
        return "default";
    }
  };

  const isBulkMode = selectedItems.length > 0;

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <p className="text-muted-foreground mt-1">
          Upload and manage your images, videos, and documents.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Grid/List toggle */}
          <div className="flex items-center rounded-lg border p-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                viewMode === "grid" && "bg-muted"
              )}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                viewMode === "list" && "bg-muted"
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Upload button */}
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-9"
            />
          </div>
        </div>

        {/* Right side */}
        <div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Folder Sidebar */}
        <div className="w-56 flex-shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-0">
              {folders.map((folder) => {
                const Icon = folder.icon;
                return (
                  <div
                    key={folder.id}
                    onClick={() => setActiveFolder(folder.id)}
                    className={cn(
                      "cursor-pointer rounded-lg p-3 flex items-center justify-between transition-colors hover:bg-muted/50",
                      activeFolder === folder.id &&
                        "bg-primary/10 text-primary"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {folder.label}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "text-xs",
                        activeFolder === folder.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {folder.count}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* Upload Dropzone */}
          <div className="mb-6 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-all hover:border-primary/50 hover:bg-primary/5">
            <div>
              <CloudUpload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 font-medium">Drag & drop files here</p>
              <p className="text-sm text-muted-foreground">
                or click to browse
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Supports: JPG, PNG, GIF, SVG, MP4, PDF (max 10MB)
              </p>
            </div>
          </div>

          {/* Bulk Select Bar */}
          <AnimatePresence>
            {isBulkMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="flex items-center justify-between rounded-lg bg-primary/10 p-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) =>
                        handleSelectAll(!!checked)
                      }
                    />
                    <span className="text-sm font-medium">
                      {selectedItems.length} selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <FolderInput className="mr-2 h-4 w-4" />
                      Move
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid View */}
          {viewMode === "grid" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`grid-${activeFolder}-${typeFilter}-${searchQuery}`}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {filteredMedia.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card
                    className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
                    onClick={() => handleMediaClick(item)}
                  >
                    <div className="relative">
                      <div
                        className={cn(
                          "flex aspect-video items-center justify-center rounded-t-lg bg-gradient-to-br",
                          gradients[item.gradient]
                        )}
                      >
                        <Image className="h-8 w-8 text-white/50" />
                      </div>
                      {/* Checkbox overlay */}
                      <div
                        className={cn(
                          "absolute left-2 top-2 transition-opacity",
                          isBulkMode || selectedItems.includes(item.id)
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) =>
                            handleSelectItem(item.id, !!checked)
                          }
                          className="border-white bg-black/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.dimensions} &ndash; {item.size}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.alt}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={`list-${activeFolder}-${typeFilter}-${searchQuery}`}
            >
              <Card>
                <CardContent className="p-0">
                  {/* Table header */}
                  <div className="flex items-center gap-4 border-b px-4 py-3 text-xs font-medium text-muted-foreground">
                    <div className="w-8">
                      <Checkbox
                        checked={selectAll}
                        onCheckedChange={(checked) =>
                          handleSelectAll(!!checked)
                        }
                      />
                    </div>
                    <div className="w-10" />
                    <div className="flex-1">Name</div>
                    <div className="w-24">Type</div>
                    <div className="w-28">Dimensions</div>
                    <div className="w-20">Size</div>
                    <div className="w-28">Uploaded</div>
                    <div className="w-28 text-right">Actions</div>
                  </div>

                  {/* Table rows */}
                  <ScrollArea className="max-h-[600px]">
                    {filteredMedia.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={cn(
                          "flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/50",
                          index < filteredMedia.length - 1 && "border-b"
                        )}
                        onClick={() => handleMediaClick(item)}
                      >
                        <div
                          className="w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleSelectItem(item.id, !!checked)
                            }
                          />
                        </div>
                        <div
                          className={cn(
                            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-gradient-to-br",
                            gradients[item.gradient]
                          )}
                        >
                          <Image className="h-4 w-4 text-white/60" />
                        </div>
                        <div className="flex-1 truncate text-sm font-medium">
                          {item.name}
                        </div>
                        <div className="w-24">
                          <Badge variant={typeBadgeVariant(item.type)}>
                            {item.type}
                          </Badge>
                        </div>
                        <div className="w-28 text-sm text-muted-foreground">
                          {item.dimensions}
                        </div>
                        <div className="w-20 text-sm text-muted-foreground">
                          {item.size}
                        </div>
                        <div className="w-28 text-sm text-muted-foreground">
                          {item.uploadedAt}
                        </div>
                        <div
                          className="flex w-28 items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleMediaClick(item)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Empty state */}
          {filteredMedia.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 font-medium">No media found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="w-80 flex-shrink-0"
            >
              <Card className="sticky top-6">
                <CardContent className="p-0">
                  {/* Close button */}
                  <div className="flex items-center justify-between p-4 pb-0">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Details
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedMedia(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Preview */}
                  <div className="p-4">
                    <div
                      className={cn(
                        "flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br",
                        gradients[selectedMedia.gradient]
                      )}
                    >
                      <Image className="h-12 w-12 text-white/50" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4 px-4 pb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedMedia.name}
                      </h3>
                      <Badge
                        variant={typeBadgeVariant(selectedMedia.type)}
                        className="mt-1"
                      >
                        {selectedMedia.type}
                      </Badge>
                    </div>

                    <Separator />

                    {/* URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        URL
                      </label>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={`/media/${selectedMedia.name}`}
                          className="h-9 text-xs"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 flex-shrink-0"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Alt Text */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Alt Text
                      </label>
                      <Input
                        defaultValue={selectedMedia.alt}
                        className="h-9 text-xs"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">
                          Dimensions
                        </p>
                        <p className="text-sm">{selectedMedia.dimensions}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">
                          File Size
                        </p>
                        <p className="text-sm">{selectedMedia.size}</p>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">
                          Uploaded
                        </p>
                        <p className="text-sm">{selectedMedia.uploadedAt}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
