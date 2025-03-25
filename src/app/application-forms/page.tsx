// src/app/application-forms/page.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";  // Using ShadCN Button component
import { Input } from "@/components/ui/input";  // Using ShadCN Input component
import { Label } from "@/components/ui/label";  // Using ShadCN Label component

export default function ApplicationFormPage() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application Submitted:", formData);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-[#038167]">Application Submitted!</h2>
        <p className="text-gray-700 mt-4">The admin will review your details and send you an onboarding form soon.</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-[#038167] text-center">Apply for Your Role</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-lg">Full Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#038167]"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
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
