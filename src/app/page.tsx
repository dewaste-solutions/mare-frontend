"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { CheckCircle } from "lucide-react"

// Import components
import { Navigation } from "@/components/landing/navigation"
import { HeroSection } from "@/components/landing/hero-section"
import { AboutSection } from "@/components/landing/about-section"
import { CommunitySection } from "@/components/landing/community-section"
import { TeamSection } from "@/components/landing/team-section"
import { ImpactSection } from "@/components/landing/impact-section"
import { ContactSection } from "@/components/landing/contact-section"
import { Footer } from "@/components/landing/footer"
import { ScrollToTop } from "@/components/landing/scroll-to-top"
import { Modals } from "@/components/landing/modals"

// Define team member type
type TeamMember = {
  name: string
  role: string
  description: string
  bio?: string
  email?: string
  phone?: string
  location?: string
  startDate?: string
  skills?: string[]
  education?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
}

// Define section ID type to properly type the refs
type SectionId = 'hero' | 'about' | 'community' | 'workers' | 'impact' | 'contact';

export default function LandingPage() {
  // State for modals
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [showCommunityModal, setShowCommunityModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showPositionsModal, setShowPositionsModal] = useState(false)
  const [activeInfoType, setActiveInfoType] = useState<string | null>(null)
  const [showThankYouToast, setShowThankYouToast] = useState(false)

  // State for navigation
  const [activeSection, setActiveSection] = useState<SectionId>("hero")

  // Refs for sections - properly typed with HTMLDivElement
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    community: useRef<HTMLDivElement>(null),
    workers: useRef<HTMLDivElement>(null),
    impact: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")

  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Determine active section
      const current = Object.entries(sectionRefs).find(([key, ref]) => {
        if (!ref.current) return false
        const rect = ref.current.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (current) {
        setActiveSection(current[0] as SectionId)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function - modified to accept string and validate it
  const scrollToSection = (sectionId: string) => {
    // Check if the section ID is valid
    if (sectionId in sectionRefs) {
      const section = sectionRefs[sectionId as SectionId].current
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      console.warn(`Invalid section ID: ${sectionId}`)
    }
  }

  // Modal handlers
  const handleJoinCommunity = () => {
    setShowJoinModal(true)
  }

  const handleLearnMore = (type: string) => {
    setActiveInfoType(type)
    setShowCommunityModal(true)
  }

  const handleViewPositions = () => {
    setShowPositionsModal(true)
  }

  const openProfile = (member: TeamMember) => {
    setSelectedMember(member)
    setIsProfileOpen(true)
  }

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription for:", newsletterEmail)
    setNewsletterEmail("")
    setShowThankYouToast(true)
    setTimeout(() => setShowThankYouToast(false), 3000)
  }

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Barangay San Isidro",
      location: "Manila",
      quote:
        "MARE! transformed how our community handles waste. We've reduced our landfill contribution by 75% and created 5 new jobs for local residents.",
    },
    {
      name: "Barangay Mabuhay",
      location: "Quezon City",
      quote:
        "Our MARE! Center has become a community hub where residents learn about sustainability while contributing to a cleaner environment.",
    },
    {
      name: "Barangay Bagong Pag-asa",
      location: "Cebu",
      quote:
        "The income from our recycled materials has funded community projects and provided additional income for participating households.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Custom color styles
  const primaryColor = "#038167"
  const primaryLightColor = "#039d7e"
  const primaryDarkColor = "#026853"
  const primaryVeryLightColor = "#e6f3f1"
  const primaryVeryDarkColor = "#01574a"

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-green-50">
      {/* Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] h-[80%] w-[80%] rounded-full bg-[#038167]/10 blur-3xl"></div>
        <div className="absolute -bottom-[40%] -left-[30%] h-[80%] w-[80%] rounded-full bg-[#038167]/10 blur-3xl"></div>
      </div>

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        onJoinCommunity={handleJoinCommunity}
      />

      {/* Hero Section */}
      <div ref={sectionRefs.hero}>
        <HeroSection onJoinCommunity={handleJoinCommunity} onMeetTeam={() => scrollToSection("workers")} />
      </div>

      {/* About Section */}
      <div ref={sectionRefs.about}>
        <AboutSection onLearnMore={handleLearnMore} />
      </div>

      {/* Community Section */}
      <div ref={sectionRefs.community}>
        <CommunitySection onLearnMore={handleLearnMore} />
      </div>

      {/* Team Section */}
      <div ref={sectionRefs.workers}>
        <TeamSection onOpenProfile={openProfile} onViewPositions={handleViewPositions} />
      </div>

      {/* Impact Section */}
      <div ref={sectionRefs.impact}>
        <ImpactSection />
      </div>

      {/* Contact Section */}
      <div ref={sectionRefs.contact}>
        <ContactSection onLearnMore={handleLearnMore} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* Modals */}
      <Modals
        selectedMember={selectedMember}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        showCommunityModal={showCommunityModal}
        setShowCommunityModal={setShowCommunityModal}
        showJoinModal={showJoinModal}
        setShowJoinModal={setShowJoinModal}
        showPositionsModal={showPositionsModal}
        setShowPositionsModal={setShowPositionsModal}
        activeInfoType={activeInfoType}
        setShowThankYouToast={setShowThankYouToast}
      />

      {/* Thank You Toast */}
      {showThankYouToast && (
        <div className="fixed bottom-4 right-4 bg-[#038167] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <p>Thank you! We'll be in touch soon.</p>
          </div>
        </div>
      )}

      {/* CSS for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  )
}
