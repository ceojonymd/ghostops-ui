export const dashboardStats = {
  published: { value: 248, change: 12.5, label: "Published Articles" },
  drafts: { value: 34, change: -3.2, label: "Drafts" },
  scheduled: { value: 18, change: 8.1, label: "Scheduled" },
  indexed: { value: 231, change: 15.3, label: "Indexed Pages" },
  traffic: { value: 485200, change: 22.4, label: "Monthly Traffic" },
  revenue: { value: 18420, change: 18.7, label: "Monthly Revenue" },
  aiCredits: { value: 7840, max: 10000, label: "AI Credits" },
  storage: { value: 34.2, max: 50, label: "Storage (GB)" },
}

export const trafficData = [
  { month: "Jan", traffic: 32000, revenue: 8200 },
  { month: "Feb", traffic: 38000, revenue: 9100 },
  { month: "Mar", traffic: 42000, revenue: 10500 },
  { month: "Apr", traffic: 55000, revenue: 12800 },
  { month: "May", traffic: 48000, revenue: 11200 },
  { month: "Jun", traffic: 62000, revenue: 14500 },
  { month: "Jul", traffic: 78000, revenue: 16800 },
  { month: "Aug", traffic: 85000, revenue: 18200 },
  { month: "Sep", traffic: 92000, revenue: 19500 },
  { month: "Oct", traffic: 88000, revenue: 18900 },
  { month: "Nov", traffic: 95000, revenue: 20100 },
  { month: "Dec", traffic: 102000, revenue: 22400 },
]

export const recentActivity = [
  { id: "1", action: "Published", title: "10 Best AI Writing Tools for 2025", user: "Sarah Chen", time: new Date(Date.now() - 1800000), type: "publish" },
  { id: "2", action: "AI Generated", title: "Complete Guide to SEO in 2025", user: "AI Writer", time: new Date(Date.now() - 3600000), type: "ai" },
  { id: "3", action: "Edited", title: "How to Start a Blog", user: "Mike Johnson", time: new Date(Date.now() - 7200000), type: "edit" },
  { id: "4", action: "Scheduled", title: "Content Marketing Strategy", user: "Emma Wilson", time: new Date(Date.now() - 10800000), type: "schedule" },
  { id: "5", action: "Drafted", title: "Email Marketing Best Practices", user: "Alex Rivera", time: new Date(Date.now() - 14400000), type: "draft" },
  { id: "6", action: "Published", title: "Affiliate Marketing Guide", user: "Sarah Chen", time: new Date(Date.now() - 18000000), type: "publish" },
]

export const articles = [
  { id: "1", title: "10 Best AI Writing Tools for 2025", status: "published", category: "Technology", tags: ["AI", "Writing", "Tools"], author: { name: "Sarah Chen", avatar: "" }, seoScore: 94, wordCount: 3200, traffic: 12500, revenue: 340, updatedAt: new Date(Date.now() - 86400000) },
  { id: "2", title: "Complete Guide to SEO in 2025", status: "published", category: "SEO", tags: ["SEO", "Google", "Rankings"], author: { name: "Mike Johnson", avatar: "" }, seoScore: 88, wordCount: 5400, traffic: 28300, revenue: 890, updatedAt: new Date(Date.now() - 172800000) },
  { id: "3", title: "How to Start a Profitable Blog", status: "draft", category: "Blogging", tags: ["Blogging", "Income"], author: { name: "Emma Wilson", avatar: "" }, seoScore: 72, wordCount: 2800, traffic: 0, revenue: 0, updatedAt: new Date(Date.now() - 259200000) },
  { id: "4", title: "Content Marketing Strategy Guide", status: "scheduled", category: "Marketing", tags: ["Marketing", "Strategy"], author: { name: "Alex Rivera", avatar: "" }, seoScore: 85, wordCount: 4100, traffic: 0, revenue: 0, updatedAt: new Date(Date.now() - 345600000) },
  { id: "5", title: "Email Marketing Best Practices", status: "published", category: "Marketing", tags: ["Email", "Marketing"], author: { name: "Sarah Chen", avatar: "" }, seoScore: 91, wordCount: 3800, traffic: 18200, revenue: 520, updatedAt: new Date(Date.now() - 432000000) },
  { id: "6", title: "Affiliate Marketing for Beginners", status: "published", category: "Affiliate", tags: ["Affiliate", "Income"], author: { name: "Mike Johnson", avatar: "" }, seoScore: 87, wordCount: 4500, traffic: 22100, revenue: 1240, updatedAt: new Date(Date.now() - 518400000) },
  { id: "7", title: "Social Media Marketing Trends", status: "archived", category: "Social Media", tags: ["Social", "Trends"], author: { name: "Emma Wilson", avatar: "" }, seoScore: 65, wordCount: 2200, traffic: 3400, revenue: 45, updatedAt: new Date(Date.now() - 604800000) },
  { id: "8", title: "WordPress vs Ghost: Which is Better?", status: "published", category: "CMS", tags: ["WordPress", "Ghost", "CMS"], author: { name: "Alex Rivera", avatar: "" }, seoScore: 92, wordCount: 6200, traffic: 35600, revenue: 1580, updatedAt: new Date(Date.now() - 691200000) },
]

