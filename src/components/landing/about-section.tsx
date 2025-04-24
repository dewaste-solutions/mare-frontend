"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle, Leaf, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface AboutSectionProps {
  onLearnMore: (type: string) => void
}

export function AboutSection({ onLearnMore }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#038167]/10 rounded-full blur-3xl -z-10"></div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 md:grid-cols-2 items-center"
        >
          <div>
            <Badge className="mb-4 bg-[#F69C91]/20 text-[#F69C91] hover:bg-[#d1ebe7]">About Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-transparent">
              About MARE!
            </h2>
            <div className="w-20 h-1 bg-[#038167] rounded-full mb-6"></div>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                MARE!, short for <span className="font-semibold text-[#FFC539]">MAterials REcovery</span>, is a
                community-driven solution that brings together residents, local workers, and recyclers to create a
                sustainable waste management ecosystem.
              </p>
              <p className="text-lg text-gray-700">
              &ldquo;We&apos;re a reverse logistics social enterprise that recovers{" "}
                <span className="font-semibold text-[#FFC539]">85% of household waste</span> composition and diverts
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
              onClick={() => onLearnMore('about')}
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
          <div className="relative">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-[#e6f3f1]">
              <Image
                src="/images/IMG_0232.png?height=400&width=600"
                alt="MARE! community center"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-10 bg-white p-5 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-start gap-3">
                <div className="bg-[#F69C91]/20 p-2 rounded-full shrink-0 mt-1">
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
        </motion.div>
      </div>
    </section>
  )
}

import { Recycle } from "lucide-react"
