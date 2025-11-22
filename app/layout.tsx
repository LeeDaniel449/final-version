import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import ClientLayout from "./client-layout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const clerkPublishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    process.env.CLERK_PUBLISHABLE_KEY ||
    ""

  console.log("[v0] Server-side Clerk key check:", {
    hasNextPublic: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    hasWealthlink: !!process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    hasClerkPublishable: !!process.env.CLERK_PUBLISHABLE_KEY,
    keyLength: clerkPublishableKey?.length || 0,
  })

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ClientLayout clerkPublishableKey={clerkPublishableKey}>{children}</ClientLayout>
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}
