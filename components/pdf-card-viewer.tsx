'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Share2, 
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

interface PDFCardViewerProps {
  data: {
    id: string
    name: string
    title: string
    phone: string
    email: string
    address: string
    pdfPath: string
  }
}

export default function PDFCardViewer({ data }: PDFCardViewerProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone']
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword))
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    const link = document.createElement('a')
    link.href = data.pdfPath
    link.download = `${data.name.replace(/\s+/g, '_')}_Card.pdf`
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
      {/* PDF Card Container */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="relative w-full max-w-4xl aspect-[8/5] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {isMobile ? (
            /* Mobile Fallback - Recreated Card Design */
            <div className="w-full h-full relative bg-white">
              {/* Blue corner design */}
              <div className="absolute top-0 right-0 w-20 h-12 sm:w-32 sm:h-20 bg-blue-900">
                <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[80px] sm:border-l-[128px] border-l-transparent border-b-[48px] sm:border-b-[80px] border-b-white"></div>
              </div>

              {/* Gold corner design */}
              <div className="absolute bottom-0 right-0 w-12 h-20 sm:w-20 sm:h-32 bg-amber-600">
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[80px] sm:border-t-[128px] border-t-transparent border-l-[48px] sm:border-l-[80px] border-l-white"></div>
              </div>

              {/* Main content */}
              <div className="relative z-10 p-4 sm:p-8 h-full flex flex-col justify-between">
                {/* Name and title */}
                <div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-blue-900 mb-2 tracking-wider" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                    {data.name.toUpperCase()}
                  </h1>
                  <div className="w-12 sm:w-20 h-1 bg-blue-900 mb-2"></div>
                  <p className="text-lg sm:text-xl text-blue-900 italic font-normal" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {data.title}
                  </p>
                </div>

                {/* Contact information */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-900 rounded-full flex items-center justify-center">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-lg text-blue-900 font-medium">{data.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-900 rounded-full flex items-center justify-center">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-lg text-blue-900 font-medium break-all">{data.email}</span>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-900 rounded-full flex items-center justify-center">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-lg text-blue-900 font-medium">{data.address}</span>
                  </div>
                </div>

                {/* Company logo area */}
                <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/bb.png" 
                      alt="Devalaya Infosys Logo" 
                      className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                    />
                    <div className="text-left">
                      <h3 className="text-sm sm:text-lg font-bold text-blue-900 tracking-wide leading-tight">DEVALAYA</h3>
                      <p className="text-xs sm:text-sm text-amber-600 font-medium tracking-wide leading-tight">INFOSYS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop PDF Embed */
            <iframe
              src={`${data.pdfPath}#zoom=150&view=FitH&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&page=1`}
              className="w-full h-full border-0 outline-0"
              title={`${data.name} Business Card`}
              style={{
                transform: 'scale(1.1)',
                transformOrigin: 'center center',
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              frameBorder="0"
              scrolling="no"
            />
          )}
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
