"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userType: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(""); // Error message state
  const [redirecting, setRedirecting] = useState(false); // Prevents flickering during redirect

  useEffect(() => {
    if (redirecting) {
      router.replace("/login"); // 🔹 Replace to prevent back navigation
    }
  }, [redirecting, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Store user (replace with API call in production)
    localStorage.setItem("user", JSON.stringify(formData));

    // 🔹 Prevent flickering & redirect immediately
    setRedirecting(true);
  };

  if (redirecting) return null; // Prevent rendering before redirect

  return (
    <main className="flex justify-center items-center h-screen bg-[#038167]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/mare-logo.svg" alt="Mare Logo" width={200} height={150} />
        </div>

        {/* Subtitle */}
        <p className="text-center text-gray-600 text-sm mb-4">
          Sign up to recycle smarter and earn rewards!
        </p>

        {/* Show Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* First & Last Name */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <div className="relative flex-1">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* User Type Dropdown */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100"
            >
              <option value="" disabled>Select user type</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="organization">Organization</option>
            </select>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Choose a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-[#038167] text-white p-3 rounded-lg mt-4 hover:bg-[#026955]"
        >
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-[#038167] cursor-pointer hover:underline"
            onClick={() => router.replace("/login")} // 🔹 Use replace() for immediate redirect
          >
            Log in here
          </span>
        </p>
      </div>
    </main>
  );
}
