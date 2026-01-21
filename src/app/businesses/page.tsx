export default function BusinessesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Local Business Directory</h1>
          <p className="mt-2 sm:mt-3 max-w-3xl text-base sm:text-lg text-gray-600">
            Find local businesses and services in Ikoha Community—supporting growth, jobs, and investment.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="card p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Directory</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Coming soon — verified listings with categories and contacts.</p>
          </div>
          <div className="card p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Promote Your Business</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Coming soon — submit your business for review and publishing.</p>
          </div>
          <div className="card p-4 sm:p-5 md:p-6 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Investment & Partnerships</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Coming soon — opportunities and local value chains.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
