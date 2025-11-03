"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

interface PremiumGateProps {
  children: React.ReactNode
}

export function PremiumGate({ children }: PremiumGateProps) {
  const { isLoaded, user } = useUser()

  useEffect(() => {
    if (!isLoaded || !user) return

    const interval = setInterval(async () => {
      // Reload user data to get latest metadata
      await user.reload()
      console.log("[v0] User data reloaded, premium status:", user.publicMetadata?.premium)
    }, 3000)

    return () => clearInterval(interval)
  }, [isLoaded, user])

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue" />
      </div>
    )
  }

  // If no user, show sign-in prompt
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Sign In Required
            </CardTitle>
            <CardDescription>Please sign in to access this feature</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/sign-in">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if user has premium in publicMetadata
  const hasPremium = user.publicMetadata?.premium === true

  console.log("[v0] PremiumGate check:", { userId: user.id, hasPremium, metadata: user.publicMetadata })

  // If user has premium, show the content
  if (hasPremium) {
    return <>{children}</>
  }

  // Show premium upgrade overlay
  return (
    <div className="relative min-h-[400px]">
      {/* Blurred content */}
      <div className="pointer-events-none select-none blur-sm opacity-50">{children}</div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Premium Feature
            </CardTitle>
            <CardDescription>
              Upgrade to premium to unlock this feature and get access to all premium content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Premium includes:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Unlimited access to all features</li>
                <li>• Advanced portfolio analytics</li>
                <li>• AI-powered financial advisor</li>
                <li>• Priority support</li>
              </ul>
            </div>
            <Link href="/subscribe">
              <Button className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90">
                Upgrade to Premium
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
