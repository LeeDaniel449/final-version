"use client"

import type * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type SecondaryItem = {
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
}

interface NavSecondaryProps extends React.ComponentPropsWithoutRef<"div"> {
  items: SecondaryItem[]
}

/**
 * Secondary/help navigation section (e.g. Support, Feedback).
 */
export function NavSecondary({ items, className, ...props }: NavSecondaryProps) {
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedbackData, setFeedbackData] = useState({
    email: "",
    subject: "",
    message: "",
  })

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedbackData)
    setFeedbackSubmitted(true)

    // Reset form after 2 seconds and close dialog
    setTimeout(() => {
      setFeedbackSubmitted(false)
      setFeedbackOpen(false)
      setFeedbackData({ email: "", subject: "", message: "" })
    }, 2000)
  }

  if (!items?.length) return null

  return (
    <>
      <SidebarGroup className={cn(className)} {...props}>
        <SidebarGroupLabel>More</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  size="sm"
                  onClick={(e) => {
                    // If this is a feedback item, open the feedback dialog
                    if (item.title.toLowerCase().includes("feedback")) {
                      e.preventDefault()
                      setFeedbackOpen(true)
                    }
                  }}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>Share your thoughts or report issues to help us improve.</DialogDescription>
          </DialogHeader>

          {feedbackSubmitted ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-green-100 p-3 text-green-600 mb-4">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">Thank you for your feedback!</h3>
              <p className="text-sm text-muted-foreground mt-1">We appreciate your input and will review it shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Your email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={feedbackData.email}
                    onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    value={feedbackData.subject}
                    onChange={(e) => setFeedbackData({ ...feedbackData, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us what you think..."
                    className="min-h-[100px]"
                    value={feedbackData.message}
                    onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setFeedbackOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Feedback</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
