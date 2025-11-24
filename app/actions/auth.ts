"use server"

import { currentUser } from "@clerk/nextjs/server"

export async function getAuthenticatedUser() {
  try {
    const user = await currentUser()
    if (!user) {
      return { userId: null, email: null, authenticated: false }
    }
    return {
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress || null,
      authenticated: true,
    }
  } catch (error: any) {
    // This is expected when middleware is not configured
    if (error?.message?.includes("clerkMiddleware")) {
      // Middleware not configured - return unauthenticated state
      return { userId: null, email: null, authenticated: false }
    }
    console.error("[Server] Error getting authenticated user:", error)
    return { userId: null, email: null, authenticated: false }
  }
}
