// src/app/onboarding-forms/admin/page.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminOnboardingFormPage() {
  const [formData, setFormData] = useState({ role: "Admin", department: "", officeLocation: "" });
  const [submitted, setSubmitted] = useState(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin Onboarding Data:", formData);
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
        <h2 className="text-2xl font-semibold mb-6 text-[#038167] text-center">Admin Onboarding</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="department" className="text-lg">Department</Label>
            <Input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#038167]"
            />
          </div>
          <div>
            <Label htmlFor="officeLocation" className="text-lg">Office Location</Label>
            <Input
              type="text"
              name="officeLocation"
              value={formData.officeLocation}
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
