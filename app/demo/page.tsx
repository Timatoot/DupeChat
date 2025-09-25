"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Play, MessageCircle } from "lucide-react"
import Link from "next/link"

const DEMO_STEPS = [
  {
    title: "Take the Quiz",
    description: "Answer 7 quick questions about your personality and communication style",
    visual: (
      <div className="bg-slate-100 p-6 rounded-lg">
        <h4 className="font-medium mb-4">What's your go-to texting style?</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full border-2 border-purple-500 bg-purple-500"></div>
            <span className="text-sm">funny but real</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
            <span className="text-sm text-slate-500">dry and sarcastic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
            <span className="text-sm text-slate-500">chaotic and unfiltered</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Review Your AI Twin",
    description: "See how we've captured your personality and make any adjustments",
    visual: (
      <div className="bg-slate-100 p-6 rounded-lg">
        <h4 className="font-medium mb-4">Your AI Twin Persona</h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-slate-700">Tone:</span>
            <p className="text-sm text-slate-600">"funny but real"</p>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-700">Common phrases:</span>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                bruh
              </Badge>
              <Badge variant="secondary" className="text-xs">
                deadass
              </Badge>
              <Badge variant="secondary" className="text-xs">
                no cap
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-700">Emoji energy:</span>
            <p className="text-sm">😭 💀</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Chat with Yourself",
    description: "Have authentic conversations with your AI twin that thinks like you",
    visual: (
      <div className="bg-slate-100 p-6 rounded-lg space-y-4">
        <div className="flex justify-end">
          <div className="bg-purple-600 text-white p-3 rounded-lg max-w-[80%]">
            <p className="text-sm">I'm stressed about this job interview tomorrow</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white border p-3 rounded-lg max-w-[80%]">
            <p className="text-sm">
              Bruh, you got this! Remember when you were nervous about that presentation last month and absolutely
              killed it? Same energy. Just be yourself - that's literally what got you the interview in the first place
              💯
            </p>
          </div>
        </div>
      </div>
    ),
  },
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= DEMO_STEPS.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % DEMO_STEPS.length)
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev - 1 + DEMO_STEPS.length) % DEMO_STEPS.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">See How DupeChat Works</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">A quick walkthrough of creating your AI twin</p>
        </div>

        {/* Demo Controls */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handlePrevious} size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <Button onClick={togglePlay} className="flex items-center space-x-2">
              <Play className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
              <span>{isPlaying ? "Playing..." : "Auto Play"}</span>
            </Button>

            <Button variant="outline" onClick={handleNext} size="sm">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {DEMO_STEPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? "bg-purple-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Step */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">{currentStep + 1}</span>
            </div>
            <CardTitle className="text-2xl">{DEMO_STEPS[currentStep].title}</CardTitle>
            <p className="text-slate-600">{DEMO_STEPS[currentStep].description}</p>
          </CardHeader>
          <CardContent>{DEMO_STEPS[currentStep].visual}</CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to create your AI twin?</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            The whole process takes less than 2 minutes and requires no signup
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button size="lg" className="px-8 py-3 text-lg flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Start Your Quiz</span>
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
                Learn More Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
