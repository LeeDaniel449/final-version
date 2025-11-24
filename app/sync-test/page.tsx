"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { userDataManager } from "@/lib/user-data"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function SyncTestPage() {
  const { user, isLoaded } = useUser()
  const [syncStatus, setSyncStatus] = useState<{
    userDetected: boolean
    dataLoaded: boolean
    categoriesCount: number
    entriesCount: number
    goalsCount: number
  }>({
    userDetected: false,
    dataLoaded: false,
    categoriesCount: 0,
    entriesCount: 0,
    goalsCount: 0,
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    const checkData = () => {
      const categories = userDataManager.getBudgetCategories()
      const entries = userDataManager.getBudgetEntries()
      const goals = userDataManager.getGoals()

      setSyncStatus({
        userDetected: !!user,
        dataLoaded: categories.length > 0 || entries.length > 0 || goals.length > 0,
        categoriesCount: categories.length,
        entriesCount: entries.length,
        goalsCount: goals.length,
      })
    }

    checkData()

    // Listen for storage events that indicate data has been synced
    const handleStorage = () => {
      console.log("[v0] Storage event detected - refreshing data")
      checkData()
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener("clerk-user-loaded", handleStorage)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("clerk-user-loaded", handleStorage)
    }
  }, [user, isLoaded])

  const handleForceRefresh = async () => {
    if (!user?.id) return

    setIsRefreshing(true)
    try {
      console.log("[v0] Forcing data refresh from database...")
      const dbData = await userDataManager.loadFromDatabase(user.id)
      console.log("[v0] Database data:", dbData)

      // Force UI update
      window.dispatchEvent(new Event("storage"))

      // Re-check data after a short delay
      setTimeout(() => {
        const categories = userDataManager.getBudgetCategories()
        const entries = userDataManager.getBudgetEntries()
        const goals = userDataManager.getGoals()

        setSyncStatus({
          userDetected: true,
          dataLoaded: categories.length > 0 || entries.length > 0 || goals.length > 0,
          categoriesCount: categories.length,
          entriesCount: entries.length,
          goalsCount: goals.length,
        })
      }, 500)
    } catch (error) {
      console.error("[v0] Error refreshing data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cross-Device Sync Test</h1>
        <p className="text-muted-foreground mt-2">
          This page helps you verify that your data syncs correctly across devices.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
          <CardDescription>Check if Clerk authentication is working</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Clerk User Detected</span>
            {syncStatus.userDetected ? (
              <Badge className="bg-green-500">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Yes
              </Badge>
            ) : (
              <Badge variant="destructive">
                <XCircle className="h-4 w-4 mr-1" />
                No
              </Badge>
            )}
          </div>

          {user && (
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <div>
                <span className="text-sm font-medium">User ID:</span>
                <code className="ml-2 text-xs bg-background px-2 py-1 rounded">{user.id}</code>
              </div>
              <div>
                <span className="text-sm font-medium">Email:</span>
                <span className="ml-2 text-sm">{user.primaryEmailAddress?.emailAddress}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Sync Status</CardTitle>
          <CardDescription>Check if your data has loaded from the database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Data Loaded</span>
            {syncStatus.dataLoaded ? (
              <Badge className="bg-green-500">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Yes
              </Badge>
            ) : (
              <Badge variant="secondary">
                <XCircle className="h-4 w-4 mr-1" />
                No Data
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold">{syncStatus.categoriesCount}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold">{syncStatus.entriesCount}</div>
              <div className="text-sm text-muted-foreground">Entries</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold">{syncStatus.goalsCount}</div>
              <div className="text-sm text-muted-foreground">Goals</div>
            </div>
          </div>

          {user && (
            <Button onClick={handleForceRefresh} disabled={isRefreshing} className="w-full">
              {isRefreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                "Force Refresh from Database"
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">When you sign in:</h4>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Your Clerk user ID is detected</li>
              <li>Data is automatically loaded from the Supabase database</li>
              <li>All components refresh to show your synced data</li>
              <li>Any changes you make are saved to the database</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-2">On another device:</h4>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Sign in with the same Clerk account</li>
              <li>Your data automatically appears</li>
              <li>Changes sync in real-time across all devices</li>
            </ol>
          </div>

          {!user && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm font-medium">You need to sign in to test cross-device sync.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Visit the{" "}
                <a href="/sign-in" className="underline">
                  sign-in page
                </a>{" "}
                to authenticate with Clerk.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
