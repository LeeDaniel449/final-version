"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, RefreshCw, AlertCircle } from "lucide-react"
import { userDataManager } from "@/lib/user-data"

export default function SyncStatusPage() {
  const { user, isLoaded } = useUser()
  const [syncing, setSyncing] = useState(false)
  const [dataCount, setDataCount] = useState({
    categories: 0,
    entries: 0,
    goals: 0,
  })

  const refreshDataCount = () => {
    const categories = userDataManager.getBudgetCategories()
    const entries = userDataManager.getBudgetEntries()
    const goals = userDataManager.getGoals()

    setDataCount({
      categories: categories.length,
      entries: entries.length,
      goals: goals.length,
    })
  }

  useEffect(() => {
    refreshDataCount()
    const interval = setInterval(refreshDataCount, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleManualSync = async () => {
    if (!user?.id) {
      alert("Please sign in first to sync data")
      return
    }

    setSyncing(true)
    try {
      console.log("[v0] Manual sync triggered")
      await userDataManager.loadFromDatabase(user.id)
      setTimeout(() => {
        refreshDataCount()
        window.dispatchEvent(new Event("storage"))
      }, 500)
      alert("Data synced successfully!")
    } catch (error) {
      console.error("[v0] Manual sync error:", error)
      alert("Sync failed. Check console for details.")
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cross-Device Sync Status</h1>
        <p className="text-muted-foreground mt-2">Check your authentication status and data synchronization</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
          <CardDescription>Your Clerk authentication state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="font-medium">Clerk Loaded:</div>
            {isLoaded ? (
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Yes
              </Badge>
            ) : (
              <Badge variant="secondary">Loading...</Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="font-medium">User Signed In:</div>
            {isLoaded && user ? (
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Yes
              </Badge>
            ) : (
              <Badge variant="destructive" className="gap-1">
                <XCircle className="h-3 w-3" />
                No
              </Badge>
            )}
          </div>

          {user && (
            <>
              <div className="flex items-center gap-3">
                <div className="font-medium">User ID:</div>
                <code className="text-sm bg-muted px-2 py-1 rounded">{user.id}</code>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-medium">Email:</div>
                <span className="text-sm">{user.primaryEmailAddress?.emailAddress || "N/A"}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Sync Status</CardTitle>
          <CardDescription>Your current synced data counts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{dataCount.categories}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{dataCount.entries}</div>
              <div className="text-sm text-muted-foreground">Entries</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{dataCount.goals}</div>
              <div className="text-sm text-muted-foreground">Goals</div>
            </div>
          </div>

          {user && (
            <Button onClick={handleManualSync} disabled={syncing} className="w-full">
              <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing..." : "Force Sync Now"}
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Cross-Device Sync Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Step 1: Sign in with Clerk</div>
              <p className="text-muted-foreground">Visit /sign-in and create/log into your Clerk account</p>
            </div>
          </div>

          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Step 2: Add data on Device 1</div>
              <p className="text-muted-foreground">Create budget categories, entries, or goals on your first device</p>
            </div>
          </div>

          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Step 3: Automatic sync</div>
              <p className="text-muted-foreground">Your data automatically saves to Supabase database</p>
            </div>
          </div>

          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Step 4: Sign in on Device 2</div>
              <p className="text-muted-foreground">Use the same Clerk account on your other device</p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Done!</div>
              <p className="text-muted-foreground">Your data automatically loads on Device 2 - all progress synced!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!user && isLoaded && (
        <Card className="border-amber-500">
          <CardHeader>
            <CardTitle className="text-amber-600">Action Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You need to sign in to enable cross-device sync.</p>
            <Button asChild>
              <a href="/sign-in">Sign In Now</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
