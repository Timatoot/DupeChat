"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { checkRateLimit, incrementMessageCount, exportChatHistory } from "@/lib/chat-utils"
import { Brain, Home, RotateCcw, Download, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<{ allowed: boolean; remaining: number; resetsAt: Date } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for quiz answers first
    const persona = localStorage.getItem("dd_mirror_v1_persona")
    if (!persona) {
      router.push("/quiz")
      return
    }

    // Check rate limit (async)
    checkRateLimit().then(setRateLimitInfo)

    // Load existing messages or create welcome message
    const savedMessages = localStorage.getItem("dupeChat_messages")
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }))
      setMessages(parsedMessages)
    } else {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm your AI twin. What's on your mind?",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }

    setIsInitializing(false)
  }, [router])

  useEffect(() => {
    // Save messages to localStorage
    if (messages.length > 0 && !isInitializing) {
      localStorage.setItem("dupeChat_messages", JSON.stringify(messages))
    }
  }, [messages, isInitializing])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    // Check rate limit before sending
    const rateLimit = await checkRateLimit()
    setRateLimitInfo(rateLimit)
    
    if (!rateLimit.allowed) {
      setError(`Daily message limit reached (${20 - rateLimit.remaining}/20). Resets at ${rateLimit.resetsAt.toLocaleTimeString()}.`)
      return
    }

    // optimistic user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    }
    const base = [...messages, userMessage]
    setMessages(base)
    setInputValue("")
    setIsLoading(true)
    setError(null)

    try {
      // Get persona/system prompt from localStorage
      const persona = localStorage.getItem("dd_mirror_v1_persona") || "You are a helpful AI assistant."

      // Call the existing API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: persona,
          messages: base.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!response.ok) {
        if (response.status === 429) {
          // Handle rate limit error from server
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || "Rate limit exceeded")
        }
        throw new Error(`HTTP ${response.status}`)
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      let assistantContent = ""
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      }

      // Add empty assistant message for streaming
      setMessages(prev => [...prev, assistantMessage])

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed?.choices?.[0]?.delta?.content
              if (content) {
                assistantContent += content
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    ...assistantMessage,
                    content: assistantContent
                  }
                  return updated
                })
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Sorry, I had trouble responding. Please try again.")
      // Remove the failed assistant message
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
      // Update rate limit info after message is sent
      checkRateLimit().then(setRateLimitInfo)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleResetConversation = () => {
    if (confirm("Are you sure you want to reset the conversation? This will delete all messages.")) {
      localStorage.removeItem("dupeChat_messages")
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm your AI twin. What's on your mind?",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }

  const handleExportChat = () => {
    exportChatHistory(messages)
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <span className="text-2xl font-bold text-foreground">DupeChat</span>
              <div className="flex items-center gap-4">
                <p className="text-xs text-muted-foreground">Chatting with your AI twin</p>
                {rateLimitInfo && (
                  <p className="text-xs text-muted-foreground">
                    Messages: {20 - rateLimitInfo.remaining}/20 daily
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleExportChat} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={handleResetConversation} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <Card
                  className={`max-w-[80%] ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <CardContent className="p-4">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="bg-muted">
                  <CardContent className="p-4 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">AI twin is thinking...</span>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-4 py-2 bg-destructive/10 border-t border-destructive/20">
          <p className="text-sm text-destructive text-center">{error}</p>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={rateLimitInfo && !rateLimitInfo.allowed ? "Daily message limit reached" : "Type your message..."}
                disabled={isLoading || (rateLimitInfo?.allowed === false)}
                className="resize-none min-h-[44px] max-h-32"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading || (rateLimitInfo?.allowed === false)}
              size="lg"
              className="px-6"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}