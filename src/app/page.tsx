import { loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

export default function Home() {


  return (
    //insert login page code here
    <Link href="/register" className="text-primary-500 hover:text-primary-600 font-medium">
      Sign up
    </Link>
  );
}
