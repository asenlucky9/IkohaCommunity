'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin, Mail, Printer } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHero from '@/components/ui/PageHero'
import { NewsArticle } from '@/app/api/news/route'

export default function NewsArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/news?slug=${slug}`)
        
        if (!response.ok) {
          throw new Error('Article not found')
        }

        const data = await response.json()
        setArticle(data.article)

        // Fetch related articles (same category, exclude current)
        if (data.article) {
          const relatedResponse = await fetch(
            `/api/news?category=${data.article.category}&limit=3`
          )
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json()
            const filtered = relatedData.articles.filter(
              (a: NewsArticle) => a.slug !== slug
            )
            setRelatedArticles(filtered.slice(0, 3))
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date not available'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      announcements: 'bg-accent/10 text-accent border-accent/20',
      development: 'bg-primary/10 text-primary border-primary/20',
      minerals: 'bg-secondary/10 text-secondary-dark border-secondary/20',
      events: 'bg-secondary/10 text-secondary-dark border-secondary/20',
      general: 'bg-gray-100 text-gray-700 border-gray-200',
    }
    return colors[category] || colors.general
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = article?.title || ''
  const shareText = article?.excerpt || ''

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(shareUrl)
    const title = encodeURIComponent(shareTitle)
    const text = encodeURIComponent(shareText)

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${title}&body=${text}%20${url}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block rounded-full h-10 w-10 border-2 border-primary border-t-transparent animate-spin-slow" />
          <p className="mt-3 text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHero
          title="Article Not Found"
          description="The article you're looking for doesn't exist or has been removed."
        />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title={article.title}
        description={article.excerpt}
        icon={<Tag className="h-7 w-7" />}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        {/* Article Card */}
        <Card className="p-6 sm:p-8 md:p-10">
          {/* Category Badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(article.category)}`}>
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              {article.viewsCount > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.viewsCount} views</span>
                </div>
              )}
            </div>

            {/* Share & Print Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                title="Print article"
              >
                <Printer className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1 border-l border-gray-200 pl-2">
                <Share2 className="w-4 h-4 text-gray-600 mr-1" />
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 text-gray-600 hover:text-blue-400 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                  title="Share via Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-ul:text-gray-700 prose-li:text-gray-700
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Featured Image (if available) */}
          {article.featuredImageUrl && (
            <div className="mt-8">
              <img
                src={article.featuredImageUrl}
                alt={article.title}
                className="w-full rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Back to News Link */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              View All News
            </Link>
          </div>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Card key={related.id} className="p-5 hover:scale-[1.02] transition-transform duration-300">
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(related.category)}`}>
                      {related.category.charAt(0).toUpperCase() + related.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {related.excerpt}
                  </p>
                  <Link
                    href={`/news/${related.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    Read More
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
