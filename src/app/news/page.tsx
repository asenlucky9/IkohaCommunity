export default function NewsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">News & Events</h1>
        <p className="text-lg text-gray-700 mb-8">
          Stay updated with the latest news and upcoming events in Ikoha Community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Latest News</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
