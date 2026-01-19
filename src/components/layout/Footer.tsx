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
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <img
                src="/images/logo/logoikoha.png"
                alt="Ikoha Community Logo"
                className="h-16 w-16 object-contain mb-3"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Ikoha Community</h3>
            <p className="text-sm mb-4">
              Ovia South-West, Edo State<br />
              South South Nigeria
            </p>
            <p className="text-xs text-gray-500">
              Agricultural & Mineral Resources
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} Ikoha Community Development. All rights reserved.
          </p>
          <p className="mt-2 text-gray-500">
            Ovia South-West, Edo State, Nigeria
          </p>
        </div>
      </div>
    </footer>
  )
}
