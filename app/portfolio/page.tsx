"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useStockSearch } from "@/hooks/use-stock-search"
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  Info,
  X,
  Heart,
  Star,
  ThumbsUp,
  HelpCircle,
  BarChart,
  LineChart,
  Target,
  ListChecks,
  Brain,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { PremiumGuard } from "@/components/premium-guard"

const PortfolioPage = () => {
  const [showInvestmentModal, setShowInvestmentModal] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [liveHoldings, setLiveHoldings] = useState([])
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false)
  const [showBeginnerTutorial, setShowBeginnerTutorial] = useState(false)
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0)
  const [watchlist, setWatchlist] = useState([])
  const [showAddToWatchlist, setShowAddToWatchlist] = useState(false)
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false)
  const [selectedLearningItem, setSelectedLearningItem] = useState(null)
  const [tutorialCompleted, setTutorialCompleted] = useState<boolean | null>(null)

  // Simple beginner-friendly holdings
  const holdings = [
    {
      symbol: "VTI",
      name: "US Stock Market Fund",
      description: "Owns tiny pieces of 4,000+ American companies",
      shares: 25,
      avgCost: 210.45,
      currentPrice: 220.45,
      value: 5511.25,
      change: 2.3,
      allocation: 42.9,
      riskLevel: "Medium",
      beginner: true,
    },
    {
      symbol: "BND",
      name: "Safe Bond Fund",
      description: "Like lending money to the government - very safe",
      shares: 50,
      avgCost: 74.89,
      currentPrice: 75.89,
      value: 3794.5,
      change: 0.5,
      allocation: 29.5,
      riskLevel: "Low",
      beginner: true,
    },
    {
      symbol: "VXUS",
      name: "International Stock Fund",
      description: "Companies from around the world (not US)",
      shares: 40,
      avgCost: 55.32,
      currentPrice: 58.32,
      value: 2332.8,
      change: -1.2,
      allocation: 18.2,
      riskLevel: "Medium",
      beginner: true,
    },
  ]

  // Simple beginner recommendations
  const recommendations = [
    {
      symbol: "SPY",
      name: "S&P 500 Fund",
      description: "The 500 biggest US companies in one fund",
      price: 445.67,
      recommendation: "Great for beginners",
      riskLevel: "Medium",
      whyGood: "Instant diversification across America's top companies",
      beginner: true,
    },
    {
      symbol: "SCHD",
      name: "Dividend Fund",
      description: "Companies that pay you money regularly",
      price: 78.45,
      recommendation: "Good for income",
      riskLevel: "Medium",
      whyGood: "Get paid while you wait for growth",
      beginner: true,
    },
    {
      symbol: "VTI",
      name: "Total US Market",
      description: "Every public US company in one simple fund",
      price: 220.45,
      recommendation: "Perfect starter",
      riskLevel: "Medium",
      whyGood: "Warren Buffett recommends this type of fund",
      beginner: true,
    },
  ]

  const tutorialSteps = [
    {
      target: "total-money",
      title: "This is Your Money! 💰",
      content:
        "This big number shows how much all your investments are worth right now. It changes every day as companies do better or worse - that's totally normal!",
      position: "bottom",
    },
    {
      target: "money-made",
      title: "You're Making Money! 📈",
      content:
        "This green number shows you've made money since you started investing. Even 8.7% is really good - most savings accounts only give you 1%!",
      position: "bottom",
    },
    {
      target: "my-investments-tab",
      title: "Your Investment Collection 📊",
      content:
        "Click here to see what you own. Think of it like owning tiny pieces of thousands of companies - when they make money, you make money!",
      position: "bottom",
    },
    {
      target: "watchlist-tab",
      title: "Your Shopping List 📝",
      content:
        "Add companies you're curious about here! It's like a shopping list for investments - track prices and learn before you buy.",
      position: "bottom",
    },
    {
      target: "beginner-picks-tab",
      title: "Perfect Starter Investments ⭐",
      content:
        "New to investing? These are the safest, smartest choices. Even Warren Buffett (the world's best investor) recommends these types of funds!",
      position: "bottom",
    },
    {
      target: "search-tab",
      title: "Explore & Learn 🔍",
      content:
        "Curious about Apple, Disney, or other companies? Search here to see their prices and learn how the stock market works - no pressure to buy anything!",
      position: "bottom",
    },
  ]

  const { isSearching, searchResults, stockQuotes, error, searchStocks, addStockQuote, removeStockQuote, clearSearch } =
    useStockSearch()

  const portfolioValue = 11638
  const totalReturn = 8.7
  const todayChange = 127

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    searchStocks(query)
  }

  const handleSelectFromSearch = async (result: any) => {
    const quote = await addStockQuote(result.symbol)
    if (quote) {
      setSearchQuery("")
    }
  }

  const handleInvest = (investment: any) => {
    setSelectedInvestment(investment)
    setShowInvestmentModal(true)
  }

  const getSimpleRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600 bg-green-100"
      case "Medium":
        return "text-blue-600 bg-blue-100"
      case "High":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getSimpleChangeDisplay = (change: number) => {
    if (change > 0) {
      return {
        color: "text-green-600",
        icon: TrendingUp,
        text: `+$${Math.abs(change).toFixed(0)} (Going up! 📈)`,
      }
    } else if (change < 0) {
      return {
        color: "text-red-600",
        icon: TrendingDown,
        text: `-$${Math.abs(change).toFixed(0)} (Going down 📉)`,
      }
    } else {
      return {
        color: "text-gray-600",
        icon: DollarSign,
        text: "No change today",
      }
    }
  }

  const addToWatchlist = (stock) => {
    const newWatchlistItem = {
      symbol: stock.symbol,
      name: stock.name,
      addedAt: new Date().toISOString(),
      targetPrice: null,
      notes: "",
    }
    const updatedWatchlist = [...watchlist, newWatchlistItem]
    setWatchlist(updatedWatchlist)
    localStorage.setItem("portfolio-watchlist", JSON.stringify(updatedWatchlist))

    // Show success feedback
    console.log(`✅ Added ${stock.symbol} to your watchlist!`)
  }

  const removeFromWatchlist = (symbol) => {
    const updatedWatchlist = watchlist.filter((item) => item.symbol !== symbol)
    setWatchlist(updatedWatchlist)
    localStorage.setItem("portfolio-watchlist", JSON.stringify(updatedWatchlist))
  }

  const isInWatchlist = (symbol) => {
    return watchlist.some((item) => item.symbol === symbol)
  }

  const handleLearnMore = (investment) => {
    setSelectedLearningItem(investment)
    setShowLearnMoreModal(true)
  }

  const handleExploreSimilar = (fund) => {
    // Navigate to dedicated search interface
    setSearchQuery(fund.symbol)
    // Switch to search tab and focus on advanced search
    const searchTab = document.querySelector('[value="advanced-search"]')
    if (searchTab) {
      searchTab.click()
    }
  }

  // Fetch live data for portfolio holdings
  useEffect(() => {
    const fetchPortfolioLiveData = async () => {
      setIsLoadingPortfolio(true)
      try {
        const symbols = holdings.map((h) => h.symbol)
        console.log(`🔄 Getting live prices for: ${symbols.join(", ")}`)

        const liveQuotes = await Promise.all(
          symbols.map(async (symbol) => {
            try {
              const response = await fetch(`/api/stocks/quote?symbol=${symbol}`)
              if (response.ok) {
                const data = await response.json()
                return data.success ? data.data : null
              }
            } catch (error) {
              console.error(`Error getting price for ${symbol}:`, error)
            }
            return null
          }),
        )

        const updatedHoldings = holdings.map((holding, index) => {
          const liveData = liveQuotes[index]
          if (liveData) {
            const newPrice = liveData.price
            const newValue = holding.shares * newPrice
            const newChange = ((newPrice - holding.avgCost) / holding.avgCost) * 100

            return {
              ...holding,
              currentPrice: newPrice,
              value: newValue,
              change: newChange,
              liveData: {
                price: newPrice,
                change: liveData.change,
                changePercent: liveData.changePercent,
                isLive: true,
              },
            }
          }
          return {
            ...holding,
            liveData: { isLive: false },
          }
        })

        setLiveHoldings(updatedHoldings)
      } catch (error) {
        console.error("Failed to get live prices:", error)
        setLiveHoldings(
          holdings.map((h) => ({
            ...h,
            liveData: { isLive: false },
          })),
        )
      } finally {
        setIsLoadingPortfolio(false)
      }
    }

    fetchPortfolioLiveData()
    const interval = setInterval(fetchPortfolioLiveData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Load watchlist from localStorage
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("portfolio-watchlist")
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
  }, [])

  useEffect(() => {
    // runs only in the browser
    const completed = typeof window !== "undefined" && localStorage.getItem("portfolio-tutorial-completed") === "true"
    setTutorialCompleted(completed)
  }, [])

  const livePortfolioValue = liveHoldings.reduce((sum, holding) => sum + holding.value, 0)
  const liveTotalReturn =
    ((livePortfolioValue - holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0)) /
      holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0)) *
    100

  return (
    <PremiumGuard>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
          {/* Simple Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <PieChart className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Smart Budget Dashboard</h1>
            </div>
            <p className="text-gray-600 text-base lg:text-lg">Take control of your finances and achieve your goals</p>
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">What is this?</span>
              </div>
              <p className="text-blue-700 text-sm">
                This dashboard helps you manage your budget, track your spending, and reach your financial goals with
                smart insights and AI-powered coaching.
              </p>
            </div>
          </div>

          {/* Beginner Welcome Banner */}
          {tutorialCompleted === false && (
            <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-xl p-4 lg:p-6 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="text-xl lg:text-2xl">🎉 Welcome to Your Smart Budget Dashboard! 🎉</div>
                <p className="text-base lg:text-lg text-gray-700">
                  Let's get your finances in order with easy-to-use tools and helpful tips.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={() => setShowBeginnerTutorial(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                  >
                    🚀 Show Me Around (2 minutes)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.setItem("portfolio-tutorial-completed", "true")
                      setTutorialCompleted(true)
                    }}
                  >
                    I'll Figure It Out
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Simple Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <Card className="text-center" id="total-money">
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Monthly Budget Overview</CardTitle>
                <CardDescription>Budget vs Actual Spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">$3,500 / $4,000</div>
                <Progress value={87.5} className="mt-4" />
                <p className="text-sm text-gray-600 mt-2">87.5% of your budget spent</p>
              </CardContent>
            </Card>

            <Card className="text-center" id="money-made">
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Financial Health Score</CardTitle>
                <CardDescription>How healthy is your financial situation?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl lg:text-3xl font-bold text-green-600">78 / 100</div>
                <p className="text-sm text-gray-600 mt-2">Good job! Keep it up.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Savings Goal Progress</CardTitle>
                <CardDescription>Progress towards your savings goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl lg:text-3xl font-bold text-green-600">60%</div>
                <Progress value={60} className="mt-4" />
                <p className="text-sm text-gray-600 mt-2">Keep saving!</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="budget-overview" className="space-y-4 lg:space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5" id="portfolio-tabs">
              <TabsTrigger value="budget-overview" id="my-investments-tab" className="text-xs lg:text-sm">
                Budget Overview
              </TabsTrigger>
              <TabsTrigger value="smart-insights" id="watchlist-tab" className="text-xs lg:text-sm">
                Smart Insights
              </TabsTrigger>
              <TabsTrigger value="goal-tracking" id="beginner-picks-tab" className="text-xs lg:text-sm">
                Goal Tracking
              </TabsTrigger>
              <TabsTrigger value="transaction-categories" id="search-tab" className="text-xs lg:text-sm">
                Transaction Categories
              </TabsTrigger>
              <TabsTrigger value="ai-coaching" id="advanced-search-tab" className="text-xs lg:text-sm">
                AI Coaching
              </TabsTrigger>
            </TabsList>

            <TabsContent value="budget-overview" className="space-y-4 lg:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-red-500" />
                    Budget Overview
                  </CardTitle>
                  <CardDescription>Your spending vs budget</CardDescription>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Beginner Status: You're Doing Great! 🌟</span>
                    </div>
                    <div className="text-green-700 text-sm">
                      ✅ You're tracking your expenses
                      <br />✅ You're staying within your budget
                      <br />✅ You're making progress towards your goals
                      <br />🎯 Next step: Keep it up!
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div>
                              <div className="font-bold text-lg flex items-center gap-2">Groceries</div>
                              <div className="text-sm text-gray-600 mb-1">Spending on groceries</div>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs px-2 py-1 rounded text-blue-600 bg-blue-100`}>
                                  Essential
                                </Badge>
                                <span className="text-xs text-gray-500">Budget: $500</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl lg:text-2xl font-bold">$450</div>
                          <div className="text-base lg:text-lg text-gray-600">Spent this month</div>
                          <div className={`text-sm flex items-center justify-end text-green-600 font-medium`}>
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Within budget
                          </div>
                        </div>
                      </div>

                      {/* Simple explanation */}
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-700">
                          <strong>What this means:</strong> You're doing a great job staying within your grocery budget!
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div>
                              <div className="font-bold text-lg flex items-center gap-2">Entertainment</div>
                              <div className="text-sm text-gray-600 mb-1">Spending on entertainment</div>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs px-2 py-1 rounded text-orange-600 bg-orange-100`}>
                                  Discretionary
                                </Badge>
                                <span className="text-xs text-gray-500">Budget: $200</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl lg:text-2xl font-bold">$250</div>
                          <div className="text-base lg:text-lg text-gray-600">Spent this month</div>
                          <div className={`text-sm flex items-center justify-end text-red-600 font-medium`}>
                            <TrendingDown className="w-4 h-4 mr-1" />
                            Over budget
                          </div>
                        </div>
                      </div>

                      {/* Simple explanation */}
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-700">
                          <strong>What this means:</strong> You've exceeded your entertainment budget. Consider cutting
                          back next month.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simple portfolio explanation */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Why is budgeting important?</span>
                    </div>
                    <div className="text-blue-700 text-sm space-y-2">
                      <p>
                        • <strong>Control:</strong> You have control over where your money goes
                      </p>
                      <p>
                        • <strong>Awareness:</strong> You're aware of your spending habits
                      </p>
                      <p>
                        • <strong>Goals:</strong> You can achieve your financial goals faster
                      </p>
                    </div>
                  </div>
                  {/* What Happens Next - Beginner Guidance */}
                  <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-800">What Should I Do Next?</span>
                    </div>
                    <div className="text-purple-700 text-sm space-y-2">
                      <p>
                        🎯 <strong>Review your spending:</strong> Identify areas where you can cut back
                      </p>
                      <p>
                        💰 <strong>Set realistic budgets:</strong> Make sure your budgets are achievable
                      </p>
                      <p>
                        ⏰ <strong>Track your progress:</strong> Monitor your spending regularly
                      </p>
                      <p>
                        📚 <strong>Learn more:</strong> Check the Smart Insights tab for tips
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="smart-insights" className="space-y-4 lg:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-yellow-500" />
                    Smart Insights
                  </CardTitle>
                  <CardDescription>Personalized tips to improve your finances</CardDescription>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">What are Smart Insights?</span>
                    </div>
                    <div className="text-blue-700 text-sm">
                      We analyze your spending and provide personalized tips to help you save money and achieve your
                      financial goals.
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg">Reduce Dining Out</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">You're spending a lot on dining out.</p>

                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-xl font-bold text-blue-600 mb-1">Save $100/month</div>
                            <div className={`text-sm flex items-center text-green-600`}>
                              <TrendingUp className="w-4 h-4 mr-1" />
                              Reduce dining out by 20%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg">Negotiate Bills</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">You can negotiate your internet bill.</p>

                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-xl font-bold text-blue-600 mb-1">Save $50/month</div>
                            <div className={`text-sm flex items-center text-green-600`}>
                              <TrendingUp className="w-4 h-4 mr-1" />
                              Call your provider and negotiate
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goal-tracking" className="space-y-4 lg:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-500" />
                    Goal Tracking
                  </CardTitle>
                  <CardDescription>Track your progress towards your financial goals</CardDescription>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-800 mb-2">Set Your Goals!</div>
                      <div className="text-blue-700 text-sm">
                        What are you saving for? A house? A car? Track your progress here!
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">Save for a Down Payment</h3>
                          </div>
                          <p className="text-gray-600 mb-2">Saving for a down payment on a house</p>
                          <Progress value={60} className="mt-4" />
                          <span className="text-sm font-medium">60% Complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">Pay off Credit Card Debt</h3>
                          </div>
                          <p className="text-gray-600 mb-2">Paying off credit card debt</p>
                          <Progress value={30} className="mt-4" />
                          <span className="text-sm font-medium">30% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What Happens Next - Beginner Guidance */}
                  <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-800">Tips for Goal Tracking</span>
                    </div>
                    <div className="text-purple-700 text-sm space-y-2">
                      <p>
                        🎯 <strong>Set clear goals:</strong> Define what you want to achieve
                      </p>
                      <p>
                        💰 <strong>Track your progress:</strong> Monitor your progress regularly
                      </p>
                      <p>
                        ⏰ <strong>Stay motivated:</strong> Keep your goals in mind
                      </p>
                      <p>
                        📚 <strong>Adjust as needed:</strong> Be flexible and adjust your goals as needed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transaction-categories" className="space-y-4 lg:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-blue-500" />
                    Transaction Categories
                  </CardTitle>
                  <CardDescription>Categorize your transactions to understand your spending</CardDescription>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">How to Use This</span>
                    </div>
                    <div className="text-blue-700 text-sm">
                      Categorize your transactions to see where your money is going.
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="search"
                        placeholder="Search for a transaction..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      {isSearching && <p className="text-gray-500 text-sm">Searching...</p>}
                      {error && <p className="text-red-500 text-sm">Error: {error}</p>}
                    </div>

                    {searchResults.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium">Search Results</h4>
                        <ul className="space-y-1">
                          {searchResults.map((result) => (
                            <li
                              key={result.symbol}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleSelectFromSearch(result)}
                            >
                              <div className="min-w-0 flex-1">
                                <p className="font-medium truncate"></p>
                                <p className="text-sm text-gray-500">{result.symbol}</p>
                              </div>
                              <Button size="sm" variant="outline" className="flex-shrink-0 bg-transparent">
                                Select
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {stockQuotes.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium">Your Stocks</h4>
                        <ul className="space-y-4">
                          {stockQuotes.map((quote) => (
                            <li key={quote.symbol} className="border rounded-lg p-4 bg-white">
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-bold text-lg">{quote.symbol}</h4>
                                    <Badge variant="outline" className="text-xs">
                                      Realtime Quote
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2 truncate">{quote.name}</p>
                                  <div className="bg-blue-50 rounded-lg p-3">
                                    <div className="text-xl font-bold text-blue-600 mb-1">
                                      ${quote.price.toFixed(2)}
                                    </div>
                                    <div
                                      className={`text-sm flex items-center ${
                                        quote.changePercent >= 0 ? "text-green-600" : "text-red-600"
                                      }`}
                                    >
                                      {quote.changePercent >= 0 ? (
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                      ) : (
                                        <TrendingDown className="w-4 h-4 mr-1" />
                                      )}
                                      {quote.changePercent >= 0 ? "+" : ""}
                                      {quote.changePercent.toFixed(2)}% today
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2 flex-shrink-0">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleInvest({
                                        symbol: quote.symbol,
                                        name: quote.name,
                                        price: quote.price,
                                        recommendation: "From your search",
                                        riskLevel: "Medium",
                                        whyGood: "You've been tracking this stock",
                                      })
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Invest
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      if (!isInWatchlist(quote.symbol)) {
                                        addToWatchlist(quote)
                                      }
                                    }}
                                    disabled={isInWatchlist(quote.symbol)}
                                    className={isInWatchlist(quote.symbol) ? "bg-green-100 text-green-800" : ""}
                                  >
                                    <Heart
                                      className={`w-4 h-4 mr-1 ${isInWatchlist(quote.symbol) ? "fill-current" : ""}`}
                                    />
                                    {isInWatchlist(quote.symbol) ? "In Watchlist" : "Add to Watchlist"}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeStockQuote(quote.symbol)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" onClick={clearSearch}>
                          Clear All
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-coaching" className="space-y-4 lg:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    AI Coaching
                  </CardTitle>
                  <CardDescription>Get personalized financial advice from our AI coach</CardDescription>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-800">AI-Powered Advice</span>
                    </div>
                    <div className="text-purple-700 text-sm">
                      Our AI coach analyzes your financial data and provides personalized advice to help you achieve
                      your goals.
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Search Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Question</label>
                        <Input
                          type="search"
                          placeholder="Ask a question..."
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Search Results */}
                    {isSearching && (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Searching for stocks...</p>
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600">Error: {error}</p>
                      </div>
                    )}

                    {searchResults.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          Search Results ({searchResults.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {searchResults.map((result) => (
                            <div
                              key={result.symbol}
                              className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h5 className="font-bold text-lg">{result.symbol}</h5>
                                  <p className="text-sm text-gray-600">{result.name}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {result.type || "Stock"}
                                </Badge>
                              </div>

                              <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Current Price:</span>
                                  <span className="font-medium">Loading...</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Learn More Modal */}
        {showLearnMoreModal && selectedLearningItem && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-800">📚 Learn About {selectedLearningItem.name}</h2>
                <Button variant="outline" size="sm" onClick={() => setShowLearnMoreModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-800 mb-2">What is {selectedLearningItem.name}?</h3>
                  <p className="text-blue-700 text-sm mb-3">{selectedLearningItem.description}</p>
                  <div className="flex items-center gap-4">
                    <Badge
                      className={`text-xs px-2 py-1 rounded ${getSimpleRiskColor(selectedLearningItem.riskLevel)}`}
                    >
                      {selectedLearningItem.riskLevel} Risk
                    </Badge>
                    <span className="text-sm font-medium">${selectedLearningItem.price.toFixed(2)} per share</span>
                  </div>
                </div>

                {/* Why It's Good */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    Why This Investment is Great for Beginners
                  </h3>
                  <p className="text-green-700 text-sm">{selectedLearningItem.whyGood}</p>
                </div>

                {/* Detailed Explanation */}
                <div className="space-y-4">
                  {selectedLearningItem.symbol === "SPY" && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-bold mb-2">🏢 What You Actually Own</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        When you buy SPY, you instantly own tiny pieces of 500 of America's biggest companies including:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>• Apple (Technology)</div>
                        <div>• Microsoft (Technology)</div>
                        <div>• Amazon (E-commerce)</div>
                        <div>• Google (Internet)</div>
                        <div>• Tesla (Electric Cars)</div>
                        <div>• Johnson & Johnson (Healthcare)</div>
                      </div>
                      <p className="text-sm text-gray-700 mt-3">
                        <strong>The Magic:</strong> If any one company fails, you still own 499 others!
                      </p>
                    </div>
                  )}

                  {selectedLearningItem.symbol === "SCHD" && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-bold mb-2">💰 How Dividends Work</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        SCHD focuses on companies that regularly pay you money (called dividends) just for owning their
                        stock.
                      </p>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>• Companies like Coca-Cola pay you every 3 months</div>
                        <div>• You get paid even if the stock price doesn't go up</div>
                        <div>• It's like getting rent from your investments</div>
                        <div>• Perfect for people who want regular income</div>
                      </div>
                      <p className="text-sm text-gray-700 mt-3">
                        <strong>Example:</strong> If you own $1,000 of SCHD, you might get $30-40 per year in dividend
                        payments!
                      </p>
                    </div>
                  )}

                  {selectedLearningItem.symbol === "VTI" && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-bold mb-2">🇺🇸 The Entire US Stock Market</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        VTI is like buying a tiny piece of every public company in America - over 4,000 companies!
                      </p>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>• Big companies (Apple, Microsoft) - 80%</div>
                        <div>• Medium companies - 15%</div>
                        <div>• Small growing companies - 5%</div>
                        <div>• Costs only 0.03% per year (super cheap!)</div>
                      </div>
                      <p className="text-sm text-gray-700 mt-3">
                        <strong>Warren Buffett says:</strong> "Just buy the whole market and hold forever. Most people
                        can't beat it."
                      </p>
                    </div>
                  )}
                </div>

                {/* Beginner Tips */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Beginner Tips for {selectedLearningItem.name}
                  </h3>
                  <div className="text-yellow-700 text-sm space-y-2">
                    <p>
                      • <strong>Start small:</strong> You can buy just 1 share to begin
                    </p>
                    <p>
                      • <strong>Dollar-cost average:</strong> Buy a little bit every month
                    </p>
                    <p>
                      • <strong>Be patient:</strong> These investments work best over 5+ years
                    </p>
                    <p>
                      • <strong>Don't panic:</strong> Prices will go up and down - that's normal
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    onClick={() => {
                      setShowLearnMoreModal(false)
                      handleInvest(selectedLearningItem)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    I'm Ready to Invest
                  </Button>
                  <Button variant="outline" onClick={() => setShowLearnMoreModal(false)} className="flex-1">
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Beginner Tutorial Modal */}
        {showBeginnerTutorial && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{tutorialSteps[currentTutorialStep].title}</h2>
              <p className="text-gray-700 mb-6">{tutorialSteps[currentTutorialStep].content}</p>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  disabled={currentTutorialStep === 0}
                  onClick={() => setCurrentTutorialStep(currentTutorialStep - 1)}
                >
                  Previous
                </Button>
                {currentTutorialStep === tutorialSteps.length - 1 ? (
                  <Button
                    onClick={() => {
                      setShowBeginnerTutorial(false)
                      localStorage.setItem("portfolio-tutorial-completed", "true")
                      setTutorialCompleted(true)
                    }}
                  >
                    Finish Tutorial
                  </Button>
                ) : (
                  <Button onClick={() => setCurrentTutorialStep(currentTutorialStep + 1)}>Next</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PremiumGuard>
  )
}

export default PortfolioPage
