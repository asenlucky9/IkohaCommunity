'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
