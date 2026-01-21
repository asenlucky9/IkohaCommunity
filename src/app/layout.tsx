import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Construction } from 'lucide-react'
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
          <div className="bg-secondary text-primary-dark py-2 px-3 sm:py-2.5 sm:px-4 text-center border-b border-primary-dark">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto">
              <Construction className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" aria-hidden />
              <div className="space-y-0.5 text-center">
                <h2 className="font-bold uppercase tracking-wider text-sm sm:text-base">
                  Site Under Construction
                </h2>
                <p className="text-xs sm:text-sm">
                  We are currently working on improving this platform. The site is in testing mode, and some features may be unavailable. Thank you for your patience.
                </p>
                <p className="text-xs sm:text-sm font-semibold">
                  Developed by: <span className="font-bold">ASENOGUAN NIG LTD</span>
                  {' · '}
                  <a
                    href="mailto:asenlucky9@gmail.com"
                    className="font-semibold underline underline-offset-1 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-1 focus:ring-offset-secondary rounded"
                  >
                    📩 asenlucky9@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          <main className="flex-grow overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
