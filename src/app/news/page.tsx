import PageHero from '@/components/ui/PageHero'
import { Newspaper } from 'lucide-react'

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="News"
        description="Updates from Ikoha Community—announcements, development progress, and community highlights."
        icon={<Newspaper className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Latest News</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Coming soon — featured posts, categories, and search.</p>
          </div>
          <div className="card p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Community Announcements</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Coming soon — official notices and updates.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
