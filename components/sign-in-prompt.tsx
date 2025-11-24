"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Lock, RefreshCw, UserPlus } from "lucide-react"
import Link from "next/link"

export function SignInPrompt() {
  const [hasClerk, setHasClerk] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined" && (window as any).Clerk) {
        setHasClerk(true)
        const user = (window as any).Clerk.user
        setIsSignedIn(!!user)
      }
    }

    checkAuth()
    const interval = setInterval(checkAuth, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!hasClerk || isSignedIn) {
    return null
  }

  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
          <Cloud className="h-5 w-5" />
          Enable Cross-Device Sync
        </CardTitle>
        <CardDescription className="text-blue-700 dark:text-blue-300">
          Sign in to sync your budget data across all your devices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <div className="flex items-start gap-2">
            <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Your data is automatically saved to a secure database</span>
          </div>
          <div className="flex items-start gap-2">
            <RefreshCw className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Access your budget from any device with the same account</span>
          </div>
          <div className="flex items-start gap-2">
            <UserPlus className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Free and takes less than 30 seconds to set up</span>
          </div>
        </div>
        <Link href="/sign-in">
          <Button className="w-full" size="lg">
            Sign In to Sync Data
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
