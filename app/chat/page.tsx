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
interface ChatSession { id: string; messages: Message[]; createdAt: Date }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId] = useState(() => `session_${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // boot
  useEffect(() => {
    const persona = localStorage.getItem("dd_mirror_v1_persona")
    if (!persona) { router.push("/persona-preview"); return }

    const sessions: ChatSession[] = JSON.parse(localStorage.getItem("dd_mirror_v1_sessions") || "[]")
    const current = sessions.find((s) => s.id === sessionId)
    if (current) {
      // revive timestamps
      setMessages(current.messages.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })))
    } else {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm your AI twin. What's on your mind?",
        timestamp: new Date(),
      }])
    }
  }, [sessionId, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const saveSession = (updated: Message[]) => {
    const sessions: ChatSession[] = JSON.parse(localStorage.getItem("dd_mirror_v1_sessions") || "[]")
    const idx = sessions.findIndex(s => s.id === sessionId)
    const session: ChatSession = {
      id: sessionId,
      messages: updated,
      createdAt: idx === -1 ? new Date() : new Date(sessions[idx].createdAt),
    }
    if (idx === -1) sessions.push(session)
    else sessions[idx] = session
    localStorage.setItem("dd_mirror_v1_sessions", JSON.stringify(sessions))
  }

  async function sendMessage() {
    if (!input.trim() || isLoading) return

    // optimistic user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }
    const base = [...messages, userMessage]
    setMessages(base)
  saveSession(base)
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // persona/system prompt from localStorage
      const persona = JSON.parse(localStorage.getItem("dd_mirror_v1_persona") || "{}")
      const systemPrompt: string = persona?.systemPrompt || ""
      console.info("[Chat] System prompt:", systemPrompt)

      // payload for server route
      const apiMessages = base.map(({ role, content }) => ({ role, content }))
      const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system: systemPrompt,
            messages: apiMessages,
          }),
        });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("text/event-stream")) {
      // streaming path
      const assistantId = `assistant_${Date.now()}`
      setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }])

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let buf = ""

      if (reader) {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buf += decoder.decode(value, { stream: true })

          const lines = buf.split("\n")
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim()
            if (!line.startsWith("data:")) continue
            const data = line.slice(5).trim()
            if (data === "[DONE]") continue
            try {
              const json = JSON.parse(data)
              const delta = json?.choices?.[0]?.delta?.content ?? ""
              if (delta) {
                setMessages(prev => {
                  const copy = [...prev]
                  const idx = copy.findIndex(m => m.id === assistantId)
                  if (idx !== -1) copy[idx] = { ...copy[idx], content: copy[idx].content + delta }
                  return copy
                })
              }
            } catch { /* ignore */ }
          }
          buf = lines[lines.length - 1]
        }
      }

      // persist final state after stream
      queueMicrotask(() => saveSession((messages as Message[])))
    } else {
      // JSON path
      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: data.content || "",
        timestamp: new Date(),
      };
      const updated = [...base, assistantMessage]
      setMessages(updated)
      saveSession(updated)
    }

      track("message_sent"); track("message_received")
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Sorry, I had trouble responding. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // (removed stale state snapshot helper; persisting happens alongside state updates)

  function track(name: string) {
    const settings = JSON.parse(localStorage.getItem("dd_mirror_v1_settings") || '{"analytics": true}')
    if (settings.analytics) console.log(`Analytics: ${name}`)
  }

  function resetChat() {
    setMessages([])
    setInput("")
    setError(null)
    const sessions = JSON.parse(localStorage.getItem("dd_mirror_v1_sessions") || "[]")
    const filtered = sessions.filter((s: ChatSession) => s.id !== sessionId)
    localStorage.setItem("dd_mirror_v1_sessions", JSON.stringify(filtered))
  }

  function exportChat() {
    const exportData = { sessionId, messages, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `doppel-chat-${sessionId}.json`; a.click()
    URL.revokeObjectURL(url)
    track("export_data")
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() }
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
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button variant="outline" size="sm" onClick={resetChat}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <Card className={`w-fit max-w-[85%] ${
                m.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{m.content}</p>
                  <p className={`text-xs mt-2 opacity-70 ${
                    m.role === "user" ? "text-purple-100" : "text-slate-500 dark:text-slate-400"
                  }`}>
                    {new Date(m.timestamp).toLocaleTimeString()}
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

      {/* Input */}
      <div className="border-t bg-white dark:bg-slate-900 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex space-x-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
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
