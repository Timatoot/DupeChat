"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { QUIZ_QUESTIONS, type QuizAnswers } from "@/lib/quiz-questions"
import { Brain, MessageCircle, RotateCcw, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function QuizResultsPage() {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedAnswers = localStorage.getItem("dupeChat_quizAnswers")
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    } else {
      // Redirect to quiz if no answers found
      router.push("/quiz")
    }
    setIsLoading(false)
  }, [router])

  const handleRetakeQuiz = () => {
    localStorage.removeItem("dupeChat_quizAnswers")
    router.push("/quiz")
  }

  const handleStartChat = () => {
    router.push("/chat")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!answers) {
    return null
  }

  const getQuestionTitle = (questionId: string) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId)
    return question?.title || questionId
  }

  const formatAnswer = (questionId: string, answer: string | number) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId)
    if (question?.type === "slider") {
      return `${answer} years old`
    }
    return answer.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">DupeChat</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quiz Complete!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI twin is ready. Based on your answers, we've created a personalized AI that reflects your unique
            voice and personality.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" onClick={handleStartChat} className="text-lg px-8 py-6 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Start Chatting
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleRetakeQuiz}
            className="text-lg px-8 py-6 flex items-center gap-2 bg-transparent"
          >
            <RotateCcw className="h-5 w-5" />
            Retake Quiz
          </Button>
        </div>

        {/* Answer Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your Personality Profile</CardTitle>
            <p className="text-muted-foreground">
              Here's a summary of your answers that help shape your AI twin's personality:
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {Object.entries(answers).map(([questionId, answer]) => {
                if (!answer || answer === "") return null
                return (
                  <div key={questionId} className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-foreground mb-1">{getQuestionTitle(questionId)}</h3>
                    <p className="text-muted-foreground">{formatAnswer(questionId, answer)}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Your AI twin is created</h4>
                  <p className="text-sm text-muted-foreground">
                    We use your answers to create a personalized prompt that makes the AI respond like you
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Start conversations</h4>
                  <p className="text-sm text-muted-foreground">
                    Chat with your AI twin about anything - get different perspectives on your thoughts and ideas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Everything stays private</h4>
                  <p className="text-sm text-muted-foreground">
                    Your conversations and data remain in your browser - we never store your personal information
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Reminder */}
        <div className="text-center mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Privacy reminder:</strong> Your quiz answers and future conversations are stored locally in your
            browser. You can clear this data anytime by retaking the quiz or clearing your browser data.
          </p>
        </div>
      </div>
    </div>
  )
}