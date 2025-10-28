"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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
          maxWidth: "900px",
          width: "100%",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "48px 32px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
            Premium Plan Required
          </h1>
          <p style={{ fontSize: "18px", color: "#4a5568" }}>
            Subscribe to unlock all premium features and start your financial journey
          </p>
        </div>

        <div
          style={{
            background: "#f7fafc",
            borderRadius: "12px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#667eea", marginBottom: "8px" }}>
              $9.99<span style={{ fontSize: "18px", fontWeight: "normal", color: "#718096" }}>/month</span>
            </div>
            <div style={{ fontSize: "14px", color: "#718096", textTransform: "uppercase", letterSpacing: "1px" }}>
              Premium Plan
            </div>
          </div>

          <div style={{ marginBottom: "32px", textAlign: "left", maxWidth: "400px", margin: "0 auto 32px" }}>
            {[
              "AI-Powered Financial Advisor",
              "Portfolio Optimization Tools",
              "Budget & Goal Tracking",
              "Real-time Market Data",
              "Advanced Analytics",
              "Priority Support",
            ].map((feature, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ color: "#48bb78", marginRight: "12px", fontSize: "20px", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "#2d3748", fontSize: "16px" }}>{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            style={{
              padding: "16px 48px",
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)"
            }}
          >
            Subscribe Now
          </button>

          <p style={{ fontSize: "14px", color: "#718096", marginTop: "16px" }}>
            Managed by Clerk • Secure Payment Processing
          </p>
        </div>

        <p style={{ fontSize: "14px", color: "#718096", textAlign: "center", marginTop: "24px" }}>
          Your subscription is required to access the platform
        </p>
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
