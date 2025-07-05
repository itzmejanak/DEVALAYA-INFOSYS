"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Github, ChevronRight, ExternalLink } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ]

  const services = [
    { name: "Web Development", href: "/about#web-development" },
    { name: "Mobile Apps", href: "/about#mobile-apps" },
    { name: "Cloud Solutions", href: "/about#cloud-solutions" },
    { name: "IT Consulting", href: "/about#it-consulting" },
    { name: "Digital Marketing", href: "/about#digital-marketing" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "GitHub", icon: Github, href: "https://github.com" },
  ]

  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with wave divider */}
        <div className="relative mb-8">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
          <div className="w-full h-px mt-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-12">
          {/* Company Info */}
          <div className="space-y-5">
            <Link href="/" className="inline-block group" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
              <div className="relative w-auto h-12 group-hover:scale-105 transition-transform duration-200">
                <Image 
                  src="/logo.png" 
                  alt="Devalaya Infosys Logo" 
                  width={160} 
                  height={48} 
                  className="object-contain" 
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-300 text-sm md:text-base mt-4 max-w-xs">
              Providing innovative IT solutions and services to businesses worldwide. We help transform ideas into powerful digital experiences.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-navy-light hover:bg-gold/20 text-gray-300 hover:text-gold p-2.5 rounded-full transition-all duration-300 transform hover:scale-110"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-2 sm:mt-0">
            <h3 className="text-lg font-semibold mb-5 text-gold flex items-center">
              <span className="mr-2">Quick Links</span>
              <div className="h-px flex-grow bg-gradient-to-r from-gold/50 to-transparent max-w-[50px] ml-2"></div>
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name} className="group">
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-gold duration-300 flex items-center group-hover:translate-x-1 transform transition-transform"
                  >
                    <ChevronRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="mt-2 sm:mt-0">
            <h3 className="text-lg font-semibold mb-5 text-gold flex items-center">
              <span className="mr-2">Our Services</span>
              <div className="h-px flex-grow bg-gradient-to-r from-gold/50 to-transparent max-w-[50px] ml-2"></div>
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name} className="group">
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-gold  duration-300 flex items-center group-hover:translate-x-1 transform transition-transform"
                  >
                    <ChevronRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mt-2 sm:mt-0">
            <h3 className="text-lg font-semibold mb-5 text-gold flex items-center">
              <span className="mr-2">Contact Us</span>
              <div className="h-px flex-grow bg-gradient-to-r from-gold/50 to-transparent max-w-[50px] ml-2"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="bg-navy-light p-2 rounded-full mr-3 group-hover:bg-gold/20 transition-colors">
                  <MapPin className="h-4 w-4 text-gold" />
                </div>
                <span className="text-gray-300 text-sm md:text-base">
                  123 IT Park, Tech Avenue<br />
                  Bangalore, Karnataka 560001
                </span>
              </li>
              <li className="flex items-center group">
                <div className="bg-navy-light p-2 rounded-full mr-3 group-hover:bg-gold/20 transition-colors">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <a href="tel:+919876543210" className="text-gray-300 hover:text-gold transition-colors duration-300 text-sm md:text-base">
                  +91 9876 543 210
                </a>
              </li>
              <li className="flex items-center group">
                <div className="bg-navy-light p-2 rounded-full mr-3 group-hover:bg-gold/20 transition-colors">
                  <Mail className="h-4 w-4 text-gold" />
                </div>
                <a href="mailto:info@devalayainfosys.com" className="text-gray-300 hover:text-gold transition-colors duration-300 text-sm md:text-base overflow-hidden text-ellipsis">
                  info@devalayainfosys.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} Devalaya Infosys. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-gold text-xs sm:text-sm transition-colors duration-300 flex items-center">
              <span>Privacy Policy</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-gold text-xs sm:text-sm transition-colors duration-300 flex items-center">
              <span>Terms of Service</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-gold text-xs sm:text-sm transition-colors duration-300 flex items-center">
              <span>Sitemap</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}