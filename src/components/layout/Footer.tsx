import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    about: [
      { name: 'About Us', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Business Directory', href: '/businesses' },
    ],
    resources: [
      { name: 'Mineral Resources', href: '/minerals' },
      { name: 'News', href: '/news' },
      { name: 'Events & Festivals', href: '/events' },
    ],
    contact: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Location', href: '/about#location' },
    ],
  }

  return (
    <footer className="bg-gradient-to-b from-primary-dark to-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 flex flex-col sm:block">
            <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-white/15 p-2.5 ring-1 ring-white/25 w-14 h-14 sm:w-16 sm:h-16">
              <img
                src="/images/logo/logoikoha.png"
                alt="Ikoha Community Logo"
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-0.5 tracking-tight">Ikoha Community</h3>
            <p className="text-[10px] uppercase tracking-widest text-secondary font-medium mb-1.5">Agricultural & Mineral Resources</p>
            <p className="text-xs text-white/80">
              Ovia South-West, Edo State, Nigeria
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-2">About</h4>
            <ul className="space-y-1">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-secondary transition-colors duration-200 ease-out text-xs focus-visible:ring-white/70 focus-visible:ring-offset-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-2">Resources</h4>
            <ul className="space-y-1">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-secondary transition-colors duration-200 ease-out text-xs focus-visible:ring-white/70 focus-visible:ring-offset-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-2">Contact</h4>
            <ul className="space-y-1">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-secondary transition-colors duration-200 ease-out text-xs focus-visible:ring-white/70 focus-visible:ring-offset-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Location map */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20">
          <h4 className="text-white font-semibold text-sm mb-3">Location</h4>
          <div className="overflow-hidden rounded-lg border border-white/20 shadow-inner">
            <div className="relative w-full h-36 sm:h-40">
              <iframe
                src="https://www.google.com/maps?q=6.636944,5.203889&z=15&output=embed"
                title="Ikoha, Ovia South-West, Edo, Nigeria – Map"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="px-3 py-2 bg-white/5 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-white/80">
                <span className="font-semibold text-white">Ikoha</span>
                {' · '}
                Ovia South-West, Edo, Nigeria
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=6.636944,5.203889"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-secondary hover:text-secondary-light transition-colors focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark rounded"
              >
                <MapPin className="w-4 h-4" aria-hidden />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-5 pt-5 sm:mt-6 sm:pt-6 text-center">
          <p className="text-white/90 text-xs">© {currentYear} Ikoha Community Development. All rights reserved.</p>
          <p className="mt-1 text-white/70 text-xs">Ovia South-West, Edo State, Nigeria</p>
          <p className="mt-1 text-white/60 text-xs">Developed by ASENOGUAN NIG LTD</p>
        </div>
      </div>
    </footer>
  )
}
