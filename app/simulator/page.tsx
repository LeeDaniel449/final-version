"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Gamepad2, Trophy, Target } from "lucide-react"

export default function SimulatorPage() {
  const [virtualBalance, setVirtualBalance] = useState(100000)
  const [portfolioValue, setPortfolioValue] = useState(87432)
  const [totalReturn, setTotalReturn] = useState(12.7)

  const holdings = [
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF", shares: 150, price: 220.45, value: 33067.5, change: 2.3 },
    {
      symbol: "VXUS",
      name: "Vanguard Total International Stock ETF",
      shares: 200,
      price: 58.32,
      value: 11664.0,
      change: -1.2,
    },
    { symbol: "BND", name: "Vanguard Total Bond Market ETF", shares: 300, price: 75.89, value: 22767.0, change: 0.5 },
    { symbol: "VNQ", name: "Vanguard Real Estate ETF", shares: 100, price: 89.15, value: 8915.0, change: 1.8 },
  ]

  const watchlist = [
    { symbol: "SPY", name: "SPDR S&P 500 ETF", price: 445.67, change: 1.2 },
    { symbol: "QQQ", name: "Invesco QQQ ETF", price: 378.92, change: -0.8 },
    { symbol: "IWM", name: "iShares Russell 2000 ETF", price: 198.34, change: 2.1 },
    { symbol: "EFA", name: "iShares MSCI EAFE ETF", price: 67.89, change: -0.3 },
  ]

  const achievements = [
    { title: "First Investment", description: "Made your first virtual investment", earned: true },
    { title: "Diversified Portfolio", description: "Hold 5+ different investments", earned: true },
    { title: "Profit Maker", description: "Achieve 10%+ returns", earned: true },
    { title: "Risk Manager", description: "Maintain balanced allocation", earned: false },
    { title: "Long-term Investor", description: "Hold investments for 30+ days", earned: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Gamepad2 className="w-8 h-8 text-blue-600" />
              Market Simulator
            </h1>
            <p className="text-gray-600">Practice investing with virtual money - no real risk!</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Virtual Balance</div>
            <div className="text-2xl font-bold text-green-600">${virtualBalance.toLocaleString()}</div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />+{totalReturn}% total return
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$1,247</div>
              <p className="text-xs text-muted-foreground">+1.45% today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Profitable trades</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/5</div>
              <p className="text-xs text-muted-foreground">Unlocked</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="trade">Trade</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Your Holdings
                </CardTitle>
                <CardDescription>Current positions in your virtual portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding) => (
                    <div key={holding.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold">{holding.symbol}</div>
                        <div className="text-sm text-gray-600">{holding.name}</div>
                        <div className="text-sm text-gray-500">
                          {holding.shares} shares @ ${holding.price}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${holding.value.toLocaleString()}</div>
                        <div
                          className={`text-sm flex items-center ${holding.change >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {holding.change >= 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {holding.change >= 0 ? "+" : ""}
                          {holding.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trade" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Place Order</CardTitle>
                  <CardDescription>Buy or sell investments with virtual money</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Symbol</label>
                    <Input placeholder="Enter stock symbol (e.g., VTI)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Order Type</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Market Order</option>
                        <option>Limit Order</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Action</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Buy</option>
                        <option>Sell</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input type="number" placeholder="Number of shares" />
                  </div>
                  <Button className="w-full">Place Order</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Data</CardTitle>
                  <CardDescription>Real-time market information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-semibold">S&P 500</div>
                        <div className="text-sm text-gray-600">SPY</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">$445.67</div>
                        <div className="text-green-600 text-sm">+1.2%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-semibold">NASDAQ</div>
                        <div className="text-sm text-gray-600">QQQ</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">$378.92</div>
                        <div className="text-red-600 text-sm">-0.8%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Watchlist
                </CardTitle>
                <CardDescription>Track investments you're interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchlist.map((item) => (
                    <div key={item.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-semibold">{item.symbol}</div>
                        <div className="text-sm text-gray-600">{item.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${item.price}</div>
                        <div
                          className={`text-sm flex items-center ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.change >= 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {item.change >= 0 ? "+" : ""}
                          {item.change}%
                        </div>
                      </div>
                      <Button size="sm">Trade</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Achievements
                </CardTitle>
                <CardDescription>Unlock rewards as you learn and practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? "bg-green-500" : "bg-gray-400"}`}
                        >
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{achievement.title}</div>
                          <div className="text-sm text-gray-600">{achievement.description}</div>
                        </div>
                      </div>
                      {achievement.earned && <Badge className="mt-2 bg-green-100 text-green-800">Earned</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
