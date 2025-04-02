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