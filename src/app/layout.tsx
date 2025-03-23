import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/lib/trpc/client'
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next Authentication Kickstart',
  description: 'Next Authentication Kickstart',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Toaster />
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
