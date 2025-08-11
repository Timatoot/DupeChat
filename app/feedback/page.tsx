"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Star, ThumbsUp, ThumbsDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FeedbackPage() {
  const [rating, setRating] = useState<string>("")
  const [feltLikeMe, setFeltLikeMe] = useState<string>("")
  const [comment, setComment] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has chatted
    const sessions = JSON.parse(localStorage.getItem("dd_mirror_v1_sessions") || "[]")
    if (sessions.length === 0) {
      router.push("/chat")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating || !feltLikeMe) return

    const feedback = {
      id: `feedback_${Date.now()}`,
      rating: Number.parseInt(rating),
      feltLikeMe: feltLikeMe === "yes",
      comment: comment.trim(),
      timestamp: new Date().toISOString(),
    }

    // Save feedback locally
    const existingFeedback = JSON.parse(localStorage.getItem("dd_mirror_v1_feedback") || "[]")
    existingFeedback.push(feedback)
    localStorage.setItem("dd_mirror_v1_feedback", JSON.stringify(existingFeedback))

    // Track analytics
    const settings = JSON.parse(localStorage.getItem("dd_mirror_v1_settings") || '{"analytics": true}')
    if (settings.analytics) {
      console.log("Analytics: feedback_submitted", feedback)
    }

    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Thank you!</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Your feedback helps us improve Doppel. We're constantly working to make your AI twin sound more like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push("/chat")} size="lg">
                Continue Chatting
              </Button>
              <Button variant="outline" onClick={() => router.push("/")} size="lg">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/chat" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Chat</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How was your experience?</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Your feedback helps us make your AI twin sound more like you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Overall Experience</span>
              </CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">How would you rate your chat experience?</p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={rating} onValueChange={setRating} className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center space-x-2">
                    <RadioGroupItem value={num.toString()} id={`rating-${num}`} />
                    <Label htmlFor={`rating-${num}`} className="cursor-pointer">
                      {num}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </CardContent>
          </Card>

          {/* Felt Like Me */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ThumbsUp className="w-5 h-5 text-green-500" />
                <span>Authenticity Check</span>
              </CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Did your AI twin feel like it was actually you?
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={feltLikeMe} onValueChange={setFeltLikeMe} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="felt-yes" />
                  <Label htmlFor="felt-yes" className="cursor-pointer flex items-center space-x-2">
                    <ThumbsUp className="w-4 h-4 text-green-500" />
                    <span>Yes, it felt like talking to myself</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="felt-no" />
                  <Label htmlFor="felt-no" className="cursor-pointer flex items-center space-x-2">
                    <ThumbsDown className="w-4 h-4 text-red-500" />
                    <span>No, it felt too generic or different</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Comment */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Thoughts</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                What could we improve? What worked well? (Optional)
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share any thoughts about your AI twin's personality, responses, or the overall experience..."
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={!rating || !feltLikeMe}>
            Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  )
}
