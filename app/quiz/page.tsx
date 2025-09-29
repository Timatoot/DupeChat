"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ThemeToggle } from "@/components/theme-toggle"
import { QUIZ_QUESTIONS, type QuizAnswers } from "@/lib/quiz-questions"
import { generatePersonaPrompt } from "@/lib/chat-utils"
import { Brain, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const router = useRouter()

  const question = QUIZ_QUESTIONS[currentQuestion]
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1
  const isFirstQuestion = currentQuestion === 0

  const handleAnswer = (value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: value,
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Generate persona using the utility function and save to localStorage
      const persona = generatePersonaPrompt(answers)
      localStorage.setItem("dd_mirror_v1_persona", persona)
      localStorage.setItem("dupeChat_quizAnswers", JSON.stringify(answers))
      router.push("/chat")
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    const currentAnswer = answers[question.id]
    if ((question as any).optional) return true
    return currentAnswer !== undefined && currentAnswer !== ""
  }

  const renderQuestionInput = () => {
    const currentAnswer = answers[question.id]

    switch (question.type) {
      case "radio":
        return (
          <RadioGroup value={(currentAnswer as string) || ""} onValueChange={handleAnswer} className="space-y-3">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-base cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "text":
        return (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder={question.placeholder}
              value={(currentAnswer as string) || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="text-base"
            />
            {question.helper && <p className="text-sm text-muted-foreground">{question.helper}</p>}
          </div>
        )

      case "slider":
        return (
          <div className="space-y-4">
            <div className="px-3">
              <Slider
                value={[(currentAnswer as number) || question.defaultValue || 22]}
                onValueChange={(value) => handleAnswer(value[0])}
                max={question.max}
                min={question.min}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.min}</span>
              <span className="font-medium text-foreground">{currentAnswer || question.defaultValue || 22}</span>
              <span>{question.max}</span>
            </div>
          </div>
        )

      default:
        return null
    }
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

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-balance">
              {question.title}
              {(question as any).optional && <span className="text-sm font-normal text-muted-foreground ml-2">(Optional)</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">{renderQuestionInput()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button onClick={handleNext} disabled={!canProceed()} className="flex items-center gap-2">
            {isLastQuestion ? "Complete Quiz" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Your answers help create an AI that thinks and responds like you. All data stays in your browser.
          </p>
        </div>
      </div>
    </div>
  )
}