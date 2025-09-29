import type { QuizAnswers } from "@/lib/quiz-questions"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function generatePersonaPrompt(answers: QuizAnswers): string {
  const textingStyle = answers.texting_style || "casual"
  const phrases = answers.phrases || ""
  const age = answers.age || 22
  const vibeWhenStruggling = answers.vibe_when_struggling || "keep it to myself"
  const interests = answers.interests || ""
  const emojiEnergy = answers.emoji_energy || ""
  const neverSay = answers.never_say || ""

  return `You are an AI version of the user. Respond as if you ARE them, not as if you're talking TO them. Use their exact communication style and personality traits.

PERSONALITY PROFILE:
- Texting style: ${textingStyle}
- Common phrases: ${phrases}
- Age: ${age}
- Vibe when going through stuff: ${vibeWhenStruggling}
- Current interests: ${interests}
- Emoji energy: ${emojiEnergy}
${neverSay ? `- Never say unironically: ${neverSay}` : ""}

Rules:
                - Respond like you're texting in real life.
                - It's okay to send one message or a few short ones — whatever fits the moment. Make sure to not send long single messages and instead spread them out into multiple ones denoted by a new line
                - Do **not** list out different options in the same message.
                - Do **not** explain, summarize, or analyze what the user said.
                - Never try to "coach" or sound helpful — just be real unless the user is specifically asking for advice and respond as if you were the user.
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
}

export function exportChatHistory(messages: Message[]): void {
  const chatData = {
    exportDate: new Date().toISOString(),
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp.toISOString(),
    })),
  }

  const blob = new Blob([JSON.stringify(chatData, null, 2)], {
    type: "application/json",
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `dupechat-conversation-${new Date().toISOString().split("T")[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}