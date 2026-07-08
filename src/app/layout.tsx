import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "InkFleet — AI-First Publishing Platform",
  description:
    "The AI-powered content publishing platform for modern creators. Generate, optimize, and publish content at scale.",
  keywords: [
    "AI writing",
    "content publishing",
    "SEO optimization",
    "ghost writer",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        
      </body>
    </html>
  )
}
