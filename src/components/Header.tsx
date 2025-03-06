"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { LogOut } from "lucide-react"; // Import logout icon

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("user"); // Remove user from cookies
    router.push("/");
  };

  return (
    <header className="bg-[#038167] text-white p-4 flex justify-between items-center">
     <Image src="/mare-white-logo.png" alt="Logo" width={100} height={40} priority />

      <button onClick={handleLogout} className="text-white hover:text-gray-200">
        <LogOut size={24} />
      </button>
    </header>
  );
}