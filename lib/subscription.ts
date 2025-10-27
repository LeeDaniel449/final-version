import { currentUser } from "@clerk/nextjs/server"

export async function checkPremiumStatus(): Promise<boolean> {
  const user = await currentUser()

  if (!user) {
    return false
  }

  const hasPremium = user.publicMetadata?.premium === true

  console.log("[v0] Premium status check:", {
    userId: user.id,
    premium: user.publicMetadata?.premium,
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
      stripeSubscriptionId: null,
    }
  }

  const isPremium = user.publicMetadata?.premium === true

  return {
    isPremium,
    userId: user.id,
    stripeSubscriptionId: user.publicMetadata?.stripeSubscriptionId as string | undefined,
    stripeCustomerId: user.publicMetadata?.stripeCustomerId as string | undefined,
  }
}

export function checkClientPremiumStatus(user: any): boolean {
  if (!user) return false
  return user.publicMetadata?.premium === true
}
