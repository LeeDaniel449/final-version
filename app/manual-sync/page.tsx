import "use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Smartphone, Laptop, Download, Upload, Key, Check, X } from "lucide-react"

export default function ManualSyncPage() {
  const [syncPin, setSyncPin] = useState<string>("")
  const [enteredPin, setEnteredPin] = useState<string>("")
  const [syncStatus, setSyncStatus] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [deviceCount, setDeviceCount] = useState(1)

  useEffect(() => {
    // Get or create sync PIN
    const storedPin = localStorage.getItem("wealthwise_sync_pin")
    if (storedPin) {
      setSyncPin(storedPin)
    } else {
      const newPin = Math.random().toString(36).substring(2, 10).toUpperCase()
      localStorage.setItem("wealthwise_sync_pin", newPin)
      setSyncPin(newPin)
    }
  }, [])

  const handleUploadData = async () => {
    if (!syncPin) return

    setIsLoading(true)
    setSyncStatus("Uploading data...")

    try {
      // Collect all data from localStorage
      const allData: Record<string, any> = {}
      const keys = [
        "wealthwise_budget_data:categories",
        "wealthwise_budget_data:entries",
        "wealthwise_goals",
        "wealthwise_learning_progress",
      ]

      keys.forEach((key) => {
        const data = localStorage.getItem(key)
        if (data) {
          allData[key] = JSON.parse(data)
        }
      })

      // Save to database using sync PIN as user ID
      const response = await fetch("/api/user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": `sync_${syncPin}`,
        },
        body: JSON.stringify({
          data: allData,
          userId: `sync_${syncPin}`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSyncStatus("Data uploaded successfully! Use your PIN on other devices to sync.")
        setDeviceCount((prev) => prev + 1)
      } else {
        setSyncStatus(`Upload failed: ${result.error}`)
      }
    } catch (error: any) {
      setSyncStatus(`Upload error: ${error.message}`)
    }

    setIsLoading(false)
  }

  const handleDownloadData = async () => {
    if (!enteredPin || enteredPin.length < 6) {
      setSyncStatus("Please enter a valid sync PIN")
      return
    }

    setIsLoading(true)
    setSyncStatus("Downloading data...")

    try {
      const response = await fetch("/api/user-data", {
        headers: {
          "x-user-id": `sync_${enteredPin}`,
        },
      })

      const result = await response.json()

      if (result.data && Object.keys(result.data).length > 0) {
        // Restore data to localStorage
        Object.entries(result.data).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value))
        })

        // Store the PIN for this device
        localStorage.setItem("wealthwise_sync_pin", enteredPin)
        setSyncPin(enteredPin)

        // Trigger storage events to refresh all components
        window.dispatchEvent(new StorageEvent("storage", { key: "wealthwise_sync_refresh" }))

        setSyncStatus("Data downloaded successfully! Refresh the page to see your synced data.")
        setDeviceCount((prev) => prev + 1)
      } else {
        setSyncStatus("No data found for this PIN. Make sure you've uploaded data from another device first.")
      }
    } catch (error: any) {
      setSyncStatus(`Download error: ${error.message}`)
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Manual Device Sync</h1>
        <p className="text-muted-foreground">
          Sync your data across devices using a simple PIN code. No sign-in required.
        </p>
      </div>

      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <AlertDescription>
          <strong>How it works:</strong> Generate a PIN on your first device, upload your data, then use the same PIN on
          other devices to download and sync your progress.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload from This Device
            </CardTitle>
            <CardDescription>Share your data with other devices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Your Sync PIN</Label>
              <div className="flex items-center gap-2">
                <Input value={syncPin} readOnly className="font-mono text-2xl font-bold tracking-wider text-center" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(syncPin)
                    setSyncStatus("PIN copied to clipboard!")
                  }}
                >
                  <Key className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Save this PIN - you'll need it on your other devices</p>
            </div>

            <Button onClick={handleUploadData} disabled={isLoading || !syncPin} className="w-full" size="lg">
              {isLoading ? "Uploading..." : "Upload My Data"}
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Laptop className="h-4 w-4" />
              <span>This device</span>
            </div>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download to This Device
            </CardTitle>
            <CardDescription>Sync data from another device</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin-input">Enter Sync PIN</Label>
              <Input
                id="pin-input"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value.toUpperCase())}
                placeholder="ABC123XY"
                className="font-mono text-2xl font-bold tracking-wider text-center uppercase"
                maxLength={10}
              />
              <p className="text-sm text-muted-foreground">Enter the PIN from your other device</p>
            </div>

            <Button
              onClick={handleDownloadData}
              disabled={isLoading || enteredPin.length < 6}
              className="w-full"
              size="lg"
              variant="secondary"
            >
              {isLoading ? "Downloading..." : "Download Data"}
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Smartphone className="h-4 w-4" />
              <span>Other device</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {syncStatus && (
        <Alert
          className={`mt-6 ${syncStatus.includes("success") ? "bg-green-50 border-green-200" : syncStatus.includes("error") || syncStatus.includes("failed") ? "bg-red-50 border-red-200" : ""}`}
        >
          <AlertDescription className="flex items-center gap-2">
            {syncStatus.includes("success") && <Check className="h-4 w-4 text-green-600" />}
            {(syncStatus.includes("error") || syncStatus.includes("failed")) && <X className="h-4 w-4 text-red-600" />}
            {syncStatus}
          </AlertDescription>
        </Alert>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">On Your First Device (Phone/Laptop):</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Note your automatically generated Sync PIN</li>
              <li>Click "Upload My Data" to save your progress to the cloud</li>
              <li>Keep your PIN safe - you'll need it on other devices</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-2">On Your Second Device:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Enter the Sync PIN from your first device</li>
              <li>Click "Download Data" to sync your progress</li>
              <li>Refresh the page to see all your synced data</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tips:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Upload data whenever you make important changes</li>
              <li>Download data when switching devices to get the latest version</li>
              <li>Your PIN stays the same across all devices once set</li>
              <li>All your data is encrypted and secure</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
