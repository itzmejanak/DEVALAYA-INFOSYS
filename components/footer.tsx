"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Github, ChevronRight, ExternalLink } from "lucide-react"
import { services as allServices } from "@/lib/services-data"
import { contactInfo } from "@/lib/data"
import { cn } from "@/lib/utils"

// We've added shadow-glow and pulse-glow to tailwind.config.ts

// Footer section header component
const FooterSectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-lg font-semibold mb-4 text-gold flex items-center">
    <span className="mr-2">{title}</span>
    <div className="h-0.5 flex-grow bg-gradient-to-r from-gold/70 to-transparent max-w-[60px] ml-2"></div>
  </h3>
)

// Footer link component
const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-gold duration-300 flex items-center group-hover:translate-x-1 transform transition-transform py-1"
  >
    <ChevronRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity mr-1.5 flex-shrink-0" />
    <span className="text-sm truncate hover:underline hover:underline-offset-4 hover:decoration-gold/50">{children}</span>
  </Link>
)

// View all button component
const ViewAllButton = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link
    href={href}
    className={cn(
      "text-gold hover:text-white duration-300 flex items-center justify-center",
      "group-hover:translate-x-1 transform transition-transform py-1.5",
      "border border-gold/40 rounded-md hover:bg-gold/30 px-2.5 shadow-sm hover:shadow-glow"
    )}
  >
    <span className="text-sm font-medium">{children}</span>
    <ChevronRight className="h-4 w-4 ml-1.5 flex-shrink-0" />
  </Link>
)

// Contact item component
const ContactItem = ({
  icon: Icon,
  children,
  href
}: {
  icon: React.ElementType,
  children: React.ReactNode,
  href?: string
}) => {
  const content = (
    <>
      <div className="bg-navy-light p-2 rounded-full mr-3 group-hover:bg-gold/20 transition-colors shadow-sm">
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <span className="text-gray-300 hover:text-gold transition-colors duration-300 text-sm md:text-base">
        {children}
      </span>
    </>
  )

  return (
    <li className="flex items-start group">
      {href ? (
        <a href={href} className="flex items-start">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  )
}

// Social link component
const SocialLink = ({ href, icon: Icon, name }: { href: string, icon: React.ElementType, name: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-navy-light hover:bg-gold/20 text-gray-300 hover:text-gold p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-glow"
    aria-label={name}
  >
    <Icon className="h-5 w-5" />
  </a>
)

// Legal link component
const LegalLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-400 hover:text-gold text-xs sm:text-sm transition-colors duration-300 flex items-center hover:underline hover:underline-offset-4"
  >
    <span>{children}</span>
    <ExternalLink className="ml-1 h-3 w-3" />
  </Link>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ]

  // Prepare services data for footer display
  const footerServices = allServices.slice(0, 8).map(service => ({
    name: service.title,
    href: `/services/${service.slug}`
  }))

  // Map social media links from contactInfo
  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: contactInfo.socialMedia.find(s => s.icon === Facebook)?.url || "#" },
    { name: "Twitter", icon: Twitter, href: contactInfo.socialMedia.find(s => s.icon === Twitter)?.url || "#" },
    { name: "LinkedIn", icon: Linkedin, href: contactInfo.socialMedia.find(s => s.icon === Linkedin)?.url || "#" },
    { name: "Instagram", icon: Instagram, href: contactInfo.socialMedia.find(s => s.icon === Instagram)?.url || "#" },
    { name: "GitHub", icon: Github, href: "#" }
  ].filter(link => link.href !== "#" || link.name === "GitHub")

  return (
    <footer className="bg-navy text-white pt-10 pb-6 border-t-2 border-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Top section with wave divider */}
        <div className="relative mb-8">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent rounded-full shadow-glow animate-pulse-glow"></div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1 rounded-lg ">
            <Link href="/" className="inline-block group" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
              <div className="relative w-auto h-10 group-hover:scale-105 transition-all duration-300 filter hover:drop-shadow-[0_0_8px_rgba(177,132,61,0.5)]">
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
            <p className="text-gray-300 text-sm md:text-base mt-3 max-w-xs leading-relaxed">
              Providing innovative IT solutions and services to businesses worldwide. We help transform ideas into powerful digital experiences.
            </p>
            <div className="flex flex-nowrap gap-2 mt-4 justify-center sm:justify-start">
              {socialLinks.map((item) => (
                <SocialLink
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-2 sm:mt-0">
            <FooterSectionHeader title="Quick Links" />
            <ul className="space-y-2 p-2 rounded-lg bg-navy-light/10">
              {navigation.map((item) => (
                <li key={item.name} className="group">
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="mt-2 sm:mt-0 lg:col-span-2">
            <FooterSectionHeader title="Our Services" />
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 max-h-[160px] sm:max-h-[180px] overflow-y-auto pr-2 scrollbar-hide rounded-lg p-2 bg-navy-light/10">
              {footerServices.map((item) => (
                <div key={item.name} className="group">
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </div>
              ))}

              {/* Show More Services Link */}
              <div className="group col-span-2 mt-2 flex justify-center">
                <ViewAllButton href="/services">View All Services</ViewAllButton>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-2 sm:mt-0">
            <FooterSectionHeader title="Contact Us" />
            <ul className="space-y-3 p-2 rounded-lg">
              <ContactItem icon={MapPin}>
                {contactInfo.address.line1}<br />
                {contactInfo.address.line2}<br />
                {contactInfo.address.city} {contactInfo.address.postalCode}, {contactInfo.address.country}
              </ContactItem>
              <ContactItem icon={Phone} href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}>
                {contactInfo.phone}
              </ContactItem>
              <ContactItem icon={Mail} href={`mailto:${contactInfo.email}`}>
                {contactInfo.email}
              </ContactItem>
            </ul>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent my-5"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} Devalaya Infosys. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 mt-3 md:mt-0">
            {[
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms of Service", href: "/terms-of-service" },
              { name: "Sitemap", href: "/sitemap" }
            ].map((item) => (
              <LegalLink key={item.name} href={item.href}>
                {item.name}
              </LegalLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}