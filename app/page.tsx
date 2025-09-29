"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, Shield, Zap, Users, Mic, Palette, Sparkles, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Header */}
            {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md"></div>
            </div>
            <span className="text-2xl font-bold gradient-text">DupeChat</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className={`container mx-auto max-w-5xl text-center transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-scale-in">
            <Sparkles className="h-4 w-4" />
            No sign up required • Chat instantly
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Talk to your <span className="gradient-text">AI twin</span>. <br className="hidden md:block" />
            Hear your own voice think.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
            Create an AI version of yourself that thinks, speaks, and reflects like you do. A safe space to explore your
            thoughts with your digital twin.
          </p>

          <div className="flex flex-col items-center gap-6 justify-center mb-8">
            <Link href="/quiz">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start 7-Question Quiz
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>2 minutes
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Browser only
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Instant chat
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">7</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">2</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">0</div>
              <div className="text-sm text-muted-foreground">Sign-ups</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="gradient-text">DupeChat</span> is different
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Unlike generic AI assistants, DupeChat learns your unique voice, values, and quirks to create authentic
              conversations with yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Sounds Like You",
                description:
                  "Our AI learns your tone, values, and quirks from a quick 7-question quiz. No generic responses—just authentic reflection.",
                color: "from-blue-500 to-cyan-500",
                delay: "0s",
              },
              {
                icon: Zap,
                title: "Instant Access",
                description:
                  "No accounts, no waiting. Answer 7 questions and start chatting with your AI twin in under 2 minutes.",
                color: "from-green-500 to-emerald-500",
                delay: "0.2s",
              },
              {
                icon: Shield,
                title: "Completely Private",
                description:
                  "Your data never leaves your browser. No cloud storage, no accounts, no tracking. Your conversations stay yours.",
                color: "from-purple-500 to-pink-500",
                delay: "0.4s",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`hover-lift bg-card/50 backdrop-blur-sm border-border/50 animate-slide-up`}
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your <span className="gradient-text">privacy</span> is our priority
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            No accounts. Your data stays in your browser. Chat calls the model provider to generate replies.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Local Storage Only",
                description:
                  "All your quiz answers, persona, and chat history are stored locally in your browser. We never see or store your personal data.",
                icon: "🔒",
              },
              {
                title: "No Accounts Required",
                description:
                  "Start using DupeChat immediately without creating an account, providing an email, or sharing any personal information.",
                icon: "⚡",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="hover-lift bg-card/80 backdrop-blur-sm border-border/50 text-left animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Coming Next */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What's <span className="gradient-text">coming next</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              DupeChat is just getting started. Here's what we're working on to make your AI twin even better.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Enhanced AI Models",
                description:
                  "Upgrading to more advanced paid models for better conversations, deeper understanding, and more nuanced responses that truly capture your unique voice.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Users,
                title: "Better Personality Capture",
                description:
                  "Refined prompts and setup process to better represent diverse communication styles, backgrounds, and personalities with greater accuracy.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Brain,
                title: "Enhanced Context System",
                description:
                  "A more sophisticated setup that gives your AI twin deeper context and memory, making conversations feel even more authentic and personal.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Palette,
                title: "Redesigned Experience",
                description:
                  "A completely refined and likely redesigned UI that's more intuitive, beautiful, and creates an even better conversation experience.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Mic,
                title: "Real-Time Voice Talking",
                description:
                  "Have actual voice conversations with your AI twin in real-time, making the experience even more natural and immersive.",
                color: "from-red-500 to-pink-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="hover-lift bg-card/50 backdrop-blur-sm border-border/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-muted-foreground px-6 py-3 rounded-full text-sm border border-border/50">
              <Star className="h-4 w-4 text-yellow-500" />
              Currently running on free models while I'm a broke uni student 😅 - but big improvements are coming!
            </div>
          </div>
        </div>
      </section>

      {/* About Creator Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built by a <span className="gradient-text">developer</span> who cares
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            DupeChat is a passion project created to explore authentic AI interactions. Want to see more of my work or
            get in touch?
          </p>

          <Button
            size="lg"
            variant="outline"
            className="text-lg px-10 py-6 bg-transparent hover:bg-primary/10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group"
          >
            View My Portfolio or Get In Touch
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-muted-foreground mt-6">
            I'm always interested in feedback and connecting with fellow developers!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md"></div>
            </div>
            <span className="text-2xl font-bold gradient-text">DupeChat</span>
          </div>
          <p className="text-muted-foreground">Your AI twin, your thoughts, your privacy.</p>
        </div>
      </footer>
    </div>
  )
}
