"use server"

import { auth } from "@clerk/nextjs/server"

export async function getAuthenticatedUser() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { userId: null, email: null, authenticated: false }
    }

    // Get user details
    const { currentUser } = await import("@clerk/nextjs/server")
    const user = await currentUser()

    return {
      userId: userId,
      email: user?.primaryEmailAddress?.emailAddress || null,
      authenticated: true,
    }
  } catch (error: any) {
    console.error("[Server] Error getting authenticated user:", error)
    return { userId: null, email: null, authenticated: false }
  }
}
