import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Database, Eye, Lock } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
          <Shield className="w-16 h-16 text-purple-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-600">Your privacy is fundamental to how DupeChat works</p>
        </div>

        <div className="space-y-8">
          {/* Local Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-600" />
                <span>Local-Only Data Storage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                <strong>All your data stays in your browser.</strong> We store your quiz answers, AI persona, chat
                messages, and feedback locally using your browser's localStorage. This data never leaves your device
                unless you explicitly export it.
              </p>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">What this means for you:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Your conversations are completely private</li>
                  <li>• We can't see or access your personal data</li>
                  <li>• Your data is tied to this specific browser</li>
                  <li>• Clearing browser data will delete your DupeChat data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* AI Processing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-purple-600" />
                <span>AI Chat Processing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                When you chat with your AI twin, we send your messages to our AI model provider (OpenAI or OpenRouter)
                to generate responses. Here's what happens:
              </p>

              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-slate-900">What we send:</h4>
                  <p className="text-sm text-slate-600">
                    Your persona (tone, values, quirks) and current conversation messages
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-slate-900">What we don't send:</h4>
                  <p className="text-sm text-slate-600">
                    Your quiz answers, previous chat sessions, or any identifying information
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium text-slate-900">Provider policies:</h4>
                  <p className="text-sm text-slate-600">
                    AI providers may temporarily process your messages but don't store them for training (as of our last
                    update)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-green-600" />
                <span>Optional Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                We collect minimal, anonymous analytics to understand how Doppel is used and improve the experience.
                This is completely optional and can be disabled in Settings.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-2">What we track:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• App opens and page views</li>
                    <li>• Quiz completion rates</li>
                    <li>• Chat session starts</li>
                    <li>• Feedback submissions</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-2">What we don't track:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Message content</li>
                    <li>• Personal information</li>
                    <li>• IP addresses</li>
                    <li>• Device identifiers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-red-600" />
                <span>Your Rights & Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 leading-relaxed">You have complete control over your data in Doppel:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">You can:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Export all your data as JSON</li>
                    <li>• Clear all data at any time</li>
                    <li>• Disable analytics tracking</li>
                    <li>• Use Doppel without any account</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">We can't:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Access your stored data</li>
                    <li>• Recover deleted conversations</li>
                    <li>• Link data across devices</li>
                    <li>• Share your personal information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions or Concerns?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you have questions about privacy or how your data is handled, we're here to help. Since we can't see
                your data, most issues can be resolved through the Settings page.
              </p>

              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
