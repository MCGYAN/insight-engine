import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Free Crypto Money Assessment | AfriMoney',
  description:
    'Take a free 1-minute assessment and unlock: The Ghanaian Crypto Users Guide to Paying Less in Fees.',
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
