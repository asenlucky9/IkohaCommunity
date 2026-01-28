import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MusicPlayer, { Track } from '@/components/ui/MusicPlayer'
import WhatsAppChat from '@/components/ui/WhatsAppChat'

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

// Ensures correct scaling/layout on mobile devices
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

// Default playlist - add more tracks here or load from API
const defaultPlaylist: Track[] = [
  {
    id: '1',
    title: 'Ijesumwen',
    artist: 'Ikoha Community',
    src: '/Ijesumwen.mp3'
  },
  // Add more tracks here as you add audio files to the public folder
  // Example:
  // {
  //   id: '2',
  //   title: 'Track Name',
  //   artist: 'Artist Name',
  //   src: '/track2.mp3'
  // },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="bg-secondary text-primary-dark py-1.5 px-2 sm:py-2 sm:px-3 text-center border-b border-primary-dark animate-fade-in-banner">
            <div className="max-w-2xl mx-auto space-y-0.5 text-center">
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                <span
                  className="inline-block w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-current border-t-transparent animate-spin-slow flex-shrink-0"
                  aria-hidden
                />
                <h2 className="font-bold uppercase tracking-wider text-xs sm:text-sm animate-pulse-soft">
                  Site Under Construction
                </h2>
              </div>
              <p className="text-[11px] sm:text-xs leading-tight">
                We are currently working on improving this platform. The website is in testing mode, and some features may be unavailable. Thank you for your patience and understanding.
              </p>
              <p className="text-[11px] sm:text-xs leading-tight">
                Developed by ASENOGUAN NIG LTD
              </p>
              <p className="text-[11px] sm:text-xs leading-tight">
                💡 Have ideas, suggestions, or images? Please send them to:
              </p>
              <p className="text-[11px] sm:text-xs leading-tight">
                <a
                  href="mailto:asenlucky9@gmail.com"
                  className="font-semibold underline underline-offset-1 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-1 focus:ring-offset-secondary rounded"
                >
                  📩 asenlucky9@gmail.com
                </a>
              </p>
            </div>
          </div>
          <main className="flex-grow overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <MusicPlayer tracks={defaultPlaylist} />
          <WhatsAppChat />
        </div>
      </body>
    </html>
  )
}
