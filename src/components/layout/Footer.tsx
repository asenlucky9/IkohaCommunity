import Link from 'next/link'

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
