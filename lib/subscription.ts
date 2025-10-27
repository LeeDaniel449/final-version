import { currentUser } from "@clerk/nextjs/server"

export async function checkPremiumStatus(): Promise<boolean> {
  const user = await currentUser()

  if (!user) {
    return false
  }

  // Check if user has an active subscription via Clerk Billing
  const subscriptionStatus = user.publicMetadata?.subscriptionStatus as string | undefined
  const hasPremium = subscriptionStatus === "active"

  console.log("[v0] Premium status check:", {
    userId: user.id,
    subscriptionStatus,
    hasPremium,
  })

  return hasPremium
}

export async function getUserSubscriptionStatus() {
  const user = await currentUser()

  if (!user) {
    return {
      isPremium: false,
      userId: null,
      subscriptionStatus: null,
    }
  }

  const subscriptionStatus = user.publicMetadata?.subscriptionStatus as string | undefined

  return {
    isPremium: subscriptionStatus === "active",
    userId: user.id,
    subscriptionStatus,
    planId: user.publicMetadata?.planId as string | undefined,
  }
}

export function checkClientPremiumStatus(user: any): boolean {
  if (!user) return false
  const subscriptionStatus = user.publicMetadata?.subscriptionStatus as string | undefined
  return subscriptionStatus === "active"
}
