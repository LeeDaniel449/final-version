"use client"

import { useUser, useOrganizationList } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PricingTable } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const { isLoaded: orgsLoaded, userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  })
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isManualActivating, setIsManualActivating] = useState(false)

  console.log("[v0] ========== SUBSCRIBE PAGE DEBUG ==========")
  console.log("[v0] isLoaded:", isLoaded)
  console.log("[v0] orgsLoaded:", orgsLoaded)
  console.log("[v0] user exists:", !!user)
  if (user) {
    console.log("[v0] user id:", user.id)
    console.log("[v0] publicMetadata:", user.publicMetadata)
  }
  console.log("[v0] userMemberships:", userMemberships)
  console.log("[v0] userMemberships.data:", userMemberships?.data)
  console.log("[v0] userMemberships.data.length:", userMemberships?.data?.length)

  const hasPremiumMetadata =
    user?.publicMetadata?.premium === true ||
    user?.publicMetadata?.subscriptionStatus === "active" ||
    user?.publicMetadata?.freeTrialActive === true

  const hasOrgMembership = userMemberships && userMemberships.data && userMemberships.data.length > 0

  console.log("[v0] hasPremiumMetadata:", hasPremiumMetadata)
  console.log("[v0] hasOrgMembership:", hasOrgMembership)

  const showActivateButton = isLoaded && orgsLoaded && user && hasOrgMembership && !hasPremiumMetadata

  console.log("[v0] showActivateButton:", showActivateButton)
  console.log("[v0] ========== SUBSCRIBE PAGE DEBUG END ==========")

  const handleManualActivate = async () => {
    if (!user) return

    setIsManualActivating(true)
    console.log("[v0] Manual premium activation requested")

    try {
      const response = await fetch("/api/activate-premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("[v0] Premium activated successfully via manual activation")
        await user.reload()
        window.location.href = "/"
      } else {
        console.error("[v0] Failed to activate premium:", data)
        alert(`Failed to activate premium: ${data.error || "Unknown error"}`)
        setIsManualActivating(false)
      }
    } catch (error) {
      console.error("[v0] Error during manual activation:", error)
      alert("An error occurred. Please try again.")
      setIsManualActivating(false)
    }
  }

  const handleRefresh = async () => {
    if (!user) return

    setIsRefreshing(true)
    console.log("[v0] Refreshing user premium status...")

    try {
      await user.reload()
      console.log("[v0] User data reloaded successfully")
      console.log("[v0] Updated publicMetadata:", user.publicMetadata)

      const nowHasPremium =
        user.publicMetadata?.premium === true ||
        user.publicMetadata?.subscriptionStatus === "active" ||
        user.publicMetadata?.freeTrialActive === true

      if (nowHasPremium) {
        console.log("[v0] Premium detected after refresh, redirecting to home")
        window.location.href = "/"
      } else {
        console.log("[v0] No premium detected after refresh")
        alert("Premium status not found. Please wait a moment and try again, or contact support if the issue persists.")
      }
    } catch (error) {
      console.error("[v0] Error refreshing user data:", error)
      alert("Failed to refresh status. Please try again.")
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleActivate = async () => {
    setIsActivating(true)
    console.log("[v0] User clicked activate subscription button")

    try {
      const response = await fetch("/api/set-premium", {
        method: "POST",
      })

      if (response.ok) {
        console.log("[v0] Premium activated successfully")
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

  if (!isLoaded || !orgsLoaded) {
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

        {!hasPremiumMetadata && (
          <div style={{ marginBottom: "32px" }}>
            <PricingTable />
          </div>
        )}

        {hasPremiumMetadata && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              background: "#f7fafc",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "#48bb78",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#1a202c" }}>
              You're Already Subscribed!
            </h2>
            <p style={{ fontSize: "16px", color: "#4a5568", marginBottom: "24px" }}>
              You have access to all premium features.
            </p>
            <Button
              onClick={() => router.push("/")}
              style={{
                background: "#667eea",
                color: "white",
                padding: "12px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        )}

        {showActivateButton && (
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <p style={{ marginBottom: "16px", color: "#4a5568" }}>
              You have an active subscription. Click below to activate your premium access.
            </p>
            <Button
              onClick={handleActivate}
              disabled={isActivating}
              style={{
                background: "#48bb78",
                color: "white",
                padding: "12px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                border: "none",
                cursor: isActivating ? "not-allowed" : "pointer",
                opacity: isActivating ? 0.6 : 1,
              }}
            >
              {isActivating ? "Activating..." : "Activate Subscription"}
            </Button>
          </div>
        )}

        {!hasPremiumMetadata && user && (
          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
              padding: "24px",
              background: "#f7fafc",
              borderRadius: "12px",
            }}
          >
            <p style={{ marginBottom: "12px", color: "#4a5568", fontSize: "14px" }}>
              Just subscribed? Click below to refresh your premium status.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                style={{
                  background: "#667eea",
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  cursor: isRefreshing ? "not-allowed" : "pointer",
                  opacity: isRefreshing ? 0.6 : 1,
                }}
              >
                {isRefreshing ? "Refreshing..." : "Refresh Premium Status"}
              </Button>
              <Button
                onClick={handleManualActivate}
                disabled={isManualActivating}
                style={{
                  background: "#48bb78",
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  cursor: isManualActivating ? "not-allowed" : "pointer",
                  opacity: isManualActivating ? 0.6 : 1,
                }}
              >
                {isManualActivating ? "Activating..." : "Manually Activate Premium"}
              </Button>
            </div>
            <p style={{ marginTop: "12px", color: "#718096", fontSize: "12px" }}>
              If the webhook didn't activate your premium automatically, use the manual activation button.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
