"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { PricingTable } from "@clerk/nextjs"

export default function SubscribePage() {
  console.log("[v0] SubscribePage component rendering")

  const { user, isLoaded } = useUser()
  const router = useRouter()

  console.log("[v0] Subscribe page state:", { isLoaded, hasUser: !!user, userId: user?.id })

  useEffect(() => {
    console.log("[v0] Subscribe page useEffect triggered")
    if (isLoaded && user) {
      console.log("[v0] Subscribe page loaded for user:", user.id)
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"
      console.log("[v0] User premium status:", hasPremium, "metadata:", user.publicMetadata)

      if (hasPremium) {
        console.log("[v0] User already has premium, redirecting to home")
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleSubscribe = () => {
    console.log("[v0] Opening Clerk billing page")
    window.location.href = `https://accounts.clerk.dev/user/billing?redirect_url=${window.location.origin}`
  }

  console.log("[v0] Rendering subscribe page UI, isLoaded:", isLoaded, "user:", !!user)

  if (!isLoaded || !user) {
    console.log("[v0] Showing loading state")
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid rgba(255,255,255,0.3)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              margin: "0 auto 16px",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ fontSize: "18px" }}>Loading...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )
  }

  console.log("[v0] Showing subscription UI")

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "48px 32px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
            Choose Your Plan
          </h1>
          <p style={{ fontSize: "18px", color: "#4a5568" }}>Subscribe to unlock all premium features</p>
        </div>

        <PricingTable />
      </div>
    </div>
  )
}
