"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Bell,
  Shield,
  Smartphone,
  Mail,
  Download,
  Trash2,
  SettingsIcon,
  HelpCircle,
  BookOpen,
  Eye,
  EyeOff,
  CheckCircle,
  LogIn,
} from "lucide-react"
import { userDataManager, type UserProfile } from "@/lib/user-data"

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: false,
  })
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    personalization: true,
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedProfile = userDataManager.getUserProfile()

    // Strip out any old blob: URLs that are no longer valid
    if (storedProfile?.profileImage?.startsWith("blob:")) {
      delete storedProfile.profileImage
      userDataManager.saveUserProfile(storedProfile)
    }

    setUserProfile(storedProfile)
    setProfileImage(storedProfile?.profileImage ?? null)
  }, [])

  const handleProfileUpdate = (field: string, value: string) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, [field]: value }
      setUserProfile(updatedProfile)
      userDataManager.saveUserProfile(updatedProfile)
    }
  }

  const handlePasswordChange = () => {
    setPasswordError("")
    setPasswordSuccess("")

    // Validate current password
    if (userProfile?.password && currentPassword !== userProfile.password) {
      setPasswordError("Current password is incorrect")
      return
    }

    // Validate new password
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long")
      return
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    // Update password
    if (userProfile) {
      const updatedProfile = { ...userProfile, password: newPassword }
      setUserProfile(updatedProfile)
      userDataManager.saveUserProfile(updatedProfile)

      // Clear form
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setPasswordSuccess("Password updated successfully!")

      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(""), 3000)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setProfileImage(imageUrl)
        if (userProfile) {
          const updatedProfile = { ...userProfile, profileImage: imageUrl }
          setUserProfile(updatedProfile)
          userDataManager.saveUserProfile(updatedProfile)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = document.createElement("video")
          video.srcObject = stream
          video.play()

          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")

          video.addEventListener("loadedmetadata", () => {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            setTimeout(() => {
              context?.drawImage(video, 0, 0)
              const imageUrl = canvas.toDataURL("image/png")
              setProfileImage(imageUrl)

              if (userProfile) {
                const updatedProfile = { ...userProfile, profileImage: imageUrl }
                setUserProfile(updatedProfile)
                userDataManager.saveUserProfile(updatedProfile)
              }

              stream.getTracks().forEach((track) => track.stop())
            }, 3000) // Capture after 3 seconds
          })
        })
        .catch((error) => {
          console.error("Error accessing camera:", error)
          alert("Camera access denied or not available")
        })
    } else {
      alert("Camera not supported on this device")
    }
  }

  const handleRemovePhoto = () => {
    setProfileImage(null)
    if (userProfile) {
      const updatedProfile = { ...userProfile, profileImage: undefined }
      setUserProfile(updatedProfile)
      userDataManager.saveUserProfile(updatedProfile)
    }
  }

  const handleExportData = () => {
    const userData = {
      profile: userDataManager.getUserProfile(),
      progress: userDataManager.getUserProgress(),
      portfolio: userDataManager.getGoals(),
      goals: userDataManager.getGoals(),
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "wealthwise-data.json"
    link.click()
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      userDataManager.clearAllData()
      window.location.href = "/onboarding"
    }
  }

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      userDataManager.signOut()
      window.location.href = "/signin"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    {profileImage?.startsWith("data:image") ? (
                      <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile photo" />
                    ) : (
                      <AvatarFallback className="text-lg">
                        {userProfile?.firstName?.charAt(0) || userProfile?.username?.charAt(0) || "U"}
                        {userProfile?.lastName?.charAt(0) || ""}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        Upload Photo
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCameraCapture}>
                        Take Photo
                      </Button>
                      {(profileImage || userProfile?.profileImage) && (
                        <Button variant="outline" size="sm" onClick={handleRemovePhoto}>
                          Remove
                        </Button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-600">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={userProfile?.firstName || ""}
                      onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={userProfile?.lastName || ""}
                      onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={userProfile?.username || ""}
                    onChange={(e) => handleProfileUpdate("username", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile?.email || ""}
                    placeholder="Enter your email"
                    onChange={(e) => handleProfileUpdate("email", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <div className="text-sm text-gray-600">{userProfile?.age || "Not specified"}</div>
                  </div>
                </div>

                <Button className="bg-brand-blue hover:bg-brand-blue/90">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Password Change Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {passwordError && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{passwordError}</AlertDescription>
                  </Alert>
                )}

                {passwordSuccess && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-700">{passwordSuccess}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
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

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handlePasswordChange}
                  className="bg-brand-purple hover:bg-brand-purple/90"
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Sign Out Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Account Actions
                </CardTitle>
                <CardDescription>Manage your account session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-orange-800">Sign Out</h4>
                  <p className="text-sm text-orange-700 mb-3">
                    Sign out of your account. Your data will be preserved and you can sign back in anytime.
                  </p>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                  >
                    <LogIn className="w-4 h-4 mr-2 rotate-180" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <Label>Email Notifications</Label>
                      </div>
                      <p className="text-sm text-gray-600">Receive updates about your portfolio and goals</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <Label>Push Notifications</Label>
                      </div>
                      <p className="text-sm text-gray-600">Get real-time alerts on your mobile device</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <Label>SMS Notifications</Label>
                      </div>
                      <p className="text-sm text-gray-600">Important alerts via text message</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-gray-600">Tips, news, and product updates</p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                    />
                  </div>
                </div>

                <Button className="bg-brand-blue hover:bg-brand-blue/90">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control how your data is used and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Sharing</Label>
                      <p className="text-sm text-gray-600">Share anonymized data to improve our services</p>
                    </div>
                    <Switch
                      checked={privacy.dataSharing}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, dataSharing: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Analytics</Label>
                      <p className="text-sm text-gray-600">Help us understand how you use the app</p>
                    </div>
                    <Switch
                      checked={privacy.analytics}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, analytics: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Personalization</Label>
                      <p className="text-sm text-gray-600">Use your data to personalize recommendations</p>
                    </div>
                    <Switch
                      checked={privacy.personalization}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, personalization: checked })}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Security</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                <Button className="bg-brand-blue hover:bg-brand-blue/90">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Export or delete your personal data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Export Your Data</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Download a copy of all your data including profile, progress, and portfolio information.
                    </p>
                    <Button onClick={handleExportData} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>

                  <div className="p-4 border border-brand-purple/30 bg-brand-purple/10 rounded-lg">
                    <h4 className="font-medium mb-2 text-brand-purple">Delete Account</h4>
                    <p className="text-sm text-brand-purple mb-3">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button onClick={handleDeleteAccount} variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Help & Support
                </CardTitle>
                <CardDescription>Get help and learn more about WealthWise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <HelpCircle className="w-6 h-6 mb-2" />
                    FAQ
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Mail className="w-6 h-6 mb-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <BookOpen className="w-6 h-6 mb-2" />
                    User Guide
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Shield className="w-6 h-6 mb-2" />
                    Privacy Policy
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">App Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Version: 1.0.0</p>
                    <p>Last Updated: December 2024</p>
                    <p>© 2024 WealthWise. All rights reserved.</p>
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
