"use client";

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation";
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
  ArrowUpRight,
  Menu,
  X,
  ArrowUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MutableRefObject } from "react"


export default function LandingPage() {
  const router = useRouter(); // ✅ Initialize useRouter
    // ✅ Define handleLogin function inside the component
    const handleLogin = () => {
      router.push("/login"); // Redirects to the login page
    };
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)


const sectionRefs: Record<string, MutableRefObject<HTMLElement | null>> = {
  hero: useRef<HTMLElement | null>(null),
  about: useRef<HTMLElement | null>(null),
  community: useRef<HTMLElement | null>(null),
  workers: useRef<HTMLElement | null>(null),
  impact: useRef<HTMLElement | null>(null),
  contact: useRef<HTMLElement | null>(null),
}
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
  const scrollToSection = (sectionId: keyof typeof sectionRefs) => {
    setIsMenuOpen(false)
    const section = sectionRefs[sectionId]?.current
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }
  


  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


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
        <div className="absolute -top-[40%] -right-[30%] h-[80%] w-[80%] rounded-full bg-green-100/30 blur-3xl"></div>
        <div className="absolute -bottom-[40%] -left-[30%] h-[80%] w-[80%] rounded-full bg-green-100/30 blur-3xl"></div>
      </div>

      {/* Navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md" : "bg-white/80"} backdrop-blur-md`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
             {/* Logo Container */}
             <Image 
                src="/logo.svg"  // Ensure the file is in public/logo.svg
                alt="MARE! Logo"
                width={60} // Adjust size as needed
                height={60}
                className="h-10 w-auto"
              />
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {[
              { id: "about", label: "About" },
              { id: "community", label: "Community" },
              { id: "workers", label: "Our Team" },
              { id: "impact", label: "Impact" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-[#038167]" : "text-gray-600 hover:text-[#038167]"
                }`}
                
              >
                {item.label}
                <span
                 className={`block h-0.5 bg-[#038167] transition-all duration-300 ${
                  activeSection === item.id ? "max-w-full" : "max-w-0 group-hover:max-w-full"
                }`}

                ></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button 
              color="outline"
              className="mr-2 border-[#038167] text-gray-600 hover:bg-[#e6f5f2] hover:text-[#026e58] transition-all"
              onClick={handleLogin} // Calls handleLogin function
            >
                Login
            </Button>
            <Button className="bg-[#038167] hover:bg-[#026e58] text-white shadow-md hover:shadow-lg transition-all hidden md:flex">
              Join Our Community
            </Button>


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
                {[
                  { id: "about", label: "About" },
                  { id: "community", label: "Community" },
                  { id: "workers", label: "Our Team" },
                  { id: "impact", label: "Impact" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 px-4 rounded-md ${activeSection === item.id ? "bg-#038167 text-green-600" : "text-gray-600"}`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all mt-2">
                  Join Our Community
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={sectionRefs.hero} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#026B59]/90 to-[#038167]/90 z-10" />
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
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
              Transforming Communities
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="block">MARE!</span>
              <span className="block text-[#FFC539]">Community</span>
            </h1>
            <div className="w-20 h-1.5 bg-[#F69C91] rounded-full mb-6"></div>

            <p className="text-xl md:text-2xl mb-4 text-green-100">People-powered materials recovery</p>
            <p className="text-lg mb-8 text-white/80 max-w-lg">
              Join our growing network of communities and workers transforming waste management across the Philippines.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="large"
                className="bg-white text-green-800 hover:bg-green-100 group transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="large"
                color="outline"
                className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm"
              >
                Meet Our Team
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                <Avatar className="border-2 border-white h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Community member" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Community member" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Community member" />
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
                src="/placeholder.svg?height=450&width=600"
                alt="MARE! community members working together"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Recycle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">85% Waste Diversion</p>
                  <p className="text-xs text-gray-500">Achieved in our communities</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">50+ Local Jobs</p>
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
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-12 md:grid-cols-2 items-center"
          >
            <div>
            <Badge className="mb-4 bg-[#D1F2E5] text-[#038167] hover:bg-[#B8E6D3]">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#038167] to-[#026B59] bg-clip-text text-transparent">
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
                  We're a reverse logistics social enterprise that recovers{" "}
                  <span className="font-semibold text-[#038167]">85% of household waste</span> composition and diverts
                  them for recycling/processing, not to landfills.
                </p>
                <p className="text-lg text-gray-700">
                  Our mission is to make landfills obsolete and circular economy a new norm by empowering communities to
                  take control of their waste management.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-6">
              <Button className="bg-[#038167] hover:bg-[#026B59] text-white shadow-md hover:shadow-lg transition-all group">
              Learn More
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#038167]" />
                  <span>Sustainable Solution</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-green-100">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="MARE! community center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-10 bg-white p-5 rounded-xl shadow-xl max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full shrink-0 mt-1">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Circular Economy</p>
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
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section ref={sectionRefs.community} id="community" className="py-24 relative">
        <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-green-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-[#038167] hover:bg-green-200">Our People</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#038167] to-[#026B59] bg-clip-text text-transparent">
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
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-green-100 hover:border-green-200">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#038167] text-white shadow-lg group-hover:shadow-green-200/50 transition-all">
                  <Home className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-[#038167] group-hover:text-[#026B59] transition-colors">
                  Residents
                </h3>

                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    Local community members learn proper waste segregation and participate in collection events. They
                    become the foundation of our circular economy model.
                  </p>
                  <div className="mt-6 flex items-center text-[#038167] font-medium text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 text-[#038167] group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-green-100 hover:border-green-200">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#038167] text-white shadow-lg group-hover:shadow-green-200/50 transition-all">
                  <Users className="h-7 w-7" />
                </div>

                  <h3 className="text-xl font-bold mb-3 text-[#038167] group-hover:text-[#026B59] transition-colors">
                    Barangay Leaders
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    Local government officials who champion MARE! in their communities, providing support and resources
                    to ensure program success and compliance with waste management policies.
                  </p>
                  <div className="mt-6 flex items-center text-[#038167] font-medium text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 text-[#038167] group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-green-100 hover:border-green-200">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#038167] text-white shadow-lg group-hover:shadow-green-200/50 transition-all">
                  <Building className="h-7 w-7" />
                </div>

                  <h3 className="text-xl font-bold mb-3 text-[#038167] group-hover:text-[#026B59] transition-colors">
                    Franchisees
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    Local entrepreneurs who operate MARE! Centers in their communities, creating sustainable businesses
                    while solving waste management challenges.
                  </p>
                  <div className="mt-6 flex items-center text-[#038167] font-medium text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 text-[#038167] group-hover:translate-x-1 transition-transform" />
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
              <h3 className="text-2xl font-bold text-[#038167]">Community Success Stories</h3>
              <div className="w-16 h-1 bg-[#038167] rounded-full mt-4 mx-auto"></div>

            </div>

    <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-[#B8E6D3] overflow-hidden">
  <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8E6D3] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8E6D3] rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

  <div className="relative z-10">
    <div className="relative h-[200px] flex flex-col justify-center items-center">
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
          className="text-center absolute inset-0 flex flex-col items-center"
          style={{ display: Math.abs(currentTestimonial - i) > 1 ? "none" : "block" }}
        >
          <div className="flex justify-center mb-4">
            <Avatar className="h-16 w-16 border-4 border-[#B8E6D3]">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Community member" />
              <AvatarFallback className="bg-[#038167] text-white text-lg">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mb-3">
            <h4 className="text-lg font-bold text-[#038167]">{testimonial.name}</h4>
            <p className="text-xs text-gray-500">{testimonial.location}</p>
          </div>
          <p className="text-sm text-gray-700 italic max-w-md mx-auto">"{testimonial.quote}"</p>
        </motion.div>
      ))}
    </div>

    {/* Smaller Dots Below */}
    <div className="flex justify-center mt-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full mx-1 transition-colors ${
            currentTestimonial === i ? "bg-[#038167]" : "bg-[#A0DAC2]"
          }`}
          onClick={() => setCurrentTestimonial(i)}
        ></div>
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
        className="py-24 bg-gradient-to-b from-green-50 to-white relative"
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
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Our People</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
              Our Team
            </h2>
            <div className="w-20 h-1 bg-green-600 rounded-full mb-6 mx-auto"></div>
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
            {[
              {
                name: "Maria Santos",
                role: "Community Coordinator",
                description: "Works directly with barangays to implement MARE! programs and train community members.",
              },
              {
                name: "Juan Reyes",
                role: "Waste Management Specialist",
                description:
                  "Designs efficient waste segregation systems and trains local workers on proper handling techniques.",
              },
              {
                name: "Ana Lim",
                role: "Franchisee Relations Manager",
                description:
                  "Supports franchisees with training, resources, and ensures collected materials reach the right processing facilities.",
              },
              {
                name: "Carlos Mendoza",
                role: "Education & Outreach",
                description:
                  "Develops educational materials and conducts workshops on waste management and environmental awareness.",
              },
            ].map((member, i) => (
              <motion.div key={i} variants={item} className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center text-center">
                  <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                    <Avatar className="h-24 w-24 border-4 border-green-100 group-hover:border-green-200 transition-colors">
                      <AvatarImage src="/placeholder.svg?height=100&width=100" alt={`${member.name}`} />
                      <AvatarFallback className="bg-green-600 text-white text-xl">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-1.5 rounded-full shadow-md">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-green-800 group-hover:text-green-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-green-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 flex-grow">{member.description}</p>
                  <Button
                    color="ghost"
                    size="small"
                    className="mt-4 text-green-700 hover:text-green-800 hover:bg-green-50 group"
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
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-xl border border-green-100">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Careers</Badge>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Join Our Team</h3>
                  <div className="w-16 h-1 bg-green-600 rounded-full mb-6"></div>
                  <p className="text-lg text-gray-700 mb-6">
                    MARE! is always looking for passionate individuals to join our mission. We offer:
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Meaningful work with direct community impact</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Training in waste management and recycling</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Competitive compensation and growth opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">A supportive team environment</span>
                    </li>
                  </ul>
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all">
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
                      <div className="bg-green-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-green-600" />
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
        <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-green-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Our Results</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
              Our Impact
            </h2>
            <div className="w-20 h-1 bg-green-600 rounded-full mb-6 mx-auto"></div>
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
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-green-100 hover:border-green-200 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10 h-full flex flex-col">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg group-hover:shadow-green-200/50 transition-all">
                    <Users className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-green-800 group-hover:text-green-700 transition-colors">
                    Community Benefits
                  </h3>
                  <ul className="mt-2 space-y-3 flex-grow">
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Cleaner streets and public spaces</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Revenue from recycled materials</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Reduced waste management costs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Improved compliance with regulations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-green-100 hover:border-green-200 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10 h-full flex flex-col">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg group-hover:shadow-green-200/50 transition-all">
                    <Heart className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-green-800 group-hover:text-green-700 transition-colors">
                    Worker Benefits
                  </h3>
                  <ul className="mt-2 space-y-3 flex-grow">
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Stable employment opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Skills development and training</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Safer working conditions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Pride in environmental stewardship</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-green-100 hover:border-green-200 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative z-10 h-full flex flex-col">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg group-hover:shadow-green-200/50 transition-all">
                    <Leaf className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-green-800 group-hover:text-green-700 transition-colors">
                    Environmental Impact
                  </h3>
                  <ul className="mt-2 space-y-3 flex-grow">
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">85% diversion of waste from landfills</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Reduced plastic pollution in waterways</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">Lower greenhouse gas emissions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
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
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl overflow-hidden">
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
                    <div className="w-12 h-1 bg-green-300 rounded-full mx-auto mb-2"></div>
                    <p className="text-green-100">{stat.label}</p>
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
        className="py-24 bg-gradient-to-br from-green-800 to-green-900 text-white relative"
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
              <div className="w-20 h-1 bg-green-400 rounded-full mb-6"></div>
              <p className="text-lg text-green-100 mb-8">
                Whether you're a community leader, a potential team member, or a franchisee, we invite you to be part of
                our growing network.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  size="large"
                  className="bg-white text-green-800 hover:bg-green-100 shadow-lg hover:shadow-xl transition-all w-full"
                >
                  For Communities
                </Button>
                <Button
                  size="large"
                  color="outline"
                  className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm w-full"
                >
                  For Workers
                </Button>
                <Button
                  size="large"
                  color="outline"
                  className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm w-full"
                >
                  For Franchisees
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Building className="h-6 w-6 text-green-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white">MARE! Headquarters</p>
                    <p className="text-green-200">Manila, Philippines</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-300"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">Call Us</p>
                    <p className="text-green-200">+63 (2) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-300"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">Email Us</p>
                    <p className="text-green-200">info@marerecovery.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-300"
                    >
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">Working Hours</p>
                    <p className="text-green-200">Mon-Fri: 8AM - 5PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-md opacity-70"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold text-green-800 mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">I am interested in</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all">
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg">
                  <Recycle className="h-5 w-5" />
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-30 blur-sm"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  MARE!
                </span>
              </div>
              <p className="text-gray-600">A community-driven social enterprise recovering 85% of household waste.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("community")}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Our Community
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("workers")}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Our Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("impact")}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Our Impact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                    Waste Management Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                    Recycling Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                    Franchisee Handbook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                    Community Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Newsletter</h4>
              <p className="text-gray-600">Stay updated with our latest news and developments.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} MARE! - MAterials REcovery. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors z-50"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
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

