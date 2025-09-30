"use client"

import * as React from "react"

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SaveButton = React.forwardRef<HTMLButtonElement, SaveButtonProps>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${className || ""}`}
      style={{
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        fontWeight: "500",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#1d4ed8"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#2563eb"
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = "#1d4ed8"
      }}
      onBlur={(e) => {
        e.currentTarget.style.backgroundColor = "#2563eb"
      }}
      {...props}
    >
      {children}
    </button>
  )
})
SaveButton.displayName = "SaveButton"

export { SaveButton }
