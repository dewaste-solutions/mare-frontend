"use client";

import { Button } from "@/components/ui/button";  // Using ShadCN Button component
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/application-forms");  // Fixed to point to the general application form
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Navigation Bar */}
      <nav className="w-full bg-[#038167] text-white py-4 px-6 fixed top-0 left-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-[#F69C91]">MARE!</span>
          </div>

          {/* Navigation Links (Mobile Responsive) */}
          <div className="hidden md:flex space-x-8">
            <Button
              onClick={handleLogin}
              className="bg-transparent text-white border-2 border-white px-4 py-2 rounded-lg hover:bg-[#F69C91] hover:text-white transition-all"
            >
              Login
            </Button>
            <Button
              onClick={handleGetStarted}
              className="bg-[#F69C91] text-white px-8 py-2 rounded-lg hover:bg-[#038167] transition-all"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white focus:outline-none"
              // Here you would toggle a mobile menu if needed
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full max-w-6xl px-4 py-16 mx-auto mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-5xl font-bold text-[#038167] mb-6">
              Welcome to <span className="text-[#F69C91]">MARE!</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Join us and take the first step towards a better future. 
              Together, we can build sustainable communities and create 
              lasting positive change.
            </p>
            <Button
              onClick={handleGetStarted}
              className="bg-[#038167] hover:bg-[#F69C91] text-white text-lg px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Get Started
            </Button>
          </div>
          
          {/* Right Content - Image or Illustration */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-xl">
              {/* Replace with your actual image or use a placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-500 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center px-6">
                  <h3 className="text-3xl font-bold mb-4">Make A Real Effect!</h3>
                  <p className="text-lg">Empowering communities for a sustainable future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#038167] mb-12">Why Join MARE?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#038167] rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
              <p className="text-gray-600">Create meaningful change in your local community through dedicated service.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#F69C91] rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Growth</h3>
              <p className="text-gray-600">Develop new skills and gain valuable experience while making a difference.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#038167] rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Network Building</h3>
              <p className="text-gray-600">Connect with like-minded individuals committed to environmental sustainability.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */} 
      <div className="w-full bg-[#038167] text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8">Join MARE today and be part of a movement that changes lives.</p>
          <Button
            onClick={handleGetStarted}
            className="bg-white text-[#038167] hover:bg-[#F69C91] hover:text-white text-lg px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
