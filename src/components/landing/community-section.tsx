"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Home, Users, Building} from "lucide-react"
import { SVGProps } from 'react'
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { communityTypes, testimonials } from "@/data/landing-page-data"

// Define the valid keys (strings)
type IconName = 'Home' | 'Users' | 'Building';

interface CommunitySectionProps {
  onLearnMore: (type: string) => void
}

export function CommunitySection({ onLearnMore }: CommunitySectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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


  // Define the iconComponents object with proper types
  const iconComponents: { [key in IconName]: React.ComponentType<SVGProps<SVGSVGElement>> } = {
    Home: (props) => <Home {...props} />,
    Users: (props) => <Users {...props} />,
    Building: (props) => <Building {...props} />,
  };

  return (
    <section id="community" className="py-24 relative">
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
          {communityTypes.map((type, index) => {
            // Now you can safely use `iconComponents` with the correct types:
            const Icon = iconComponents[type.icon as IconName];  // `type.icon` should be one of 'Home', 'Users', or 'Building'

            return (
              <motion.div key={index} variants={item}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-[#e6f3f1] hover:border-[#d1ebe7]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e6f3f1] to-[#f5faf9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg group-hover:shadow-[#038167]/20 transition-all">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#026853] group-hover:text-[#038167] transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{type.description}</p>
                    <div className="mt-6 flex items-center text-[#038167] font-medium text-sm">
                      <button
                        onClick={() => onLearnMore(type.learnMoreType)}
                        className="flex items-center hover:underline"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
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
                    onClick={() =>
                      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                    }
                    className="p-2 rounded-full bg-[#e6f3f1] text-[#038167] hover:bg-[#d1ebe7] transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="w-16 flex justify-center">
                    {testimonials.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full mx-1 transition-colors ${currentTestimonial === i ? "bg-[#038167]" : "bg-[#e6f3f1]"}`}
                        onClick={() => setCurrentTestimonial(i)}
                      ></div>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
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
                    <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
