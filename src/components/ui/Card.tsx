import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-200',
        hover && 'hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
