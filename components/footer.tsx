"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, ChevronRight, ExternalLink, Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react"
import { getServices } from "@/lib/services-data"
import { getContactInfo } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Types
interface Service {
  title: string;
  slug: string;
  icon?: any;
}

interface ContactInfo {
  address: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    country: string;
    mapUrl: string;
    embedUrl: string;
  };
  phone: string;
  email: string;
  website: {
    url: string;
    display: string;
  };
  hours: {
    status: string;
    closing: string;
  };
  socialMedia: Array<{
    icon: string;
    url: string;
  }>;
  mapEmbed: {
    src: string;
    locationName: string;
    directionsUrl: string;
  };
}

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
  const [services, setServices] = useState<Service[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, contactData] = await Promise.all([
          getServices(),
          getContactInfo()
        ])
        setServices(servicesData)
        setContactInfo(contactData)
      } catch (error) {
        console.error('Error fetching footer data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Prepare services data for footer display
  const footerServices = services.slice(0, 8).map((service: Service) => ({
    name: service.title,
    href: `/services/${service.slug}`
  }))

  // Create social media links from contactInfo
  const socialLinks = contactInfo ? [
    ...contactInfo.socialMedia.map((social: { icon: string; url: string }) => {
      let name = "Social"
      let IconComponent = Mail // Default icon

      // Map icon names from API to actual Lucide React components
      switch (social.icon.toLowerCase()) {
        case 'facebook':
          name = "Facebook"
          IconComponent = Facebook
          break
        case 'twitter':
          name = "Twitter"
          IconComponent = Twitter
          break
        case 'linkedin':
          name = "LinkedIn"
          IconComponent = Linkedin
          break
        case 'instagram':
          name = "Instagram"
          IconComponent = Instagram
          break
        default:
          name = "Social"
          IconComponent = Mail
      }

      return {
        name,
        icon: IconComponent,
        href: social.url
      }
    }),
    // Add GitHub as an additional icon
    { name: "GitHub", icon: Github, href: "https://github.com" }
  ] : []

  if (loading) {
    return (
      <footer className="bg-navy text-white pt-5 pb-3 border-t-2 border-gold/20 shadow-lg">
        <div className="container mx-auto px-2">
          <div className="flex justify-center items-center py-8">
            <div className="text-gold">Loading...</div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-navy text-white pt-5 pb-3 border-t-2 border-gold/20 shadow-lg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-30"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gold/10 rounded-full blur-xl opacity-20"></div>

      <div className="container mx-auto px-2 relative z-10">
        {/* Top section with wave divider */}
        <div className="relative mb-4">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent rounded-full shadow-glow animate-pulse-glow"></div>
        </div>

        {/* Main footer content - more compact with fixed widths */}
        <div className="flex flex-wrap justify-center">
          {/* Company Info */}
          <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4 group">
            <Link href="/" className="inline-block" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
              <div className="relative w-auto h-7 group-hover:scale-105 transition-all duration-300 filter hover:drop-shadow-[0_0_8px_rgba(177,132,61,0.5)]">
                <Image
                  src="/logo.png"
                  alt="Devalaya Infosys Logo"
                  width={120}
                  height={35}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-300 text-xs mt-2 leading-relaxed border-l-2 border-gold/30 pl-2">
              Providing innovative IT solutions and services to businesses worldwide.
            </p>
            <div className="flex flex-nowrap gap-1.5 mt-2">
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
          <div className="w-full sm:w-1/2 lg:w-1/5 px-2 mb-4">
            <h3 className="text-base font-semibold mb-2 text-gold flex items-center">
              <span className="mr-2">Quick Links</span>
              <div className="h-px flex-grow bg-gradient-to-r from-gold/50 to-transparent"></div>
            </h3>
            <ul className="space-y-0.5 rounded-lg bg-navy-light/5 p-1.5">
              {navigation.map((item) => (
                <li key={item.name} className="group">
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <h3 className="text-base font-semibold mb-2 text-gold flex items-center">
              <span className="mr-2">Our Services</span>
              <div className="h-px flex-grow bg-gradient-to-r from-gold/50 to-transparent"></div>
            </h3>
            <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 max-h-[120px] overflow-y-auto scrollbar-hide rounded-lg bg-navy-light/5 p-1.5">
              {footerServices.map((item) => (
                <div key={item.name} className="group">
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </div>
              ))}

              {/* Show More Services Link */}
              <div className="group col-span-2 mt-1 flex justify-center">
                <ViewAllButton href="/services">View All Services</ViewAllButton>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/2 lg:w-1/5 px-2 mb-4">
            <h3 className="text-base font-semibold mb-2 text-gold flex items-center">
              <span className="mr-2">Contact Us</span>
              <div className="h-px flex-grow bg-gradient-to-r from-gold/50 to-transparent"></div>
            </h3>
            <ul className="space-y-1.5 bg-navy-light/5 p-1.5 rounded-lg">
              {contactInfo && (
                <>
                  <ContactItem icon={MapPin}>
                    {contactInfo.address.line1}<br />
                    {contactInfo.address.city}
                  </ContactItem>
                  <ContactItem icon={Phone} href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}>
                    {contactInfo.phone}
                  </ContactItem>
                  <ContactItem icon={Mail} href={`mailto:${contactInfo.email}`}>
                    {contactInfo.email}
                  </ContactItem>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent my-2"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-xs">
            © {currentYear} Devalaya Infosys. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-1 md:mt-0">
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