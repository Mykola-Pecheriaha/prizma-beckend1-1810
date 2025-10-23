import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Система Консультацій',
  description: 'Медична система для ведення консультацій пацієнтів',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-100 py-8 antialiased dark:bg-gray-900`}
      >
        <KeyboardShortcuts />
        {children}
      </body>
    </html>
  )
}
