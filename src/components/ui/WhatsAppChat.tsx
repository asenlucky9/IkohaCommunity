'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
  phone?: string
  message?: string
  position?: 'bottom-right' | 'bottom-left'
}

function normalizePhone(raw: string) {
  // expects international format digits only, e.g. 2348012345678
  return raw.replace(/[^\d]/g, '')
}

export default function WhatsAppChat({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  message = 'Hello, I would like to contact Ikoha Community Development.',
  position = 'bottom-left',
}: Props) {
  const normalized = normalizePhone(phone)
  if (!normalized) return null

  const href = `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
  const posClass = position === 'bottom-right' ? 'right-6' : 'left-6'

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'fixed bottom-6 z-50',
        posClass,
        'inline-flex items-center gap-2 rounded-full shadow-xl',
        'bg-[#25D366] hover:bg-[#1ebe5d] text-white',
        'px-4 py-3',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]',
      ].join(' ')}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative inline-flex items-center justify-center">
        <MessageCircle className="h-5 w-5" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-white/90" />
      </span>
      <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
    </motion.a>
  )
}

