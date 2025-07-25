"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Zap,
  TrendingUp,
  RefreshCw,
  Clock,
  ArrowUp,
  AlertTriangle,
  BarChart3,
  Plus,
  DollarSign,
  Info,
} from "lucide-react"

const LiveDataDemo = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showLiveData, setShowLiveData] = useState(false)

  const steps = [
    {
      title: "1. Search Results Appear",
      description: "After typing 'Apple', you see search results",
      content: (
        <div className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-all">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    AAPL
                    <Badge variant="outline" className="text-xs">
                      Stock
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">Apple Inc.</div>
                  <div className="text-xs text-gray-500">Equity • United States • USD</div>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCurrentStep(1)
                setIsLoading(true)
                setTimeout(() => {
                  setIsLoading(false)
                  setShowLiveData(true)
                  setCurrentStep(2)
                }, 2000)
              }}
            >
              Get Live Data
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "2. Loading Live Data",
      description: "System fetches real-time data from Alpha Vantage",
      content: (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
          <span className="ml-2 text-gray-600">Fetching live market data from Alpha Vantage...</span>
        </div>
      ),
    },
    {
      title: "3. Live Data Appears",
      description: "Real-time pricing and market analysis displayed",
      content: (
        <Card className="border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div>
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      AAPL
                      <Badge className="text-xs bg-green-100 text-green-800">
                        <Zap className="w-3 h-3 mr-1" />
                        LIVE
                      </Badge>
                    </h4>
                    <p className="text-sm text-gray-600">Apple Inc.</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Technology
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        NASDAQ
                      </Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">🟢 LIVE TRADING</Badge>
                    </div>
                  </div>
                </div>

                {/* Live Price Display */}
                <div className="p-4 rounded-lg mb-4 border-2 bg-white/50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-green-800 flex items-center gap-2">
                        $201.25 USD
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-lg flex items-center font-semibold text-green-800 mb-2">
                        <ArrowUp className="w-5 h-5 mr-2" />
                        +$2.45 (+1.23%)
                      </div>

                      {/* Real-time Market Data */}
                      <div className="text-sm text-green-800 opacity-90">
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-white/30 rounded p-2">
                            <span className="font-medium">Open:</span> $199.80
                            <div className="text-xs">📈 +0.73% from open</div>
                          </div>
                          <div className="bg-white/30 rounded p-2">
                            <span className="font-medium">Prev Close:</span> $198.80
                            <div className="text-xs">Gap: +0.50%</div>
                          </div>
                          <div className="bg-white/30 rounded p-2">
                            <span className="font-medium">Day High:</span> $201.50
                            <div className="text-xs">🎯 Near high</div>
                          </div>
                          <div className="bg-white/30 rounded p-2">
                            <span className="font-medium">Day Low:</span> $198.75
                            <div className="text-xs">1.26% above low</div>
                          </div>
                        </div>

                        <div className="bg-white/30 rounded p-2 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Volume: 95.32M</span>
                            <Badge className="text-xs bg-white/50">📊 High Activity</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Market Analysis */}
                <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-brand-blue" />
                    <span className="font-medium text-brand-blue">Live Market Analysis • ACTIVE TRADING</span>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="text-green-600 font-semibold">
                      ✅ LIVE DATA: Connected to Alpha Vantage API for real-time market changes.
                    </div>

                    <div className="bg-white/50 rounded p-2">
                      <div className="font-medium mb-1">📊 Market Movement Analysis:</div>
                      <div>
                        📈 MODERATE ACTIVITY: Normal trading with 1.23% positive change. Stock showing steady upward
                        momentum during active trading hours.
                      </div>
                    </div>

                    <div className="bg-white/50 rounded p-2">
                      <div className="font-medium mb-1">📈 Today's Trading Range:</div>
                      <div>Range: $198.75 - $201.50 ($2.75 spread)</div>
                      <div className="text-xs">Current position: 91% of daily range</div>
                    </div>

                    <div className="text-blue-600 font-semibold">
                      🔴 LIVE MARKET: Prices updating in real-time during active trading hours.
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Market Cap</div>
                    <div className="font-semibold">$3.002T</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Volume</div>
                    <div className="font-semibold">95.32M</div>
                    <div className="text-xs text-gray-500">Today's activity</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Beta</div>
                    <div className="font-semibold">1.21</div>
                    <div className="text-xs text-gray-500">Market volatility</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">P/E Ratio</div>
                    <div className="font-semibold">31.3</div>
                    <div className="text-xs text-gray-500">Valuation metric</div>
                  </div>
                </div>

                {/* 52-Week Range */}
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="text-sm text-gray-600 mb-2">52-Week Range</div>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-xs text-gray-500">Low: </span>
                      <span className="font-semibold">$164.08</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                      <div className="bg-brand-blue h-3 rounded-full" style={{ width: "77%" }}></div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-medium text-white">
                        77%
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">High: </span>
                      <span className="font-semibold">$260.10</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">📊 Mid-range position</div>
                </div>

                {/* Dividend Yield */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Dividend Yield: 0.53%</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="bg-brand-blue hover:bg-brand-blue/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Portfolio
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Chart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Data Demo: "Get Live Data" Experience</h1>
        <p className="text-gray-600">
          See exactly what happens when you click "Get Live Data" on any stock search result
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? "bg-brand-blue text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 mx-2 ${index < currentStep ? "bg-brand-blue" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-blue" />
            {steps[currentStep].title}
          </CardTitle>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </CardHeader>
        <CardContent>{steps[currentStep].content}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous Step
        </Button>
        <Button
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1)
            } else {
              setCurrentStep(0)
              setShowLiveData(false)
            }
          }}
          className="bg-brand-blue hover:bg-brand-blue/90"
        >
          {currentStep === steps.length - 1 ? "Start Over" : "Next Step"}
        </Button>
      </div>

      {/* Key Features Highlight */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-blue" />
            What You Get with Live Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Real-time price updates</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm">Live daily change percentage</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Trading volume and activity</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Market status (open/closed)</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-blue" />
                <span className="text-sm">Comprehensive market analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm">Key financial metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span className="text-sm">Volatility and risk indicators</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Instant refresh capability</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LiveDataDemo
