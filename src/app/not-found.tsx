import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-primary mb-2" aria-hidden="true">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}
