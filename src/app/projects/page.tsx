import PageHero from '@/components/ui/PageHero'
import { Construction } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Community Development Projects"
        description="Track ongoing and completed projects—transparently showing progress, impact, and next steps."
        icon={<Construction className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
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
