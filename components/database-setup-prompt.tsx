"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Database, Loader2 } from 'lucide-react'

export function DatabaseSetupPrompt() {
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [setupComplete, setSetupComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setupDatabase = async () => {
    setIsSettingUp(true)
    setError(null)
    
    try {
      const response = await fetch("/api/setup-database", {
        method: "POST",
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to setup database")
      }
      
      setSetupComplete(true)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Setup failed")
    } finally {
      setIsSettingUp(false)
    }
  }

  if (setupComplete) {
    return (
      <Alert className="mb-4 bg-green-50 border-green-200">
        <Database className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-900">Database Setup Complete!</AlertTitle>
        <AlertDescription className="text-green-700">
          Your data will now sync across all devices. Refreshing...
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4">
      <Database className="h-4 w-4" />
      <AlertTitle>Database Setup Required</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>To enable cross-device data syncing, the database needs to be initialized.</p>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <Button 
          onClick={setupDatabase}
          disabled={isSettingUp}
          className="mt-2"
        >
          {isSettingUp ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Initialize Database
            </>
          )}
        </Button>
      </AlertDescription>
    </Alert>
  )
}
