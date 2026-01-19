import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  href?: string
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold py-2 px-6 rounded-lg transition-colors duration-200 inline-block text-center'
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  }

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, variants[variant], className)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
