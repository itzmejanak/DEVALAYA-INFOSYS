import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DEVALAYA INFOSYS",
  description: "Professional IT Solutions and Services",
    generator: 'janak'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`} suppressHydrationWarning={true}>
        <Providers>
          {/* Navigation component will be handled by individual layouts */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
