"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeroSectionProps {
  onJoinCommunity: () => void
  onMeetTeam: () => void
}

export function HeroSection({ onJoinCommunity, onMeetTeam }: HeroSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
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
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
            Transforming Communities
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="block">MARE!</span>
            <span className="block text-[#a3e0d6]">Community</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#a3e0d6] rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl mb-4 text-[#e6f3f1]">People-powered materials recovery</p>
          <p className="text-lg mb-8 text-white/80 max-w-lg">
            Join our growing network of communities and workers transforming waste management across the Philippines.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-[#026853] hover:bg-[#e6f3f1] group transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={onJoinCommunity}
            >
              Join Our Community
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm"
              onClick={onMeetTeam}
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
              <span className="text-[#a3e0d6] font-semibold">1,000+ community members</span>
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
              <div className="bg-[#e6f3f1] p-2 rounded-full">
                <Recycle className="h-6 w-6 text-[#038167]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">85% Waste Diversion</p>
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
                <p className="text-sm font-semibold text-gray-800">50+ Local Jobs</p>
                <p className="text-xs text-gray-500">Created and growing</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
    </section>
  )
}

// Import the Recycle and Users icons
import { Recycle, Users } from "lucide-react"
