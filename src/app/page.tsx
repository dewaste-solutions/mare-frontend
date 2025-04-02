"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  Recycle,
  Home,
  Building,
  Users,
  Leaf,
  Heart,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Menu,
  X,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { RefObject } from "react"

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

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Add these state variables after the existing state declarations (around line 50)
  const [showCommunityModal, setShowCommunityModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showPositionsModal, setShowPositionsModal] = useState(false)
  const [activeInfoType, setActiveInfoType] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [showThankYouToast, setShowThankYouToast] = useState(false)

  const sectionRefs: Record<string, RefObject<HTMLElement | null>> = {
    hero: useRef<HTMLElement | null>(null),
    about: useRef<HTMLElement | null>(null),
    community: useRef<HTMLElement | null>(null),
    impact: useRef<HTMLElement | null>(null),
    workers: useRef<HTMLElement | null>(null),
    contact: useRef<HTMLElement | null>(null),
  };

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Maria Santos",
      role: "Community Coordinator",
      description: "Works directly with barangays to implement MARE! programs and train community members.",
      bio: "Maria has over 8 years of experience in community development and waste management education. She has successfully implemented MARE! programs in 5 different communities, resulting in significant improvements in waste diversion rates.",
      email: "maria.santos@marerecovery.org",
      phone: "+63 912 345 6789",
      location: "Manila, Philippines",
      startDate: "January 2019",
      skills: ["Community Engagement", "Program Implementation", "Training & Development", "Stakeholder Management"],
      education: "BS Environmental Science, University of the Philippines",
      socialLinks: {
        linkedin: "https://linkedin.com/in/mariasantos",
        twitter: "https://twitter.com/mariasantos",
      },
    },
    {
      name: "Juan Reyes",
      role: "Waste Management Specialist",
      description:
        "Designs efficient waste segregation systems and trains local workers on proper handling techniques.",
      bio: "Juan brings 10+ years of experience in waste management systems. Before joining MARE!, he worked with several environmental NGOs and government agencies to develop sustainable waste management solutions.",
      email: "juan.reyes@marerecovery.org",
      phone: "+63 923 456 7890",
      location: "Quezon City, Philippines",
      startDate: "March 2018",
      skills: ["Waste Segregation Systems", "Technical Training", "Process Optimization", "Environmental Compliance"],
      education: "MS Environmental Engineering, Ateneo de Manila University",
      socialLinks: {
        linkedin: "https://linkedin.com/in/juanreyes",
      },
    },
    {
      name: "Ana Lim",
      role: "Franchisee Relations Manager",
      description:
        "Supports franchisees with training, resources, and ensures collected materials reach the right processing facilities.",
      bio: "Ana has a background in business development and sustainability. She has helped onboard and support over 15 franchisees, ensuring their operations align with MARE!'s standards while remaining profitable.",
      email: "ana.lim@marerecovery.org",
      phone: "+63 934 567 8901",
      location: "Cebu, Philippines",
      startDate: "June 2020",
      skills: ["Franchisee Support", "Business Development", "Supply Chain Management", "Relationship Building"],
      education: "MBA with focus on Sustainable Business, De La Salle University",
      socialLinks: {
        linkedin: "https://linkedin.com/in/analim",
        twitter: "https://twitter.com/analim",
      },
    },
    {
      name: "Carlos Mendoza",
      role: "Education & Outreach",
      description:
        "Develops educational materials and conducts workshops on waste management and environmental awareness.",
      bio: "Carlos is passionate about environmental education. He has developed comprehensive educational programs that have been implemented in schools and communities across the Philippines, reaching over 10,000 individuals.",
      email: "carlos.mendoza@marerecovery.org",
      phone: "+63 945 678 9012",
      location: "Davao, Philippines",
      startDate: "September 2019",
      skills: ["Curriculum Development", "Public Speaking", "Workshop Facilitation", "Digital Content Creation"],
      education: "BS Education, University of Santo Tomas",
      socialLinks: {
        linkedin: "https://linkedin.com/in/carlosmendoza",
      },
    },
  ]

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Change header background on scroll
      setScrolled(window.scrollY > 50)

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500)

      // Determine active section
      const current = Object.entries(sectionRefs).find(([key, ref]) => {
        if (!ref.current) return false
        const rect = ref.current.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (current) {
        setActiveSection(current[0])
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
  setIsMenuOpen(false);
  const section = sectionRefs[sectionId]?.current;
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};


  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Open profile modal
  const openProfile = (member: TeamMember) => {
    setSelectedMember(member)
    setIsProfileOpen(true)
  }

  // Add these functions after the openProfile function (around line 100)
  // Handle join community button clicks
  const handleJoinCommunity = () => {
    setShowJoinModal(true)
  }

  // Handle learn more button clicks
  const handleLearnMore = (type: string) => {
    setActiveInfoType(type)
    setShowCommunityModal(true)
  }

  // Handle view positions button click
  const handleViewPositions = () => {
    setShowPositionsModal(true)
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-green-50">
      {/* Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] h-[80%] w-[80%] rounded-full bg-[#038167]/10 blur-3xl"></div>
        <div className="absolute -bottom-[40%] -left-[30%] h-[80%] w-[80%] rounded-full bg-[#038167]/10 blur-3xl"></div>
      </div>

      {/* Navigation */}
       {/* Header */}
       <Header activeSection={activeSection} scrollToSection={scrollToSection} />


      {/* Hero Section */}
      <section ref={sectionRefs.hero} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#026853]/90 to-[#038167]/90 z-10" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-20 grid md:grid-cols-2 gap-8 items-center min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <Badge className="mb-4 bg-[#FFC539] text-[#038167] hover:bg-[#038167]/10">
              Transforming Communities
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="block text-6xl">MARE!</span>
              <span className="block text-[#FFC539] text-7xl">Community</span>
            </h1>
            <div className="w-40 h-1.5 bg-[#F69C91] rounded-full mb-6"></div>
            <p className="text-xl md:text-2xl mb-4 text-white">People-powered materials recovery</p>
            <p className="text-lg mb-8 text-white max-w-lg">
              Join our growing network of communities and workers transforming waste management across the Philippines.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-[#038167] hover:bg-[#e6f3f1] group transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleJoinCommunity}
              >
                <span className="text-[#038167]">Join Our Community</span>
                <ArrowRight className="ml-2 h-4 w-4 text-[#038167] group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                color ="outline"
                className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm"
                onClick={() => scrollToSection("workers")}
              >
                Meet Our Team
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
              <Avatar className="border-2 border-white h-10 w-10">
                <AvatarImage src="/profiles/profile-1.png" alt="Community member" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white h-10 w-10">
                <AvatarImage src="/profiles/profile-2.png" alt="Community member" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white h-10 w-10">
                <AvatarImage src="/profiles/profile-3.png" alt="Community member" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              </div>
              <div className="text-sm">
                <span className="text-[#FFC539] font-semibold">1,000+ community members</span>
                <span className="block text-white/70">already joined</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
            <Image
              src="/images/IMG_7610.png"
              alt="MARE! community members working together"
              fill
              className="object-cover"
              priority
            />

            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-[#e6f3f1] p-2 rounded-full">
                  <Recycle className="h-6 w-6 text-[#038167]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F69C91]">85% Waste Diversion</p>
                  <p className="text-xs text-gray-500">Achieved in our communities</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-[#e6f3f1] p-2 rounded-full">
                  <Users className="h-6 w-6 text-[#038167]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#FFC539]">50+ Local Jobs</p>
                  <p className="text-xs text-gray-500">Created and growing</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} id="about" className="py-24 relative">
  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#038167]/10 rounded-full blur-3xl -z-10"></div>
  <div className="container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid gap-12 md:grid-cols-2 items-center"
    >
      {/* Image now appears first (left side) */}
      <div className="relative">
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-[#e6f3f1]">
          <Image
            src="/images/img_0232.png"
            alt="MARE! community center"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-6 right-10 bg-white p-5 rounded-xl shadow-xl max-w-xs">
          <div className="flex items-start gap-3">
            <div className="bg-[#F69C91]/25 p-2 rounded-full shrink-0 mt-1">
              <Leaf className="h-5 w-5 text-[#F69C91]" />
            </div>
            <div>
              <p className="font-semibold text-[#F69C91]">Circular Economy</p>
              <p className="text-sm text-gray-500 mt-1">
                Turning waste into resources and creating sustainable communities
              </p>
            </div>
          </div>
        </div>
        <div className="absolute -right-6 top-1/4 bg-[#038167] p-3 rounded-lg shadow-lg">
          <Recycle className="h-6 w-6 text-white" />
        </div>
        <div className="absolute -left-6 top-1/2 bg-[#038167] p-3 rounded-lg shadow-lg">
          <Home className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Text now appears second (right side) */}
      <div>
        <Badge className="mb-4 bg-[#F69C91]/25 text-[#F69C91] hover:bg-[#d1ebe7]">About Us</Badge>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-transparent">
          About MARE!
        </h2>
        <div className="w-20 h-1 bg-[#038167] rounded-full mb-6"></div>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            MARE!, short for <span className="font-semibold text-[#038167]">MAterials REcovery</span>, is a
            community-driven solution that brings together residents, local workers, and recyclers to create a
            sustainable waste management ecosystem.
          </p>
          <p className="text-lg text-gray-700">
            We&apos;re a reverse logistics social enterprise that recovers{" "}
            <span className="font-semibold text-[#038167]">85% of household waste</span> composition and diverts
            them for recycling/processing, not to landfills.
          </p>
          <p className="text-lg text-gray-700">
            Our mission is to make landfills obsolete and circular economy a new norm by empowering communities to
            take control of their waste management.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <Button
            className="bg-[#038167] hover:bg-[#026853] text-white shadow-md hover:shadow-lg transition-all group"
            onClick={() => handleLearnMore("about")}
          >
            Learn More
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[#038167]" />
            <span>Sustainable Solution</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Community Section */}
      <section ref={sectionRefs.community} id="community" className="py-24 relative">
        <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-[#038167]/10 rounded-full blur-3xl -z-10"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-[#e6f3f1] text-[#026853] hover:bg-[#d1ebe7]">Our People</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-transparent">
              Our Community
            </h2>
            <div className="w-20 h-1 bg-[#038167] rounded-full mb-6 mx-auto"></div>
            <p className="text-lg text-gray-700">
              MARE! brings together diverse stakeholders to create a thriving ecosystem of waste management champions.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-[#e6f3f1] hover:border-[#d1ebe7]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6f3f1] to-[#f5faf9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg group-hover:shadow-[#038167]/20 transition-all">
                    <Home className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#026853] group-hover:text-[#038167] transition-colors">
                    Residents
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    Local community members learn proper waste segregation and participate in collection events. They
                    become the foundation of our circular economy model.
                  </p>
                  <div className="mt-6 flex items-center text-[#038167] font-medium text-sm">
                    <button onClick={() => handleLearnMore("residents")} className="flex items-center hover:underline">
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-[#e6f3f1] hover:border-[#d1ebe7]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6f3f1] to-[#f5faf9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg group-hover:shadow-[#038167]/20 transition-all">
                    <Users className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#026853] group-hover:text-[#038167] transition-colors">
                    Barangay Leaders
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    Local government officials who champion MARE! in their communities, providing support and resources
                    to ensure program success and compliance with waste management policies.
                  </p>
                  <div className="mt-6 flex items-center text-[#038167] font-medium text-sm">
                    <button onClick={() => handleLearnMore("barangay")} className="flex items-center hover:underline">
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-[#e6f3f1] hover:border-[#d1ebe7]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6f3f1] to-[#f5faf9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg group-hover:shadow-[#038167]/20 transition-all">
                    <Building className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#026853] group-hover:text-[#038167] transition-colors">
                    Franchisees
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    Local entrepreneurs who operate MARE! Centers in their communities, creating sustainable businesses
                    while solving waste management challenges.
                  </p>
                  <div className="mt-6 flex items-center text-[#038167] font-medium text-sm">
                    <button
                      onClick={() => handleLearnMore("franchisees")}
                      className="flex items-center hover:underline"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-[#026853]">Community Success Stories</h3>
              <div className="w-16 h-1 bg-[#038167] rounded-full mt-4 mx-auto"></div>
            </div>

            <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-[#e6f3f1] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6f3f1] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e6f3f1] rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentTestimonial((prev) => (prev - 1 + 3) % 3)}
                      className="p-2 rounded-full bg-[#e6f3f1] text-[#038167] hover:bg-[#d1ebe7] transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="w-16 flex justify-center">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full mx-1 transition-colors ${currentTestimonial === i ? "bg-[#038167]" : "bg-[#e6f3f1]"}`}
                          onClick={() => setCurrentTestimonial(i)}
                        ></div>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentTestimonial((prev) => (prev + 1) % 3)}
                      className="p-2 rounded-full bg-[#e6f3f1] text-[#038167] hover:bg-[#d1ebe7] transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="relative h-[200px]">
                  {testimonials.map((testimonial, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: currentTestimonial === i ? 1 : 0,
                        x: currentTestimonial === i ? 0 : 20,
                        position: currentTestimonial === i ? "relative" : "absolute",
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-center absolute inset-0"
                      style={{ display: Math.abs(currentTestimonial - i) > 1 ? "none" : "block" }}
                    >
                      <div className="flex justify-center mb-6">
                        <Avatar className="h-20 w-20 border-4 border-[#e6f3f1]">
                          <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Community member" />
                          <AvatarFallback className="bg-[#038167] text-white text-xl">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-[#026853]">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                      <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">&quot;{testimonial.quote}&quot;</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workers Section */}
      <section
        ref={sectionRefs.workers}
        id="workers"
        className="py-24 bg-gradient-to-b from-[#e6f3f1] to-white relative"
      >
        <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-[#e6f3f1] text-[#026853] hover:bg-[#d1ebe7]">Our People</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-transparent">
              Our Team
            </h2>
            <div className="w-20 h-1 bg-[#038167] rounded-full mb-6 mx-auto"></div>
            <p className="text-lg text-gray-700">
              Meet the dedicated individuals who make MARE! possible. Our team combines waste management expertise with
              community organizing skills.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {teamMembers.map((member, i) => (
              <motion.div key={i} variants={item} className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center text-center">
                  <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                    <Avatar className="h-24 w-24 border-4 border-[#e6f3f1] group-hover:border-[#d1ebe7] transition-colors">
                      <AvatarImage src="/placeholder.svg?height=100&width=100" alt={`${member.name}`} />
                      <AvatarFallback className="bg-[#038167] text-white text-xl">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-[#038167] text-white p-1.5 rounded-full shadow-md">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#026853] group-hover:text-[#038167] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#038167] mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 flex-grow">{member.description}</p>
                  <Button
                    color ="ghost"
                    size="sm"
                    className="mt-4 text-[#038167] hover:text-[#026853] hover:bg-[#e6f3f1] group"
                    onClick={() => openProfile(member)}
                  >
                    <span>View Profile</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-br from-[#e6f3f1] to-white p-8 rounded-2xl shadow-xl border border-[#e6f3f1]">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <Badge className="mb-4 bg-[#e6f3f1] text-[#026853] hover:bg-[#d1ebe7]">Careers</Badge>
                  <h3 className="text-2xl font-bold text-[#026853] mb-4">Join Our Team</h3>
                  <div className="w-16 h-1 bg-[#038167] rounded-full mb-6"></div>
                  <p className="text-lg text-gray-700 mb-6">
                    MARE! is always looking for passionate individuals to join our mission. We offer:
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Meaningful work with direct community impact</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Training in waste management and recycling</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Competitive compensation and growth opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">A supportive team environment</span>
                    </li>
                  </ul>
                  <Button
                    className="bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white shadow-md hover:shadow-lg transition-all"
                    onClick={handleViewPositions}
                  >
                    View Open Positions
                  </Button>
                </div>
                <div className="relative">
                  <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="MARE! team working together"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#e6f3f1] p-2 rounded-full">
                        <Users className="h-5 w-5 text-[#038167]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Join our team</p>
                        <p className="text-xs text-gray-500">Make an impact today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={sectionRefs.impact} id="impact" className="py-24 relative">
        <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-[#038167]/10 rounded-full blur-3xl -z-10"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-[#e6f3f1] text-[#026853] hover:bg-[#d1ebe7]">Our Results</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-transparent">
              Our Impact
            </h2>
            <div className="w-20 h-1 bg-[#038167] rounded-full mb-6 mx-auto"></div>
            <p className="text-lg text-gray-700">
              MARE! creates positive change for communities, workers, and the environment.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-[#e6f3f1] hover:border-[#d1ebe7] h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6f3f1] to-[#f5faf9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10 h-full flex flex-col">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg group-hover:shadow-[#038167]/20 transition-all">
                    <Users className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#026853] group-hover:text-[#038167] transition-colors">
                    Community Benefits
                  </h3>
                  <ul className="mt-2 space-y-3 flex-grow">
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Cleaner streets and public spaces</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Revenue from recycled materials</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Reduced waste management costs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Improved compliance with regulations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-[#e6f3f1] hover:border-[#d1ebe7] h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6f3f1] to-[#f5faf9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10 h-full flex flex-col">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg group-hover:shadow-[#038167]/20 transition-all">
                    <Heart className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#026853] group-hover:text-[#038167] transition-colors">
                    Worker Benefits
                  </h3>
                  <ul className="mt-2 space-y-3 flex-grow">
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Stable employment opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Skills development and training</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Safer working conditions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Pride in environmental stewardship</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-[#e6f3f1] hover:border-[#d1ebe7] h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e6f3f1] to-[#f5faf9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10 h-full flex flex-col">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg group-hover:shadow-[#038167]/20 transition-all">
                    <Leaf className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#026853] group-hover:text-[#038167] transition-colors">
                    Environmental Impact
                  </h3>
                  <ul className="mt-2 space-y-3 flex-grow">
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">85% diversion of waste from landfills</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Reduced plastic pollution in waterways</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Lower greenhouse gas emissions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Conservation of natural resources</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-[#038167] to-[#026853] rounded-2xl shadow-xl overflow-hidden">
              <div className="grid gap-8 md:grid-cols-4 text-center p-10 relative">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-10 mix-blend-overlay"></div>

                {[
                  { value: "85%", label: "Waste Diversion Rate" },
                  { value: "12+", label: "Communities Served" },
                  { value: "50+", label: "Local Jobs Created" },
                  { value: "1,000+", label: "Households Participating" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="relative z-10"
                  >
                    <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="w-12 h-1 bg-[#a3e0d6] rounded-full mx-auto mb-2"></div>
                    <p className="text-[#e6f3f1]">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={sectionRefs.contact}
        id="contact"
        className="py-24 bg-gradient-to-br from-[#026853] to-[#038167] text-white relative"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-12 md:grid-cols-2 items-center"
          >
            <div>
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Join Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Join the MARE! Community</h2>
              <div className="w-20 h-1 bg-[#a3e0d6] rounded-full mb-6"></div>
              <p className="text-lg text-[#e6f3f1] mb-8">
                Whether you&apos;re a community leader, a potential team member, or a franchisee, we invite you to be part of
                our growing network.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#026853] hover:bg-[#e6f3f1] shadow-lg hover:shadow-xl transition-all w-full"
                  onClick={() => handleLearnMore("communities")}
                >
                  For Communities
                </Button>
                <Button
                  size="lg"
                  color ="outline"
                  className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm w-full"
                  onClick={() => handleLearnMore("workers")}
                >
                  For Workers
                </Button>
                <Button
                  size="lg"
                  color ="outline"
                  className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm w-full"
                  onClick={() => handleLearnMore("franchisees")}
                >
                  For Franchisees
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Building className="h-6 w-6 text-[#a3e0d6]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">MARE! Headquarters</p>
                    <p className="text-[#e6f3f1]">Manila, Philippines</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Phone className="h-6 w-6 text-[#a3e0d6]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Call Us</p>
                    <p className="text-[#e6f3f1]">+63 (2) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Mail className="h-6 w-6 text-[#a3e0d6]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email Us</p>
                    <p className="text-[#e6f3f1]">info@marerecovery.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Calendar className="h-6 w-6 text-[#a3e0d6]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Working Hours</p>
                    <p className="text-[#e6f3f1]">Mon-Fri: 8AM - 5PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#a3e0d6] to-[#038167] rounded-2xl blur-md opacity-70"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold text-[#026853] mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">I am interested in</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent">
                      <option>Community Partnership</option>
                      <option>Becoming a Franchisee</option>
                      <option>Job Opportunities</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white shadow-md hover:shadow-lg transition-all">
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />


      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-[#038167] text-white shadow-lg hover:bg-[#026853] transition-colors z-50"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}

      {/* Team Member Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white shadow-lg rounded-lg p-6">
          {selectedMember && (
            <>
              <DialogHeader className="bg-[#038167] text-white p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-white">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt={selectedMember.name} />
                    <AvatarFallback className="bg-[#026853] text-white text-xl">
                      {selectedMember.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl font-bold">{selectedMember.name}</DialogTitle>
                    <DialogDescription className="text-[#e6f3f1] opacity-90">{selectedMember.role}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#026853] mb-2">About</h3>
                  <p className="text-gray-700">{selectedMember.bio || selectedMember.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedMember.email && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-[#038167]">{selectedMember.email}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.phone && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-[#038167]">{selectedMember.phone}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.location && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-[#038167]">{selectedMember.location}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.startDate && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Joined</p>
                        <p className="text-[#038167]">{selectedMember.startDate}</p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedMember.skills && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#026853] mb-2">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill, index) => (
                        <Badge key={index} className="bg-[#e6f3f1] text-[#038167] hover:bg-[#d1ebe7]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMember.education && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#026853] mb-2">Education</h3>
                    <p className="text-gray-700">{selectedMember.education}</p>
                  </div>
                )}

                {selectedMember.socialLinks && (
                  <div className="border-t pt-4">
                    <div className="flex gap-4">
                      {selectedMember.socialLinks.linkedin && (
                        <a
                          href={selectedMember.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#038167] transition-colors"
                        >
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <span>LinkedIn</span>
                          </div>
                        </a>
                      )}
                      {selectedMember.socialLinks.twitter && (
                        <a
                          href={selectedMember.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#038167] transition-colors"
                        >
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                            <span>Twitter</span>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-between">
                <DialogClose asChild>
                  <Button color ="outline">Close</Button>
                </DialogClose>
                <Button className="bg-[#038167] hover:bg-[#026853]">Contact {selectedMember.name.split(" ")[0]}</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Community Info Modal */}
      <Dialog open={showCommunityModal} onOpenChange={setShowCommunityModal}>
        <DialogContent className="sm:max-w-[600px] bg-white shadow-lg rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#026853]">
              {activeInfoType === "about" && "About MARE!"}
              {activeInfoType === "residents" && "Residents"}
              {activeInfoType === "barangay" && "Barangay Leaders"}
              {activeInfoType === "franchisees" && "Franchisees"}
              {activeInfoType === "communities" && "For Communities"}
              {activeInfoType === "workers" && "For Workers"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {activeInfoType === "about" && (
              <div className="space-y-4">
                <p>
                  MARE! is a community-driven solution that addresses waste management challenges in the Philippines
                  through a circular economy approach.
                </p>
                <p>
                  Our innovative model brings together residents, local government units, and entrepreneurs to create a
                  sustainable ecosystem that diverts waste from landfills while creating economic opportunities.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Our Vision</h3>
                <p>
                  A Philippines where landfills are obsolete and communities thrive through sustainable waste management
                  practices.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Our Mission</h3>
                <p>
                  To empower communities to take control of their waste management through education, infrastructure,
                  and economic incentives.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-[#e6f3f1] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#038167]">85%</h4>
                    <p className="text-sm">Waste diverted from landfills</p>
                  </div>
                  <div className="bg-[#e6f3f1] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#038167]">50+</h4>
                    <p className="text-sm">Local jobs created</p>
                  </div>
                </div>
              </div>
            )}

            {activeInfoType === "residents" && (
              <div className="space-y-4">
                <p>
                  Residents are the foundation of the MARE! ecosystem. By properly segregating waste at home and
                  participating in collection events, they contribute to a cleaner community and a healthier
                  environment.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Benefits for Residents</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Cleaner neighborhoods and reduced waste-related health hazards</li>
                  <li>Potential income from recyclable materials</li>
                  <li>Educational opportunities about sustainable living</li>
                  <li>Pride in contributing to environmental conservation</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">How to Participate</h3>
                <p>
                  Residents can join MARE! by attending community orientation sessions, implementing proper waste
                  segregation at home, and participating in scheduled collection events.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowJoinModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  Join as a Resident
                </Button>
              </div>
            )}

            {activeInfoType === "barangay" && (
              <div className="space-y-4">
                <p>
                  Barangay leaders play a crucial role in implementing MARE! in their communities. They provide the
                  necessary support, resources, and policy framework to ensure the program&apos;s success.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Role of Barangay Leaders</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Champion waste management initiatives in the community</li>
                  <li>Allocate resources for MARE! implementation</li>
                  <li>Enforce waste management policies</li>
                  <li>Coordinate with MARE! team for program implementation</li>
                  <li>Monitor and evaluate program impact</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Success Stories</h3>
                <p>
                  Barangay San Isidro in Manila reduced their landfill contribution by 75% within six months of
                  implementing MARE!, while creating 5 new jobs for local residents.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowJoinModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  Partner with MARE!
                </Button>
              </div>
            )}

            {activeInfoType === "franchisees" && (
              <div className="space-y-4">
                <p>
                  MARE! franchisees are local entrepreneurs who operate MARE! Centers in their communities. They play a
                  vital role in the collection, segregation, and processing of recyclable materials.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Benefits for Franchisees</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Profitable business opportunity with social and environmental impact</li>
                  <li>Comprehensive training and ongoing support</li>
                  <li>Access to MARE!&apos;s network of recyclers and processors</li>
                  <li>Marketing and community engagement support</li>
                  <li>Opportunity to be a community leader in sustainability</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Investment and Returns</h3>
                <p>
                  MARE! franchisees typically recover their initial investment within 12-18 months, with ongoing revenue
                  streams from material sales, service fees, and community partnerships.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowJoinModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  Become a Franchisee
                </Button>
              </div>
            )}

            {activeInfoType === "communities" && (
              <div className="space-y-4">
                <p>
                  MARE! partners with communities to implement sustainable waste management solutions that benefit
                  residents, local government units, and the environment.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Our Approach</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Community assessment and needs analysis</li>
                  <li>Customized implementation plan</li>
                  <li>Community education and engagement</li>
                  <li>Infrastructure development</li>
                  <li>Ongoing support and monitoring</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Impact</h3>
                <p>
                  Communities implementing MARE! typically see an 85% reduction in waste sent to landfills, cleaner
                  public spaces, and new economic opportunities for residents.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowJoinModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  Partner with MARE!
                </Button>
              </div>
            )}

            {activeInfoType === "workers" && (
              <div className="space-y-4">
                <p>
                  MARE! creates meaningful employment opportunities for individuals passionate about environmental
                  sustainability and community development.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Career Opportunities</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Community Coordinators</li>
                  <li>Waste Management Specialists</li>
                  <li>Education and Outreach Officers</li>
                  <li>Franchisee Support Managers</li>
                  <li>Operations Staff</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Why Work with MARE!</h3>
                <p>
                  MARE! offers competitive compensation, professional development opportunities, and the chance to make
                  a tangible impact on communities and the environment.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    handleViewPositions()
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  View Open Positions
                </Button>
              </div>
            )}
          </div>

          <DialogClose asChild>
            <Button color="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Join Community Modal */}
      <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
        <DialogContent className="sm:max-w-[500px] bg-white shadow-lg rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#026853]">Join the MARE! Community</DialogTitle>
            <DialogDescription>Fill out this form to get started with MARE!</DialogDescription>
          </DialogHeader>

          <form className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">I am interested in joining as a</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent">
                <option>Community Resident</option>
                <option>Barangay Representative</option>
                <option>Potential Franchisee</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message (Optional)</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
              ></textarea>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to MARE!&apos;s Terms of Service and Privacy Policy
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white"
              onClick={(e) => {
                e.preventDefault()
                setShowJoinModal(false)
                setShowThankYouToast(true)
                setTimeout(() => setShowThankYouToast(false), 3000)
              }}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Open Positions Modal */}
      <Dialog open={showPositionsModal} onOpenChange={setShowPositionsModal}>
        <DialogContent className="sm:max-w-[600px] bg-white shadow-lg rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#026853]">Open Positions at MARE!</DialogTitle>
            <DialogDescription>
              Join our team and make a difference in communities across the Philippines
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            <div className="border rounded-lg p-4 hover:border-[#038167] transition-colors">
              <h3 className="text-lg font-semibold text-[#038167]">Community Coordinator</h3>
              <p className="text-sm text-gray-500 mb-2">Manila, Philippines | Full-time</p>
              <p className="mb-4">
                Work directly with barangays to implement MARE! programs and train community members on proper waste
                segregation and collection.
              </p>
              <Button color="outline" className="text-[#038167] border-[#038167]">
                View Details
              </Button>
            </div>


            <div className="border rounded-lg p-4 hover:border-[#038167] transition-colors">
              <h3 className="text-lg font-semibold text-[#038167]">Education & Outreach Officer</h3>
              <p className="text-sm text-gray-500 mb-2">Davao, Philippines | Full-time</p>
              <p className="mb-4">
                Develop educational materials and conduct workshops on waste management and environmental awareness in
                communities and schools.
              </p>
              <Button color="outline" className="text-[#038167] border-[#038167]">
                View Details
              </Button>
            </div>

            <div className="mt-6">
            <p className="text-center text-gray-600">Don&apos;t see a position that fits your skills?</p>
              <div className="flex justify-center mt-2">
                <Button
                  color ="outline"
                  className="text-[#038167] border-[#038167]"
                  onClick={() => {
                    setShowPositionsModal(false)
                    setShowJoinModal(true)
                  }}
                >
                  Submit General Application
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

