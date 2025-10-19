import type { Metadata } from 'next'
import './globals.css'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'

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
      <body className="antialiased">
        <KeyboardShortcuts />
        {children}
      </body>
    </html>
  )
}
