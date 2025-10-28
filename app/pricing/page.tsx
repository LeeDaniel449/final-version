"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { PricingTable } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, ExternalLink } from "lucide-react"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [showFallback, setShowFallback] = React.useState(false)

  React.useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-up")
    }

    if (isLoaded && user) {
      const metadata = user.publicMetadata as any
      const hasPremium =
        metadata?.premium === true ||
        metadata?.subscriptionStatus === "active" ||
        (Array.isArray(metadata?.subscriptions) &&
          metadata.subscriptions.some((sub: any) => sub.status === "active")) ||
        metadata?.subscription?.status === "active"

      if (hasPremium) {
        router.push("/")
      }
    }

    // Show fallback after 3 seconds if PricingTable doesn't load
    const timer = setTimeout(() => {
      setShowFallback(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Unlock Premium Access</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Subscribe to access all premium features and unlock your financial potential
          </p>
        </div>

        {showFallback ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-amber-100 rounded-full p-3">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Clerk Billing Configuration Required</h3>
                  <p className="text-gray-700 mb-6 text-lg">
                    Your pricing table is ready, but Clerk Billing needs to be enabled for your{" "}
                    <strong>test instance</strong> to display it.
                  </p>

                  <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        1
                      </span>
                      Enable Billing on Your Test Instance
                    </h4>
                    <ol className="space-y-3 text-gray-700 ml-8">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>
                          Open your{" "}
                          <a
                            href="https://dashboard.clerk.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                          >
                            Clerk Dashboard
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>
                          Select your <strong>test instance</strong> (artistic-deer-15.clerk.accounts.dev)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Navigate to Billing → Settings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Click "Enable Billing" and complete the setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Create your pricing plans with the plan ID you want to use</span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        2
                      </span>
                      After Enabling Billing
                    </h4>
                    <p className="text-gray-700 ml-8">
                      Once billing is enabled, refresh this page and your pricing table will appear automatically. Users
                      will be able to subscribe and all premium features will unlock immediately after payment.
                    </p>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <a
                      href="https://dashboard.clerk.com/last-active?path=billing/settings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center inline-flex items-center justify-center gap-2"
                    >
                      Open Billing Settings
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-4 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
                    >
                      Refresh Page
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Note: This message only appears in development when billing is not enabled. In production with billing
                enabled, users will see your pricing table directly.
              </p>
            </div>
          </div>
        ) : (
          <PricingTable />
        )}
      </div>
    </div>
  )
}
