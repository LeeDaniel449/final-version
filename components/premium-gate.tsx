"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export function PremiumGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const pathname = usePathname()

  const [showOverlay, setShowOverlay] = useState(false)
  const [checkComplete, setCheckComplete] = useState(false)

  const isDevelopment = process.env.NODE_ENV === "development"

  const publicRoutes = ["/subscribe", "/sign-up", "/sign-in", "/activate-premium", "/test-webhook", "/test-activate"]
  const isPublicRoute = publicRoutes.some((route) => pathname === route)

  useEffect(() => {
    console.log("[v0] PremiumGate check:", { isLoaded, hasUser: !!user, pathname, isDevelopment })

    if (isDevelopment) {
      console.log("[v0] PremiumGate: Development mode - granting access")
      setShowOverlay(false)
      setCheckComplete(true)
      return
    }

    const timeout = setTimeout(() => {
      if (!isLoaded && !checkComplete) {
        console.log("[v0] PremiumGate: Clerk load timeout, treating as no user (allowing access)")
        setShowOverlay(false)
        setCheckComplete(true)
      }
    }, 5000)

    if (!isLoaded) {
      console.log("[v0] PremiumGate: Clerk not loaded yet")
      return () => clearTimeout(timeout)
    }

    clearTimeout(timeout)

    if (!user) {
      console.log("[v0] PremiumGate: No user signed in - allowing access")
      setShowOverlay(false)
      setCheckComplete(true)
      return
    }

    const hasPremiumAccess = user.publicMetadata?.premium === true
    console.log("[v0] ========== PREMIUM STATUS CHECK ==========")
    console.log("[v0] User ID:", user.id)
    console.log("[v0] publicMetadata:", JSON.stringify(user.publicMetadata))
    console.log("[v0] premium value:", user.publicMetadata?.premium)
    console.log("[v0] hasPremiumAccess:", hasPremiumAccess)
    console.log("[v0] Will show overlay:", !hasPremiumAccess && !isPublicRoute)
    console.log("[v0] ==========================================")

    setShowOverlay(!hasPremiumAccess)
    setCheckComplete(true)

    return () => clearTimeout(timeout)
  }, [isLoaded, user, user?.publicMetadata, pathname, isDevelopment, checkComplete])

  if (!checkComplete) {
    console.log("[v0] PremiumGate: Check not complete, showing content")
    return <>{children}</>
  }

  if (isPublicRoute || !showOverlay) {
    console.log("[v0] PremiumGate: Access granted", { isPublicRoute, showOverlay, pathname })
    return <>{children}</>
  }

  console.log("[v0] PremiumGate: Showing overlay for signed-in user without premium", { pathname })

  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="pointer-events-none blur-sm select-none">{children}</div>

      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="mx-4 max-w-lg rounded-lg border bg-card p-8 text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <LockIcon />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Premium Access Required</h2>
          <p className="mb-6 text-muted-foreground">
            Unlock all features including AI-powered financial advice, portfolio optimization, and personalized learning
            paths.
          </p>
          {user && (
            <div className="mb-4 rounded bg-muted p-3 text-left text-xs">
              <p className="font-semibold mb-1">Debug Info:</p>
              <p>User ID: {user.id}</p>
              <p>Metadata: {JSON.stringify(user.publicMetadata)}</p>
              <p>Premium Status: {user.publicMetadata?.premium ? "✅ Active" : "❌ Not Active"}</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Link
              href="/subscribe"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View Plans
            </Link>
            <Link
              href="/test-activate"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Activate Premium Manually
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
