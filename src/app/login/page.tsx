<<<<<<< Updated upstream
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const users: Record<string, string> = {
      "admin@example.com": "admin",
      "manager@example.com": "manager",
      "franchisee@example.com": "franchisee",
      "worker@example.com": "worker",
      "community@example.com": "community-officer",
    };

    const normalizedEmail = email.toLowerCase().trim();

    if (users[normalizedEmail] && password === "password123") {
      const role = users[normalizedEmail];
      console.log("✅ Login successful! Role:", role);

      // ✅ Set role cookie properly
      document.cookie = `role=${role}; path=/; secure;`;

      // ✅ Log the redirect
      console.log("🔄 Redirecting to:", role === "admin" ? "/dashboard/admin" : "/dashboard");

      // ✅ Redirect based on role
      if (role === "admin") {
        window.location.href = `/dashboard/admin`;
      } else {
        window.location.href = `/dashboard`;
      }
    } else {
      alert("❌ Invalid credentials. Please check your email and password.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-green-50">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="flex justify-center mb-6">
            <Image
              src="logo.svg"
              alt="MARE! Logo"
              width={150}
              height={100}
              priority
            />
          </div>
          
          <h1 className="text-3xl font-bold text-[#038167] mb-2 text-center">Welcome Back</h1>
          <p className="text-gray-600 text-center mb-6">Sign in to your MARE! account</p>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="Enter your email"
                  className="w-full" 
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Enter your password"
                  className="w-full" 
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <Checkbox 
                    id="remember-me"
                    checked={rememberMe} 
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">Remember me</label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#038167] hover:text-[#026853]">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#038167] hover:bg-[#026853] text-white py-2 mt-4"
              >
                Sign In
              </Button>
            </form>
            
          </div>
        </div>
      </main>
    </div>
  );
}
=======
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Recycle, Eye, EyeOff, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, rememberMe })
  }

  // Avoid hydration mismatch by rendering a simple loading state
  // until the component has mounted on the client
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      {/* Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] h-[80%] w-[80%] rounded-full bg-green-100/30 dark:bg-green-900/20 blur-3xl"></div>
        <div className="absolute -bottom-[40%] -left-[30%] h-[80%] w-[80%] rounded-full bg-green-100/30 dark:bg-green-900/20 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg">
              <Recycle className="h-5 w-5" />
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-30 blur-sm"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
              MARE!
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="p-8 shadow-xl border-green-100 dark:border-green-900 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h1>
                <p className="text-gray-600 dark:text-gray-300">Sign in to your MARE! account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500 pr-10 dark:bg-gray-700 dark:text-white"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 dark:border-gray-600"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

            </Card>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>

    </div>
  )
}
>>>>>>> Stashed changes
