"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
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

  // Create refs outside of useMemo
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)
  const workersRef = useRef<HTMLDivElement>(null)
  const impactRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Use useMemo to create a stable reference object
  const sectionRefs = useMemo(() => ({
    hero: heroRef,
    about: aboutRef,
    community: communityRef,
    workers: workersRef,
    impact: impactRef,
    contact: contactRef,
  }), []);

  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Determine active section
      const current = Object.entries(sectionRefs).find(([, ref]) => {
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
  }, [sectionRefs])

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
      <div ref={heroRef}>
        <HeroSection onJoinCommunity={handleJoinCommunity} onMeetTeam={() => scrollToSection("workers")} />
      </div>

      {/* About Section */}
      <div ref={aboutRef}>
        <AboutSection onLearnMore={handleLearnMore} />
      </div>

      {/* Community Section */}
      <div ref={communityRef}>
        <CommunitySection onLearnMore={handleLearnMore} />
      </div>

      {/* Team Section */}
      <div ref={workersRef}>
        <TeamSection onOpenProfile={openProfile} onViewPositions={handleViewPositions} />
      </div>

      {/* Impact Section */}
      <div ref={impactRef}>
        <ImpactSection />
      </div>

      {/* Contact Section */}
      <div ref={contactRef}>
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
            <p>Thank you! We&apos;ll be in touch soon.</p>
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
