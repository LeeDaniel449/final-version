"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { stockAPI, type StockQuote } from "@/lib/stock-api"

export default function YahooComparisonPage() {
  const [symbol, setSymbol] = useState("AAPL")
  const [ourData, setOurData] = useState<StockQuote | null>(null)
  const [loading, setLoading] = useState(false)
  const [yahooValues, setYahooValues] = useState({
    marketCap: "",
    volume: "",
    pe: "",
    beta: "",
    dividendYield: "",
    high52Week: "",
    low52Week: "",
  })

  const fetchOurData = async () => {
    setLoading(true)
    try {
      const quote = await stockAPI.getQuote(symbol)
      setOurData(quote)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const currentYahooValues = {
    AAPL: {
      marketCap: "$3.729T", // Updated Dec 2024
      volume: "37.05M",
      pe: "36.29",
      beta: "1.24",
      dividendYield: "0.40%",
      high52Week: "237.49",
      low52Week: "164.08",
    },
    GOOGL: {
      marketCap: "$2.238T", // Updated Dec 2024
      volume: "20.84M",
      pe: "22.85",
      beta: "1.05",
      dividendYield: "N/A",
      high52Week: "193.31",
      low52Week: "129.40",
    },
    MSFT: {
      marketCap: "$3.184T", // Updated Dec 2024
      volume: "19.32M",
      pe: "34.33",
      beta: "0.90",
      dividendYield: "0.62%",
      high52Week: "468.35",
      low52Week: "362.90",
    },
    TSLA: {
      marketCap: "$1.354T", // Updated Dec 2024
      volume: "89.05M",
      pe: "111.05",
      beta: "2.29",
      dividendYield: "N/A",
      high52Week: "488.54",
      low52Week: "138.80",
    },
    NVDA: {
      marketCap: "$3.463T", // Updated Dec 2024
      volume: "208.45M",
      pe: "53.97",
      beta: "1.68",
      dividendYield: "0.03%",
      high52Week: "152.89",
      low52Week: "39.23",
    },
  }

  const getYahooReference = (symbol: string) => {
    return currentYahooValues[symbol as keyof typeof currentYahooValues] || null
  }

  const compareValues = (ourValue: string | number, yahooValue: string) => {
    const ourStr = String(ourValue)
    const isMatch = ourStr === yahooValue || ourStr.replace(/[^\d.]/g, "") === yahooValue.replace(/[^\d.]/g, "")
    return isMatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Yahoo Finance Data Comparison</h1>
          <p className="text-gray-600">Compare our API data with Yahoo Finance values</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test Stock Data</CardTitle>
            <CardDescription>Enter a stock symbol to compare data sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="symbol">Stock Symbol</Label>
                <Input
                  id="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="AAPL"
                />
              </div>
              <Button onClick={fetchOurData} disabled={loading}>
                {loading ? "Fetching..." : "Get Data"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {ourData && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Our Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Our API Data
                  <Badge variant="outline">{ourData.lastUpdated.includes("LIVE") ? "Live" : "Demo"}</Badge>
                </CardTitle>
                <CardDescription>{ourData.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Price:</span>
                    <div className="text-lg font-bold">${ourData.price.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="font-medium">Change:</span>
                    <div className={`text-lg font-bold ${ourData.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {ourData.change >= 0 ? "+" : ""}
                      {ourData.change.toFixed(2)} ({ourData.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Market Cap:</span>
                    <span className="font-medium">{ourData.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume:</span>
                    <span className="font-medium">{ourData.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>P/E Ratio:</span>
                    <span className="font-medium">{ourData.pe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Beta:</span>
                    <span className="font-medium">{ourData.beta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dividend Yield:</span>
                    <span className="font-medium">{ourData.dividendYield ? `${ourData.dividendYield}%` : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>52W High:</span>
                    <span className="font-medium">${ourData.high52Week}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>52W Low:</span>
                    <span className="font-medium">${ourData.low52Week}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yahoo Finance Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Yahoo Finance Reference
                  <Badge variant="secondary">Manual Entry</Badge>
                </CardTitle>
                <CardDescription>Enter current Yahoo Finance values for comparison</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="yahoo-marketcap">Market Cap</Label>
                    <Input
                      id="yahoo-marketcap"
                      value={yahooValues.marketCap}
                      onChange={(e) => setYahooValues((prev) => ({ ...prev, marketCap: e.target.value }))}
                      placeholder="$3.04T"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yahoo-volume">Volume</Label>
                    <Input
                      id="yahoo-volume"
                      value={yahooValues.volume}
                      onChange={(e) => setYahooValues((prev) => ({ ...prev, volume: e.target.value }))}
                      placeholder="47.89M"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yahoo-pe">P/E Ratio</Label>
                    <Input
                      id="yahoo-pe"
                      value={yahooValues.pe}
                      onChange={(e) => setYahooValues((prev) => ({ ...prev, pe: e.target.value }))}
                      placeholder="29.85"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yahoo-beta">Beta</Label>
                    <Input
                      id="yahoo-beta"
                      value={yahooValues.beta}
                      onChange={(e) => setYahooValues((prev) => ({ ...prev, beta: e.target.value }))}
                      placeholder="1.25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yahoo-dividend">Dividend Yield</Label>
                    <Input
                      id="yahoo-dividend"
                      value={yahooValues.dividendYield}
                      onChange={(e) => setYahooValues((prev) => ({ ...prev, dividendYield: e.target.value }))}
                      placeholder="0.44%"
                    />
                  </div>
                </div>

                {/* Quick Fill Buttons */}
                <div className="space-y-2">
                  <Label>Quick Fill (Current Yahoo Values):</Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(currentYahooValues).map((stockSymbol) => (
                      <Button
                        key={stockSymbol}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const values = getYahooReference(stockSymbol)
                          if (values) {
                            setYahooValues({
                              marketCap: values.marketCap,
                              volume: values.volume,
                              pe: values.pe,
                              beta: values.beta,
                              dividendYield: values.dividendYield,
                              high52Week: values.high52Week,
                              low52Week: values.low52Week,
                            })
                            setSymbol(stockSymbol)
                          }
                        }}
                      >
                        {stockSymbol}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comparison Results */}
        {ourData && (yahooValues.marketCap || yahooValues.volume || yahooValues.pe) && (
          <Card>
            <CardHeader>
              <CardTitle>Comparison Results</CardTitle>
              <CardDescription>Red = Mismatch, Green = Match</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {yahooValues.marketCap && (
                    <div
                      className={`p-2 rounded ${compareValues(ourData.marketCap, yahooValues.marketCap) ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className="font-medium">Market Cap</div>
                      <div className="text-sm">Our: {ourData.marketCap}</div>
                      <div className="text-sm">Yahoo: {yahooValues.marketCap}</div>
                    </div>
                  )}
                  {yahooValues.volume && (
                    <div
                      className={`p-2 rounded ${compareValues(ourData.volume, yahooValues.volume) ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className="font-medium">Volume</div>
                      <div className="text-sm">Our: {ourData.volume}</div>
                      <div className="text-sm">Yahoo: {yahooValues.volume}</div>
                    </div>
                  )}
                  {yahooValues.pe && (
                    <div
                      className={`p-2 rounded ${compareValues(ourData.pe, yahooValues.pe) ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className="font-medium">P/E Ratio</div>
                      <div className="text-sm">Our: {ourData.pe}</div>
                      <div className="text-sm">Yahoo: {yahooValues.pe}</div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {yahooValues.beta && (
                    <div
                      className={`p-2 rounded ${compareValues(ourData.beta, yahooValues.beta) ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className="font-medium">Beta</div>
                      <div className="text-sm">Our: {ourData.beta}</div>
                      <div className="text-sm">Yahoo: {yahooValues.beta}</div>
                    </div>
                  )}
                  {yahooValues.dividendYield && (
                    <div
                      className={`p-2 rounded ${compareValues(ourData.dividendYield ? `${ourData.dividendYield}%` : "N/A", yahooValues.dividendYield) ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className="font-medium">Dividend Yield</div>
                      <div className="text-sm">Our: {ourData.dividendYield ? `${ourData.dividendYield}%` : "N/A"}</div>
                      <div className="text-sm">Yahoo: {yahooValues.dividendYield}</div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              1. <strong>Go to Yahoo Finance</strong> and search for a stock (e.g., AAPL)
            </p>
            <p>
              2. <strong>Copy the exact values</strong> you see for Market Cap, Volume, P/E Ratio, etc.
            </p>
            <p>
              3. <strong>Enter those values</strong> in the Yahoo Finance Reference section
            </p>
            <p>
              4. <strong>Click "Get Data"</strong> to fetch our API data
            </p>
            <p>
              5. <strong>Compare the results</strong> - mismatches will be highlighted in red
            </p>
            <p>
              6. <strong>Use Quick Fill buttons</strong> for common stocks with pre-filled Yahoo values
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
