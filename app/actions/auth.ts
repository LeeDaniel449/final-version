"use client"

// The app now uses client-side Clerk authentication only via useUser() hook
export async function getAuthenticatedUser() {
  // Return null to indicate server auth is not available
  return { userId: null, email: null, authenticated: false }
}
