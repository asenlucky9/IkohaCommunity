import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ikoha Community Development',
  description: 'Official platform for Ikoha Community, Ovia South-West, Edo State, Nigeria. Showcasing mineral resources, community development projects, and local engagement.',
  keywords: ['Ikoha', 'Community', 'Nigeria', 'Edo State', 'Mineral Resources', 'Ovia South-West'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} font-sans antialiased`}>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
