import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"



export const metadata: Metadata = {
  title: "DupeChat - Talk to Your AI Twin",
  description:
    "Create an AI version of yourself that thinks, speaks, and reflects like you do. A safe space to explore your thoughts with your digital twin.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>

        </Suspense>
      </body>
    </html>
  )
}
