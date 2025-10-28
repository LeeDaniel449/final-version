"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"

      if (hasPremium) {
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleSubscribe = () => {
    if (window.Clerk) {
      window.Clerk.openUserProfile({
        appearance: {
          elements: {
            rootBox: "z-[9999]",
          },
        },
      })
    }
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
          ></div>
          <p style={{ fontSize: "18px" }}>Loading...</p>
        </div>
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
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "48px 32px",
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px", margin: 0 }}>
            Complete Your Subscription
          </h1>
          <p style={{ fontSize: "18px", opacity: 0.9, margin: 0 }}>Subscribe now to unlock all premium features</p>
        </div>

        {/* Content */}
        <div style={{ padding: "40px 32px" }}>
          {/* Features */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#1f2937" }}>
              Premium Features Include:
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "start" }}>
                <span style={{ fontSize: "24px", marginRight: "12px", color: "#10b981" }}>✓</span>
                <span style={{ fontSize: "16px", color: "#4b5563" }}>AI-Powered Financial Advisor</span>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <span style={{ fontSize: "24px", marginRight: "12px", color: "#10b981" }}>✓</span>
                <span style={{ fontSize: "16px", color: "#4b5563" }}>Portfolio Optimization Tools</span>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <span style={{ fontSize: "24px", marginRight: "12px", color: "#10b981" }}>✓</span>
                <span style={{ fontSize: "16px", color: "#4b5563" }}>Budget & Goal Tracking</span>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <span style={{ fontSize: "24px", marginRight: "12px", color: "#10b981" }}>✓</span>
                <span style={{ fontSize: "16px", color: "#4b5563" }}>Real-Time Market Data</span>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <span style={{ fontSize: "24px", marginRight: "12px", color: "#10b981" }}>✓</span>
                <span style={{ fontSize: "16px", color: "#4b5563" }}>Unlimited Access to All Features</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.9)", marginBottom: "8px", margin: 0 }}>
              Premium Plan
            </p>
            <p style={{ fontSize: "42px", fontWeight: "bold", color: "white", margin: "8px 0" }}>
              $29.99<span style={{ fontSize: "20px", fontWeight: "normal" }}>/month</span>
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSubscribe}
            style={{
              width: "100%",
              padding: "18px 32px",
              fontSize: "18px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)"
            }}
          >
            Subscribe Now with Clerk
          </button>

          <p
            style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#9ca3af", margin: "16px 0 0 0" }}
          >
            Secure payment powered by Clerk Billing
          </p>
        </div>
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
