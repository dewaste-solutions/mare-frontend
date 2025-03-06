"use client";

import Header from "@/components/Header";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header on login and signup pages
  const hideHeader = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body className="bg-white text-black">
        {!hideHeader && <Header />} {/* Header is hidden on login/signup */}
        <main className="min-h-screen">{children}</main> {/* ✅ Correct placement */}
      </body>
    </html>
  );
}
