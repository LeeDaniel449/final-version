"use client"

import { Suspense } from "react"
import AIAdvisor from "@/components/ai-advisor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, DollarSign, Target } from "lucide-react"

export default function AIAdvisorPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">AI Financial Advisor</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            GPT-4 Powered
          </Badge>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get personalized financial advice powered by advanced AI. Ask questions about budgeting, saving, investing,
          and debt management.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                What I Can Help With
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm">Budget analysis and optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Investment recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Debt management strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Goal planning and tracking</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Starters</CardTitle>
              <CardDescription>Try asking these questions:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-2 bg-gray-50 rounded">"Analyze my current budget"</div>
              <div className="p-2 bg-gray-50 rounded">"How should I invest $1000?"</div>
              <div className="p-2 bg-gray-50 rounded">"Review my financial goals"</div>
              <div className="p-2 bg-gray-50 rounded">"What's my savings rate?"</div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Suspense fallback={<div>Loading AI Advisor...</div>}>
            <AIAdvisor />
          </Suspense>
        </div>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <p className="text-xs text-gray-500 text-center">
            <strong>Disclaimer:</strong> This AI advisor provides educational information and general guidance only. It
            is not a substitute for professional financial advice. Always consult with a qualified financial advisor for
            personalized recommendations based on your specific situation.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
