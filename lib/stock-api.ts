// Stock API service for fetching real-time data from Yahoo Finance
import { stockSearch } from "./stock-database"

export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  marketCap: string
  volume: string
  beta: number
  pe: number
  sector: string
  high52Week: number
  low52Week: number
  dividendYield?: number
  lastUpdated: string
  // Add real-time fields
  open: number
  high: number
  low: number
  previousClose: number
  marketStatus: "open" | "closed" | "pre-market" | "after-hours"
  currency: string
  exchange: string
}

export interface SearchResult {
  symbol: string
  name: string
  type: string
  region: string
  marketOpen: string
  marketClose: string
  timezone: string
  currency: string
  matchScore: string
  sector?: string
  industry?: string
  keywords?: string[]
}

class StockAPIService {
  // Enhanced search using local database with fuzzy matching
  async searchStocks(query: string): Promise<SearchResult[]> {
    try {
      console.log(`🔍 Searching US stocks for: "${query}"`)

      // Use local fuzzy search for instant results
      const localResults = stockSearch.search(query, 20)

      if (localResults.length > 0) {
        console.log(`✅ Found ${localResults.length} local matches for "${query}"`)

        return localResults.map((stock) => ({
          symbol: stock.symbol,
          name: stock.name,
          type: stock.type,
          region: "United States",
          marketOpen: "09:30",
          marketClose: "16:00",
          timezone: "UTC-05",
          currency: "USD",
          matchScore: stock.matchScore.toFixed(4),
          sector: stock.sector,
          industry: stock.industry,
          keywords: stock.keywords,
        }))
      }

      // If no local results, try Yahoo Finance search
      console.log(`🌐 Searching Yahoo Finance for: "${query}"`)
      const yahooResults = await this.searchYahooFinance(query)

      if (yahooResults.length > 0) {
        console.log(`✅ Found ${yahooResults.length} Yahoo Finance results for "${query}"`)
        return yahooResults
      }

      console.log(`⚠️ No results found for "${query}"`)
      return []
    } catch (error) {
      console.error("❌ Stock search error:", error)
      // Fallback to local search only
      const localResults = stockSearch.search(query, 10)
      return localResults.map((stock) => ({
        symbol: stock.symbol,
        name: stock.name,
        type: stock.type,
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-05",
        currency: "USD",
        matchScore: stock.matchScore.toFixed(4),
        sector: stock.sector,
        industry: stock.industry,
        keywords: stock.keywords,
      }))
    }
  }

