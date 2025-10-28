"use client"

import { useState } from "react"
import { PremiumGuard } from "@/components/premium-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  BarChart3,
  ArrowRight,
  Zap,
  Calendar,
  Calculator,
  PieChart,
  RefreshCw,
} from "lucide-react"

interface OptimizationStep {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  timeframe: "this-week" | "next-month" | "quarterly"
  action: string
  amount: string
  benefit: string
  completed: boolean
  estimatedTime: string
}

const PortfolioOptimizerPage = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("this-week")

  const optimizationSteps: OptimizationStep[] = [
    {
      id: "rebalance-us",
      title: "Trim Overweight US Stocks",
      description: "Reduce US stock allocation from 42.9% to 40% target",
      priority: "high",
      timeframe: "this-week",
      action: "Sell $2,900 from VTI or similar US total market funds",
      amount: "$2,900",
      benefit: "Reduced concentration risk, better diversification",
      completed: false,
      estimatedTime: "15 minutes",
    },
    {
      id: "increase-cash",
      title: "Build Emergency Fund",
      description: "Increase cash position from 1.1% to 3% target",
      priority: "high",
      timeframe: "this-week",
      action: "Transfer $1,900 to high-yield savings account",
      amount: "$1,900",
      benefit: "Financial security, liquidity buffer",
      completed: false,
      estimatedTime: "10 minutes",
    },
    {
      id: "add-technology",
      title: "Increase Technology Exposure",
      description: "Add technology allocation from 12.4% to 15% target",
      priority: "medium",
      timeframe: "next-month",
      action: "Purchase $2,600 in QQQ or VGT technology ETF",
      amount: "$2,600",
      benefit: "AI and cloud computing growth exposure",
      completed: false,
      estimatedTime: "20 minutes",
    },
    {
      id: "add-energy",
      title: "Energy Sector Diversification",
      description: "Increase energy from 2.1% to 4% target allocation",
      priority: "medium",
      timeframe: "next-month",
      action: "Purchase $1,900 in XLE or VDE energy ETF",
      amount: "$1,900",
      benefit: "Inflation hedge, geopolitical stability",
      completed: false,
      estimatedTime: "15 minutes",
    },
    {
      id: "reduce-aapl",
      title: "Reduce Single Stock Risk",
      description: "Trim AAPL position from 6.2% to under 5%",
      priority: "medium",
      timeframe: "next-month",
      action: "Sell $1,200 worth of AAPL shares",
      amount: "$1,200",
      benefit: "Reduced concentration risk",
      completed: false,
      estimatedTime: "10 minutes",
    },
    {
      id: "emerging-markets",
      title: "Add Emerging Markets",
      description: "Add 2-3% emerging market exposure for growth",
      priority: "low",
      timeframe: "quarterly",
      action: "Purchase $2,000-3,000 in VWO or IEMG",
      amount: "$2,500",
      benefit: "Geographic diversification, growth potential",
      completed: false,
      estimatedTime: "25 minutes",
    },
  ]

  const handleStepCompletion = (stepId: string) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const getStepsByTimeframe = (timeframe: string) => {
    return optimizationSteps.filter((step) => step.timeframe === timeframe)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTimeframeTitle = (timeframe: string) => {
    switch (timeframe) {
      case "this-week":
        return "This Week (High Priority)"
      case "next-month":
        return "Next Month (Medium Priority)"
      case "quarterly":
        return "Quarterly Review (Low Priority)"
      default:
        return timeframe
    }
  }

  const calculateProgress = () => {
    const totalSteps = optimizationSteps.length
    const completed = completedSteps.length
    return (completed / totalSteps) * 100
  }

  const calculatePotentialGain = () => {
    const completedHighPriority = optimizationSteps.filter(
      (step) => step.priority === "high" && completedSteps.includes(step.id),
    ).length
    const completedMediumPriority = optimizationSteps.filter(
      (step) => step.priority === "medium" && completedSteps.includes(step.id),
    ).length
    const completedLowPriority = optimizationSteps.filter(
      (step) => step.priority === "low" && completedSteps.includes(step.id),
    ).length

    return completedHighPriority * 8000 + completedMediumPriority * 5000 + completedLowPriority * 3000
  }

  return (
    <PremiumGuard>
      <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-8 h-8 text-brand-blue" />
                Portfolio Optimization Plan
              </h1>
              <p className="text-gray-600">Implement AI recommendations to optimize your portfolio performance</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI Optimized
            </Badge>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(calculateProgress())}%</div>
                <Progress value={calculateProgress()} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {completedSteps.length} of {optimizationSteps.length} steps completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Potential Gain</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${calculatePotentialGain().toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">10-year projected benefit</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {optimizationSteps.filter((s) => s.priority === "high" && completedSteps.includes(s.id)).length}/
                  {optimizationSteps.filter((s) => s.priority === "high").length}
                </div>
                <p className="text-xs text-muted-foreground">Critical actions completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Investment</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95 min</div>
                <p className="text-xs text-muted-foreground">Total time to complete all steps</p>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Guide */}
          <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="this-week">This Week</TabsTrigger>
              <TabsTrigger value="next-month">Next Month</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            </TabsList>

            {["this-week", "next-month", "quarterly"].map((timeframe) => (
              <TabsContent key={timeframe} value={timeframe} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-brand-blue" />
                      {getTimeframeTitle(timeframe)}
                    </CardTitle>
                    <CardDescription>
                      {timeframe === "this-week" && "Critical actions to take immediately for maximum impact"}
                      {timeframe === "next-month" && "Important optimizations to implement over the next 30 days"}
                      {timeframe === "quarterly" && "Long-term strategic adjustments for continued optimization"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getStepsByTimeframe(timeframe).map((step) => (
                        <Card key={step.id} className="border-l-4 border-l-brand-blue">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <Checkbox
                                  checked={completedSteps.includes(step.id)}
                                  onCheckedChange={() => handleStepCompletion(step.id)}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3
                                      className={`font-semibold ${
                                        completedSteps.includes(step.id) ? "line-through text-gray-500" : ""
                                      }`}
                                    >
                                      {step.title}
                                    </h3>
                                    <Badge className={getPriorityColor(step.priority)}>{step.priority}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>

                                  {/* Action Details */}
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <ArrowRight className="w-4 h-4 text-blue-600" />
                                      <span className="font-medium text-blue-800">Action Required:</span>
                                    </div>
                                    <p className="text-sm text-blue-700">{step.action}</p>
                                  </div>

                                  {/* Benefits */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                      <DollarSign className="w-4 h-4 text-green-600" />
                                      <span className="font-medium">Amount: {step.amount}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-blue-600" />
                                      <span className="font-medium">Time: {step.estimatedTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <TrendingUp className="w-4 h-4 text-purple-600" />
                                      <span className="font-medium">Benefit: {step.benefit}</span>
                                    </div>
                                  </div>

                                  {/* Step-by-Step Instructions */}
                                  {step.id === "rebalance-us" && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                      <h4 className="font-medium mb-2">Step-by-Step Instructions:</h4>
                                      <ol className="text-sm space-y-1 list-decimal list-inside">
                                        <li>Log into your brokerage account (Fidelity, Vanguard, etc.)</li>
                                        <li>Navigate to your portfolio holdings</li>
                                        <li>Find your VTI or US total market fund position</li>
                                        <li>Sell $2,900 worth of shares (approximately 13 shares at current price)</li>
                                        <li>Keep proceeds in cash/money market for reallocation</li>
                                      </ol>
                                    </div>
                                  )}

                                  {step.id === "increase-cash" && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                      <h4 className="font-medium mb-2">Step-by-Step Instructions:</h4>
                                      <ol className="text-sm space-y-1 list-decimal list-inside">
                                        <li>Open your high-yield savings account (Marcus, Ally, etc.)</li>
                                        <li>Transfer $1,900 from checking or investment account</li>
                                        <li>Set up automatic monthly transfers to maintain 3-6 months expenses</li>
                                        <li>Consider money market funds for higher yields</li>
                                      </ol>
                                    </div>
                                  )}

                                  {step.id === "add-technology" && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                      <h4 className="font-medium mb-2">Step-by-Step Instructions:</h4>
                                      <ol className="text-sm space-y-1 list-decimal list-inside">
                                        <li>Research QQQ vs VGT: QQQ (broader tech), VGT (pure tech play)</li>
                                        <li>Use proceeds from US stock sale ($2,600)</li>
                                        <li>Place buy order for chosen technology ETF</li>
                                        <li>Consider dollar-cost averaging over 2-3 purchases</li>
                                      </ol>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                {completedSteps.includes(step.id) && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                                <Button
                                  size="sm"
                                  variant={completedSteps.includes(step.id) ? "outline" : "default"}
                                  className={
                                    completedSteps.includes(step.id) ? "" : "bg-brand-blue hover:bg-brand-blue/90"
                                  }
                                >
                                  {completedSteps.includes(step.id) ? "Undo" : "Mark Complete"}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Expected Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-brand-blue" />
                Expected Optimization Results
              </CardTitle>
              <CardDescription>Projected improvements from implementing the full optimization plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Current Portfolio</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Expected Annual Return:</span>
                      <span className="font-medium">8.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk (Standard Deviation):</span>
                      <span className="font-medium">14.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sharpe Ratio:</span>
                      <span className="font-medium">1.34</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10-Year Projection:</span>
                      <span className="font-medium">$287,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Optimized Portfolio</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Expected Annual Return:</span>
                      <span className="font-medium text-green-600">8.7% (+0.5%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk (Standard Deviation):</span>
                      <span className="font-medium text-green-600">13.9% (-0.9%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sharpe Ratio:</span>
                      <span className="font-medium text-green-600">1.52 (+0.18)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10-Year Projection:</span>
                      <span className="font-medium text-green-600">$312,000 (+$25,000)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Optimization Benefits</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Higher returns with lower risk (improved Sharpe ratio)</li>
                  <li>• Better diversification across sectors and geographies</li>
                  <li>• Reduced single-stock concentration risk</li>
                  <li>• Enhanced emergency fund for financial security</li>
                  <li>• Exposure to growth sectors (technology, energy)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="bg-brand-blue hover:bg-brand-blue/90" size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Analysis
            </Button>
            <Button variant="outline" size="lg">
              <PieChart className="w-4 h-4 mr-2" />
              View Updated Allocation
            </Button>
            <Button variant="outline" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Set Reminders
            </Button>
          </div>
        </div>
      </div>
    </PremiumGuard>
  )
}

export default PortfolioOptimizerPage
