import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, MessageCircle, Shield, Zap, Edit3, Download, RotateCcw, Users, Heart, Sparkles } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Features</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need for authentic self-reflection with your AI twin
          </p>
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Personality Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                7 thoughtful questions that capture your unique communication style, values, and quirks.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary">Auto-save progress</Badge>
                <Badge variant="secondary">Resume anytime</Badge>
                <Badge variant="secondary">2-minute completion</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Editable Persona</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Review and refine your AI twin's personality until it feels authentically you.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary">Real-time editing</Badge>
                <Badge variant="secondary">Instant updates</Badge>
                <Badge variant="secondary">Full control</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Streaming Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Real-time conversations with your AI twin that thinks and responds like you.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary">Live responses</Badge>
                <Badge variant="secondary">Natural flow</Badge>
                <Badge variant="secondary">Authentic voice</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Complete Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                All data stored locally in your browser. No accounts, no cloud storage, no tracking.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary">Local storage only</Badge>
                <Badge variant="secondary">No accounts</Badge>
                <Badge variant="secondary">Full control</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Instant Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                No signup required. Start chatting with your AI twin in under 2 minutes.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary">No registration</Badge>
                <Badge variant="secondary">Immediate start</Badge>
                <Badge variant="secondary">Zero friction</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Feedback System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Rate your experience and help us improve how authentic your AI twin feels.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary">Quick feedback</Badge>
                <Badge variant="secondary">Authenticity rating</Badge>
                <Badge variant="secondary">Continuous improvement</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Advanced Capabilities</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-blue-600" />
                  <span>Data Export & Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Export all your data as JSON or clear everything with one click. You're always in control.
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Export chat history, persona, and feedback</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Clear all data instantly</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>No vendor lock-in</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-green-600" />
                  <span>Session Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Reset conversations, start fresh, or continue where you left off. Flexible and intuitive.
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Reset chat anytime</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Auto-save conversations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Resume across browser sessions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Target Users */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Perfect For</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Gen Z & Millennials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Digital natives who value authentic self-expression and are comfortable with AI technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Creatives & Writers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Artists, writers, and creative professionals looking for a unique way to explore ideas and overcome
                  blocks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Self-Reflection Seekers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  People interested in personal growth who want to understand themselves better through dialogue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Experience the difference</h2>
              <p className="text-xl mb-8 opacity-90">
                Unlike generic AI assistants, Doppel creates a truly personal reflection experience
              </p>
              <Link href="/quiz">
                <Button size="lg" className="px-8 py-3 text-lg bg-white text-purple-600 hover:bg-slate-100">
                  Start Your 7-Question Quiz
                </Button>
              </Link>
              <p className="text-sm mt-4 opacity-75">Takes less than 2 minutes • No signup required</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
