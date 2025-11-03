"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Key, ExternalLink } from "lucide-react"

interface DiagnosticResult {
  timestamp: string
  apiKey: {
    exists: boolean
    length: number
    preview: string
    isDemo: boolean
  }
  tests: Array<{
    name: string
    status: "PASS" | "FAIL" | "ERROR"
    httpStatus?: number
    response?: any
    error?: string
    rateLimited?: boolean
    errorMessage?: string
  }>
  summary?: {
    passedTests: number
    totalTests: number
    successRate: string
  }
  recommendations?: string[]
  error?: string
  recommendation?: string
}

export default function APIDiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult | null>(null)
  const [loading, setLoading] = useState(false)

  const runDiagnostics = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-alpha-vantage")
      const data = await response.json()
      setDiagnostics(data)
    } catch (error) {
      setDiagnostics({
        timestamp: new Date().toISOString(),
        apiKey: { exists: false, length: 0, preview: "Error", isDemo: false },
        tests: [],
        error: "Failed to run diagnostics",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PASS":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "FAIL":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "ERROR":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PASS":
        return "bg-green-100 text-green-800"
      case "FAIL":
        return "bg-red-100 text-red-800"
      case "ERROR":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Key className="w-8 h-8 text-brand-blue" />
              Alpha Vantage API Diagnostics
            </h1>
            <p className="text-gray-600">Verify your API key configuration and permissions</p>
          </div>
          <Button
            onClick={runDiagnostics}
            disabled={loading}
            className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Run Diagnostics
          </Button>
        </div>

        {/* API Key Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-brand-blue" />
              API Key Configuration
            </CardTitle>
            <CardDescription>Current Alpha Vantage API key status</CardDescription>
          </CardHeader>
          <CardContent>
            {diagnostics ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Key Status</div>
                    <div className="font-semibold flex items-center gap-2">
                      {diagnostics.apiKey.exists ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Configured
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          Missing
                        </>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Key Length</div>
                    <div className="font-semibold">{diagnostics.apiKey.length} characters</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Key Preview</div>
                    <div className="font-semibold flex items-center gap-2">{diagnostics.apiKey.preview}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Key Type</div>
                    <div className="font-semibold">
                      {diagnostics.apiKey.isDemo ? (
                        <Badge className="bg-orange-100 text-orange-800">Demo</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Environment Variable Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Environment Variable Setup</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Make sure your API key is set as an environment variable:
                  </p>
                  <div className="bg-blue-100 p-2 rounded font-mono text-sm flex items-center justify-between">
                    <span>ALPHA_VANTAGE_API_KEY=your_api_key_here</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue mx-auto mb-4"></div>
                <p className="text-gray-600">Running diagnostics...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Results */}
        {diagnostics && (
          <Tabs defaultValue="summary" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="tests">Detailed Tests</TabsTrigger>
              <TabsTrigger value="setup">Setup Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-6">
              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Diagnostic Summary</CardTitle>
                  <CardDescription>Overall API functionality assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  {diagnostics.summary ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-brand-blue">{diagnostics.summary.passedTests}</div>
                          <div className="text-sm text-gray-600">Tests Passed</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-gray-700">{diagnostics.summary.totalTests}</div>
                          <div className="text-sm text-gray-600">Total Tests</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-brand-purple">{diagnostics.summary.successRate}</div>
                          <div className="text-sm text-gray-600">Success Rate</div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      {diagnostics.recommendations && (
                        <div className="space-y-2">
                          <h4 className="font-semibold">Recommendations:</h4>
                          {diagnostics.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-brand-blue">•</span>
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">Configuration Issue</h3>
                      <p className="text-gray-600 mb-4">{diagnostics.error}</p>
                      {diagnostics.recommendation && (
                        <p className="text-sm text-blue-600">{diagnostics.recommendation}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tests" className="space-y-6">
              {/* Individual Test Results */}
              <div className="grid gap-4">
                {diagnostics.tests.map((test, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {getStatusIcon(test.status)}
                        {test.name}
                        <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {test.httpStatus && (
                          <div className="text-sm">
                            <span className="font-medium">HTTP Status:</span> {test.httpStatus}
                          </div>
                        )}

                        {test.error && (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <div className="font-medium text-red-800">Error:</div>
                            <div className="text-sm text-red-700">{test.error}</div>
                          </div>
                        )}

                        {test.rateLimited && (
                          <div className="bg-orange-50 border border-orange-200 rounded p-3">
                            <div className="font-medium text-orange-800">Rate Limited</div>
                            <div className="text-sm text-orange-700">
                              API call limit reached. Consider upgrading your Alpha Vantage plan.
                            </div>
                          </div>
                        )}

                        {test.errorMessage && (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <div className="font-medium text-red-800">API Error:</div>
                            <div className="text-sm text-red-700">{test.errorMessage}</div>
                          </div>
                        )}

                        {/* Show specific test results */}
                        {test.name.includes("AAPL") && test.response?.["Global Quote"] && (
                          <div className="bg-green-50 border border-green-200 rounded p-3">
                            <div className="font-medium text-green-800">AAPL Price Data:</div>
                            <div className="text-sm text-green-700">
                              Price: ${test.response["Global Quote"]["05. price"]} | Change:{" "}
                              {test.response["Global Quote"]["09. change"]} | Date:{" "}
                              {test.response["Global Quote"]["07. latest trading day"]}
                            </div>
                          </div>
                        )}

                        {/* Raw response (collapsed) */}
                        <details className="text-xs">
                          <summary className="cursor-pointer font-medium text-gray-600 hover:text-gray-800">
                            View Raw Response
                          </summary>
                          <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto max-h-40">
                            {JSON.stringify(test.response, null, 2)}
                          </pre>
                        </details>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="setup" className="space-y-6">
              {/* Setup Guide */}
              <Card>
                <CardHeader>
                  <CardTitle>Alpha Vantage Setup Guide</CardTitle>
                  <CardDescription>Step-by-step instructions to configure your API key</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold">Get Your Free API Key</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Visit Alpha Vantage and sign up for a free API key
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href="https://www.alphavantage.co/support/#api-key"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Get API Key
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold">Set Environment Variable</h4>
                          <p className="text-sm text-gray-600 mb-2">Add your API key to your environment variables</p>
                          <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                            ALPHA_VANTAGE_API_KEY=your_api_key_here
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold">Restart Your Application</h4>
                          <p className="text-sm text-gray-600">
                            Restart your development server to load the new environment variable
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold">Run Diagnostics</h4>
                          <p className="text-sm text-gray-600">
                            Use this page to verify your API key is working correctly
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* API Limits Information */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Free Tier Limits</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 25 API calls per day</li>
                        <li>• 5 API calls per minute</li>
                        <li>• All standard functions included</li>
                        <li>• No real-time data (15-20 minute delay)</li>
                      </ul>
                      <p className="text-sm text-yellow-700 mt-2">
                        Consider upgrading to a paid plan for higher limits and real-time data.
                      </p>
                    </div>

                    {/* Troubleshooting */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Troubleshooting</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Make sure the environment variable name is exactly: ALPHA_VANTAGE_API_KEY</li>
                        <li>• Check that your API key doesn't have extra spaces or characters</li>
                        <li>• Verify your API key is active on the Alpha Vantage dashboard</li>
                        <li>• If you're hitting rate limits, wait a few minutes before testing again</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
