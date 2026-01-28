export default function NewsArticleLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* PageHero Skeleton */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-12 w-12 bg-white/20 rounded-lg mb-4 animate-pulse" />
            <div className="h-10 bg-white/20 rounded-lg w-3/4 mx-auto mb-3 animate-pulse" />
            <div className="h-5 bg-white/20 rounded-lg w-2/3 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Article Content Skeleton */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Article Card Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10">
          {/* Category Badge */}
          <div className="mb-6">
            <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Meta Skeleton */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex gap-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
