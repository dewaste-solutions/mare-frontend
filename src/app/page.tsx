"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // If using cookies, otherwise use localStorage

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to prevent flash of header

  useEffect(() => {
    const user = Cookies.get("user"); // If using cookies
    // const user = localStorage.getItem("user"); // Uncomment if using localStorage

    if (!user) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }

    setLoading(false); // Set loading to false after redirect
  }, [router]);

  if (loading) return null; // Hide all content during redirection

  return null;
}
