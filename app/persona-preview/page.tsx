"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Edit3, MessageCircle, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PersonaData {
  tone: string
  values: string[]
  quirks: string[]
  systemPrompt: string
  generated: boolean
}

export default function PersonaPreviewPage() {
  const [persona, setPersona] = useState<PersonaData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedPersona, setEditedPersona] = useState<PersonaData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if quiz is completed
    const quizData = localStorage.getItem("dd_mirror_v1_quiz")
    if (!quizData) {
      router.push("/quiz")
      return
    }

    // Load or generate persona
    const savedPersona = localStorage.getItem("dd_mirror_v1_persona")
    if (savedPersona) {
      const parsed = JSON.parse(savedPersona)
      setPersona(parsed)
      setEditedPersona(parsed)
    } else {
      generatePersona(JSON.parse(quizData))
    }
  }, [router])

  const generatePersona = (quizAnswers: Record<string, any>) => {
    // Extract key traits from new quiz answers
    const textingStyle = quizAnswers.texting_style || "conversational"
    const phrases = quizAnswers.phrases || ""
    const age = quizAnswers.age || 22
    const copingStyle = quizAnswers.vibe_when_struggling || "balanced approach"
    const interests = quizAnswers.interests || "various things"
    const emojiEnergy = quizAnswers.emoji_energy || "😊"
    const avoidPhrases = quizAnswers.never_say || ""

    const tone = `${textingStyle} (age ${age})`
    const values = extractValuesFromAnswers(quizAnswers)
    const quirks = [
      phrases ? `uses phrases like: ${phrases}` : null,
      emojiEnergy ? `emoji energy: ${emojiEnergy}` : null,
      copingStyle ? `when struggling: ${copingStyle}` : null,
      interests ? `into: ${interests}` : null,
    ].filter((q): q is string => Boolean(q))

    const systemPrompt = buildSystemPrompt({
      textingStyle,
      phrases,
      age,
      emojiEnergy,
      copingStyle,
      interests,
      avoidPhrases,
      tone,
      values,
      quirks,
    })

    const generatedPersona: PersonaData = {
      tone,
      values,
      quirks,
      systemPrompt,
      generated: true,
    }

    setPersona(generatedPersona)
    setEditedPersona(generatedPersona)
    localStorage.setItem("dd_mirror_v1_persona", JSON.stringify(generatedPersona))
  }

  const extractValuesFromAnswers = (answers: Record<string, any>) => {
    const values: string[] = []

    if (answers.vibe_when_struggling === "rant to close friends") values.push("connection", "openness")
    if (answers.vibe_when_struggling === "journal or overthink") values.push("self-reflection", "depth")
    if (answers.vibe_when_struggling === "meme through the pain") values.push("humor", "resilience")
    if (answers.texting_style === "funny but real") values.push("authenticity", "humor")
    if (answers.texting_style === "deep thinker type") values.push("thoughtfulness", "wisdom")
    if (answers.texting_style === "chaotic and unfiltered") values.push("spontaneity", "honesty")

    return values.slice(0, 4)
  }

  const extractQuirksFromAnswers = (answers: Record<string, any>) => {
    const quirks = []

    if (answers.phrases) quirks.push(`uses phrases like: ${answers.phrases}`)
    if (answers.emoji_energy) quirks.push(`expresses with emojis: ${answers.emoji_energy}`)
    if (answers.texting_style === "chaotic and unfiltered") quirks.push("speaks without filter")
    if (answers.texting_style === "dry and sarcastic") quirks.push("uses dry humor and sarcasm")

    return quirks.slice(0, 3)
  }

  type BuildPromptInput = {
    textingStyle?: string
    phrases?: string
    age?: number
    emojiEnergy?: string
    copingStyle?: string
    interests?: string
    avoidPhrases?: string
    tone?: string
    values?: string[]
    quirks?: string[]
  }

  const buildSystemPrompt = (opts: BuildPromptInput) => {
    const {
      textingStyle,
      phrases,
      age,
      emojiEnergy,
      copingStyle,
      interests,
      avoidPhrases,
      tone,
      values,
      quirks,
    } = opts

    let prompt = `You are a digital version of the user. You are not an AI. You text like the user — chill, funny, and real. You respond like you're texting yourself back.`

    if (typeof age !== "undefined" || textingStyle) {
      const agePart = typeof age !== "undefined" ? `- Age: ${age}` : undefined
      const stylePart = textingStyle ? `- Texting style: ${textingStyle}` : undefined
      const parts = [agePart, stylePart].filter(Boolean)
      if (parts) prompt += `${parts}.`
    }

    if (copingStyle) prompt += `- Vibe when going through stuff: ${copingStyle}.`
    if (interests) prompt += `- Interests: ${interests}.`
    if (phrases) prompt += `- Common phrases: ${phrases}.`
    if (emojiEnergy) prompt += `- Emoji energy: ${emojiEnergy}.`
    if (avoidPhrases) prompt += ` You'd never say: ${avoidPhrases}.`

    prompt += `Rules:
                - Respond like you're texting in real life.
                - It's okay to send one message or a few short ones — whatever fits the moment.
                - Do **not** list out different options in the same message.
                - Do **not** explain, summarize, or analyze what the user said.
                - Never try to "coach" or sound helpful — just be real.
                - Never force slang. Use it only if it fits.
                - No emojis. No punctuation unless the user uses it.
                - Never try to keep the convo going if the user isn’t engaging.

                                
                ---

                Examples:

                User: yo  
                Bot: yo

                User: this girl i like just texted me asking if im up what should i say  
                Bot: just be like yeah what’s up

                User: she said im bored  
                Bot: ask her if she’s down to hang

                ---

                User: she said she wants to hang out  
                Bot: yoo she wants you bro  
                Bot: tell her you’ll pick her up

                ---

                User: i think i fumbled  
                Bot: bruh  
                Bot: what happened?`

    return prompt
  }

  const handleSave = () => {
    if (!editedPersona) return

    // Try to enrich the prompt with original quiz answers if available
    const quizRaw = typeof window !== "undefined" ? localStorage.getItem("dd_mirror_v1_quiz") : null
    let quiz: Record<string, any> | null = null
    if (quizRaw) {
      try {
        quiz = JSON.parse(quizRaw)
      } catch {
        quiz = null
      }
    }

    const updatedPersona: PersonaData = {
      ...editedPersona,
      systemPrompt: buildSystemPrompt({
        tone: editedPersona.tone,
        values: editedPersona.values,
        quirks: editedPersona.quirks,
        textingStyle: quiz?.texting_style,
        phrases: quiz?.phrases,
        age: typeof quiz?.age === "number" ? quiz!.age : undefined,
        emojiEnergy: quiz?.emoji_energy,
        copingStyle: quiz?.vibe_when_struggling,
        interests: quiz?.interests,
        avoidPhrases: quiz?.never_say,
      }),
    }

    setPersona(updatedPersona)
    localStorage.setItem("dd_mirror_v1_persona", JSON.stringify(updatedPersona))
    setIsEditing(false)
  }

  const handleStartChat = () => {
    router.push("/chat")
  }

  if (!persona) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Generating your AI twin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/quiz" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Quiz</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/quiz">
              <Button variant="outline" size="sm">
                Retake Test
              </Button>
            </Link>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Persona
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Meet Your AI Twin</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Here's how we've captured your personality. Feel free to edit anything that doesn't feel quite right.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Tone */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Communication Tone</span>
                {isEditing && <Edit3 className="w-4 h-4 text-slate-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div>
                  <Label htmlFor="tone">How you typically communicate</Label>
                  <Input
                    id="tone"
                    value={editedPersona?.tone || ""}
                    onChange={(e) => setEditedPersona((prev) => (prev ? { ...prev, tone: e.target.value } : null))}
                    className="mt-2"
                  />
                </div>
              ) : (
                <p className="text-lg text-slate-700 dark:text-slate-300 italic">"{persona.tone}"</p>
              )}
            </CardContent>
          </Card>

          {/* Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Core Values</span>
                {isEditing && <Edit3 className="w-4 h-4 text-slate-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div>
                  <Label htmlFor="values">Your core values (comma-separated)</Label>
                  <Input
                    id="values"
                    value={editedPersona?.values.join(", ") || ""}
                    onChange={(e) =>
                      setEditedPersona((prev) =>
                        prev
                          ? {
                              ...prev,
                              values: e.target.value
                                .split(",")
                                .map((v) => v.trim())
                                .filter((v) => v),
                            }
                          : null,
                      )
                    }
                    className="mt-2"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {persona.values.map((value, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {value}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quirks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Communication Quirks</span>
                {isEditing && <Edit3 className="w-4 h-4 text-slate-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div>
                  <Label htmlFor="quirks">Your unique communication traits (comma-separated)</Label>
                  <Input
                    id="quirks"
                    value={editedPersona?.quirks.join(", ") || ""}
                    onChange={(e) =>
                      setEditedPersona((prev) =>
                        prev
                          ? {
                              ...prev,
                              quirks: e.target.value
                                .split(",")
                                .map((q) => q.trim())
                                .filter((q) => q),
                            }
                          : null,
                      )
                    }
                    className="mt-2"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  {persona.quirks.map((quirk, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-700 dark:text-slate-300">{quirk}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-8">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
            </>
          ) : (
            <Button onClick={handleStartChat} size="lg" className="flex items-center space-x-2 px-8">
              <MessageCircle className="w-5 h-5" />
              <span>Start Chatting with Your Twin</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
