"use client"

import { PricingTable } from "@clerk/nextjs"
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(to bottom right, #eff6ff, #faf5ff, #fce7f3)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
            Complete Your Subscription
          </h1>
          <p style={{ fontSize: "18px", color: "#6b7280" }}>Choose a plan to unlock all premium features</p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            padding: "32px",
          }}
        >
          <PricingTable />
        </div>

        <p style={{ fontSize: "14px", color: "#9ca3af", textAlign: "center", marginTop: "24px" }}>
          Subscription required to access all features
        </p>
      </div>
    </div>
  )
}
