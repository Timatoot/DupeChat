"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shield, Trash2, Download, Sun } from "lucide-react"
import Link from "next/link"

interface Settings {
  theme: "light" | "dark" | "system"
  analytics: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    analytics: true,
  })
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("dd_mirror_v1_settings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem("dd_mirror_v1_settings", JSON.stringify(updated))
  }

  const clearAllData = () => {
    const keys = [
      "dd_mirror_v1_quiz",
      "dd_mirror_v1_persona",
      "dd_mirror_v1_sessions",
      "dd_mirror_v1_feedback",
      "dd_mirror_v1_settings",
    ]

    keys.forEach((key) => localStorage.removeItem(key))
    setShowClearConfirm(false)

    // Reset settings to default
    const defaultSettings = { theme: "light" as const, analytics: true }
    setSettings(defaultSettings)
    localStorage.setItem("dd_mirror_v1_settings", JSON.stringify(defaultSettings))
  }

  const exportAllData = () => {
    const data = {
      quiz: JSON.parse(localStorage.getItem("dd_mirror_v1_quiz") || "null"),
      persona: JSON.parse(localStorage.getItem("dd_mirror_v1_persona") || "null"),
      sessions: JSON.parse(localStorage.getItem("dd_mirror_v1_sessions") || "[]"),
      feedback: JSON.parse(localStorage.getItem("dd_mirror_v1_feedback") || "[]"),
      settings: JSON.parse(localStorage.getItem("dd_mirror_v1_settings") || "{}"),
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `doppel-data-export-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Settings</h1>
          <p className="text-lg text-slate-600">Manage your preferences and data</p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sun className="w-5 h-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <p className="text-sm text-slate-600">Choose your preferred theme</p>
                </div>
                <select
                  id="theme"
                  value={settings.theme}
                  onChange={(e) => updateSettings({ theme: e.target.value as Settings["theme"] })}
                  className="px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Usage Analytics</Label>
                  <p className="text-sm text-slate-600">Help improve Doppel by sharing anonymous usage data</p>
                </div>
                <Switch
                  id="analytics"
                  checked={settings.analytics}
                  onCheckedChange={(checked) => updateSettings({ analytics: checked })}
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">Data Storage</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  All your data is stored locally in your browser. We never upload your quiz answers, persona, or chat
                  messages to our servers. Only anonymous analytics events are shared if you opt in above.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <p className="text-sm text-slate-600">Export or clear your local data</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={exportAllData}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 bg-transparent"
              >
                <Download className="w-4 h-4" />
                <span>Export All Data</span>
              </Button>

              {!showClearConfirm ? (
                <Button
                  onClick={() => setShowClearConfirm(true)}
                  variant="destructive"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Data</span>
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-sm text-red-800 font-medium mb-2">Are you sure you want to clear all data?</p>
                    <p className="text-sm text-red-700">
                      This will permanently delete your quiz answers, persona, chat history, and feedback. This action
                      cannot be undone.
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={clearAllData} variant="destructive" className="flex-1">
                      Yes, Clear Everything
                    </Button>
                    <Button onClick={() => setShowClearConfirm(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About Doppel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-slate-600">
                <p>
                  Doppel creates an AI version of yourself for authentic self-reflection. Your privacy is our priority -
                  all data stays in your browser.
                </p>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span>Version</span>
                  <span className="font-mono">1.0.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
