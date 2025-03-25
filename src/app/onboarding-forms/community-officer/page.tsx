// src/app/onboarding-forms/community-officer/page.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";  // Using ShadCN Button component
import { Input } from "@/components/ui/input";  // Using ShadCN Input component
import { Label } from "@/components/ui/label";  // Using ShadCN Label component
import { useRouter } from "next/navigation";

export default function CommunityOfficerOnboardingFormPage() {
  const [formData, setFormData] = useState({ address: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Onboarding Data:", formData);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-[#038167]">Onboarding Completed!</h2>
        <p className="text-gray-700 mt-4">Admin will review your details shortly.</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-xl transform transition-all hover:scale-105 duration-300">
        <h2 className="text-2xl font-semibold mb-6 text-[#038167] text-center">Community Officer Onboarding</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="address" className="text-lg">Address</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#038167]"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-lg">Phone Number</Label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#038167]"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#038167] text-white py-3 rounded-lg shadow-lg hover:bg-[#F69C91] transition duration-300"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
