import { currentUser } from "@clerk/nextjs/server"

export async function checkPremiumStatus(): Promise<boolean> {
  const user = await currentUser()

  if (!user) {
    return false
  }

  // Check if user has premium in their public metadata
  const hasPremium = user.publicMetadata?.premium === true

  console.log("[v0] Premium status check:", { userId: user.id, hasPremium })

  return hasPremium
}

export async function getUserSubscriptionStatus() {
  const user = await currentUser()

  if (!user) {
    return { isPremium: false, userId: null }
  }

  return {
    isPremium: user.publicMetadata?.premium === true,
    userId: user.id,
    subscriptionId: user.publicMetadata?.stripeSubscriptionId as string | undefined,
  }
}
