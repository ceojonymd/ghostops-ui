"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { NAV_ITEMS } from "@/lib/constants";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Search,
  Target,
  Image,
  Globe,
  DollarSign,
  Share2,
  Mail,
  BarChart3,
  Workflow,
  Send,
  FolderKanban,
  Users,
  Plug,
  CreditCard,
  Settings,
  Shield,
  HelpCircle,
  Plus,
  Wand2,
  Upload,
  Rocket,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileText,
  Sparkles,
  Search,
  Target,
  Image,
  Globe,
  DollarSign,
  Share2,
  Mail,
  BarChart3,
  Workflow,
  Send,
  FolderKanban,
  Users,
  Plug,
  CreditCard,
  Settings,
  Shield,
  HelpCircle,
  Plus,
  Wand2,
  Upload,
  Rocket,
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    []
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Pages */}
        <CommandGroup heading="Pages">
          {NAV_ITEMS.flatMap((group) =>
            group.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() =>
                    runCommand(() => router.push(item.href))
                  }
                >
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </div>
                </CommandItem>
              );
            })
          )}
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/content?new=true"))
            }
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Article</span>
            </div>
            <CommandShortcut>Ctrl+N</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/ai-writer"))
            }
          >
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              <span>AI Generate</span>
            </div>
            <CommandShortcut>Ctrl+G</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/media?upload=true"))
            }
          >
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Upload Media</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/publishing"))
            }
          >
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              <span>Publish</span>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Settings */}
        <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/settings"))
            }
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>General Settings</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/billing"))
            }
          >
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </div>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard/teams"))
            }
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Team Members</span>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
