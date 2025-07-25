import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY

  // Basic configuration check
  const diagnostics = {
    timestamp: new Date().toISOString(),
    apiKey: {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      preview: apiKey ? `${apiKey.substring(0, 8)}...` : "Not found",
      isDemo: apiKey === "demo",
    },
    tests: [] as any[],
  }

  if (!apiKey || apiKey === "demo") {
    return NextResponse.json({
      ...diagnostics,
      error: "API key not configured or using demo key",
      recommendation: "Get a free API key from https://www.alphavantage.co/support/#api-key",
    })
  }

  // Test 1: Basic API connectivity
  try {
    const testUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${apiKey}`
    const response = await fetch(testUrl)
    const data = await response.json()

    diagnostics.tests.push({
      name: "Basic API Connectivity",
      status: response.ok ? "PASS" : "FAIL",
      httpStatus: response.status,
      hasData: !!data,
      response: data,
    })
  } catch (error) {
    diagnostics.tests.push({
      name: "Basic API Connectivity",
      status: "ERROR",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 2: Global Quote (what we use for stock prices)
  try {
    const quoteUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${apiKey}`
    const response = await fetch(quoteUrl)
    const data = await response.json()

    const hasValidQuote = data["Global Quote"] && Object.keys(data["Global Quote"]).length > 0
    const price = hasValidQuote ? data["Global Quote"]["05. price"] : null

    diagnostics.tests.push({
      name: "Global Quote (AAPL)",
      status: hasValidQuote ? "PASS" : "FAIL",
      httpStatus: response.status,
      hasQuote: hasValidQuote,
      price: price,
      response: data,
      rateLimited: !!data["Note"],
      errorMessage: data["Error Message"],
    })
  } catch (error) {
    diagnostics.tests.push({
      name: "Global Quote (AAPL)",
      status: "ERROR",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 3: Symbol Search
  try {
    const searchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=Apple&apikey=${apiKey}`
    const response = await fetch(searchUrl)
    const data = await response.json()

    const hasResults = data["bestMatches"] && data["bestMatches"].length > 0

    diagnostics.tests.push({
      name: "Symbol Search",
      status: hasResults ? "PASS" : "FAIL",
      httpStatus: response.status,
      resultsCount: hasResults ? data["bestMatches"].length : 0,
      response: data,
      rateLimited: !!data["Note"],
      errorMessage: data["Error Message"],
    })
  } catch (error) {
    diagnostics.tests.push({
      name: "Symbol Search",
      status: "ERROR",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 4: Company Overview
  try {
    const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=${apiKey}`
    const response = await fetch(overviewUrl)
    const data = await response.json()

    const hasOverview = data["Symbol"] === "AAPL"

    diagnostics.tests.push({
      name: "Company Overview (AAPL)",
      status: hasOverview ? "PASS" : "FAIL",
      httpStatus: response.status,
      hasOverview: hasOverview,
      marketCap: hasOverview ? data["MarketCapitalization"] : null,
      response: data,
      rateLimited: !!data["Note"],
      errorMessage: data["Error Message"],
    })
  } catch (error) {
    diagnostics.tests.push({
      name: "Company Overview (AAPL)",
      status: "ERROR",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Generate recommendations
  const recommendations = []
  const passedTests = diagnostics.tests.filter((t) => t.status === "PASS").length
  const totalTests = diagnostics.tests.length

  if (passedTests === 0) {
    recommendations.push("❌ API key appears to be invalid or expired")
    recommendations.push("🔑 Get a new API key from https://www.alphavantage.co/support/#api-key")
  } else if (passedTests < totalTests) {
    const rateLimited = diagnostics.tests.some((t) => t.rateLimited)
    if (rateLimited) {
      recommendations.push("⚠️ API rate limit reached - you may need to upgrade your plan")
      recommendations.push("💰 Consider Alpha Vantage premium for higher limits")
    }
    recommendations.push("⏰ Some functions may be temporarily unavailable")
  } else {
    recommendations.push("✅ API key is working correctly!")
    recommendations.push("🚀 All functions are available")
  }

  return NextResponse.json({
    ...diagnostics,
    summary: {
      passedTests,
      totalTests,
      successRate: `${Math.round((passedTests / totalTests) * 100)}%`,
    },
    recommendations,
  })
}
