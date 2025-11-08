"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react"

export default function WebhookTestPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testWebhookEndpoint = async () => {
    setLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/webhooks/clerk", {
        method: "GET",
      })
      const data = await response.json()

      setTestResult({
        success: response.ok,
        status: response.status,
        data,
      })
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Webhook Diagnostics</CardTitle>
            <CardDescription>Test your webhook endpoint connectivity and troubleshoot issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Webhook URL Information */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Webhook URL Configuration</h3>
              <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm">
                https://wealthlinkapp.com/api/webhooks/clerk
              </div>
              <p className="text-sm text-muted-foreground">
                Use this exact URL in your Production Dashboard → Webhooks
              </p>
            </div>

            {/* Test Endpoint Button */}
            <div className="space-y-4">
              <Button onClick={testWebhookEndpoint} disabled={loading} className="w-full" size="lg">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing Endpoint...
                  </>
                ) : (
                  "Test Webhook Endpoint"
                )}
              </Button>

              {/* Test Results */}
              {testResult && (
                <Card className={testResult.success ? "border-green-500" : "border-red-500"}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {testResult.success ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          Endpoint Reachable
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          Endpoint Failed
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Status Code:</span>
                        <Badge variant={testResult.success ? "default" : "destructive"}>
                          {testResult.status || "Error"}
                        </Badge>
                      </div>
                      {testResult.data && (
                        <div className="bg-slate-100 p-3 rounded text-xs font-mono overflow-auto">
                          {JSON.stringify(testResult.data, null, 2)}
                        </div>
                      )}
                      {testResult.error && (
                        <div className="bg-red-50 p-3 rounded text-sm text-red-700">{testResult.error}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Troubleshooting Steps */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Troubleshooting Checklist</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">1. Verify Dashboard Configuration</p>
                    <p className="text-muted-foreground">
                      Go to Production Dashboard → Webhooks and ensure the endpoint URL is exactly:
                      <br />
                      <code className="bg-slate-100 px-1 py-0.5 rounded">
                        https://wealthlinkapp.com/api/webhooks/clerk
                      </code>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">2. Subscribe to subscription.updated Event</p>
                    <p className="text-muted-foreground">
                      In webhook settings, ensure "subscription.updated" is checked in the events list
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">3. Copy Webhook Signing Secret</p>
                    <p className="text-muted-foreground">
                      Copy the signing secret from your dashboard and verify it matches your WEBHOOK_SECRET environment
                      variable in your deployment platform
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">4. Send Test Event</p>
                    <p className="text-muted-foreground">
                      Use your dashboard to send a test event and check the response status (should be 200)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">5. Check Function Logs</p>
                    <p className="text-muted-foreground">
                      Go to your project → Functions → Check logs for the /api/webhooks/clerk endpoint to see
                      server-side output
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Manual Activation */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-3">Need Immediate Access?</h3>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <a href="/activate-premium">Manually Activate Premium</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
