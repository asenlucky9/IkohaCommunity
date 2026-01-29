import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MusicPlayer, { Track } from '@/components/ui/MusicPlayer'
import WhatsAppChat from '@/components/ui/WhatsAppChat'
import AssistantChat from '@/components/ui/AssistantChat'

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
          <main className="flex-grow overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <MusicPlayer tracks={defaultPlaylist} />
          <WhatsAppChat />
          <AssistantChat />
        </div>
      </body>
    </html>
  )
}
