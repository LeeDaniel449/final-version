"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Upload, Smartphone, Monitor } from 'lucide-react'
import { userDataManager } from "@/lib/user-data"

export default function SyncDataPage() {
  const [exportedData, setExportedData] = useState<string>("")
  const [importData, setImportData] = useState<string>("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleExport = () => {
    try {
      const data = {
        categories: userDataManager.getBudgetCategories(),
        entries: userDataManager.getBudgetEntries(),
        goals: userDataManager.getGoals(),
        userProgress: userDataManager.getUserProgress(),
        profile: userDataManager.getUserProfile(),
        timestamp: new Date().toISOString(),
      }

      const jsonString = JSON.stringify(data, null, 2)
      setExportedData(jsonString)
      
      // Also download as file
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `wealthlink-data-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      
      setMessage({ type: "success", text: "Data exported successfully! File downloaded." })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to export data: " + error.message })
    }
  }

  const handleImport = () => {
    try {
      if (!importData.trim()) {
        setMessage({ type: "error", text: "Please paste exported data first" })
        return
      }

      const data = JSON.parse(importData)

      if (data.categories) {
        userDataManager.saveBudgetCategories(data.categories)
      }
      if (data.entries) {
        userDataManager.saveBudgetEntries(data.entries)
      }
      if (data.goals) {
        userDataManager.saveGoals(data.goals)
      }
      if (data.userProgress) {
        userDataManager.saveUserProgress(data.userProgress)
      }
      if (data.profile) {
        userDataManager.saveUserProfile(data.profile)
      }

      setMessage({ type: "success", text: "Data imported successfully! Your progress is now synced." })
      setImportData("")
      
      // Refresh the page to show updated data
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to import data: " + error.message })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setImportData(content)
      setMessage({ type: "success", text: "File loaded! Click Import to sync your data." })
    }
    reader.readAsText(file)
  }

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Sync Data Across Devices</h1>
        <p className="text-muted-foreground">
          Export your data from one device and import it on another to keep your progress synced.
        </p>
      </div>

      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Export Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              <CardTitle>Export from This Device</CardTitle>
            </div>
            <CardDescription>
              Save your data to transfer to another device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleExport} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            
            {exportedData && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Exported Data:</label>
                <Textarea
                  value={exportedData}
                  readOnly
                  className="h-32 font-mono text-xs"
                  placeholder="Your exported data will appear here..."
                />
                <p className="text-xs text-muted-foreground">
                  Copy this data or use the downloaded file to import on your other device
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Import Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              <CardTitle>Import to This Device</CardTitle>
            </div>
            <CardDescription>
              Load data exported from your other device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload File:</label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or paste data</span>
              </div>
            </div>

            <div className="space-y-2">
              <Textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="h-32 font-mono text-xs"
                placeholder="Paste exported data here..."
              />
            </div>

            <Button onClick={handleImport} className="w-full" size="lg" variant="default">
              <Upload className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>1. On your laptop:</strong> Click "Export Data" to download your data file</p>
          <p><strong>2. Transfer the file:</strong> Email it to yourself, use cloud storage, or AirDrop it</p>
          <p><strong>3. On your iPhone:</strong> Upload the file or paste the data, then click "Import Data"</p>
          <p className="text-xs mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
            <strong>Note:</strong> Without a database integration, data is stored locally on each device. 
            Use this sync feature whenever you switch devices to keep your progress up to date.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
