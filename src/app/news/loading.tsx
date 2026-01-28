export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* PageHero Skeleton */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-12 w-12 bg-white/20 rounded-lg mb-4 animate-pulse" />
            <div className="h-8 bg-white/20 rounded-lg w-64 mx-auto mb-3 animate-pulse" />
            <div className="h-5 bg-white/20 rounded-lg w-96 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Search Bar Skeleton */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Category Filters Skeleton */}
        <div className="mb-8 flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>

        {/* Articles Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-6 w-20 bg-gray-200 rounded-full mb-4" />
              <div className="h-6 bg-gray-200 rounded mb-3" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
