import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (userId) {
      return NextResponse.json({
        authenticated: true,
        userId,
        timestamp: Date.now(),
      })
    }

    return NextResponse.json({ authenticated: false })
  } catch (error) {
    console.error("[Server] Auth check error:", error)
    return NextResponse.json({ authenticated: false, error: String(error) })
  }
}
