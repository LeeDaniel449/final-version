"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
  RefreshCw,
  Play,
  ExternalLink,
  Copy,
  TrendingDown,
} from "lucide-react"

interface ImplementationStep {
  id: string
  title: string
  description: string
  priority: "critical" | "high" | "medium" | "low"
  category: "sell" | "buy" | "transfer" | "setup"
  currentAmount: number
  targetAmount: number
  actionAmount: number
  ticker?: string
  platform: string[]
  instructions: string[]
  completed: boolean
  estimatedTime: string
  order: number
  dependencies?: string[]
}

const PortfolioImplementationPage = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionMode, setExecutionMode] = useState<"guided" | "manual">("guided")

  const implementationSteps: ImplementationStep[] = [
    // WEEK 1: CRITICAL ACTIONS
    {
      id: "emergency-fund",
      title: "Build Emergency Fund",
      description: "Increase cash reserves from 1.1% to 3% of portfolio",
      priority: "critical",
      category: "transfer",
      currentAmount: 141,
      targetAmount: 385,
      actionAmount: 1900,
      platform: ["Marcus", "Ally", "Capital One", "Any High-Yield Savings"],
      instructions: [
        "Open high-yield savings account if you don't have one (Marcus: 4.5% APY, Ally: 4.35% APY)",
        "Transfer $1,900 from checking account or sell investments",
        "Set up automatic monthly transfer of $200 to maintain emergency fund",
        "Aim for 3-6 months of expenses ($15,000-30,000 total)",
        "Keep this separate from investment accounts for true emergencies",
      ],
      completed: false,
      estimatedTime: "20 minutes",
      order: 1,
    },
    {
      id: "trim-us-stocks",
      title: "Reduce US Stock Overweight",
      description: "Sell US stocks to reduce from 42.9% to 40% target allocation",
      priority: "critical",
      category: "sell",
      currentAmount: 5511,
      targetAmount: 5140,
      actionAmount: -371,
      ticker: "VTI",
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE"],
      instructions: [
        "Log into your brokerage account",
        "Navigate to your VTI (or similar US total market) position",
        "Sell $371 worth of shares (approximately 1.7 shares at $220/share)",
        "Choose 'Market Order' for immediate execution during market hours",
        "Keep proceeds in cash/money market for reallocation",
        "Confirm sale and note the cash available for reinvestment",
      ],
      completed: false,
      estimatedTime: "10 minutes",
      order: 2,
      dependencies: ["emergency-fund"],
    },

    // WEEK 2-3: HIGH PRIORITY REBALANCING
    {
      id: "add-technology",
      title: "Increase Technology Exposure",
      description: "Add technology allocation from 12.4% to 15% target",
      priority: "high",
      category: "buy",
      currentAmount: 1593,
      targetAmount: 1927,
      actionAmount: 334,
      ticker: "QQQ",
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE"],
      instructions: [
        "Research QQQ vs VGT: QQQ (Nasdaq 100, broader tech), VGT (pure technology)",
        "Recommend QQQ for better diversification within tech sector",
        "Use $334 from previous US stock sale proceeds",
        "Buy QQQ shares (approximately 0.75 shares at $445/share)",
        "Consider fractional shares if your broker supports them",
        "Set up automatic monthly investment of $50 for dollar-cost averaging",
      ],
      completed: false,
      estimatedTime: "15 minutes",
      order: 3,
      dependencies: ["trim-us-stocks"],
    },
    {
      id: "reduce-apple",
      title: "Trim Apple Position",
      description: "Reduce AAPL from 6.2% to under 5% to reduce single-stock risk",
      priority: "high",
      category: "sell",
      currentAmount: 796,
      targetAmount: 642,
      actionAmount: -154,
      ticker: "AAPL",
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE", "Robinhood"],
      instructions: [
        "Locate your Apple (AAPL) position in your portfolio",
        "Sell $154 worth of AAPL shares (approximately 0.77 shares at $200/share)",
        "Use 'Limit Order' set 1-2% below current price for better execution",
        "Consider tax implications - sell highest cost basis shares first",
        "Keep proceeds for diversification into other sectors",
        "Document the sale for tax records",
      ],
      completed: false,
      estimatedTime: "12 minutes",
      order: 4,
    },
    {
      id: "add-energy",
      title: "Add Energy Sector Exposure",
      description: "Increase energy allocation from 2.1% to 4% target",
      priority: "high",
      category: "buy",
      currentAmount: 270,
      targetAmount: 514,
      actionAmount: 244,
      ticker: "XLE",
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE"],
      instructions: [
        "Choose between XLE (Energy Select SPDR) or VDE (Vanguard Energy ETF)",
        "XLE: More liquid, 0.10% expense ratio, includes major oil companies",
        "VDE: Lower expense ratio 0.10%, broader energy exposure",
        "Recommend XLE for better liquidity and dividend yield (5.2%)",
        "Buy $244 worth of XLE (approximately 2.8 shares at $87/share)",
        "Use proceeds from Apple sale for this purchase",
      ],
      completed: false,
      estimatedTime: "15 minutes",
      order: 5,
      dependencies: ["reduce-apple"],
    },

    // MONTH 2: MEDIUM PRIORITY DIVERSIFICATION
    {
      id: "add-emerging-markets",
      title: "Add Emerging Markets Exposure",
      description: "Add 2-3% emerging market allocation for geographic diversification",
      priority: "medium",
      category: "buy",
      currentAmount: 0,
      targetAmount: 321,
      actionAmount: 321,
      ticker: "VWO",
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE"],
      instructions: [
        "Choose between VWO (Vanguard) or IEMG (iShares) emerging markets ETF",
        "VWO: 0.10% expense ratio, includes China, India, Taiwan, Brazil",
        "IEMG: 0.11% expense ratio, broader emerging market exposure",
        "Recommend VWO for lower costs and Vanguard's reputation",
        "Buy $321 worth of VWO (approximately 6.4 shares at $50/share)",
        "This adds geographic diversification beyond US and developed international",
      ],
      completed: false,
      estimatedTime: "18 minutes",
      order: 6,
    },
    {
      id: "increase-international",
      title: "Boost International Developed Markets",
      description: "Increase VXUS allocation from 18.2% to 20% target",
      priority: "medium",
      category: "buy",
      currentAmount: 2333,
      targetAmount: 2569,
      actionAmount: 236,
      ticker: "VXUS",
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE"],
      instructions: [
        "Add to existing VXUS (Vanguard Total International Stock) position",
        "Buy additional $236 worth of VXUS (approximately 4 shares at $58/share)",
        "This increases international diversification to 20% target",
        "Provides exposure to European, Japanese, and other developed markets",
        "Helps reduce US market concentration risk",
        "Consider setting up automatic monthly investment",
      ],
      completed: false,
      estimatedTime: "10 minutes",
      order: 7,
    },

    // MONTH 3: OPTIMIZATION AND FINE-TUNING
    {
      id: "optimize-bonds",
      title: "Optimize Bond Allocation",
      description: "Adjust bond holdings for better yield and duration",
      priority: "medium",
      category: "buy",
      currentAmount: 3795,
      targetAmount: 3590,
      actionAmount: -205,
      ticker: "BND",
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE"],
      instructions: [
        "Evaluate current BND (Total Bond Market) position",
        "Consider partial shift to VTEB (Tax-Exempt Bonds) if in high tax bracket",
        "Reduce bond allocation slightly from 29.5% to 28% target",
        "Sell $205 worth of BND (approximately 2.7 shares at $76/share)",
        "Use proceeds to increase equity allocations",
        "Maintain some bond exposure for stability and diversification",
      ],
      completed: false,
      estimatedTime: "15 minutes",
      order: 8,
    },
    {
      id: "add-reits",
      title: "Maintain Real Estate Exposure",
      description: "Keep VNQ allocation at current 8.3% level",
      priority: "low",
      category: "buy",
      currentAmount: 1070,
      targetAmount: 1070,
      actionAmount: 0,
      ticker: "VNQ",
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE"],
      instructions: [
        "Current VNQ (Real Estate ETF) allocation is appropriate at 8.3%",
        "No immediate action required - maintain current position",
        "Monitor for rebalancing opportunities quarterly",
        "Consider adding small amounts during market dips",
        "REITs provide inflation hedge and diversification benefits",
        "Current position: 12 shares worth $1,070",
      ],
      completed: false,
      estimatedTime: "5 minutes",
      order: 9,
    },

    // ONGOING: AUTOMATION AND MONITORING
    {
      id: "setup-automation",
      title: "Set Up Automatic Investing",
      description: "Automate monthly contributions to maintain target allocations",
      priority: "medium",
      category: "setup",
      currentAmount: 0,
      targetAmount: 500,
      actionAmount: 500,
      platform: ["Fidelity", "Vanguard", "Schwab", "E*TRADE"],
      instructions: [
        "Set up automatic monthly investment of $500 total",
        "Allocate: $200 VTI, $100 VXUS, $75 QQQ, $50 VWO, $50 BND, $25 XLE",
        "Schedule for the same day each month (e.g., 15th)",
        "Enable automatic reinvestment of all dividends",
        "Set up quarterly rebalancing alerts",
        "Review and adjust allocations every 6 months",
      ],
      completed: false,
      estimatedTime: "25 minutes",
      order: 10,
    },
  ]

  const handleStepCompletion = (stepId: string) => {
    setCompletedSteps((prev) => {
      const newCompleted = prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]

      // Auto-advance to next step in guided mode
      if (executionMode === "guided" && !prev.includes(stepId)) {
        const currentStepIndex = implementationSteps.findIndex((step) => step.id === stepId)
        if (currentStepIndex < implementationSteps.length - 1) {
          setCurrentStep(currentStepIndex + 1)
        }
      }

      return newCompleted
    })
  }

  const getNextStep = () => {
    return implementationSteps.find((step, index) => index > currentStep && !completedSteps.includes(step.id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sell":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      case "buy":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "transfer":
        return <ArrowRight className="w-4 h-4 text-blue-600" />
      case "setup":
        return <RefreshCw className="w-4 h-4 text-purple-600" />
      default:
        return <BarChart3 className="w-4 h-4" />
    }
  }

  const calculateProgress = () => {
    return (completedSteps.length / implementationSteps.length) * 100
  }

  const calculateTotalValue = () => {
    const totalBuys = implementationSteps
      .filter((step) => step.category === "buy" && completedSteps.includes(step.id))
      .reduce((sum, step) => sum + step.actionAmount, 0)

    const totalSells = implementationSteps
      .filter((step) => step.category === "sell" && completedSteps.includes(step.id))
      .reduce((sum, step) => sum + Math.abs(step.actionAmount), 0)

    return { totalBuys, totalSells }
  }

  const getStepsByPriority = (priority: string) => {
    return implementationSteps.filter((step) => step.priority === priority).sort((a, b) => a.order - b.order)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-8 h-8 text-brand-blue" />
              Complete Portfolio Implementation
            </h1>
            <p className="text-gray-600">Execute all AI recommendations with step-by-step guidance</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {executionMode === "guided" ? "Guided Mode" : "Manual Mode"}
            </Badge>
            <Button
              variant="outline"
              onClick={() => setExecutionMode(executionMode === "guided" ? "manual" : "guided")}
            >
              Switch Mode
            </Button>
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(calculateProgress())}%</div>
              <Progress value={calculateProgress()} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {completedSteps.length} of {implementationSteps.length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${calculateTotalValue().totalBuys.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">New investments made</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sold</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ${calculateTotalValue().totalSells.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Positions trimmed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Actions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getStepsByPriority("critical").filter((s) => completedSteps.includes(s.id)).length}/
                {getStepsByPriority("critical").length}
              </div>
              <p className="text-xs text-muted-foreground">Must-do actions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {implementationSteps
                  .filter((s) => completedSteps.includes(s.id))
                  .reduce((sum, s) => sum + Number.parseInt(s.estimatedTime), 0)}{" "}
                min
              </div>
              <p className="text-xs text-muted-foreground">Time spent optimizing</p>
            </CardContent>
          </Card>
        </div>

        {/* Guided Execution Mode */}
        {executionMode === "guided" && (
          <Card className="border-2 border-brand-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-brand-blue" />
                Guided Execution - Step {currentStep + 1} of {implementationSteps.length}
              </CardTitle>
              <CardDescription>
                Follow the step-by-step process to implement all recommendations systematically
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep < implementationSteps.length && (
                <div className="space-y-4">
                  {(() => {
                    const step = implementationSteps[currentStep]
                    return (
                      <div className="border-2 border-brand-blue/30 rounded-lg p-4 bg-brand-blue/5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {getCategoryIcon(step.category)}
                            <div>
                              <h3 className="font-semibold text-lg">{step.title}</h3>
                              <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(step.priority)}>{step.priority}</Badge>
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {step.estimatedTime}
                            </Badge>
                          </div>
                        </div>

                        {/* Action Summary */}
                        <div className="bg-white rounded-lg p-4 mb-4 border">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Action Required</Label>
                              <div className="text-lg font-semibold">
                                {step.category === "sell"
                                  ? "SELL"
                                  : step.category === "buy"
                                    ? "BUY"
                                    : step.category === "transfer"
                                      ? "TRANSFER"
                                      : "SETUP"}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Amount</Label>
                              <div className="text-lg font-semibold">
                                ${Math.abs(step.actionAmount).toLocaleString()}
                                {step.ticker && ` (${step.ticker})`}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Platform</Label>
                              <div className="text-sm">
                                {step.platform.slice(0, 2).join(", ")}
                                {step.platform.length > 2 && ` +${step.platform.length - 2} more`}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detailed Instructions */}
                        <div className="space-y-3">
                          <h4 className="font-medium">Step-by-Step Instructions:</h4>
                          <ol className="space-y-2">
                            {step.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <Badge
                                  variant="outline"
                                  className="min-w-[24px] h-6 flex items-center justify-center text-xs"
                                >
                                  {index + 1}
                                </Badge>
                                <span className="text-sm">{instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Platform Quick Links */}
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm mb-2">Quick Access Links:</h5>
                          <div className="flex flex-wrap gap-2">
                            {step.platform.map((platform) => (
                              <Button key={platform} size="sm" variant="outline" className="text-xs">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                {platform}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={completedSteps.includes(step.id)}
                              onCheckedChange={() => handleStepCompletion(step.id)}
                            />
                            <Label className="text-sm">Mark as completed</Label>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                              disabled={currentStep === 0}
                            >
                              Previous
                            </Button>
                            <Button
                              onClick={() => setCurrentStep(Math.min(implementationSteps.length - 1, currentStep + 1))}
                              disabled={currentStep === implementationSteps.length - 1}
                              className="bg-brand-blue hover:bg-brand-blue/90"
                            >
                              Next Step
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {currentStep >= implementationSteps.length && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">All Steps Completed!</h3>
                  <p className="text-gray-600 mb-4">
                    Congratulations! You've successfully implemented all portfolio optimizations.
                  </p>
                  <Button onClick={() => setCurrentStep(0)} className="bg-brand-blue hover:bg-brand-blue/90">
                    Review All Steps
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Manual Mode - All Steps Overview */}
        {executionMode === "manual" && (
          <Tabs defaultValue="critical" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="critical">Critical (2)</TabsTrigger>
              <TabsTrigger value="high">High Priority (3)</TabsTrigger>
              <TabsTrigger value="medium">Medium Priority (4)</TabsTrigger>
              <TabsTrigger value="low">Low Priority (1)</TabsTrigger>
            </TabsList>

            {["critical", "high", "medium", "low"].map((priority) => (
              <TabsContent key={priority} value={priority} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-5 h-5 ${
                          priority === "critical"
                            ? "text-red-600"
                            : priority === "high"
                              ? "text-orange-600"
                              : priority === "medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                        }`}
                      />
                      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority Actions
                    </CardTitle>
                    <CardDescription>
                      {priority === "critical" && "Must complete immediately for portfolio safety"}
                      {priority === "high" && "Important optimizations for better returns"}
                      {priority === "medium" && "Beneficial improvements for diversification"}
                      {priority === "low" && "Optional enhancements for fine-tuning"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getStepsByPriority(priority).map((step) => (
                        <Card
                          key={step.id}
                          className={`border-l-4 ${
                            completedSteps.includes(step.id) ? "border-l-green-500 bg-green-50" : "border-l-brand-blue"
                          }`}
                        >
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
                                    {getCategoryIcon(step.category)}
                                    <h3
                                      className={`font-semibold ${
                                        completedSteps.includes(step.id) ? "line-through text-gray-500" : ""
                                      }`}
                                    >
                                      {step.title}
                                    </h3>
                                    <Badge className={getPriorityColor(step.priority)}>{step.priority}</Badge>
                                    {step.ticker && <Badge variant="outline">{step.ticker}</Badge>}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>

                                  {/* Action Summary */}
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                      <div>
                                        <span className="font-medium">Action: </span>
                                        <span
                                          className={`font-semibold ${
                                            step.category === "sell"
                                              ? "text-red-600"
                                              : step.category === "buy"
                                                ? "text-green-600"
                                                : step.category === "transfer"
                                                  ? "text-blue-600"
                                                  : "text-purple-600"
                                          }`}
                                        >
                                          {step.category.toUpperCase()} ${Math.abs(step.actionAmount).toLocaleString()}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="font-medium">Time: </span>
                                        <span>{step.estimatedTime}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium">Platform: </span>
                                        <span>{step.platform[0]}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Instructions */}
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-sm">Instructions:</h4>
                                    <ol className="text-sm space-y-1 list-decimal list-inside text-gray-700">
                                      {step.instructions.slice(0, 3).map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                      ))}
                                      {step.instructions.length > 3 && (
                                        <li className="text-gray-500">+{step.instructions.length - 3} more steps...</li>
                                      )}
                                    </ol>
                                  </div>

                                  {/* Platform Links */}
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {step.platform.slice(0, 3).map((platform) => (
                                      <Button key={platform} size="sm" variant="outline" className="text-xs">
                                        <ExternalLink className="w-3 h-3 mr-1" />
                                        {platform}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                {completedSteps.includes(step.id) && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Done
                                  </Badge>
                                )}
                                <Button
                                  size="sm"
                                  variant={completedSteps.includes(step.id) ? "outline" : "default"}
                                  className={
                                    completedSteps.includes(step.id) ? "" : "bg-brand-blue hover:bg-brand-blue/90"
                                  }
                                  onClick={() => handleStepCompletion(step.id)}
                                >
                                  {completedSteps.includes(step.id) ? "Undo" : "Complete"}
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
        )}

        {/* Final Results Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-brand-blue" />
              Implementation Results
            </CardTitle>
            <CardDescription>Expected portfolio improvements after completing all optimizations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Before Optimization</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Portfolio Value:</span>
                    <span className="font-medium">$12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Annual Return:</span>
                    <span className="font-medium">8.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk (Volatility):</span>
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
                <h3 className="font-semibold mb-3">After Optimization</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Portfolio Value:</span>
                    <span className="font-medium">$12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Annual Return:</span>
                    <span className="font-medium text-green-600">8.7% (+0.5%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk (Volatility):</span>
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
                <span className="font-semibold text-green-800">Key Improvements</span>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>
                  • <strong>+$25,000</strong> additional wealth over 10 years
                </li>
                <li>
                  • <strong>+0.5%</strong> higher expected annual returns
                </li>
                <li>
                  • <strong>-0.9%</strong> lower portfolio volatility (less risk)
                </li>
                <li>
                  • <strong>Better diversification</strong> across sectors and geographies
                </li>
                <li>
                  • <strong>Reduced concentration risk</strong> in US stocks and Apple
                </li>
                <li>
                  • <strong>Emergency fund established</strong> for financial security
                </li>
                <li>
                  • <strong>Automated investing</strong> for consistent growth
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="bg-brand-blue hover:bg-brand-blue/90" size="lg" onClick={() => setExecutionMode("guided")}>
            <Play className="w-4 h-4 mr-2" />
            Start Guided Implementation
          </Button>
          <Button variant="outline" size="lg">
            <Copy className="w-4 h-4 mr-2" />
            Export Checklist
          </Button>
          <Button variant="outline" size="lg">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Reminders
          </Button>
          <Button variant="outline" size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Analysis
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PortfolioImplementationPage