export const keywords = [
  { keyword: "best AI writing tools", volume: 14800, difficulty: 62, cpc: 4.20, trend: [40, 52, 48, 65, 72, 85], serp: ["FAQ", "Images"] },
  { keyword: "how to start a blog", volume: 74000, difficulty: 78, cpc: 2.10, trend: [80, 75, 82, 78, 85, 88], serp: ["Featured Snippet", "Video"] },
  { keyword: "SEO tools 2025", volume: 22000, difficulty: 55, cpc: 8.50, trend: [30, 35, 42, 58, 70, 82], serp: ["Shopping", "FAQ"] },
  { keyword: "content marketing strategy", volume: 18500, difficulty: 68, cpc: 5.30, trend: [55, 58, 62, 65, 68, 72], serp: ["FAQ"] },
  { keyword: "affiliate marketing guide", volume: 33000, difficulty: 72, cpc: 3.80, trend: [45, 50, 55, 60, 65, 70], serp: ["Video", "Images"] },
  { keyword: "email marketing software", volume: 27000, difficulty: 80, cpc: 12.40, trend: [60, 62, 65, 68, 70, 72], serp: ["Shopping", "FAQ"] },
]

export const teamMembers = [
  { id: "1", name: "Sarah Chen", email: "sarah@inkfleet.com", role: "Admin", avatar: "", status: "active", lastActive: new Date(Date.now() - 300000) },
  { id: "2", name: "Mike Johnson", email: "mike@inkfleet.com", role: "Editor", avatar: "", status: "active", lastActive: new Date(Date.now() - 1800000) },
  { id: "3", name: "Emma Wilson", email: "emma@inkfleet.com", role: "Author", avatar: "", status: "active", lastActive: new Date(Date.now() - 7200000) },
  { id: "4", name: "Alex Rivera", email: "alex@inkfleet.com", role: "Author", avatar: "", status: "away", lastActive: new Date(Date.now() - 86400000) },
  { id: "5", name: "Jordan Lee", email: "jordan@inkfleet.com", role: "Viewer", avatar: "", status: "offline", lastActive: new Date(Date.now() - 172800000) },
]

export const notifications = [
  { id: "1", title: "Article published successfully", description: "10 Best AI Writing Tools for 2025 is now live", time: new Date(Date.now() - 1800000), read: false, type: "success" },
  { id: "2", title: "SEO score improved", description: "Your article 'SEO Guide' score went from 78 to 88", time: new Date(Date.now() - 3600000), read: false, type: "info" },
  { id: "3", title: "New team member joined", description: "Jordan Lee joined as Viewer", time: new Date(Date.now() - 86400000), read: true, type: "info" },
  { id: "4", title: "AI credits running low", description: "You have 2,160 credits remaining", time: new Date(Date.now() - 172800000), read: true, type: "warning" },
]

export const integrations = [
  { id: "wp", name: "WordPress", description: "Publish directly to WordPress sites", icon: "Globe", connected: true, category: "CMS" },
  { id: "cf", name: "Cloudflare", description: "CDN and performance optimization", icon: "Shield", connected: true, category: "Infrastructure" },
  { id: "ga", name: "Google Analytics", description: "Traffic and conversion tracking", icon: "BarChart3", connected: true, category: "Analytics" },
  { id: "gsc", name: "Google Search Console", description: "Search performance data", icon: "Search", connected: true, category: "SEO" },
  { id: "openai", name: "OpenAI", description: "GPT-4 and DALL-E integration", icon: "Sparkles", connected: true, category: "AI" },
  { id: "anthropic", name: "Anthropic", description: "Claude AI integration", icon: "Sparkles", connected: false, category: "AI" },
  { id: "smtp", name: "SMTP", description: "Email delivery service", icon: "Mail", connected: true, category: "Email" },
  { id: "stripe", name: "Stripe", description: "Payment processing", icon: "CreditCard", connected: true, category: "Payments" },
  { id: "slack", name: "Slack", description: "Team notifications", icon: "MessageSquare", connected: false, category: "Communication" },
  { id: "github", name: "GitHub", description: "Version control integration", icon: "Code", connected: false, category: "Development" },
  { id: "zapier", name: "Zapier", description: "Workflow automation", icon: "Workflow", connected: false, category: "Automation" },
  { id: "medium", name: "Medium", description: "Cross-post to Medium", icon: "FileText", connected: false, category: "CMS" },
]

export const projects = [
  { id: "1", name: "Q4 Content Campaign", description: "Holiday season content push", progress: 72, articles: 24, status: "active", deadline: new Date(Date.now() + 2592000000) },
  { id: "2", name: "SEO Optimization Sprint", description: "Improve rankings for top 50 articles", progress: 45, articles: 50, status: "active", deadline: new Date(Date.now() + 1296000000) },
  { id: "3", name: "Affiliate Revenue Boost", description: "New affiliate program integrations", progress: 88, articles: 12, status: "active", deadline: new Date(Date.now() + 604800000) },
  { id: "4", name: "Blog Redesign", description: "New design system and templates", progress: 100, articles: 0, status: "completed", deadline: new Date(Date.now() - 604800000) },
]

