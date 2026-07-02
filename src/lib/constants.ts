export const APP_NAME = "GhostOps"
export const APP_DESCRIPTION = "AI-First Publishing Platform"
export const APP_URL = "https://ghostops.ai"

export const PLANS = [
  { name: "Starter", price: 29, yearlyPrice: 23, features: ["5 AI articles/month", "Basic SEO tools", "1 team member", "5GB storage", "Email support"], popular: false },
  { name: "Pro", price: 79, yearlyPrice: 63, features: ["50 AI articles/month", "Advanced SEO suite", "5 team members", "50GB storage", "Priority support", "Affiliate manager", "Social scheduling"], popular: true },
  { name: "Business", price: 199, yearlyPrice: 159, features: ["Unlimited AI articles", "Full SEO suite", "25 team members", "500GB storage", "24/7 support", "White label", "API access", "Custom integrations"], popular: false },
  { name: "Enterprise", price: 0, yearlyPrice: 0, features: ["Everything in Business", "Unlimited team members", "Unlimited storage", "Dedicated account manager", "Custom AI models", "SLA guarantee", "On-premise option", "SSO/SAML"], popular: false },
] as const

export const NAV_ITEMS = [
  { label: "Core", items: [
    { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { name: "Content", href: "/dashboard/content", icon: "FileText" },
    { name: "AI Writer", href: "/dashboard/ai-writer", icon: "Sparkles" },
  ]},
  { label: "Research", items: [
    { name: "Keywords", href: "/dashboard/keywords", icon: "Search" },
    { name: "Competitors", href: "/dashboard/competitors", icon: "Target" },
  ]},
  { label: "Media", items: [
    { name: "Media Library", href: "/dashboard/media", icon: "Image" },
  ]},
  { label: "SEO", items: [
    { name: "SEO Center", href: "/dashboard/seo", icon: "Globe" },
  ]},
  { label: "Marketing", items: [
    { name: "Affiliates", href: "/dashboard/affiliates", icon: "DollarSign" },
    { name: "Social Media", href: "/dashboard/social", icon: "Share2" },
    { name: "Email", href: "/dashboard/email", icon: "Mail" },
  ]},
  { label: "Analytics", items: [
    { name: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  ]},
  { label: "Automation", items: [
    { name: "Automation", href: "/dashboard/automation", icon: "Workflow" },
    { name: "Publishing", href: "/dashboard/publishing", icon: "Send" },
  ]},
  { label: "Workspace", items: [
    { name: "Projects", href: "/dashboard/projects", icon: "FolderKanban" },
    { name: "Teams", href: "/dashboard/teams", icon: "Users" },
    { name: "Integrations", href: "/dashboard/integrations", icon: "Plug" },
  ]},
  { label: "System", items: [
    { name: "Billing", href: "/dashboard/billing", icon: "CreditCard" },
    { name: "Settings", href: "/dashboard/settings", icon: "Settings" },
    { name: "Admin", href: "/dashboard/admin", icon: "Shield" },
    { name: "Help", href: "/dashboard/help", icon: "HelpCircle" },
  ]},
] as const
