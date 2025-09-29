export const QUIZ_QUESTIONS = [
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
] as const

export type QuizQuestion = (typeof QUIZ_QUESTIONS)[number]
export type QuizAnswers = Record<string, string | number>

// Add optional property to the question type
declare module "./quiz-questions" {
  interface QuizQuestionType {
    optional?: boolean
  }
}