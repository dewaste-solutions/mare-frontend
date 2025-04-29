"use client";

import { useEffect, useState } from "react"; // Importing useState and useEffect hooks
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Recycle, Users } from "lucide-react";

interface HeroSectionProps {
  onJoinCommunity: () => void;
  onMeetTeam: () => void;
}

// Define a proper type for circle objects
interface Circle {
  top: string;
  left: string;
  width: string;
  height: string;
  opacity: number;
  animation: string;
}

export function HeroSection({ onJoinCommunity, onMeetTeam }: HeroSectionProps) {
  // State for storing floating circle styles with proper type
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    // Generate circles after component mounts
    const generatedCircles: Circle[] = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      opacity: Math.random() * 0.5 + 0.3,
      animation: `float ${Math.random() * 10 + 10}s linear infinite`,
    }));
    setCircles(generatedCircles); // Update the state with the generated circle styles
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#026853]/90 to-[#038167]/90 z-10" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>

      {/* Animated Patterns */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {circles.map((circle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: circle.top,
                left: circle.left,
                width: circle.width,
                height: circle.height,
                opacity: circle.opacity,
                animation: circle.animation,
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
          <Badge className="mb-4 bg-[#FFC539] text-[#038167] hover:bg-[#ffb800] backdrop-blur-sm">
            Transforming Communities
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="block">MARE!</span>
            <span className="block text-[#FFC539]">Community</span>
          </h1>
          <div className="w-40 h-1.5 bg-[#F69C91] rounded-full mb-6"></div>
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
              variant="ghost"
              className="text-white border border-white/60 hover:bg-white/10 backdrop-blur-sm"
              onClick={onMeetTeam}
            >
              Meet Our Team
            </Button>
          </div>
           


          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
            <Avatar className="border-2 border-white h-10 w-10">
                <AvatarImage src="profiles/profile-1.png?height=40&width=40" alt="Community member" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white h-10 w-10">
                <AvatarImage src="profiles/profile-2.png?height=40&width=40" alt="Community member" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white h-10 w-10">
                <AvatarImage src="profiles/profile-3.png?height=40&width=40" alt="Community member" />
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
              src="/images/IMG_7610.png?height=450&width=600"
              alt="MARE! community members working together"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl">
            <div className="flex items-center gap-3">
              <div className="bg-[#F69C91]/25 p-2 rounded-full">
                <Recycle className="h-6 w-6 text-[#F69C91]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F69C91]">85% Waste Diversion</p>
                <p className="text-xs text-gray-500">Achieved in our communities</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
            <div className="flex items-center gap-3">
              <div className="bg-[#FFC539]/20 p-2 rounded-full">
                <Users className="h-6 w-6 text-[#FFC539]" />
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
  );
}