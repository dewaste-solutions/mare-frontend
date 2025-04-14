"use client"

import { motion } from "framer-motion"
import { CheckCircle, Leaf, Users, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { impactData, statsData } from "@/data/landing-page-data"

export function ImpactSection() {
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
    <section id="impact" className="py-24 relative">
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
                  {impactData.community.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">{benefit}</span>
                    </li>
                  ))}
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
                  {impactData.workers.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">{benefit}</span>
                    </li>
                  ))}
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
                  {impactData.environment.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167] mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-gray-700">{benefit}</span>
                    </li>
                  ))}
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

              {statsData.map((stat, i) => (
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
  )
}