  // Yahoo Finance search functionality
  private async searchYahooFinance(query: string): Promise<SearchResult[]> {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&lang=en-US&region=US&quotesCount=15&newsCount=0`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; FinancialApp/1.0)",
            Accept: "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Yahoo Finance search failed: ${response.status}`)
      }

      const data = await response.json()
      const quotes = data.quotes || []

      // Filter for US stocks and ETFs only
      const usResults = quotes.filter(
        (quote: any) =>
          quote.exchange &&
          (quote.exchange.includes("NAS") || quote.exchange.includes("NYS") || quote.exchange.includes("PCX")) &&
          quote.symbol &&
          !quote.symbol.includes("="), // Exclude currency pairs
      )

      return usResults.map((quote: any) => ({
        symbol: quote.symbol,
        name: quote.shortname || quote.longname || `${quote.symbol} Fund`,
        type: quote.quoteType || "EQUITY",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-05",
        currency: "USD",
        matchScore: "1.0000",
        sector: this.determineSectorFromSymbol(quote.symbol),
        industry: quote.industry,
      }))
    } catch (error) {
      console.error("❌ Yahoo Finance search error:", error)
      return []
    }
  }

  // Yahoo Finance quote fetching (primary and only provider)
  async getQuote(symbol: string): Promise<StockQuote | null> {
    try {
      const quote = await this.fetchFromYahoo(symbol)
      return quote ?? this.getMockQuote(symbol)
    } catch (err) {
      console.error(`💥 getQuote error (${symbol}):`, err)
      const mock = this.getMockQuote(symbol)
      mock.lastUpdated = `❌ Error → Demo Data ${new Date().toLocaleDateString()}`
      return mock
    }
  }

  // Yahoo Finance data fetching (comprehensive and reliable)
  private async fetchFromYahoo(symbol: string): Promise<StockQuote | null> {
    // 1️⃣  primary: /v7/finance/quote
    try {
      const res = await this.yfRequest(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`)
      const quote = res.quoteResponse?.result?.[0]
      if (quote) return this.buildQuoteFromYahoo(quote)
      console.warn(`⛔ /v7 returned empty for ${symbol}`)
    } catch (e) {
      console.warn(`⚠️ /v7 failed (${symbol}):`, (e as Error).message)
    }

    // 2️⃣  fallback: /v10/finance/quoteSummary
    try {
      const quote = await this.fetchFromYahooSummary(symbol)
      return this.buildQuoteFromYahoo(quote)
    } catch (e) {
      console.warn(`⚠️ /v10 failed (${symbol}):`, (e as Error).message)
    }

    // 3️⃣  last-resort: /v8/finance/chart
    try {
      const quote = await this.fetchFromYahooChart(symbol)
      return this.buildQuoteFromYahoo(quote)
    } catch (e) {
      console.warn(`⚠️ All Yahoo endpoints failed for ${symbol}:`, e)
      return null
    }
  }

  // ————————————————— HELPERS —————————————————
  private async yfRequest(url: string) {
    // Abort if the request takes longer than 5 seconds – common in preview sandboxes
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; FinancialApp/1.0)",
          Accept: "application/json",
        },
        signal: controller.signal,
      })

      if (!res.ok) {
        console.warn(`⚠️ Yahoo request failed (${res.status}) → ${url}`)
        return null
      }

      return (await res.json()) as any
    } catch (err) {
      // Swallow network problems so callers can gracefully fall back to mock data
      console.warn(`⚠️ Yahoo fetch error for ${url}:`, (err as Error).message)
      return null
    } finally {
      clearTimeout(timeoutId)
    }
  }

  // /v10  quoteSummary (same as previous version, just uses yfRequest)
  private async fetchFromYahooSummary(symbol: string) {
    const j = await this.yfRequest(
      `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=price,summaryDetail,defaultKeyStatistics`,
    )
    const p = j?.quoteSummary?.result?.[0]
    if (!p?.price?.regularMarketPrice?.raw) throw new Error("no price")
    const price = p.price
    const detail = p.summaryDetail ?? {}
    const stats = p.defaultKeyStatistics ?? {}
    return {
      symbol: price.symbol,
      shortName: price.shortName,
      longName: price.longName,
      currency: price.currency,
      fullExchangeName: price.exchangeName,
      regularMarketPrice: price.regularMarketPrice.raw,
      regularMarketChange: price.regularMarketChange.raw,
      regularMarketChangePercent: price.regularMarketChangePercent.raw,
      regularMarketOpen: price.regularMarketOpen?.raw,
      regularMarketDayHigh: price.regularMarketDayHigh?.raw,
      regularMarketDayLow: price.regularMarketDayLow?.raw,
      regularMarketPreviousClose: price.regularMarketPreviousClose?.raw,
      regularMarketVolume: price.regularMarketVolume?.raw,
      marketCap: price.marketCap?.raw ?? detail.marketCap?.raw,
      beta: stats.beta?.raw,
      trailingPE: stats.trailingPE?.raw,
      forwardPE: stats.forwardPE?.raw,
      fiftyTwoWeekHigh: detail.fiftyTwoWeekHigh?.raw,
      fiftyTwoWeekLow: detail.fiftyTwoWeekLow?.raw,
      trailingAnnualDividendYield: detail.trailingAnnualDividendYield?.raw,
      quoteType: price.quoteType,
      sector: undefined,
    }
  }

  // /v8 chart endpoint (never 401)
  private async fetchFromYahooChart(symbol: string) {
    const j = await this.yfRequest(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=1d`)
    const meta = j.chart?.result?.[0]?.meta
    if (!meta?.regularMarketPrice) throw new Error("no price in chart meta")
    return {
      symbol: meta.symbol,
      shortName: meta.symbol,
      longName: meta.symbol,
      currency: meta.currency,
      fullExchangeName: meta.exchangeName,
      regularMarketPrice: meta.regularMarketPrice,
      regularMarketChange: meta.regularMarketPrice - meta.previousClose,
      regularMarketChangePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
      regularMarketOpen: meta.chartPreviousClose,
      regularMarketDayHigh: meta.regularMarketDayHigh ?? meta.regularMarketPrice,
      regularMarketDayLow: meta.regularMarketDayLow ?? meta.regularMarketPrice,
      regularMarketPreviousClose: meta.previousClose,
      regularMarketVolume: j.chart.result?.[0]?.indicators?.quote?.[0]?.volume?.[0] ?? 0,
      marketCap: undefined,
      beta: undefined,
      trailingPE: undefined,
      forwardPE: undefined,
      fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: meta.fiftyTwoWeekLow,
      trailingAnnualDividendYield: undefined,
      quoteType: "ETF",
      sector: undefined,
    }
  }

  // Converts a raw Yahoo object (from /v7 or /v10) to our StockQuote model
  private buildQuoteFromYahoo(quote: any): StockQuote {
    const price = Number(quote.regularMarketPrice || 0)
    const change = Number(quote.regularMarketChange || 0)
    const changePct = Number(quote.regularMarketChangePercent || 0)
    const open = Number(quote.regularMarketOpen ?? price)
    const high = Number(quote.regularMarketDayHigh ?? price)
    const low = Number(quote.regularMarketDayLow ?? price)
    const prevClose = Number(quote.regularMarketPreviousClose ?? price)
    const volume = quote.regularMarketVolume ?? 0

    const marketStatus = this.getMarketStatus()

    return {
      symbol: quote.symbol,
      name: quote.shortName || quote.longName || `${quote.symbol} Fund`,
      price,
      change,
      changePercent: changePct,
      open,
      high,
      low,
      previousClose: prevClose,
      marketCap: this.formatMarketCap(quote.marketCap),
      volume: this.formatVolume(volume),
      beta: Number(quote.beta) || 1.0,
      pe: Number(quote.trailingPE || quote.forwardPE) || 20,
      sector: quote.sector || this.determineSectorFromSymbol(quote.symbol),
      high52Week: Number(quote.fiftyTwoWeekHigh) || price * 1.3,
      low52Week: Number(quote.fiftyTwoWeekLow) || price * 0.7,
      dividendYield: quote.trailingAnnualDividendYield ? Number(quote.trailingAnnualDividendYield) * 100 : undefined,
      lastUpdated: `✅ Yahoo Finance LIVE: ${new Date().toLocaleString()}`,
      marketStatus,
      currency: quote.currency || "USD",
      exchange: quote.fullExchangeName || quote.exchange || this.getExchangeForSymbol(quote.symbol),
    }
  }

  // Get multiple quotes at once with Yahoo Finance batch processing
  async getMultipleQuotes(symbols: string[]): Promise<StockQuote[]> {
    console.log(`📊 Fetching multiple quotes for: ${symbols.join(", ")}`)

    // Batch request to Yahoo Finance for optimal performance
    try {
      const batchSymbols = symbols.join(",")
      const response = await fetch(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(batchSymbols)}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; FinancialApp/1.0)",
            Accept: "application/json",
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        const quotes = data.quoteResponse?.result || []

        const processedQuotes = quotes
          .map((quote: any) => {
            const price = Number(quote.regularMarketPrice || quote.price || 0)
            const change = Number(quote.regularMarketChange || 0)
            const changePercent = Number(quote.regularMarketChangePercent || 0)

            if (isNaN(price) || price <= 0) return null

            return {
              symbol: quote.symbol,
              name: quote.shortName || quote.longName || `${quote.symbol} Fund`,
              price,
              change,
              changePercent,
              open: Number(quote.regularMarketOpen || price),
              high: Number(quote.regularMarketDayHigh || price),
              low: Number(quote.regularMarketDayLow || price),
              previousClose: Number(quote.regularMarketPreviousClose || price),
              marketCap: this.formatMarketCap(quote.marketCap),
              volume: this.formatVolume(quote.regularMarketVolume || 0),
              beta: Number(quote.beta) || 1.0,
              pe: Number(quote.trailingPE || quote.forwardPE) || 20,
              sector: quote.sector || this.determineSectorFromSymbol(quote.symbol),
              high52Week: Number(quote.fiftyTwoWeekHigh) || price * 1.3,
              low52Week: Number(quote.fiftyTwoWeekLow) || price * 0.7,
              dividendYield: quote.trailingAnnualDividendYield
                ? Number(quote.trailingAnnualDividendYield) * 100
                : undefined,
              lastUpdated: `✅ Yahoo Finance BATCH: ${new Date().toLocaleString()}`,
              marketStatus: this.getMarketStatus(),
              currency: quote.currency || "USD",
              exchange: quote.fullExchangeName || quote.exchange || this.getExchangeForSymbol(quote.symbol),
            } as StockQuote
          })
          .filter(Boolean)

        console.log(
          `✅ Successfully fetched ${processedQuotes.length}/${symbols.length} quotes via Yahoo Finance batch`,
        )
        return processedQuotes
      }
    } catch (error) {
      console.warn("⚠️ Yahoo Finance batch request failed, falling back to individual requests:", error)
    }

    // Fallback to individual requests
    const quotes = await Promise.all(symbols.map((symbol) => this.getQuote(symbol)))
    const validQuotes = quotes.filter((quote) => quote !== null) as StockQuote[]
    console.log(`✅ Successfully fetched ${validQuotes.length}/${symbols.length} quotes individually`)
    return validQuotes
  }

  // Determine sector from symbol patterns (enhanced for ETFs and funds)
  private determineSectorFromSymbol(symbol: string): string {
    // Broad Market ETFs
    if (["VTI", "ITOT", "SPTM", "VT", "VXUS"].includes(symbol)) return "ETF - Broad Market"

    // Bond ETFs
    if (["BND", "AGG", "VGIT", "VGLT", "TLT", "SHY", "IEF"].includes(symbol)) return "ETF - Bonds"

    // Real Estate ETFs
    if (["VNQ", "REIT", "IYR", "SCHH", "RWR"].includes(symbol)) return "ETF - Real Estate"

    // Technology ETFs
    if (["VGT", "QQQ", "XLK", "FTEC", "IYW"].includes(symbol)) return "ETF - Technology"

    // Healthcare ETFs
    if (["VHT", "XLV", "IYH", "FHLC"].includes(symbol)) return "ETF - Healthcare"

    // Financial ETFs
    if (["VFH", "XLF", "IYF", "FNCL"].includes(symbol)) return "ETF - Financials"

    // Energy ETFs
    if (["VDE", "XLE", "IYE", "FENY"].includes(symbol)) return "ETF - Energy"

    // Dividend ETFs
    if (["SCHD", "VYM", "DVY", "NOBL", "VIG"].includes(symbol)) return "ETF - Dividend"

    // International ETFs
    if (["VXUS", "VTIAX", "FTIHX", "VEA", "VWO"].includes(symbol)) return "ETF - International"

    // Individual stocks by sector
    if (["AAPL", "MSFT", "GOOGL", "GOOG", "META", "NVDA", "TSLA", "NFLX", "ADBE", "CRM"].includes(symbol))
      return "Technology"
    if (["JPM", "BAC", "WFC", "GS", "MS", "C", "USB", "PNC"].includes(symbol)) return "Financials"
    if (["JNJ", "PFE", "UNH", "ABBV", "MRK", "TMO", "ABT", "LLY"].includes(symbol)) return "Healthcare"
    if (["XOM", "CVX", "COP", "EOG", "SLB", "MPC", "PSX"].includes(symbol)) return "Energy"
    if (["WMT", "HD", "PG", "KO", "PEP", "COST", "TGT"].includes(symbol)) return "Consumer"

    return "Unknown"
  }

  // Get exchange for symbol
  private getExchangeForSymbol(symbol: string): string {
    const nasdaqSymbols = ["AAPL", "MSFT", "GOOGL", "GOOG", "AMZN", "TSLA", "META", "NVDA", "NFLX", "ADBE", "QQQ"]
    const nyseSymbols = ["JPM", "JNJ", "V", "PG", "HD", "MA", "DIS", "WMT", "BAC", "XOM", "VTI", "BND", "VNQ"]

    if (nasdaqSymbols.includes(symbol)) return "NASDAQ"
    if (nyseSymbols.includes(symbol)) return "NYSE"

    // General rules
    if (symbol.length <= 3) return "NYSE"
    if (symbol.length === 4) return "NASDAQ"
    if (symbol.includes(".")) return "OTC"

    return "NASDAQ"
  }

  // Format market cap for display
  private formatMarketCap(marketCap: string | number): string {
    if (!marketCap) return "N/A"

    const value = typeof marketCap === "string" ? Number.parseFloat(marketCap) : marketCap
    if (isNaN(value)) return "N/A"

    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(3)}T`
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`
    }
    return `$${value.toLocaleString()}`
  }

  // Format volume for display
  private formatVolume(volume: string | number): string {
    if (!volume) return "N/A"

    const value = typeof volume === "string" ? Number.parseFloat(volume) : volume
    if (isNaN(value)) return "N/A"

    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`
    }
    return value.toLocaleString()
  }

  // Determine current market status
  private getMarketStatus(): "open" | "closed" | "pre-market" | "after-hours" {
    const now = new Date()
    const easternTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }))
    const hour = easternTime.getHours()
    const minute = easternTime.getMinutes()
    const dayOfWeek = easternTime.getDay()

    // Weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return "closed"
    }

    // Market hours: 9:30 AM - 4:00 PM ET
    const marketOpen = 9 * 60 + 30 // 9:30 AM in minutes
    const marketClose = 16 * 60 // 4:00 PM in minutes
    const currentMinutes = hour * 60 + minute

    if (currentMinutes >= marketOpen && currentMinutes < marketClose) {
      return "open"
    } else if (currentMinutes >= 4 * 60 && currentMinutes < marketOpen) {
      return "pre-market"
    } else if (currentMinutes >= marketClose && currentMinutes < 20 * 60) {
      return "after-hours"
    } else {
      return "closed"
    }
  }

  // Mock data fallback when Yahoo Finance is unavailable
  private getMockQuote(symbol: string): StockQuote {
    const mockData = this.getKnownStockData(symbol)

    return {
      symbol,
      name: mockData.name,
      price: mockData.basePrice + (Math.random() - 0.5) * 20,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      open: mockData.basePrice + (Math.random() - 0.5) * 15,
      high: mockData.basePrice + Math.random() * 25,
      low: mockData.basePrice - Math.random() * 25,
      previousClose: mockData.basePrice + (Math.random() - 0.5) * 10,
      marketCap: mockData.marketCap,
      volume: mockData.volume,
      beta: mockData.beta,
      pe: mockData.pe,
      sector: mockData.sector,
      high52Week: mockData.high52Week,
      low52Week: mockData.low52Week,
      dividendYield: mockData.dividendYield,
      lastUpdated: `⚠️ DEMO DATA - ${new Date().toISOString().split("T")[0]}`,
      marketStatus: this.getMarketStatus(),
      currency: "USD",
      exchange: mockData.exchange,
    }
  }

  // Known stock data for mock fallback
  private getKnownStockData(symbol: string) {
    const stockData: { [key: string]: any } = {
      VTI: {
        name: "Vanguard Total Stock Market ETF",
        basePrice: 280,
        marketCap: "$1.5T",
        volume: "3.2M",
        beta: 1.0,
        pe: 25,
        sector: "ETF - Broad Market",
        high52Week: 295,
        low52Week: 220,
        dividendYield: 1.3,
        exchange: "NYSE",
      },
      VXUS: {
        name: "Vanguard Total International Stock ETF",
        basePrice: 65,
        marketCap: "$450B",
        volume: "2.1M",
        beta: 0.85,
        pe: 15,
        sector: "ETF - International",
        high52Week: 70,
        low52Week: 55,
        dividendYield: 2.8,
        exchange: "NASDAQ",
      },
      BND: {
        name: "Vanguard Total Bond Market ETF",
        basePrice: 75,
        marketCap: "$300B",
        volume: "5.8M",
        beta: 0.1,
        pe: 0,
        sector: "ETF - Bonds",
        high52Week: 78,
        low52Week: 72,
        dividendYield: 3.5,
        exchange: "NASDAQ",
      },
      AAPL: {
        name: "Apple Inc.",
        basePrice: 230,
        marketCap: "$3.5T",
        volume: "45M",
        beta: 1.2,
        pe: 30,
        sector: "Technology",
        high52Week: 250,
        low52Week: 180,
        dividendYield: 0.5,
        exchange: "NASDAQ",
      },
    }

    return (
      stockData[symbol] || {
        name: `${symbol} Inc.`,
        basePrice: 100,
        marketCap: "$50B",
        volume: "10M",
        beta: 1.0,
        pe: 20,
        sector: "Unknown",
        high52Week: 120,
        low52Week: 80,
        dividendYield: undefined,
        exchange: "NYSE",
      }
    )
  }
}

export const stockAPI = new StockAPIService()
