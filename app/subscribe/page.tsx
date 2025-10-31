"use client"

import { useUser, useOrganizationList } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PricingTable } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const { isLoaded: orgsLoaded, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)

  console.log("[v0] ========== SUBSCRIBE PAGE DEBUG ==========")
  console.log("[v0] isLoaded:", isLoaded)
  console.log("[v0] orgsLoaded:", orgsLoaded)
  console.log("[v0] user exists:", !!user)
  if (user) {
    console.log("[v0] user id:", user.id)
    console.log("[v0] publicMetadata:", user.publicMetadata)
  }
  console.log("[v0] userMemberships count:", userMemberships?.data?.length || 0)
  console.log("[v0] userMemberships:", userMemberships?.data)

  const hasPremiumMetadata =
    user?.publicMetadata?.premium === true ||
    user?.publicMetadata?.subscriptionStatus === "active" ||
    user?.publicMetadata?.freeTrialActive === true

  const hasOrgMembership = (userMemberships?.data?.length || 0) > 0

  const showActivateButton = isLoaded && orgsLoaded && user && hasOrgMembership && !hasPremiumMetadata

  console.log("[v0] hasPremiumMetadata:", hasPremiumMetadata)
  console.log("[v0] hasOrgMembership:", hasOrgMembership)
  console.log("[v0] showActivateButton:", showActivateButton)
  console.log("[v0] ========== SUBSCRIBE PAGE DEBUG END ==========")

  const handleActivate = async () => {
    setIsActivating(true)
    console.log("[v0] User clicked activate premium button")

    try {
      const response = await fetch("/api/set-premium", {
        method: "POST",
      })

      if (response.ok) {
        console.log("[v0] Premium activated successfully")
        // Reload to get updated user metadata and redirect
        window.location.href = "/"
      } else {
        console.error("[v0] Failed to activate premium")
        alert("Failed to activate premium. Please try again.")
        setIsActivating(false)
      }
    } catch (error) {
      console.error("[v0] Error activating premium:", error)
      alert("An error occurred. Please try again.")
      setIsActivating(false)
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

  if (!user) {
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
          <p style={{ fontSize: "18px" }}>Please sign in to subscribe</p>
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

        {showActivateButton && (
          <div
            style={{
              marginBottom: "32px",
              padding: "24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "white", marginBottom: "12px" }}>
              🎉 Ready to Activate Your Subscription?
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.9)", marginBottom: "20px" }}>
              You've subscribed! Click the button below to activate your premium access and unlock all features.
            </p>
            <Button
              onClick={handleActivate}
              disabled={isActivating}
              size="lg"
              style={{
                background: "white",
                color: "#667eea",
                fontSize: "18px",
                padding: "12px 32px",
                fontWeight: "bold",
              }}
            >
              {isActivating ? "Activating..." : "Activate Premium Access"}
            </Button>
          </div>
        )}

        <PricingTable />
      </div>
    </div>
  )
}
