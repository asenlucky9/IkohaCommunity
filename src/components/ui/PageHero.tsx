import { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  icon?: ReactNode
  meta?: ReactNode
  align?: 'left' | 'center'
}

export default function PageHero({
  eyebrow,
  title,
  description,
  icon,
  meta,
  align = 'center',
}: Props) {
  const alignClasses = align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/images/logo/communitypicwithpeople.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-5 ${alignClasses}`}>
          {icon ? (
            <div className="inline-flex items-center justify-center rounded-2xl bg-white/15 p-3 ring-1 ring-white/20 backdrop-blur-sm">
              {icon}
            </div>
          ) : null}
          {eyebrow ? (
            <p className="text-sm font-semibold tracking-wide text-white/90">{eyebrow}</p>
          ) : null}
          <h1 className="text-4xl font-bold leading-tight drop-shadow-sm sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
              {description}
            </p>
          ) : null}
          {meta ? <div className="pt-1 text-sm text-white/90">{meta}</div> : null}
        </div>
      </div>
    </section>
  )
}

