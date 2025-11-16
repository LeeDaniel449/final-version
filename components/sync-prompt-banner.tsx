"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw, X } from 'lucide-react'
import Link from "next/link"
import { userDataManager } from "@/lib/user-data"

export function SyncPromptBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user is authenticated but has no data
    const isAuthenticated = userDataManager.isUserSignedIn()
    const categories = userDataManager.getBudgetCategories()
    const entries = userDataManager.getBudgetEntries()
    const hasData = categories.length > 0 || entries.length > 0

    // Show banner if authenticated but no data and not previously dismissed
    const wasDismissed = sessionStorage.getItem("sync-banner-dismissed") === "true"
    
    if (isAuthenticated && !hasData && !wasDismissed) {
      setShowBanner(true)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    setShowBanner(false)
    sessionStorage.setItem("sync-banner-dismissed", "true")
  }

  if (!showBanner || dismissed) return null

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <RefreshCw className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-900 flex items-center justify-between">
        Sync Your Data Across Devices
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertTitle>
      <AlertDescription className="text-blue-800">
        <p className="mb-2">
          It looks like you're signed in but don't have any data on this device yet.
        </p>
        <Link href="/sync-data">
          <Button size="sm" variant="default" className="mt-2">
            <RefreshCw className="mr-2 h-3 w-3" />
            Sync Your Data Now
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  )
}
