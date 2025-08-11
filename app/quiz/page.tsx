"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const QUIZ_QUESTIONS = [
  {
    id: "texting_style",
    title: "What's your go-to texting style?",
    type: "radio",
    options: [
      "dry and sarcastic",
      "funny but real",
      "chaotic and unfiltered",
      "chill and low effort",
      "deep thinker type",
    ],
  },
  {
    id: "phrases",
    title: "What words or phrases do you use a lot?",
    type: "text",
    placeholder: 'e.g., "bruh", "no shot", "lmao", "real"',
    helper: "Share 1-3 phrases you use regularly",
  },
  {
    id: "age",
    title: "What's your age?",
    type: "slider",
    min: 16,
    max: 65,
    defaultValue: 22,
  },
  {
    id: "vibe_when_struggling",
    title: "What's your vibe when you're going through it?",
    type: "radio",
    options: [
      "keep it to myself",
      "rant to close friends",
      "meme through the pain",
      "pretend it's fine until it's not",
      "journal or overthink",
    ],
  },
  {
    id: "interests",
    title: "What are you into lately?",
    type: "text",
    placeholder: "e.g., gaming, gym, situationships, scrolling, music, etc.",
    helper: "Share what's been occupying your time and thoughts",
  },
  {
    id: "emoji_energy",
    title: "What's your emoji energy?",
    type: "text",
    placeholder: "Example: 😭 🤨 💀 🔥 🤷‍♂️",
    helper: "Pick or type 1-2 emojis that represent your vibe",
  },
  {
    id: "never_say",
    title: "What's something you'd never say unironically?",
    type: "text",
    placeholder: "Optional - helps us avoid cringe phrases...",
    helper: "This helps your AI twin avoid phrases that don't sound like you",
    optional: true,
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dd_mirror_v1_quiz")
    if (saved) {
      const parsedAnswers = JSON.parse(saved)
      setAnswers(parsedAnswers)

      // Find the first unanswered question
      const firstUnanswered = QUIZ_QUESTIONS.findIndex((q) => {
        const answer = parsedAnswers[q.id]
        if (q.optional && (!answer || answer === "")) return false
        return !answer || (typeof answer === "string" && answer.trim() === "")
      })

      if (firstUnanswered !== -1) {
        setCurrentQuestion(firstUnanswered)
      } else {
        setIsComplete(true)
      }
    }
  }, [])

  // Auto-save answers
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("dd_mirror_v1_quiz", JSON.stringify(answers))
    }
  }, [answers])

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const canProceed = () => {
    const currentQuestionData = QUIZ_QUESTIONS[currentQuestion]
    const answer = answers[currentQuestionData.id]

    // Optional questions can always proceed
    if (currentQuestionData.optional) return true

    // Check if answer exists and is not empty
    return answer !== undefined && answer !== null && answer !== ""
  }

  const allQuestionsAnswered = () => {
    return QUIZ_QUESTIONS.every((q) => {
      const answer = answers[q.id]
      if (q.optional) return true // Optional questions don't block completion
      return answer !== undefined && answer !== null && answer !== ""
    })
  }

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else if (allQuestionsAnswered()) {
      setIsComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleComplete = () => {
    router.push("/persona-preview")
  }

  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quiz Complete!</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Great job! We're now creating your AI twin based on your responses. Let's preview your persona and make
              any final adjustments.
            </p>
            <Button onClick={handleComplete} size="lg" className="px-8">
              Preview Your AI Twin
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = QUIZ_QUESTIONS[currentQuestion]

  const renderQuestionInput = () => {
    switch (question.type) {
      case "radio":
        return (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "slider":
        const ageValue = answers[question.id] || question.defaultValue || 20
        const getPersonEmoji = (age: number) => {
          if (age <= 20) return "🧒"
          if (age <= 30) return "🧑"
          if (age <= 45) return "👨"
          if (age <= 60) return "👨‍🦳"
          return "👴"
        }

        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-2 transition-all duration-300">{getPersonEmoji(ageValue)}</div>
              <p className="text-sm text-slate-600">Age representation</p>
            </div>
            <Slider
              value={[ageValue]}
              onValueChange={(value) => handleAnswerChange(question.id, value[0])}
              max={question.max}
              min={question.min}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate-600">
              <span>{question.min}</span>
              <span className="font-medium text-lg text-slate-900 dark:text-white">
                {ageValue >= 65 ? "65+" : ageValue}
              </span>
              <span>65+</span>
            </div>
          </div>
        )

      case "text":
      default:
        return (
          <Textarea
            placeholder={question.placeholder}
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="min-h-[100px] text-base"
            aria-describedby={`question-${question.id}-help`}
          />
        )
    }
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
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{Math.round(progress)}% complete</p>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center gap-2">
              {question.title}
              {question.optional && (
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                  Optional
                </span>
              )}
            </CardTitle>
            {question.helper && <p className="text-slate-600 dark:text-slate-400">{question.helper}</p>}
          </CardHeader>
          <CardContent>{renderQuestionInput()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button onClick={handleNext} disabled={!canProceed()} className="flex items-center space-x-2">
            <span>{currentQuestion === QUIZ_QUESTIONS.length - 1 ? "Complete Quiz" : "Next"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
