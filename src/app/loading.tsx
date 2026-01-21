export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4" role="status" aria-label="Loading">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" aria-hidden="true" />
        <p className="mt-3 text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  )
}
