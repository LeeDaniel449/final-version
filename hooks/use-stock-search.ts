"use client"

import { useState, useCallback } from "react"
import type { StockQuote, SearchResult } from "@/lib/stock-api"

/**
 * Search stocks (symbol / company) and fetch live Alpha Vantage quotes.
 * All helpers accept / return plain strings so callers can just pass a symbol.
 */
function useStockSearch() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [stockQuotes, setStockQuotes] = useState<StockQuote[]>([])
  const [error, setError] = useState<string | null>(null)

  /* ───────────────────────── SEARCH  ───────────────────────── */
  const searchStocks = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(query)}`)
      const json = await res.json()

      if (!res.ok) throw new Error(json.error || "Search failed")
      setSearchResults(json.data as SearchResult[])
    } catch (e) {
      console.error("searchStocks:", e)
      setError(e instanceof Error ? e.message : "Search failed")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  /* ──────────────────────── QUOTE HELPERS  ─────────────────── */
  const getStockQuote = useCallback(async (symbol: string): Promise<StockQuote | null> => {
    try {
      const res = await fetch(`/api/stocks/quote?symbol=${encodeURIComponent(symbol)}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Quote failed")
      // Ensure lastUpdated is always a string
      return {
        ...json.data,
        lastUpdated: json.data?.lastUpdated || new Date().toISOString().split("T")[0],
      } as StockQuote
    } catch (e) {
      console.error("getStockQuote:", e)
      return null
    }
  }, [])

  const addStockQuote = useCallback(
    async (symbol: string) => {
      const existing = stockQuotes.find((q) => q.symbol === symbol)
      if (existing) return existing

      const quote = await getStockQuote(symbol)
      if (quote) setStockQuotes((prev) => [...prev, quote])
      return quote
    },
    [getStockQuote, stockQuotes],
  )

  const removeStockQuote = useCallback((symbol: string) => {
    setStockQuotes((prev) => prev.filter((q) => q.symbol !== symbol))
  }, [])

  const clearSearch = useCallback(() => {
    setSearchResults([])
    setStockQuotes([])
    setError(null)
  }, [])

  return {
    /* state */
    isSearching,
    searchResults,
    stockQuotes,
    error,
    /* actions */
    searchStocks,
    addStockQuote,
    removeStockQuote,
    getStockQuote,
    clearSearch,
  }
}

export { useStockSearch } // named export
export default useStockSearch
