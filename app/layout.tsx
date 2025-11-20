import type { Metadata } from 'next'
import './globals.css'
import { ContractProvider } from '@/context/ContractContext'

export const metadata: Metadata = {
  title: 'Sirion - AI-Powered Contract Management',
  description: 'Transforming contract management with AI-powered solutions.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ContractProvider>
          {children}
        </ContractProvider>
      </body>
    </html>
  )
}
