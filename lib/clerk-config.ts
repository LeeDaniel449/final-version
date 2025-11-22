export function getClerkPublishableKey(): string {
  // Check all possible Clerk key environment variables
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""
}
