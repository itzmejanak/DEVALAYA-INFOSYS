'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UserX, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cream via-white to-cream/50">
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-white shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-navy/10 rounded-full flex items-center justify-center">
              <UserX className="w-10 h-10 text-navy" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-navy mb-4">
              Card Not Found
            </h1>

            {/* Description */}
            <p className="text-navy/70 mb-8 leading-relaxed">
              The digital visiting card you're looking for doesn't exist or may have been moved.
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-navy hover:bg-navy-light text-white"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full border-navy text-navy hover:bg-navy hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Company Branding */}
            <div className="mt-8 pt-6 border-t border-navy/10">
              <p className="text-sm text-navy/60">
                Powered by <span className="font-semibold text-gold">Devalaya Infosys</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