export const invoices = [
  { id: "INV-001", date: new Date(2025, 0, 1), amount: 79, status: "paid", plan: "Pro" },
  { id: "INV-002", date: new Date(2025, 1, 1), amount: 79, status: "paid", plan: "Pro" },
  { id: "INV-003", date: new Date(2025, 2, 1), amount: 79, status: "paid", plan: "Pro" },
  { id: "INV-004", date: new Date(2025, 3, 1), amount: 199, status: "paid", plan: "Business" },
  { id: "INV-005", date: new Date(2025, 4, 1), amount: 199, status: "paid", plan: "Business" },
  { id: "INV-006", date: new Date(2025, 5, 1), amount: 199, status: "pending", plan: "Business" },
]

export const seoData = {
  rankings: [
    { keyword: "best AI writing tools", position: 3, previousPosition: 5, url: "/blog/ai-writing-tools", volume: 14800, change: 2 },
    { keyword: "how to start a blog 2025", position: 7, previousPosition: 12, url: "/blog/start-a-blog", volume: 74000, change: 5 },
    { keyword: "SEO tools comparison", position: 1, previousPosition: 1, url: "/blog/seo-tools", volume: 22000, change: 0 },
    { keyword: "content marketing guide", position: 4, previousPosition: 3, url: "/blog/content-marketing", volume: 18500, change: -1 },
    { keyword: "affiliate marketing tips", position: 11, previousPosition: 18, url: "/blog/affiliate-tips", volume: 33000, change: 7 },
  ],
  brokenLinks: [
    { url: "/blog/old-post-removed", referrer: "/blog/seo-guide", statusCode: 404, lastChecked: new Date(Date.now() - 86400000) },
    { url: "/tools/keyword-checker", referrer: "/blog/keyword-research", statusCode: 404, lastChecked: new Date(Date.now() - 172800000) },
  ],
  indexStatus: { indexed: 231, notIndexed: 17, errors: 3 },
}

export const affiliateData = {
  programs: [
    { name: "Amazon Associates", status: "active", clicks: 24500, conversions: 890, revenue: 4250, rate: "3-10%" },
    { name: "ShareASale", status: "active", clicks: 12300, conversions: 340, revenue: 2890, rate: "5-20%" },
    { name: "CJ Affiliate", status: "active", clicks: 8900, conversions: 210, revenue: 1920, rate: "8-15%" },
    { name: "Impact", status: "paused", clicks: 3200, conversions: 85, revenue: 680, rate: "5-12%" },
  ],
  topPages: [
    { title: "Best AI Writing Tools", clicks: 8500, revenue: 2340, conversions: 245 },
    { title: "WordPress Hosting Reviews", clicks: 6200, revenue: 1890, conversions: 178 },
    { title: "Email Marketing Software", clicks: 4800, revenue: 1450, conversions: 134 },
  ],
}

export const analyticsData = {
  overview: { pageviews: 485200, sessions: 312400, users: 245800, bounceRate: 34.2, avgDuration: "3:45", pagesPerSession: 2.8 },
  devices: [
    { name: "Desktop", value: 58 },
    { name: "Mobile", value: 35 },
    { name: "Tablet", value: 7 },
  ],
  countries: [
    { name: "United States", visitors: 125400, percentage: 51 },
    { name: "United Kingdom", visitors: 34200, percentage: 14 },
    { name: "Canada", visitors: 22100, percentage: 9 },
    { name: "Australia", visitors: 17800, percentage: 7 },
    { name: "Germany", visitors: 12400, percentage: 5 },
  ],
  searchEngines: [
    { name: "Google", percentage: 78 },
    { name: "Bing", percentage: 12 },
    { name: "DuckDuckGo", percentage: 6 },
    { name: "Yahoo", percentage: 4 },
  ],
}

export const adminData = {
  systemHealth: { cpu: 42, memory: 68, disk: 55, uptime: "99.97%" },
  workers: [
    { name: "Content Generator", status: "running", processed: 1240, errors: 3 },
    { name: "SEO Analyzer", status: "running", processed: 8900, errors: 12 },
    { name: "Image Processor", status: "running", processed: 3400, errors: 1 },
    { name: "Email Sender", status: "idle", processed: 450, errors: 0 },
    { name: "Link Checker", status: "running", processed: 12000, errors: 45 },
  ],
  recentLogs: [
    { timestamp: new Date(Date.now() - 60000), level: "info", message: "Content generation completed for article #248", service: "ai-writer" },
    { timestamp: new Date(Date.now() - 120000), level: "warning", message: "API rate limit approaching (85%)", service: "openai" },
    { timestamp: new Date(Date.now() - 300000), level: "info", message: "SEO audit completed for 50 pages", service: "seo-engine" },
    { timestamp: new Date(Date.now() - 600000), level: "error", message: "Failed to fetch SERP data for 2 keywords", service: "serp-api" },
    { timestamp: new Date(Date.now() - 900000), level: "info", message: "Backup completed successfully", service: "system" },
  ],
}
