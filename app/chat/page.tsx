"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, RotateCcw, Download, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  messages: Message[]
  createdAt: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId] = useState(() => `session_${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if persona exists
    const persona = localStorage.getItem("dd_mirror_v1_persona")
    if (!persona) {
      router.push("/persona-preview")
      return
    }

    // Load existing session or create welcome message
    const sessions = JSON.parse(localStorage.getItem("dd_mirror_v1_sessions") || "[]")
    const currentSession = sessions.find((s: ChatSession) => s.id === sessionId)

    if (currentSession) {
      setMessages(currentSession.messages)
    } else {
      // Create welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content:
          "Hey! I'm your AI twin. I'm here to think through things with you, just like you would with yourself. What's on your mind?",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [sessionId, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const saveSession = (updatedMessages: Message[]) => {
    const sessions = JSON.parse(localStorage.getItem("dd_mirror_v1_sessions") || "[]")
    const sessionIndex = sessions.findIndex((s: ChatSession) => s.id === sessionId)

    const session: ChatSession = {
      id: sessionId,
      messages: updatedMessages,
      createdAt: sessionIndex === -1 ? new Date() : sessions[sessionIndex].createdAt,
    }

    if (sessionIndex === -1) {
      sessions.push(session)
    } else {
      sessions[sessionIndex] = session
    }

    localStorage.setItem("dd_mirror_v1_sessions", JSON.stringify(sessions))
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Create user message and update local state optimistically
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Retrieve persona for system prompt.  Stored in localStorage via persona-preview page.
      const persona = JSON.parse(localStorage.getItem("dd_mirror_v1_persona") || "{}")
      const systemPrompt = persona?.systemPrompt || ""

      // Prepare messages for API (strip ids and timestamps)
      const apiMessages = updatedMessages.map(({ role, content }) => ({ role, content }))

      // Call our API route which proxies to OpenRouter.  It returns an SSE stream.
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: '@preset/dopple-prototype',
        messages: apiMessages,
      }),
    });

      if (!res.ok) {
        // Read error message if present
        let errorMessage = "Sorry, I had trouble responding. Please try again."
        try {
          const errJson = await res.json()
          if (errJson.error) errorMessage = errJson.error
        } catch {
          /* ignore */
        }
        throw new Error(errorMessage)
      }

      // Parse server-sent events (SSE).  Accumulate content from delta events.
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""

      if (reader) {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })

          // Each SSE event is on its own line starting with 'data:'
          const lines = chunk.split("\n")
          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith("data:")) continue
            const data = trimmed.slice(5).trim()
            if (data === "[DONE]") {
              break
            }
            try {
              const json = JSON.parse(data)
              const delta = json.choices?.[0]?.delta?.content ?? ""
              if (delta) {
                assistantContent += delta
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      } else {
        // Non-streaming fallback: treat response body as plain text
        assistantContent = await res.text()
      }

      // Build assistant message and update messages
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: assistantContent || "Sorry, I couldn't generate a response.",
        timestamp: new Date(),
      }
      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)
      saveSession(finalMessages)

      // Track analytics
      trackEvent("message_sent")
      trackEvent("message_received")
    } catch (err: any) {
      console.error("Chat error:", err)
      setError(err?.message || "Sorry, I had trouble responding. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const trackEvent = (eventName: string) => {
    // Simple analytics tracking
    const settings = JSON.parse(localStorage.getItem("dd_mirror_v1_settings") || '{"analytics": true}')
    if (settings.analytics) {
      console.log(`Analytics: ${eventName}`)
    }
  }

  const resetChat = () => {
    setMessages([])
    setInput("")
    setError(null)
    // Remove current session
    const sessions = JSON.parse(localStorage.getItem("dd_mirror_v1_sessions") || "[]")
    const filteredSessions = sessions.filter((s: ChatSession) => s.id !== sessionId)
    localStorage.setItem("dd_mirror_v1_sessions", JSON.stringify(filteredSessions))
  }

  const exportChat = () => {
    const exportData = {
      sessionId,
      messages,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `doppel-chat-${sessionId}.json`
    a.click()
    URL.revokeObjectURL(url)

    trackEvent("export_data")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={exportChat}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={resetChat}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <Card
                className={`w-fit max-w-[85%] ${
                  message.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                  <p
                    className={`text-xs mt-2 opacity-70 ${
                      message.role === "user" ? "text-purple-100" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Your twin is thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <CardContent className="p-3">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={() => setError(null)}>
                    Dismiss
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white dark:bg-slate-900 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex space-x-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1 min-h-[50px] resize-none"
              disabled={isLoading}
            />
            <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="lg" className="px-6">
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  )
}
