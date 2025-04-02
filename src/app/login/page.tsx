"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <h1 className="text-3xl font-bold text-[#026853] mb-2 text-center">Welcome Back</h1>
          <p className="text-gray-600 text-center">Sign in to your MARE! account</p>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />

              <div className="flex items-center space-x-2">
                <Checkbox checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} />
                <label className="text-sm">Remember me</label>
              </div>

              <Button type="submit" className="w-full bg-green-600 text-white">Sign In</Button>
            </form>
            <p className="text-center text-sm mt-4">
              Don't have an account? <Link href="/join" className="text-green-600">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
