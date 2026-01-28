'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Clock, User, Reply, ThumbsUp, Share2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHero from '@/components/ui/PageHero'

interface ForumReply {
  id: string
  content: string
  author: string
  authorId?: string
  createdAt: string
  likesCount: number
}

interface ForumThread {
  id: string
  title: string
  slug: string
  content: string
  author: string
  authorId?: string
  category: string
  replies: ForumReply[]
  viewsCount: number
  createdAt: string
}

export default function ForumThreadPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [thread, setThread] = useState<ForumThread | null>(null)
  const [loading, setLoading] = useState(true)
  const [replyContent, setReplyContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Fetch thread data (replace with API call)
    const fetchThread = async () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setThread({
          id: '1',
          title: 'Welcome to Ikoha Community Forum!',
          slug: slug,
          content: 'Welcome everyone! This is our community forum where we can share ideas, discuss topics, and connect with each other. Feel free to introduce yourself and share what brings you to Ikoha Community.',
          author: 'Community Admin',
          category: 'general',
          viewsCount: 234,
          createdAt: '2024-12-15T09:00:00Z',
          replies: [
            {
              id: '1',
              content: 'Thank you for creating this forum! I\'m excited to connect with other community members.',
              author: 'John Doe',
              createdAt: '2024-12-15T10:30:00Z',
              likesCount: 5,
            },
            {
              id: '2',
              content: 'This is great! Looking forward to meaningful discussions about our community.',
              author: 'Jane Smith',
              createdAt: '2024-12-15T14:20:00Z',
              likesCount: 3,
            },
            {
              id: '3',
              content: 'I have some ideas about community development. Where should I post them?',
              author: 'Community Member',
              createdAt: '2024-12-16T08:15:00Z',
              likesCount: 2,
            },
          ],
        })
        setLoading(false)
      }, 500)
    }

    if (slug) {
      fetchThread()
    }
  }, [slug])

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      if (thread) {
        setThread({
          ...thread,
          replies: [
            ...thread.replies,
            {
              id: Date.now().toString(),
              content: replyContent,
              author: 'You', // Replace with actual user
              createdAt: new Date().toISOString(),
              likesCount: 0,
            },
          ],
        })
      }
      setReplyContent('')
      setSubmitting(false)
    }, 500)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatRelativeTime = (dateString: string) => {
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
    return formatDate(dateString)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block rounded-full h-10 w-10 border-2 border-primary border-t-transparent animate-spin-slow" />
          <p className="mt-3 text-gray-600">Loading thread...</p>
        </div>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHero
          title="Thread Not Found"
          description="The thread you're looking for doesn't exist or has been removed."
        />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Forum
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title={thread.title}
        description={`${thread.replies.length} replies · ${thread.viewsCount} views`}
        icon={<MessageSquare className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/forum"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Forum
        </Link>

        {/* Original Post */}
        <Card className="p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{thread.author}</h3>
                  <p className="text-sm text-gray-500">{formatDate(thread.createdAt)}</p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {thread.content}
              </div>
            </div>
          </div>
        </Card>

        {/* Replies */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Replies ({thread.replies.length})
          </h2>
          <div className="space-y-4">
            {thread.replies.map((reply) => (
              <Card key={reply.id} className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{reply.author}</h4>
                        <p className="text-xs text-gray-500">{formatRelativeTime(reply.createdAt)}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap mb-3">{reply.content}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{reply.likesCount}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors">
                        <Reply className="w-4 h-4" />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <Card className="p-6 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Post a Reply</h3>
          <form onSubmit={handleSubmitReply}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none mb-4"
              required
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                You need to be logged in to post a reply.
              </p>
              <button
                type="submit"
                disabled={submitting || !replyContent.trim()}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Posting...' : 'Post Reply'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
