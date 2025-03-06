"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Mail, Lock } from "lucide-react"; // Import icons

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Cookies.set("user", email, { expires: 1 }); // Store user data in cookies for 1 day
    router.push("/dashboard"); // Redirect to dashboard
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#038167]">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src="/mare-logo.svg" alt="Logo" className="h-12" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-600 text-sm mb-4">
          Log in to track your waste and make an impact!
        </p>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#038167] bg-gray-100"
          />
        </div>

        <div className="relative mt-4">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#038167] bg-gray-100"
          />
        </div>

        <button
          className="bg-[#038167] text-white p-3 rounded-lg w-full mt-4 hover:bg-[#026955] transition-all"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
         
          Don&apos;t have an account?
          <span className="text-[#038167] cursor-pointer hover:underline" onClick={() => router.push("/signup")}>
            Sign up here
          </span>
        </p>
      </div>
    </main>
  );
}
