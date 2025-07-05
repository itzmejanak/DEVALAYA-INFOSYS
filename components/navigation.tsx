"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigation } from "./navigation-provider"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const { isNavigating } = useNavigation()
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if clicking outside the dropdown
      if (servicesOpen && event.target && !(event.target as Element).closest('.services-dropdown')) {
        setServicesOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [servicesOpen])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Web Development", href: "/about#web-development" },
        { name: "Mobile Apps", href: "/about#mobile-apps" },
        { name: "Cloud Solutions", href: "/about#cloud-solutions" },
        { name: "IT Consulting", href: "/about#it-consulting" },
        { name: "Digital Marketing", href: "/about#digital-marketing" },
      ] 
    },
    { name: "Blog", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className={`${scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'} shadow-md border-b border-gold/20 sticky top-0 z-50 transition-all duration-300`}>
      {/* Loading indicator at the top of the navigation */}
      {isNavigating && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gold/30 overflow-hidden">
          <div className="h-full bg-gold animate-progress-bar"></div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-20">
          {/* Logo - Using image */}
          <Link href="/" className="flex items-center group" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
            <div className="relative w-auto h-12 group-hover:scale-105 transition-transform duration-200">
              <Image 
                src="/logo.png" 
                alt="Devalaya Infosys Logo" 
                width={140} 
                height={40} 
                className="object-contain" 
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - More compact */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="relative group">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setServicesOpen(!servicesOpen)
                    }}
                    className={`px-3 py-3 text-lg font-medium transition-colors duration-200 rounded-md flex items-center services-dropdown ${
                      pathname.startsWith(item.href) ? "text-gold bg-gold/10" : "text-navy hover:text-gold hover:bg-gold/5"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`absolute left-0 mt-1 w-52 rounded-lg shadow-lg bg-white ring-1 ring-black/5 transition-all duration-200 origin-top-left services-dropdown ${
                    servicesOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}>
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2.5 text-base text-navy hover:bg-gold/10 hover:text-gold transition-colors duration-200"
                          onClick={() => setServicesOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-3 text-lg font-medium transition-colors duration-200 rounded-md relative ${
                    pathname === item.href ? "text-gold bg-gold/10" : "text-navy hover:text-gold hover:bg-gold/5"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            <div className="ml-4 pl-4 border-l border-gold/20">
              <Link href="/contact">
                <Button size="sm" className="bg-gold hover:bg-gold/90 text-white px-4 py-2.5 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 rounded-md">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy hover:text-gold hover:bg-gold/5 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-3 space-y-1 border-t border-gold/10">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="space-y-1">
                  <button 
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full text-left px-3 py-3 text-lg font-medium text-navy hover:text-gold hover:bg-gold/5 rounded-md transition-colors duration-200 flex items-center justify-between services-dropdown"
                  >
                    {item.name}
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {servicesOpen && (
                    <div className="pl-4 space-y-1 border-l-2 border-gold/20 ml-3">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-3 py-2.5 text-base text-navy/70 hover:text-gold hover:bg-gold/5 rounded-md transition-colors duration-200"
                          onClick={() => {
                            setServicesOpen(false)
                            setIsOpen(false)
                          }}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-3 text-lg font-medium rounded-md transition-colors duration-200 ${
                    pathname === item.href ? "text-gold bg-gold/10" : "text-navy hover:text-gold hover:bg-gold/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            <div className="pt-3 mt-3 border-t border-gold/10">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="w-full bg-gold hover:bg-gold/90 text-navy text-base font-medium rounded-md py-2.5">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}