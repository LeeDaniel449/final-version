"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { PricingTable } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  React.useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-up")
    }

    if (isLoaded && user?.publicMetadata?.premium === true) {
      router.push("/")
    }
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to all premium features and start your journey to financial literacy
          </p>
        </div>

        <PricingTable />
      </div>
    </div>
  )
}
