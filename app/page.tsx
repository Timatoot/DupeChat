import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Shield, Zap, Brain, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">DupeChat</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#privacy"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
            >
              Privacy
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            No signup required • Try instantly
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Talk to your AI twin.{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Hear your own voice think.
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create an AI version of yourself that thinks, speaks, and reflects like you do. A safe space to explore your
            thoughts with your digital twin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/quiz">
              <Button
                size="lg"
                className="px-8 py-3 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Start 7-Question Quiz
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
                See How It Works
              </Button>
            </Link>
          </div>

          <p className="text-sm text-slate-500 mt-4">
            ✨ Takes 2 minutes • 🔒 Data stays in your browser • 🚀 Chat instantly
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why DupeChat is different
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Unlike generic AI assistants, DupeChat learns your unique voice, values, and quirks to create authentic
              conversations with yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Sounds Like You</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our AI learns your tone, values, and quirks from a quick 7-question quiz. No generic responses—just
                  authentic reflection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Instant Access</h3>
                <p className="text-slate-600 leading-relaxed">
                  No accounts, no waiting. Answer 7 questions and start chatting with your AI twin in under 2 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Completely Private</h3>
                <p className="text-slate-600 leading-relaxed">
                  Your data never leaves your browser. No cloud storage, no accounts, no tracking. Your conversations
                  stay yours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-lg text-slate-600">Three simple steps to meet your AI twin</p>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Take the Personality Quiz</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Answer 7 thoughtful questions about your communication style, values, and quirks. This helps us
                  understand your unique voice.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Review Your AI Twin</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  See how we've captured your personality. Edit and refine your twin's traits until it feels
                  authentically you.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Start Reflecting</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Chat with your AI twin about anything. Get insights, work through problems, or simply think out loud
                  in a safe space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Perfect for thoughtful minds</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Gen Z & Millennials</h3>
              <p className="text-slate-600">Digital natives who value authentic self-expression and mental wellness</p>
            </div>

            <div className="p-6">
              <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Creatives & Writers</h3>
              <p className="text-slate-600">
                Artists and writers looking for a unique way to explore ideas and overcome blocks
              </p>
            </div>

            <div className="p-6">
              <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Self-Reflection Seekers</h3>
              <p className="text-slate-600">
                People who want to understand themselves better through meaningful dialogue
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Shield className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your privacy is our priority</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            No accounts. Your data stays in your browser. Chat calls the model provider to generate replies.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">Local Storage Only</h3>
              <p className="text-slate-300">
                All your quiz answers, persona, and chat history are stored locally in your browser. We never see or
                store your personal data.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">No Accounts Required</h3>
              <p className="text-slate-300">
                Start using DupeChat immediately without creating an account, providing an email, or sharing any personal
                information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What's Coming Next
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              DupeChat is just getting started. Here's what we're working on to make your AI twin even better.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Enhanced AI Models</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Upgrading to more advanced paid models for better conversations, deeper understanding, and more nuanced responses that truly capture your unique voice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Better Personality Capture</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Refined prompts and setup process to better represent diverse communication styles, backgrounds, and personalities with greater accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Enhanced Context System</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  A more sophisticated setup that gives your AI twin deeper context and memory, making conversations feel even more authentic and personal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Redesigned Experience</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  A completely refined and likely redesigned UI that's more intuitive, beautiful, and creates an even better conversation experience.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 dark:text-slate-400 italic">
              Currently running on free models while I'm a broke uni student 😅 - but big improvements are coming!
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Portfolio Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Built by a Developer Who Cares
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            DupeChat is a passion project created to explore authentic AI interactions. Want to see more of my work or get in touch?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="px-8 py-3" asChild>
              <Link href="https://tymur.tech" target="_blank" rel="noopener noreferrer">
                View My Portfolio or Get In Touch
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            I'm always interested in feedback and connecting with fellow developers!
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to meet your AI twin?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the conversation with yourself. Discover new perspectives and insights through authentic AI reflection.
          </p>

          <Link href="/quiz">
            <Button size="lg" className="px-12 py-4 text-lg bg-white text-purple-600 hover:bg-slate-100">
              Start Your 7-Question Quiz
            </Button>
          </Link>

          <p className="text-sm mt-4 opacity-75">Takes less than 2 minutes • No signup required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-slate-400">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">DupeChat</span>
            </div>

            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/settings" className="hover:text-white transition-colors">
                Settings
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 DupeChat. Your AI twin for authentic self-reflection.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
