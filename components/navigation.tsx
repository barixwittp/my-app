"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MapPin, Activity, Users, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            Air Quality
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-red-700"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/maps"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/maps"
                  ? "bg-red-700 text-white"
                  : "text-red-100 hover:bg-red-700 hover:text-white"
              )}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Maps
            </Link>
            <Link
              href="/monitor"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/monitor"
                  ? "bg-red-700 text-white"
                  : "text-red-100 hover:bg-red-700 hover:text-white"
              )}
            >
              <Activity className="w-4 h-4 mr-2" />
              Monitor
            </Link>
            <Link
              href="/community"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/community"
                  ? "bg-red-700 text-white"
                  : "text-red-100 hover:bg-red-700 hover:text-white"
              )}
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link
              href="/maps"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors mb-2",
                pathname === "/maps"
                  ? "bg-red-700 text-white"
                  : "text-red-100 hover:bg-red-700 hover:text-white"
              )}
              onClick={toggleMenu}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Maps
            </Link>
            <Link
              href="/monitor"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors mb-2",
                pathname === "/monitor"
                  ? "bg-red-700 text-white"
                  : "text-red-100 hover:bg-red-700 hover:text-white"
              )}
              onClick={toggleMenu}
            >
              <Activity className="w-4 h-4 mr-2" />
              Monitor
            </Link>
            <Link
              href="/community"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors mb-2",
                pathname === "/community"
                  ? "bg-red-700 text-white"
                  : "text-red-100 hover:bg-red-700 hover:text-white"
              )}
              onClick={toggleMenu}
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
