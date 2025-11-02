"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  Star,
  Trophy,
  Target,
  TrendingUp,
  BookOpen,
  Calendar,
  DollarSign,
  Users,
  Zap,
  Gift,
  Crown,
  Medal,
  LogIn,
} from "lucide-react"
import Link from "next/link"

const RewardsPage = () => {
  const { user, isLoaded } = useUser()

  const [userProgress, setUserProgress] = useState({
    totalPoints: 850,
    level: 9,
    currentStreak: 12,
    completedLessons: 15,
    portfolioValue: 11638,
    investmentsMade: 3,
    daysActive: 45,
  })

  const achievements = [
    {
      id: 1,
      title: "First Investment",
      description: "Made your very first investment",
      icon: DollarSign,
      points: 100,
      completed: true,
      completedAt: "2024-01-15",
      category: "investing",
    },
    {
      id: 2,
      title: "Learning Streak",
      description: "Completed lessons for 7 days in a row",
      icon: Calendar,
      points: 150,
      completed: true,
      completedAt: "2024-01-20",
      category: "learning",
    },
    {
      id: 3,
      title: "Diversification Master",
      description: "Own investments in 3 different asset classes",
      icon: Target,
      points: 200,
      completed: true,
      completedAt: "2024-01-25",
      category: "investing",
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Complete 10 learning modules",
      icon: BookOpen,
      points: 250,
      completed: false,
      progress: 60,
      category: "learning",
    },
    {
      id: 5,
      title: "Portfolio Builder",
      description: "Reach $10,000 in portfolio value",
      icon: TrendingUp,
      points: 300,
      completed: true,
      completedAt: "2024-02-01",
      category: "investing",
    },
    {
      id: 6,
      title: "Consistency Champion",
      description: "Log in for 30 consecutive days",
      icon: Crown,
      points: 400,
      completed: false,
      progress: 80,
      category: "engagement",
    },
  ]

  const rewards = [
    {
      id: 1,
      title: "Free Stock Research Report",
      description: "Get a detailed analysis of any stock",
      pointsCost: 500,
      available: true,
      category: "tools",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Portfolio Review Session",
      description: "30-minute consultation with a financial advisor",
      pointsCost: 1000,
      available: false,
      category: "consultation",
      icon: Users,
    },
    {
      id: 3,
      title: "Premium Features (1 Month)",
      description: "Access advanced analytics and tools",
      pointsCost: 750,
      available: true,
      category: "premium",
      icon: Crown,
    },
    {
      id: 4,
      title: "Investment Course Bundle",
      description: "Complete beginner to advanced investing course",
      pointsCost: 1200,
      available: true,
      category: "education",
      icon: Medal,
    },
  ]

  const getAchievementColor = (category: string) => {
    switch (category) {
      case "investing":
        return "bg-green-100 text-green-800 border-green-200"
      case "learning":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "engagement":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRewardColor = (category: string) => {
    switch (category) {
      case "tools":
        return "bg-blue-50 border-blue-200"
      case "consultation":
        return "bg-green-50 border-green-200"
      case "premium":
        return "bg-purple-50 border-purple-200"
      case "education":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const completedAchievements = achievements.filter((a) => a.completed)
  const inProgressAchievements = achievements.filter((a) => !a.completed)

  if (isLoaded && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Award className="w-8 h-8 text-yellow-600" />
              <h1 className="text-3xl font-bold text-gray-900">Rewards & Achievements</h1>
            </div>
            <p className="text-gray-600 text-lg">Earn points and unlock rewards as you learn and invest</p>
          </div>

          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <LogIn className="h-12 w-12 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">Sign In to Start Earning Rewards</h3>
              <p className="text-yellow-800 mb-6 max-w-md mx-auto">
                Sign in to track your achievements, earn points, and unlock exclusive rewards.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Link href="/sign-in">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Award className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">Rewards & Achievements</h1>
          </div>
          <p className="text-gray-600 text-lg">Earn points and unlock rewards as you learn and invest</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-700">{userProgress.totalPoints}</div>
              <p className="text-sm text-yellow-600 mt-1">Keep earning!</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <Crown className="w-5 h-5 text-purple-600" />
                Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">{userProgress.level}</div>
              <p className="text-sm text-purple-600 mt-1">Financial Learner</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-green-100 to-emerald-100 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{userProgress.currentStreak}</div>
              <p className="text-sm text-green-600 mt-1">days in a row!</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{completedAchievements.length}</div>
              <p className="text-sm text-blue-600 mt-1">of {achievements.length} unlocked</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {/* Completed Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Completed Achievements
                </CardTitle>
                <CardDescription>Great job! You've unlocked these achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedAchievements.map((achievement) => {
                    const IconComponent = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className={`border-2 rounded-lg p-4 ${getAchievementColor(achievement.category)} relative`}
                      >
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            {achievement.points} pts
                          </Badge>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-white/50 rounded-lg">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                            <p className="text-sm mb-2">{achievement.description}</p>
                            <div className="text-xs text-gray-600">
                              Completed on {new Date(achievement.completedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* In Progress Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  In Progress
                </CardTitle>
                <CardDescription>Keep going! You're making great progress on these</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inProgressAchievements.map((achievement) => {
                    const IconComponent = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 relative"
                      >
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline">
                            <Gift className="w-3 h-3 mr-1" />
                            {achievement.points} pts
                          </Badge>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <IconComponent className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1 text-gray-700">{achievement.title}</h3>
                            <p className="text-sm mb-3 text-gray-600">{achievement.description}</p>
                            {achievement.progress && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-600">
                                  <span>Progress</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-600" />
                  Rewards Store
                </CardTitle>
                <CardDescription>
                  Spend your points on valuable rewards and tools
                  <div className="mt-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      You have {userProgress.totalPoints} points to spend
                    </Badge>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rewards.map((reward) => {
                    const IconComponent = reward.icon
                    const canAfford = userProgress.totalPoints >= reward.pointsCost

                    return (
                      <div
                        key={reward.id}
                        className={`border-2 rounded-lg p-4 ${getRewardColor(reward.category)} ${
                          !canAfford ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div className="p-3 bg-white rounded-lg">
                            <IconComponent className="w-8 h-8 text-gray-700" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{reward.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-purple-100 text-purple-800">
                                <Star className="w-3 h-3 mr-1" />
                                {reward.pointsCost} points
                              </Badge>
                              {!reward.available && (
                                <Badge variant="outline" className="text-gray-500">
                                  Coming Soon
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          disabled={!canAfford || !reward.available}
                          variant={canAfford && reward.available ? "default" : "outline"}
                        >
                          {!reward.available
                            ? "Coming Soon"
                            : !canAfford
                              ? `Need ${reward.pointsCost - userProgress.totalPoints} more points`
                              : "Redeem Reward"}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* How to Earn More Points */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  How to Earn More Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Complete Lessons</h4>
                    <p className="text-sm text-gray-600">Earn 50-100 points per lesson</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Make Investments</h4>
                    <p className="text-sm text-gray-600">Get 200+ points for each investment</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Daily Login</h4>
                    <p className="text-sm text-gray-600">Earn 25 points just for checking in</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default RewardsPage
