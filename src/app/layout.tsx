import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
// Update the import for WalkthroughProvider if needed
import { WalkthroughProvider } from "@/components/onboarding/walkthrough-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MARE! Waste Solution",
  description: "A waste management solution for communities",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
            <WalkthroughProvider>
              {children}
              <Toaster />
            </WalkthroughProvider>
          </AuthProvider>
      </body>
    </html>
  )
}
