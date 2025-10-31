"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)
  const [activationError, setActivationError] = useState("")

  useEffect(() => {
    if (isLoaded && user) {
      const hasPremium = user.publicMetadata?.premium === true
      console.log("[v0] Subscribe page - User premium status:", hasPremium, "metadata:", user.publicMetadata)

      if (hasPremium) {
        console.log("[v0] User has premium, redirecting to home")
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleActivatePremium = async () => {
    setIsActivating(true)
    setActivationError("")

    try {
      const response = await fetch("/api/set-premium", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to activate premium")
      }

      // Reload to update user metadata
      window.location.reload()
    } catch (error) {
      console.error("[v0] Error activating premium:", error)
      setActivationError("Failed to activate premium. Please try again.")
      setIsActivating(false)
    }
  }

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error("[v0] Error creating checkout session:", error)
    }
  }

  if (!isLoaded) {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "white",
          borderRadius: "16px",
          padding: "48px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
          Unlock Premium Features
        </h1>
        <p style={{ fontSize: "18px", color: "#666", marginBottom: "32px", textAlign: "center" }}>
          Get access to AI-powered financial advice, portfolio optimization, and personalized learning paths.
        </p>

        <div style={{ marginBottom: "24px", padding: "24px", background: "#f8f9fa", borderRadius: "8px" }}>
          <div style={{ fontSize: "48px", fontWeight: "bold", textAlign: "center", marginBottom: "8px" }}>
            $29.99<span style={{ fontSize: "18px", fontWeight: "normal", color: "#666" }}>/month</span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "24px 0" }}>
            <li style={{ padding: "8px 0", fontSize: "16px" }}>✓ AI-Powered Financial Advice</li>
            <li style={{ padding: "8px 0", fontSize: "16px" }}>✓ Portfolio Optimization</li>
            <li style={{ padding: "8px 0", fontSize: "16px" }}>✓ Personalized Learning Paths</li>
            <li style={{ padding: "8px 0", fontSize: "16px" }}>✓ Advanced Analytics</li>
            <li style={{ padding: "8px 0", fontSize: "16px" }}>✓ Priority Support</li>
          </ul>
        </div>

        <button
          onClick={handleSubscribe}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "18px",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          Subscribe Now
        </button>

        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ borderTop: "1px solid #e0e0e0", margin: "24px 0", position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                padding: "0 16px",
                color: "#666",
                fontSize: "14px",
              }}
            >
              OR FOR TESTING
            </span>
          </div>
        </div>

        <button
          onClick={handleActivatePremium}
          disabled={isActivating}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#667eea",
            background: "white",
            border: "2px solid #667eea",
            borderRadius: "8px",
            cursor: isActivating ? "not-allowed" : "pointer",
            opacity: isActivating ? 0.6 : 1,
          }}
        >
          {isActivating ? "Activating..." : "Activate Premium (Testing)"}
        </button>

        {activationError && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              background: "#fee",
              color: "#c33",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            {activationError}
          </div>
        )}
      </div>
    </div>
  )
}
