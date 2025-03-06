"use client";

import { useState } from "react";
import Image from "next/image"; // Import Next.js Image component
import { Mail, Lock } from "lucide-react";

interface LoginModalProps {
  onSwitch: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempted with:", { email, password });
    } catch {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#038167]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="px-6 py-8">
          {/* SVG Logo from Public Folder */}
          <div className="flex justify-center mb-6">
            <Image src="/logo.svg" alt="Logo" width={250} height={250} priority />
          </div>


          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to continue managing waste efficiently.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 bg-white text-black"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 bg-white text-black"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                Remember me
              </label>
              <a href="#" className="text-sm text-[#038167] hover:text-[#026653]">
                Forgot password?
              </a>
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-[#038167] hover:bg-[#026653] focus:ring-2 focus:ring-offset-2 focus:ring-[#038167] disabled:opacity-50 transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need an Account?{" "}
              <button onClick={onSwitch} className="text-[#038167] hover:text-[#026653] underline">
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
