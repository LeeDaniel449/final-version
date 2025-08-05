"use client"

import { useState } from "react"
import { userDataManager } from "@/lib/user-data"

interface Message {
  role: "system" | "user" | "assistant"
  content: string
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are a helpful financial advisor." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user" as const, content: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      // Get user data for context
      const userData = {
        profile: userDataManager.getUserProfile(),
        budgetData: userDataManager.getBudgetData(),
        goals: userDataManager.getGoals(),
        progress: userDataManager.getUserProgress(),
        budgetCategories: userDataManager.getBudgetCategories(),
        budgetEntries: userDataManager.getBudgetEntries(),
      }

      const res = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          userData: userData,
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch (e) {
      console.error("AI Advisor Error:", e)
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white border border-gray-300 rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2 text-center">AI Financial Advisor</h2>
      <div className="h-64 overflow-y-auto space-y-2 text-sm px-1 mb-2">
        {messages.slice(1).map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right text-blue-700" : "text-left text-gray-700"}>
            <p className="break-words">{msg.content}</p>
          </div>
        ))}
        {loading && <p className="text-gray-500 italic">Thinking...</p>}
      </div>
      <div className="flex mt-2">
        <input
          className="flex-1 border rounded-l px-2 py-1 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about budgeting, saving..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  )
}
