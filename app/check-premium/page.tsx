"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function CheckPremiumPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const handleRefresh = async () => {
    if (user) {
      await user.reload()
      window.location.reload()
    }
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Please sign in to check your premium status</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const hasPremium = user.publicMetadata?.premium === true

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Premium Status Diagnostic</CardTitle>
          <CardDescription>Check your current premium status and metadata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">User Information</h3>
            <div className="bg-muted p-4 rounded-lg space-y-2 font-mono text-sm">
              <div>
                <span className="font-semibold">User ID:</span> {user.id}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user.primaryEmailAddress?.emailAddress}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Premium Status</h3>
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${hasPremium ? "bg-green-500" : "bg-red-500"}`} />
                <span className="font-semibold text-lg">{hasPremium ? "✅ PREMIUM ACTIVE" : "❌ NO PREMIUM"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Public Metadata</h3>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-xs overflow-auto">{JSON.stringify(user.publicMetadata, null, 2)}</pre>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Unsafe Metadata</h3>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-xs overflow-auto">{JSON.stringify(user.unsafeMetadata, null, 2)}</pre>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleRefresh} className="flex-1">
              Refresh User Data
            </Button>
            <Button onClick={() => router.push("/")} variant="outline" className="flex-1">
              Go to Home
            </Button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg space-y-2 text-sm">
            <h4 className="font-semibold">Webhook Status:</h4>
            <p>
              If Clerk dashboard shows successful webhook deliveries but premium is not active, the webhook may be
              processing events but the metadata hasn't updated yet.
            </p>
            <p className="font-semibold">Try these steps:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Click "Refresh User Data" above</li>
              <li>If still not active, go to /activate-premium to manually activate</li>
              <li>Check that the webhook event type in Clerk is "subscription.updated"</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
