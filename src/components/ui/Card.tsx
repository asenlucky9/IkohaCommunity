import { cn } from '@/lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
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
