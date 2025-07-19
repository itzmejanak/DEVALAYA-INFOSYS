import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "DEVALAYA INFOSYS",
  description: "Professional IT Solutions and Services",
  generator: 'janak',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-white`} suppressHydrationWarning={true}>
        <Providers>
          {/* Navigation component will be handled by individual layouts */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
