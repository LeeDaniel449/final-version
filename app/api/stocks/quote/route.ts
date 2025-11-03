import { type NextRequest, NextResponse } from "next/server"
import { stockAPI } from "@/lib/stock-api"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")?.toUpperCase()

  if (!symbol) {
    return NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 })
  }

  try {
    // 1️⃣ primary attempt – live data
    const quote = await stockAPI.getQuote(symbol)

    if (quote) {
      return NextResponse.json({ success: true, data: quote })
    }

    // 2️⃣ if null (very unlikely) fall back to mock
    const mock = stockAPI.getMockQuote(symbol)
    return NextResponse.json({
      success: true,
      data: mock,
      note: "Live data unavailable – serving mock quote",
    })
  } catch (err) {
    // 3️⃣ network / Yahoo failure: NEVER crash, ALWAYS respond
    console.warn(`Quote API fallback for ${symbol}:`, err)

    const mock = stockAPI.getMockQuote(symbol)
    return NextResponse.json(
      {
        success: true,
        data: mock,
        note: "Live data fetch failed – serving mock quote",
      },
      { status: 200 },
    )
  }
}
