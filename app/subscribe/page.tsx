"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      console.log("[v0] Subscribe page loaded for user:", user.id)
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"

      if (hasPremium) {
        console.log("[v0] User already has premium, redirecting to home")
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleSubscribe = () => {
    console.log("[v0] Redirecting to Clerk user profile for billing")
    // Direct navigation to Clerk's user profile page with billing focus
    window.location.href = `https://accounts.clerk.dev/user/billing?redirect_url=${window.location.origin}`
  }

  if (!isLoaded || !user) {
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
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>🎯</div>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
          Complete Your Subscription
        </h1>
        <p style={{ fontSize: "18px", color: "#4a5568", marginBottom: "32px" }}>
          Subscribe to unlock all premium features and start your financial journey
        </p>

        <div
          style={{
            background: "#f7fafc",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "32px",
            textAlign: "left",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#667eea", marginBottom: "8px" }}>
              $9.99<span style={{ fontSize: "18px", fontWeight: "normal", color: "#718096" }}>/month</span>
            </div>
            <div style={{ fontSize: "14px", color: "#718096" }}>Premium Plan</div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            {[
              "AI-Powered Financial Advisor",
              "Portfolio Optimization Tools",
              "Budget & Goal Tracking",
              "Real-time Market Data",
              "Advanced Analytics",
              "Priority Support",
            ].map((feature, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ color: "#48bb78", marginRight: "12px", fontSize: "20px" }}>✓</span>
                <span style={{ color: "#2d3748" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          style={{
            width: "100%",
            padding: "16px 32px",
            fontSize: "18px",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "transform 0.2s",
            marginBottom: "16px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Subscribe Now with Clerk
        </button>

        <p style={{ fontSize: "14px", color: "#718096" }}>Your subscription is required to access the platform</p>
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
