'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Users, Clock, ArrowRight, Plus, TrendingUp, Pin, Lock } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Forum types
interface ForumThread {
  id: string
  title: string
  slug: string
  content: string
  author: string
  authorId?: string
  category: string
  repliesCount: number
  viewsCount: number
  isPinned: boolean
  isLocked: boolean
  lastActivity: string
  createdAt: string
}

interface ForumCategory {
  id: string
  name: string
  description: string
  icon: typeof MessageSquare
  threadsCount: number
  color: string
}

const categories: ForumCategory[] = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'General topics and conversations about Ikoha Community',
    icon: MessageSquare,
    threadsCount: 12,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    id: 'development',
    name: 'Community Development',
    description: 'Discuss development projects, infrastructure, and improvements',
    icon: TrendingUp,
    threadsCount: 8,
    color: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    id: 'events',
    name: 'Events & Festivals',
    description: 'Share information about upcoming events, festivals, and celebrations',
    icon: Clock,
    threadsCount: 5,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  {
    id: 'business',
    name: 'Business & Economy',
    description: 'Business opportunities, local economy, and trade discussions',
    icon: Users,
    threadsCount: 6,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Farming',
    description: 'Farming tips, agricultural resources, and farming discussions',
    icon: TrendingUp,
    threadsCount: 4,
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    id: 'minerals',
    name: 'Mineral Resources',
    description: 'Discussions about mineral resources, mining, and related topics',
    icon: MessageSquare,
    threadsCount: 3,
    color: 'bg-secondary/10 text-secondary-dark border-secondary/20',
  },
]

// Sample threads (replace with API fetch)
const sampleThreads: ForumThread[] = [
  {
    id: '1',
    title: 'Welcome to Ikoha Community Forum!',
    slug: 'welcome-to-ikoha-community-forum',
    content: 'Welcome everyone! This is our community forum where we can share ideas, discuss topics, and connect with each other.',
    author: 'Community Admin',
    category: 'general',
    repliesCount: 15,
    viewsCount: 234,
    isPinned: true,
    isLocked: false,
    lastActivity: '2024-12-20T10:30:00Z',
    createdAt: '2024-12-15T09:00:00Z',
  },
  {
    id: '2',
    title: 'Upcoming Road Construction Project',
    slug: 'upcoming-road-construction-project',
    content: 'I heard about the new road construction project. Does anyone have more details?',
    author: 'John Doe',
    category: 'development',
    repliesCount: 8,
    viewsCount: 156,
    isPinned: false,
    isLocked: false,
    lastActivity: '2024-12-19T14:20:00Z',
    createdAt: '2024-12-18T10:00:00Z',
  },
  {
    id: '3',
    title: 'Annual Festival 2025 - Planning Discussion',
    slug: 'annual-festival-2025-planning-discussion',
    content: 'Let\'s discuss ideas for next year\'s festival! What activities would you like to see?',
    author: 'Festival Committee',
    category: 'events',
    repliesCount: 12,
    viewsCount: 189,
    isPinned: false,
    isLocked: false,
    lastActivity: '2024-12-20T09:15:00Z',
    createdAt: '2024-12-17T08:00:00Z',
  },
  {
    id: '4',
    title: 'Local Business Opportunities',
    slug: 'local-business-opportunities',
    content: 'What business opportunities exist in Ikoha? Let\'s share ideas and support local entrepreneurs.',
    author: 'Business Owner',
    category: 'business',
    repliesCount: 6,
    viewsCount: 98,
    isPinned: false,
    isLocked: false,
    lastActivity: '2024-12-19T16:45:00Z',
    createdAt: '2024-12-18T11:00:00Z',
  },
  {
    id: '5',
    title: 'Farming Season Tips',
    slug: 'farming-season-tips',
    content: 'Share your farming tips and experiences for this season. What crops are you planting?',
    author: 'Farmer',
    category: 'agriculture',
    repliesCount: 9,
    viewsCount: 112,
    isPinned: false,
    isLocked: false,
    lastActivity: '2024-12-20T07:30:00Z',
    createdAt: '2024-12-19T06:00:00Z',
  },
]

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [threads, setThreads] = useState<ForumThread[]>(sampleThreads)
  const [loading, setLoading] = useState(false)

  const filteredThreads = selectedCategory === 'all'
    ? threads
    : threads.filter(thread => thread.category === selectedCategory)

  // Sort: pinned first, then by last activity
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Community Forum"
        description="Connect, discuss, and share ideas with fellow Ikoha Community members. Join conversations about development, events, business, and more."
        icon={<MessageSquare className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Categories Grid */}
        <section className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Forum Categories</h2>
            <Link
              href="/forum/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold text-sm"
            >
              <Plus className="w-4 h-4" />
              New Thread
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-5 sm:p-6 cursor-pointer transition-all duration-200 ${
                      isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {category.threadsCount} threads
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Threads List */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Threads' : getCategoryInfo(selectedCategory).name}
            </h2>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-sm font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              View All
            </button>
          </div>

          {sortedThreads.length > 0 ? (
            <div className="space-y-4">
              {sortedThreads.map((thread) => {
                const categoryInfo = getCategoryInfo(thread.category)
                return (
                  <motion.div
                    key={thread.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-5 sm:p-6 hover:shadow-lg transition-all duration-200">
                      <Link href={`/forum/${thread.slug}`}>
                        <div className="flex items-start gap-4">
                          {/* Thread Icon */}
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryInfo.color}`}>
                              {thread.isPinned ? (
                                <Pin className="w-6 h-6" />
                              ) : thread.isLocked ? (
                                <Lock className="w-6 h-6" />
                              ) : (
                                <MessageSquare className="w-6 h-6" />
                              )}
                            </div>
                          </div>

                          {/* Thread Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {thread.isPinned && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/20 text-secondary-dark rounded text-xs font-semibold">
                                      <Pin className="w-3 h-3" />
                                      Pinned
                                    </span>
                                  )}
                                  {thread.isLocked && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-semibold">
                                      <Lock className="w-3 h-3" />
                                      Locked
                                    </span>
                                  )}
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${categoryInfo.color}`}>
                                    {categoryInfo.name}
                                  </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                                  {thread.title}
                                </h3>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {thread.content}
                            </p>

                            {/* Thread Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Users className="w-4 h-4" />
                                <span className="font-medium">{thread.author}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4" />
                                <span>{thread.repliesCount} replies</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{formatDate(thread.lastActivity)}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span>{thread.viewsCount} views</span>
                              </div>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex-shrink-0">
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </Link>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No threads found</h3>
              <p className="text-gray-500 mb-6">
                {selectedCategory === 'all'
                  ? 'Be the first to start a conversation!'
                  : 'No threads in this category yet.'}
              </p>
              <Link
                href="/forum/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                <Plus className="w-5 h-5" />
                Create New Thread
              </Link>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
