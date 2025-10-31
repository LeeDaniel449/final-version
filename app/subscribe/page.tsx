"use client"

import { useUser, useOrganizationList } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PricingTable } from "@clerk/nextjs"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const { isLoaded: orgsLoaded, userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  })
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)

  useEffect(() => {
    async function checkAndActivatePremium() {
      if (!isLoaded || !orgsLoaded || !user || isActivating) return

      // Check if user already has premium in metadata
      const hasPremiumMetadata =
        user.publicMetadata?.premium === true ||
        user.publicMetadata?.subscriptionStatus === "active" ||
        user.publicMetadata?.freeTrialActive === true

      if (hasPremiumMetadata) {
        console.log("[v0] User already has premium metadata, redirecting")
        router.replace("/")
        return
      }

      // Check if user is member of any organization (indicates subscription)
      const hasOrgMembership = userMemberships && userMemberships.data && userMemberships.data.length > 0

      if (hasOrgMembership) {
        console.log("[v0] User has organization membership, activating premium")
        setIsActivating(true)

        try {
          const response = await fetch("/api/set-premium", {
            method: "POST",
          })

          if (response.ok) {
            console.log("[v0] Premium activated successfully")
            // Reload to get updated user metadata
            window.location.href = "/"
          } else {
            console.error("[v0] Failed to activate premium")
            setIsActivating(false)
          }
        } catch (error) {
          console.error("[v0] Error activating premium:", error)
          setIsActivating(false)
        }
      }
    }

    checkAndActivatePremium()
  }, [isLoaded, orgsLoaded, user, userMemberships, router, isActivating])

  if (!isLoaded || !orgsLoaded || isActivating) {
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
          <p style={{ fontSize: "18px" }}>{isActivating ? "Activating premium..." : "Loading..."}</p>
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

        <PricingTable />
      </div>
    </div>
  )
}
