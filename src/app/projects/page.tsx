export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Community Development Projects</h1>
          <p className="mt-3 max-w-3xl text-lg text-gray-600">
            Track ongoing and completed projects—transparently showing progress, impact, and next steps.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900">Project Dashboard</h3>
            <p className="mt-2 text-gray-600">
              Coming soon — we’ll list projects with status, budget, timeline, and community updates.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900">Submit a Project Idea</h3>
            <p className="mt-2 text-gray-600">
              Coming soon — suggest community needs and development priorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
