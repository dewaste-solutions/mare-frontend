import Link from "next/link"
import { Recycle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white py-4 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-sm">
              <Recycle className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
              MARE!
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-[#038167] transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-[#038167] transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-[#038167] transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4 md:mt-0">
            © {new Date().getFullYear()} MARE! - MAterials REcovery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

