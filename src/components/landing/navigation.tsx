"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from 'next/image';
import { Menu, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface NavigationProps {
  activeSection: string
  scrollToSection: (section: string) => void
  isLandingPage?: boolean
  onJoinCommunity?: () => void
}

export function Navigation({ activeSection, scrollToSection, isLandingPage = true, onJoinCommunity }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTabClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md" : "bg-white/80"} backdrop-blur-md`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Image src="/logo.svg" alt="MARE! Logo" width={40} height={40} className="h-10" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {isLandingPage ? (
            // Landing page navigation
            [
              { id: "about", label: "About" },
              { id: "community", label: "Community" },
              { id: "workers", label: "Our Team" },
              { id: "impact", label: "Impact" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`group text-sm font-medium transition-colors ${activeSection === item.id ? "text-[#038167]" : "text-gray-600 hover:text-[#038167]"}`}
              >
                {item.label}
                <span
                  className={`block h-0.5 bg-[#038167] transition-all duration-300 ${activeSection === item.id ? "max-w-full" : "max-w-0 group-hover:max-w-full"}`}
                ></span>
              </button>
            ))
          ) : (
            // Back to home link for non-landing pages
            <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-[#038167] transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
        <Link href="/login">
          <Button
            variant="outline"
            className="mr-2 border-[#038167]/20 hover:bg-[#038167]/5 hover:text-[#038167] transition-all"
          >
            Login
          </Button>
        </Link>
      

          {/* Mobile Menu Toggle */}
          <button className="p-2 text-gray-600 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {isLandingPage ? (
                // Landing page navigation items
                [
                  { id: "about", label: "About" },
                  { id: "community", label: "Community" },
                  { id: "workers", label: "Our Team" },
                  { id: "impact", label: "Impact" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`text-left py-2 px-4 rounded-md ${activeSection === item.id ? "bg-[#038167]/10 text-[#038167]" : "text-gray-600"}`}
                  >
                    {item.label}
                  </button>
                ))
              ) : (
                // Back to home link for non-landing pages
                <Link href="/" className="text-left py-2 px-4 rounded-md text-gray-600">
                  <ChevronLeft className="h-4 w-4 inline mr-1" />
                  Back to Home
                </Link>
              )}
              {isLandingPage && (
                <Button
                  className="bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white shadow-md hover:shadow-lg transition-all mt-2"
                  onClick={() => {
                    onJoinCommunity?.()
                    setIsMenuOpen(false)
                  }}
                >
                  Join Our Community
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

import { X } from "lucide-react"
