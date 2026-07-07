import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Free Cash-to-Crypto Checklist | AfriMoney',
  description:
    'Take a free 1-minute assessment and unlock: What Every Regular Crypto User Should Check Before Converting Physical Cash.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  )
}
