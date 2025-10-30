"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PricingTable } from "@clerk/nextjs"

export default function SubscribePage() {
  console.log("[v0] SubscribePage component rendering")

  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isStartingTrial, setIsStartingTrial] = useState(false)
  const [trialError, setTrialError] = useState<string | null>(null)

  console.log("[v0] Subscribe page state:", { isLoaded, hasUser: !!user, userId: user?.id })

  useEffect(() => {
    console.log("[v0] Subscribe page useEffect triggered")
    if (isLoaded && user) {
      console.log("[v0] Subscribe page loaded for user:", user.id)
      const hasPremium =
        user.publicMetadata?.premium === true ||
        user.publicMetadata?.subscriptionStatus === "active" ||
        user.publicMetadata?.freeTrialActive === true
      console.log("[v0] User premium status:", hasPremium, "metadata:", user.publicMetadata)

      if (hasPremium) {
        console.log("[v0] User already has premium, redirecting to home")
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleStartFreeTrial = async () => {
    setIsStartingTrial(true)
    setTrialError(null)

    try {
      const response = await fetch("/api/start-free-trial", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to start free trial")
      }

      console.log("[v0] Free trial started successfully:", data)

      // Reload the page to refresh user metadata
      window.location.href = "/"
    } catch (error) {
      console.error("[v0] Error starting free trial:", error)
      setTrialError(error instanceof Error ? error.message : "Failed to start free trial")
      setIsStartingTrial(false)
    }
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
          <p style={{ fontSize: "18px", color: "#4a5568", marginBottom: "32px" }}>
            Subscribe to unlock all premium features
          </p>

          <div style={{ marginBottom: "32px" }}>
            <button
              onClick={handleStartFreeTrial}
              disabled={isStartingTrial}
              style={{
                padding: "16px 48px",
                fontSize: "18px",
                fontWeight: "600",
                color: "white",
                background: isStartingTrial ? "#9ca3af" : "#10b981",
                border: "none",
                borderRadius: "8px",
                cursor: isStartingTrial ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (!isStartingTrial) {
                  e.currentTarget.style.background = "#059669"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }
              }}
              onMouseOut={(e) => {
                if (!isStartingTrial) {
                  e.currentTarget.style.background = "#10b981"
                  e.currentTarget.style.transform = "translateY(0)"
                }
              }}
            >
              {isStartingTrial ? "Starting Trial..." : "Start 14-Day Free Trial"}
            </button>
            {trialError && <p style={{ color: "#ef4444", marginTop: "12px", fontSize: "14px" }}>{trialError}</p>}
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "12px" }}>
              No credit card required • Full access to all features
            </p>
          </div>

          <div style={{ margin: "32px 0", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            <span style={{ color: "#6b7280", fontSize: "14px" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
          </div>
        </div>

        <PricingTable />
      </div>
    </div>
  )
}
