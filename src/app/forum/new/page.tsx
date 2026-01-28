'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Plus } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHero from '@/components/ui/PageHero'

const categories = [
  { id: 'general', name: 'General Discussion' },
  { id: 'development', name: 'Community Development' },
  { id: 'events', name: 'Events & Festivals' },
  { id: 'business', name: 'Business & Economy' },
  { id: 'agriculture', name: 'Agriculture & Farming' },
  { id: 'minerals', name: 'Mineral Resources' },
]

export default function NewThreadPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('general')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      // In real app, create thread via API and redirect
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      router.push(`/forum/${slug}`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Create New Thread"
        description="Start a new conversation in the Ikoha Community Forum"
        icon={<Plus className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/forum"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Forum
        </Link>

        {/* Form */}
        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Thread Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title for your thread..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                required
                maxLength={200}
              />
              <p className="mt-1 text-xs text-gray-500">{title.length}/200 characters</p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thread content here. Be clear and respectful..."
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                required
                minLength={10}
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 10 characters. Be respectful and constructive.
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Forum Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be respectful and constructive in your posts</li>
                <li>• Stay on topic and choose the appropriate category</li>
                <li>• Use clear and descriptive titles</li>
                <li>• Search before posting to avoid duplicates</li>
              </ul>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                You need to be logged in to create a thread.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/forum"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting || !title.trim() || !content.trim()}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Creating...' : 'Create Thread'}
                </button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
