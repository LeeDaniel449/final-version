"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, Eye, EyeOff, ArrowLeft, DollarSign } from "lucide-react"
import { userDataManager } from "@/lib/user-data"

export default function SignInPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!emailOrUsername || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    // Simulate API call delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Try to authenticate the user
      const authResult = userDataManager.authenticateUser(emailOrUsername, password)

      if (!authResult.success) {
        setError(authResult.error || "Invalid username or password")
        setIsLoading(false)
        return
      }

      console.log("Authentication successful, setting user as signed in...")

      // Set user as signed in
      userDataManager.setUserSignedIn(true)

      // Set remember me preference
      if (rememberMe) {
        userDataManager.setRememberMe(true)
      }

      console.log("Dispatching events to update sidebar...")

      // Force multiple updates to ensure sidebar catches the change
      const dispatchEvents = () => {
        window.dispatchEvent(new CustomEvent("userSignedIn"))
        window.dispatchEvent(new CustomEvent("userDataUpdated"))

        // Manually trigger storage events
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "wealthwise_signed_in",
            newValue: "true",
            storageArea: localStorage,
          }),
        )

        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "wealthwise_user_profile",
            newValue: JSON.stringify(userDataManager.getUserProfile()),
            storageArea: localStorage,
          }),
        )
      }

      // Dispatch events multiple times with delays
      dispatchEvents()
      setTimeout(dispatchEvents, 100)
      setTimeout(dispatchEvents, 300)
      setTimeout(dispatchEvents, 500)

      console.log("Sign in successful:", { emailOrUsername })

      // Redirect after a longer delay to ensure sidebar updates
      setTimeout(() => {
        router.push("/")
      }, 800)
    } catch (err) {
      console.error("Sign in error:", err)
      setError("Sign in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">WealthWise</h1>
          </div>
          <p className="text-gray-600">Welcome back to your financial journey</p>
        </div>

        {/* Sign In Form */}
        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-blue-800">
              <LogIn className="w-5 h-5" />
              Sign In
            </CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="emailOrUsername" className="text-blue-700">
                  Email or Username
                </Label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="Enter your email or username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-blue-300 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Create one here
            </Link>
          </p>
        </div>

        {/* Demo Info */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-green-800 mb-2">🚀 Demo Accounts</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>
                <strong>Demo User:</strong> demo@example.com / password123
              </p>
              <p>
                <strong>Test User:</strong> testuser / testpass
              </p>
              <p>Or create your own account to get started!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
