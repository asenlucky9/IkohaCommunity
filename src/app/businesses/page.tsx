import PageHero from '@/components/ui/PageHero'
import { Store } from 'lucide-react'

export default function BusinessesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Local Business Directory"
        description="Find local businesses and services in Ikoha Community—supporting growth, jobs, and investment."
        icon={<Store className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Directory</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Verified listings with categories and contacts for local businesses.</p>
          </div>
          <div className="card p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Promote Your Business</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Submit your business for review and publishing via the Contact page.</p>
          </div>
          <div className="card p-4 sm:p-5 md:p-6 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Investment & Partnerships</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Opportunities and local value chains for investors and partners.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
