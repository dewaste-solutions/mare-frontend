"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Recycle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simple validation
      if (!formData.email || !formData.password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Determine role based on email (temporary hardcoded credentials)
      let role = "community-officer" // default role

      if (formData.email === "admin@mare.com") {
        role = "admin"
      } else if (formData.email === "franchisee@mare.com") {
        role = "franchisee"
      } else if (formData.email === "officer@mare.com") {
        role = "community-officer"
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Store user role in localStorage (for demo purposes)
      if (typeof window !== "undefined") {
        localStorage.setItem("mare-user-role", role)
        localStorage.setItem("mare-user-email", formData.email)
      }

      // Show success message
      toast({
        title: "Login successful",
        description: "Redirecting to dashboard...",
      })

      // Redirect to appropriate dashboard based on role
      setTimeout(() => {
        if (role === "admin") {
          router.push("/admin/dashboard")
        } else if (role === "franchisee") {
          router.push("/franchisee/dashboard")
        } else {
          router.push("/dashboard")
        }
      }, 1000)
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
                <Recycle className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
                MARE!
              </span>
            </div>
          </Link>
        </div>

        <Card className="border-gray-200 shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-[#038167] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#038167] hover:bg-[#026853]" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-4 text-xs text-gray-500 p-3 bg-gray-50 rounded-md">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>Admin: admin@mare.com / password</p>
              <p>Franchisee: franchisee@mare.com / password</p>
              <p>Community Officer: officer@mare.com / password</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t p-6">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/join-community" className="text-[#038167] hover:underline">
                Join a community
              </Link>
            </div>
            <div className="text-center text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
