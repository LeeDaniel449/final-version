"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

export default function BudgetDashboard() {
  const [testValue, setTestValue] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-8 h-8 text-blue-600" />
              Smart Budget Dashboard
            </h1>
            <p className="text-gray-600">Testing simplified version</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If you can see this, the page is loading correctly.</p>
            <Button onClick={() => setTestValue(testValue + 1)} className="mt-4">
              Test Button (Clicked {testValue} times)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
