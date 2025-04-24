"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { teamMembers } from "@/data/landing-page-data"

// Define the TeamMember type
interface TeamMember {
  name: string;
  role: string;
  description: string;
}

interface TeamSectionProps {
  onOpenProfile: (member: TeamMember) => void // Specify the type here
  onViewPositions: () => void
}

export function TeamSection({ onOpenProfile, onViewPositions }: TeamSectionProps) {
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
    <section id="workers" className="py-24 bg-gradient-to-b from-[#e6f3f1] to-white relative">
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
          <Badge className="mb-4 bg-[#F69C91]/20 text-[#F69C91] hover:bg-[#d1ebe7]">Our People</Badge>
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
          {teamMembers.map((member: TeamMember, i) => ( // Specify the type here
            <motion.div key={i} variants={item} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center text-center">
                <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                  <Avatar className="h-24 w-24 border-4 border-[#e6f3f1] group-hover:border-[#d1ebe7] transition-colors">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt={`${member.name}`} />
                    <AvatarFallback className="bg-[#038167] text-white text-xl">{member.name.charAt(0)}</AvatarFallback>
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
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-[#038167] hover:text-[#026853] hover:bg-[#e6f3f1] group"
                  onClick={() => onOpenProfile(member)}
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
                  onClick={onViewPositions}
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
  )
}
  