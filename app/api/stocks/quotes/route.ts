import { type NextRequest, NextResponse } from "next/server"
import { stockAPI } from "@/lib/stock-api"

export async function POST(request: NextRequest) {
  try {
    const { symbols } = await request.json()

    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json({ error: "Symbols array is required" }, { status: 400 })
    }

    const quotes = await stockAPI.getMultipleQuotes(symbols)

    return NextResponse.json({
      success: true,
      data: quotes,
    })
  } catch (error) {
    console.error("Multiple quotes API error:", error)
    return NextResponse.json({ error: "Failed to fetch stock quotes" }, { status: 500 })
  }
}
