"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"

export const ShareButton = () => {
  const [copied, setCopied] = useState(false)
  
  const handleShare = async () => {
    const shareData = {
      title: 'WealthLink - Financial Literacy App',
      text: 'Check out WealthLink - an app that helps you learn about personal finance and manage your money!',
      url: typeof window !== 'undefined' ? window.location.origin : '',
    }
    
    try {
      if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      // Fallback if share fails
      try {
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Last resort fallback using execCommand
        const textArea = document.createElement('textarea')
        textArea.value = shareData.url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }
  
  return (
    <Button
      className="w-full sm:w-auto bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white shadow-lg"
      onClick={handleShare}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </>
      )}
    </Button>
  )
}
