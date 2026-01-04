import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stayscape - Luxury Apartment Rentals in NYC",
  description:
    "Experience minimalist luxury. Book premium apartments in New York City with 100% reply rate and 4.98 star ratings.",
  icons: {
    icon: [
      { url: "/top-logo.svg", type: "image/svg+xml" }
    ]
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
