export default function ForumLoading() {
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
        {/* Categories Skeleton */}
        <div className="mb-10">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-5 sm:p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threads Skeleton */}
        <div>
          <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-5 sm:p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                      <div className="h-4 bg-gray-200 rounded w-20" />
                      <div className="h-4 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
