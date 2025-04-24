"use client"

import React, { useEffect, useState } from "react"
import type { SectionId } from "@/types"

type NavbarProps = {
  activeSection: SectionId
  scrollToSection: (section: SectionId) => void
  sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>>
}

const sectionNames: Record<SectionId, string> = {
  hero: "Home",
  about: "About",
  community: "Community",
  workers: "Team",
  impact: "Impact",
  contact: "Contact",
}

export function Navbar({ activeSection, scrollToSection, sectionRefs }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll events and update active section
  useEffect(() => {
    const handleScroll = () => {
      // Change header background on scroll
      setScrolled(window.scrollY > 50)

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500)

      // Determine active section based on the scroll position
      const current = Object.entries(sectionRefs).find((entry) => {
        const ref = entry[1]
        if (!ref.current) return false
        const rect = ref.current.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (current) {
        // Update active section when the top of the section is in the viewport
        const sectionId = current[0] as SectionId
        if (activeSection !== sectionId) {
          scrollToSection(sectionId)
        }
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up on unmount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection, sectionRefs, scrollToSection])

  return (
    <nav className={`fixed top-0 z-50 w-full bg-white shadow-md ${scrolled ? 'bg-blue-500' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="text-xl font-bold text-blue-600">MARE</div>
        <ul className="flex gap-6 text-sm font-medium text-gray-600">
          {Object.keys(sectionNames).map((key) => {
            const section = key as SectionId
            const isActive = activeSection === section

            return (
              <li
                key={section}
                onClick={() => scrollToSection(section)}
                className={`cursor-pointer transition-colors ${
                  isActive ? "text-blue-600 font-semibold" : "hover:text-blue-400"
                }`}
              >
                {sectionNames[section]}
              </li>
            )
          })}
        </ul>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 p-3 bg-blue-600 text-white rounded-full"
        >
          ↑
        </button>
      )}
    </nav>
  )
}