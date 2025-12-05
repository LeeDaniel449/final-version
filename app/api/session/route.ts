import { type NextRequest, NextResponse } from "next/server"
import { getUserSession } from "@/app/actions/session"

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserSession()

    console.log("[v0] Session API - userId from cookie:", userId ? `${userId.substring(0, 15)}...` : "none")

    return NextResponse.json({
      userId,
      authenticated: !!userId,
    })
  } catch (error) {
    console.error("[v0] Session API error:", error)
    return NextResponse.json({ userId: null, authenticated: false }, { status: 500 })
  }
}
