import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, MessageCircle, Settings, Shield } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
            <span>← Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">How DupeChat Works</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover how we create your AI twin and why it feels authentically like you
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                1
              </div>
            </div>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <span>Personality Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Our 7-question quiz captures the essence of your communication style, values, and quirks. Unlike
                  generic personality tests, we focus specifically on how you think and express yourself.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">What we analyze:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your natural communication tone and style</li>
                    <li>• Core values that guide your decisions</li>
                    <li>• Unique quirks and thinking patterns</li>
                    <li>• How you approach problems and reflection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                2
              </div>
            </div>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-6 h-6 text-green-600" />
                  <span>AI Twin Creation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We transform your quiz responses into a detailed persona that captures your authentic voice. This
                  becomes the foundation for how your AI twin thinks and responds.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Persona elements:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Tone and emotional style</li>
                    <li>• Value-based decision making</li>
                    <li>• Communication quirks and patterns</li>
                    <li>• Problem-solving approach</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                3
              </div>
            </div>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                  <span>Authentic Conversations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Your AI twin uses advanced language models guided by your unique persona. Every response reflects your
                  values, tone, and thinking style.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">What makes it authentic:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Speaks in first person as "you"</li>
                    <li>• Reflects your values in responses</li>
                    <li>• Uses your communication quirks</li>
                    <li>• Maintains your problem-solving style</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="mt-16">
          <Card className="bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
                <span>Built for Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-300 leading-relaxed mb-6">
                Your data never leaves your browser. We can't see your quiz answers, persona, or chat history.
                Everything stays private and secure on your device.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-400 mb-2">Local Storage</h4>
                  <p className="text-slate-400">All data stored in your browser only</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-400 mb-2">No Accounts</h4>
                  <p className="text-slate-400">Start using immediately, no signup required</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-400 mb-2">Full Control</h4>
                  <p className="text-slate-400">Export or delete your data anytime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to meet your AI twin?</h2>
          <p className="text-slate-600 mb-8">
            Start with our 7-question quiz and begin authentic self-reflection in minutes
          </p>
          <Link href="/quiz">
            <Button size="lg" className="px-8 py-3 text-lg">
              Start Your Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
