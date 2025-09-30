"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { stockAPI, type StockQuote } from "@/lib/stock-api"
import { Copy, AlertTriangle, CheckCircle } from "lucide-react"

interface MismatchReport {
  field: string
  ourValue: string
  yahooValue: string
  isMatch: boolean
  difference?: string
}

export default function MismatchDetectorPage() {
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
  const [mismatches, setMismatches] = useState<MismatchReport[]>([])

  const fetchOurData = async () => {
    setLoading(true)
    try {
      const quote = await stockAPI.getQuote(symbol)
      setOurData(quote)
      console.log("🔍 Fetched data for analysis:", quote)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const analyzeData = () => {
    if (!ourData) return

    const reports: MismatchReport[] = []

    // Helper function to normalize values for comparison
    const normalizeValue = (value: string | number): string => {
      return String(value)
        .replace(/[^\d.]/g, "")
        .toLowerCase()
    }

    // Helper function to calculate percentage difference
    const calculateDifference = (our: string, yahoo: string): string => {
      const ourNum = Number.parseFloat(normalizeValue(our))
      const yahooNum = Number.parseFloat(normalizeValue(yahoo))

      if (isNaN(ourNum) || isNaN(yahooNum)) return "N/A"

      const diff = ((ourNum - yahooNum) / yahooNum) * 100
      return `${diff > 0 ? "+" : ""}${diff.toFixed(2)}%`
    }

    // Check each field
    if (yahooValues.marketCap) {
      const isMatch = normalizeValue(ourData.marketCap) === normalizeValue(yahooValues.marketCap)
      reports.push({
        field: "Market Cap",
        ourValue: ourData.marketCap,
        yahooValue: yahooValues.marketCap,
        isMatch,
        difference: calculateDifference(ourData.marketCap, yahooValues.marketCap),
      })
    }

    if (yahooValues.volume) {
      const isMatch = normalizeValue(ourData.volume) === normalizeValue(yahooValues.volume)
      reports.push({
        field: "Volume",
        ourValue: ourData.volume,
        yahooValue: yahooValues.volume,
        isMatch,
        difference: calculateDifference(ourData.volume, yahooValues.volume),
      })
    }

    if (yahooValues.pe) {
      const isMatch = normalizeValue(String(ourData.pe)) === normalizeValue(yahooValues.pe)
      reports.push({
        field: "P/E Ratio",
        ourValue: String(ourData.pe),
        yahooValue: yahooValues.pe,
        isMatch,
        difference: calculateDifference(String(ourData.pe), yahooValues.pe),
      })
    }

    if (yahooValues.beta) {
      const isMatch = normalizeValue(String(ourData.beta)) === normalizeValue(yahooValues.beta)
      reports.push({
        field: "Beta",
        ourValue: String(ourData.beta),
        yahooValue: yahooValues.beta,
        isMatch,
        difference: calculateDifference(String(ourData.beta), yahooValues.beta),
      })
    }

    if (yahooValues.dividendYield) {
      const ourDividend = ourData.dividendYield ? `${ourData.dividendYield}%` : "N/A"
      const isMatch = normalizeValue(ourDividend) === normalizeValue(yahooValues.dividendYield)
      reports.push({
        field: "Dividend Yield",
        ourValue: ourDividend,
        yahooValue: yahooValues.dividendYield,
        isMatch,
        difference: ourData.dividendYield ? calculateDifference(ourDividend, yahooValues.dividendYield) : "N/A",
      })
    }

    if (yahooValues.high52Week) {
      const isMatch = normalizeValue(String(ourData.high52Week)) === normalizeValue(yahooValues.high52Week)
      reports.push({
        field: "52W High",
        ourValue: `$${ourData.high52Week}`,
        yahooValue: yahooValues.high52Week.startsWith("$") ? yahooValues.high52Week : `$${yahooValues.high52Week}`,
        isMatch,
        difference: calculateDifference(String(ourData.high52Week), yahooValues.high52Week),
      })
    }

    if (yahooValues.low52Week) {
      const isMatch = normalizeValue(String(ourData.low52Week)) === normalizeValue(yahooValues.low52Week)
      reports.push({
        field: "52W Low",
        ourValue: `$${ourData.low52Week}`,
        yahooValue: yahooValues.low52Week.startsWith("$") ? yahooValues.low52Week : `$${yahooValues.low52Week}`,
        isMatch,
        difference: calculateDifference(String(ourData.low52Week), yahooValues.low52Week),
      })
    }

    setMismatches(reports)
    console.log("🔍 Mismatch Analysis:", reports)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const generateFixCode = () => {
    const fixes = mismatches
      .filter((m) => !m.isMatch)
      .map((m) => `${m.field}: "${m.yahooValue}"`)
      .join(",\n        ")

    return `// Fix for ${symbol}:
{
  symbol: "${symbol}",
  ${fixes}
}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Mismatch Detector</h1>
          <p className="text-gray-600">Identify exactly which values don't match Yahoo Finance</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step 1: Get Our Data</CardTitle>
            <CardDescription>Fetch data from our API first</CardDescription>
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
                {loading ? "Fetching..." : "Get Our Data"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {ourData && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Step 2: Enter Yahoo Finance Values
                  <Badge variant="outline">{ourData.lastUpdated.includes("LIVE") ? "Live Data" : "Demo Data"}</Badge>
                </CardTitle>
                <CardDescription>
                  Go to Yahoo Finance, search for {symbol}, and enter the exact values you see
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Copy values EXACTLY as shown on Yahoo Finance (including $ signs, commas, etc.)
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="yahoo-marketcap">Market Cap (e.g., $3.729T)</Label>
                      <Input
                        id="yahoo-marketcap"
                        value={yahooValues.marketCap}
                        onChange={(e) => setYahooValues((prev) => ({ ...prev, marketCap: e.target.value }))}
                        placeholder="$3.729T"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yahoo-volume">Volume (e.g., 37.05M)</Label>
                      <Input
                        id="yahoo-volume"
                        value={yahooValues.volume}
                        onChange={(e) => setYahooValues((prev) => ({ ...prev, volume: e.target.value }))}
                        placeholder="37.05M"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yahoo-pe">P/E Ratio (e.g., 36.29)</Label>
                      <Input
                        id="yahoo-pe"
                        value={yahooValues.pe}
                        onChange={(e) => setYahooValues((prev) => ({ ...prev, pe: e.target.value }))}
                        placeholder="36.29"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="yahoo-beta">Beta (e.g., 1.24)</Label>
                      <Input
                        id="yahoo-beta"
                        value={yahooValues.beta}
                        onChange={(e) => setYahooValues((prev) => ({ ...prev, beta: e.target.value }))}
                        placeholder="1.24"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yahoo-dividend">Dividend Yield (e.g., 0.40%)</Label>
                      <Input
                        id="yahoo-dividend"
                        value={yahooValues.dividendYield}
                        onChange={(e) => setYahooValues((prev) => ({ ...prev, dividendYield: e.target.value }))}
                        placeholder="0.40%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yahoo-high52">52W High (e.g., 237.49)</Label>
                      <Input
                        id="yahoo-high52"
                        value={yahooValues.high52Week}
                        onChange={(e) => setYahooValues((prev) => ({ ...prev, high52Week: e.target.value }))}
                        placeholder="237.49"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={analyzeData} className="w-full" disabled={!ourData}>
                  Analyze Mismatches
                </Button>
              </CardContent>
            </Card>

            {/* Our Current Data Display */}
            <Card>
              <CardHeader>
                <CardTitle>Our Current Data for {symbol}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Market Cap:</span>
                      <span className="font-mono">{ourData.marketCap}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Volume:</span>
                      <span className="font-mono">{ourData.volume}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>P/E Ratio:</span>
                      <span className="font-mono">{ourData.pe}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Beta:</span>
                      <span className="font-mono">{ourData.beta}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Dividend Yield:</span>
                      <span className="font-mono">{ourData.dividendYield ? `${ourData.dividendYield}%` : "N/A"}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>52W High:</span>
                      <span className="font-mono">${ourData.high52Week}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Mismatch Results */}
        {mismatches.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Step 3: Mismatch Analysis Results
                <Badge variant={mismatches.some((m) => !m.isMatch) ? "destructive" : "default"}>
                  {mismatches.filter((m) => !m.isMatch).length} Mismatches
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mismatches.map((mismatch, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    mismatch.isMatch ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {mismatch.isMatch ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-medium">{mismatch.field}</span>
                    {mismatch.difference && mismatch.difference !== "N/A" && (
                      <Badge variant="outline" className="text-xs">
                        {mismatch.difference} diff
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Our Value:</span>
                      <div className="font-mono bg-white p-2 rounded border">{mismatch.ourValue}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Yahoo Value:</span>
                      <div className="font-mono bg-white p-2 rounded border">{mismatch.yahooValue}</div>
                    </div>
                  </div>
                </div>
              ))}

              {mismatches.some((m) => !m.isMatch) && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Generated Fix Code:</h4>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                    <code>{generateFixCode()}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => copyToClipboard(generateFixCode())}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Fix Code
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>1.</strong> Click "Get Our Data" to fetch current API data
            </p>
            <p>
              <strong>2.</strong> Go to Yahoo Finance and search for the same stock
            </p>
            <p>
              <strong>3.</strong> Copy the EXACT values (including formatting) into the form above
            </p>
            <p>
              <strong>4.</strong> Click "Analyze Mismatches" to see detailed comparison
            </p>
            <p>
              <strong>5.</strong> Red boxes show mismatches with percentage differences
            </p>
            <p>
              <strong>6.</strong> Use the generated fix code to update our reference data
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
