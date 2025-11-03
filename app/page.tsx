import { PremiumGate } from "@/components/premium-gate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Target, PieChart, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            WealthLink
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent financial companion for smarter investing and wealth management
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/portfolio">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <PieChart className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>Track and manage your investments</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/goals">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <Target className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Goals</CardTitle>
                <CardDescription>Set and achieve financial goals</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/budget">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <TrendingUp className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Budget</CardTitle>
                <CardDescription>Plan your spending wisely</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/learning">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <BookOpen className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Learning</CardTitle>
                <CardDescription>Expand your financial knowledge</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Premium Features Section */}
        <PremiumGate>
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">Premium Features</CardTitle>
              <CardDescription>Unlock advanced tools and insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/portfolio-optimizer">
                  <Button variant="outline" className="w-full justify-between h-auto py-4 bg-transparent">
                    <span>Portfolio Optimizer</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/mismatch-detector">
                  <Button variant="outline" className="w-full justify-between h-auto py-4 bg-transparent">
                    <span>Mismatch Detector</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/portfolio-implementation">
                  <Button variant="outline" className="w-full justify-between h-auto py-4 bg-transparent">
                    <span>Implementation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </PremiumGate>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link href="/subscribe">
            <Button size="lg" className="text-lg px-8">
              Get Premium Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
