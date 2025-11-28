import { type NextRequest, NextResponse } from "next/server"

// This endpoint now just returns a signal to use client-side auth only
export async function GET(request: NextRequest) {
  // Without middleware, we can't use auth() on the server
  // The client will handle authentication detection through Clerk hooks
  return NextResponse.json({
    authenticated: false,
    message: "Use client-side Clerk authentication",
  })
}
