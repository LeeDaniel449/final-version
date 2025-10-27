import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/pricing(.*)"])

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Protect all other routes - require authentication
  const authObj = await auth()

  if (!authObj.userId) {
    const signInUrl = new URL("/sign-in", req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Check if user has premium access
  const user = authObj.sessionClaims
  const hasPremium = user?.metadata?.premium === true

  if (!hasPremium) {
    // Redirect non-premium users to pricing page
    const pricingUrl = new URL("/pricing", req.url)
    return NextResponse.redirect(pricingUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
