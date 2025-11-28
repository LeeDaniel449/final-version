"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Database, Cloud, Smartphone, Laptop, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AuthStatusDashboard() {
  const { user, isLoaded } = useUser()

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {user ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              Cross-Device Sync Active
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-yellow-600" />
              Cross-Device Sync Disabled
            </>
          )}
        </CardTitle>
        <CardDescription>
          {user ? (
            <>Signed in as {user.primaryEmailAddress?.emailAddress}</>
          ) : (
            <>Sign in to sync your data across all devices</>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-green-900">Authentication Active</p>
                <p className="text-sm text-green-700">User ID: {user.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <Database className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-green-900">Supabase Connected</p>
                <p className="text-sm text-green-700">Your data is being synced to the cloud</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-medium text-blue-900 mb-2">How Cross-Device Sync Works:</p>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Laptop className="h-4 w-4" />
                <span>Device 1</span>
                <ArrowRight className="h-4 w-4" />
                <Cloud className="h-4 w-4" />
                <span>Supabase</span>
                <ArrowRight className="h-4 w-4" />
                <Smartphone className="h-4 w-4" />
                <span>Device 2</span>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                Any changes you make on this device automatically save to Supabase and will appear on all other devices
                where you're signed in.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <XCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-yellow-900">Not Signed In</p>
                <p className="text-sm text-yellow-700">Your data is only stored on this device</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Database className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-700">Cloud Sync Unavailable</p>
                <p className="text-sm text-gray-600">Sign in to enable automatic syncing</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-medium text-blue-900 mb-2">To Enable Cross-Device Sync:</p>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Click the button below to sign in</li>
                <li>Create an account or sign in with your existing account</li>
                <li>Your data will automatically sync to all devices where you sign in</li>
              </ol>
            </div>

            <Button asChild className="w-full">
              <Link href="/sign-in">Sign In to Enable Sync</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
