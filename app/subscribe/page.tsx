"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PricingTable } from "@clerk/nextjs"

export default function SubscribePage() {
  console.log("[v0] SubscribePage component rendering")

  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)
  const [activationError, setActivationError] = useState<string | null>(null)

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

  const handleStripeCheckout = async () => {
    setIsActivating(true)
    setActivationError(null)
    console.log("[v0] Starting Stripe checkout...")

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const data = await response.json()
      console.log("[v0] Checkout session created:", data)

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("[v0] Stripe checkout error:", error)
      setActivationError("Failed to start checkout. Please try again.")
      setIsActivating(false)
    }
  }

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

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <button
            onClick={handleStripeCheckout}
            disabled={isActivating}
            style={{
              padding: "16px 48px",
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              background: isActivating ? "#9ca3af" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "8px",
              cursor: isActivating ? "not-allowed" : "pointer",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActivating) {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.5)"
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)"
            }}
          >
            {isActivating ? "Processing..." : "Subscribe Now - $29.99/month"}
          </button>
          {activationError && (
            <p style={{ color: "#ef4444", marginTop: "12px", fontSize: "14px" }}>{activationError}</p>
          )}
          <p style={{ color: "#6b7280", marginTop: "16px", fontSize: "14px" }}>Secure payment powered by Stripe</p>
        </div>

        <PricingTable />
      </div>
    </div>
  )
}
