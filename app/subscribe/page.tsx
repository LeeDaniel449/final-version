"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { PricingTable } from "@clerk/nextjs"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      const hasPremium =
        user.publicMetadata?.premium === true ||
        user.publicMetadata?.subscriptionStatus === "active" ||
        user.publicMetadata?.freeTrialActive === true

      if (hasPremium) {
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

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
