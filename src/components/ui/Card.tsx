import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  hover?: boolean
}

export default function Card({ children, className, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-out',
        hover && 'hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
