'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Share2, 
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

interface DigitalCardProps {
  data: {
    id: string
    name: string
    title: string
    phone: string
    email: string
    address: string
  }
}

export default function DigitalCard({ data }: DigitalCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.name} - Digital Card`,
          text: `Connect with ${data.name} from Devalaya Infosys`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleDownload = () => {
    // Create a canvas to generate an image of the card
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 500

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Blue corner design
    ctx.fillStyle = '#1e3a8a'
    ctx.beginPath()
    ctx.moveTo(canvas.width - 200, 0)
    ctx.lineTo(canvas.width, 0)
    ctx.lineTo(canvas.width, 150)
    ctx.closePath()
    ctx.fill()

    // Gold corner design
    ctx.fillStyle = '#d97706'
    ctx.beginPath()
    ctx.moveTo(canvas.width - 100, canvas.height)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(canvas.width, canvas.height - 200)
    ctx.closePath()
    ctx.fill()

    // Name
    ctx.fillStyle = '#1e3a8a'
    ctx.font = 'bold 48px Arial'
    ctx.fillText(data.name.toUpperCase(), 80, 150)

    // Title
    ctx.fillStyle = '#1e3a8a'
    ctx.font = 'italic 24px Arial'
    ctx.fillText(data.title, 80, 190)

    // Contact info
    ctx.fillStyle = '#1e3a8a'
    ctx.font = '20px Arial'
    ctx.fillText(data.phone, 80, 280)
    ctx.fillText(data.email, 80, 320)
    ctx.fillText(data.address, 80, 360)

    // Company name
    ctx.fillStyle = '#d97706'
    ctx.font = 'bold 24px Arial'
    ctx.fillText('DEVALAYA INFOSYS', 450, 400)

    // Download the image
    const link = document.createElement('a')
    link.download = `${data.name.replace(/\s+/g, '_')}_Card.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const handleCall = () => {
    window.open(`tel:${data.phone}`, '_self')
  }

  const handleEmail = () => {
    window.open(`mailto:${data.email}`, '_self')
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50 p-2 sm:p-4 overflow-hidden">
      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="relative w-full max-w-4xl aspect-[8/5] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Blue corner design */}
          <div className="absolute top-0 right-0 w-24 h-16 sm:w-32 sm:h-20 md:w-48 md:h-32 bg-blue-900 transform rotate-0">
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[96px] sm:border-l-[128px] md:border-l-[192px] border-l-transparent border-b-[64px] sm:border-b-[80px] md:border-b-[128px] border-b-white"></div>
          </div>

          {/* Gold corner design */}
          <div className="absolute bottom-0 right-0 w-16 h-24 sm:w-20 sm:h-32 md:w-32 md:h-48 bg-amber-600">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[96px] sm:border-t-[128px] md:border-t-[192px] border-t-transparent border-l-[64px] sm:border-l-[80px] md:border-l-[128px] border-l-white"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10 p-4 sm:p-8 md:p-12 h-full flex flex-col justify-between">
            {/* Name and title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 mb-2 sm:mb-4 tracking-wider" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                {data.name.toUpperCase()}
              </h1>
              <div className="w-16 sm:w-20 h-1 bg-blue-900 mb-2 sm:mb-4"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-900 italic font-normal" style={{ fontFamily: 'Arial, sans-serif' }}>
                {data.title}
              </p>
            </div>

            {/* Contact information */}
            <div className="space-y-2 sm:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-900 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-sm sm:text-lg md:text-xl text-blue-900 font-medium">{data.phone}</span>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-900 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-sm sm:text-lg md:text-xl text-blue-900 font-medium break-all">{data.email}</span>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-900 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-sm sm:text-lg md:text-xl text-blue-900 font-medium">{data.address}</span>
              </div>
            </div>

            {/* Company logo area */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <img 
                  src="/bb.png" 
                  alt="Devalaya Infosys Logo" 
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                />
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 tracking-wide leading-tight">DEVALAYA</h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-600 font-medium tracking-wide leading-tight">INFOSYS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 px-2 sm:px-4 py-2 sm:py-6">
        <div className="grid grid-cols-2 sm:flex gap-1 sm:gap-3 max-w-4xl mx-auto">
          <Button
            onClick={handleCall}
            className="flex-1 min-w-0 sm:min-w-[120px] bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-base py-1.5 sm:py-3 h-8 sm:h-auto"
          >
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline sm:inline">Call</span>
            <span className="xs:hidden sm:hidden">📞</span>
          </Button>
          
          <Button
            onClick={handleEmail}
            className="flex-1 min-w-0 sm:min-w-[120px] bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-base py-1.5 sm:py-3 h-8 sm:h-auto"
          >
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline sm:inline">Email</span>
            <span className="xs:hidden sm:hidden">✉️</span>
          </Button>
          
          <Button
            onClick={handleDownload}
            variant="outline"
            className="flex-1 min-w-0 sm:min-w-[120px] border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white text-xs sm:text-base py-1.5 sm:py-3 h-8 sm:h-auto"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline sm:inline">Download</span>
            <span className="xs:hidden sm:hidden">⬇️</span>
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1 min-w-0 sm:min-w-[120px] border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white text-xs sm:text-base py-1.5 sm:py-3 h-8 sm:h-auto"
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline sm:inline">Share</span>
            <span className="xs:hidden sm:hidden">📤</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
