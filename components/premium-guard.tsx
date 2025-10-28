"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function checkPremiumStatus(user: any): boolean {
  const publicMetadata = user.publicMetadata

  if (!publicMetadata) {
    return false
  }

  if (publicMetadata.premium === true) {
    return true
  }

  return false
}

export function PremiumGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    async function checkAccess() {
      if (!isLoaded) return

      if (!user) {
        console.log("[v0] User not signed in, redirecting to sign-in")
        router.replace("/sign-in")
        return
      }

      const hasPremium = checkPremiumStatus(user)

      console.log("[v0] Premium check:", {
        userId: user.id,
        hasPremium,
        metadata: user.publicMetadata,
      })

      if (!hasPremium) {
        console.log("[v0] User does not have premium, redirecting to pricing")
        router.replace("/pricing")
        return
      }

      console.log("[v0] User has premium, granting access")
      setIsChecking(false)
    }

    checkAccess()
  }, [user, isLoaded, router])

  if (!isLoaded || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-purple/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
