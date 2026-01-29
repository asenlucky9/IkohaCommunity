import { NextResponse } from 'next/server'

// News article type (matches database schema)
export interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'general' | 'development' | 'minerals' | 'events' | 'announcements'
  featuredImageUrl?: string | null
  authorId?: string | null
  isPublished: boolean
  publishedAt: string | null
  viewsCount: number
  createdAt: string
  updatedAt: string
}

// Sample data (replace with database query later)
const sampleNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Ikoha Community Development Initiative Launched',
    slug: 'ikoha-community-development-initiative-launched',
    excerpt: 'A new development initiative has been launched to improve infrastructure and community services in Ikoha.',
    content: `
      <h2>Ikoha Community Development Initiative</h2>
      <p>We are excited to announce the launch of a comprehensive development initiative aimed at improving infrastructure and community services throughout Ikoha Community.</p>
      <p>This initiative focuses on several key areas including road construction, water supply, healthcare facilities, and educational infrastructure. The project is expected to significantly enhance the quality of life for all residents.</p>
      <h3>Key Objectives</h3>
      <ul>
        <li>Improve road connectivity within and around the community</li>
        <li>Enhance water supply systems</li>
        <li>Upgrade healthcare facilities</li>
        <li>Support educational development</li>
      </ul>
      <p>We invite all community members to participate and support this initiative as we work together to build a better Ikoha.</p>
    `,
    category: 'development',
    featuredImageUrl: null,
    authorId: null,
    isPublished: true,
    publishedAt: '2024-12-15T10:00:00Z',
    viewsCount: 245,
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Mineral Resource Survey Completed',
    slug: 'mineral-resource-survey-completed',
    excerpt: 'Comprehensive survey of mineral resources in Ikoha has been completed, revealing significant potential.',
    content: `
      <h2>Mineral Resource Survey Results</h2>
      <p>A comprehensive geological survey of Ikoha Community has been completed, revealing significant mineral resource potential.</p>
      <p>The survey identified several valuable mineral deposits including limestone, granite, and other construction materials. These resources present opportunities for sustainable economic development while ensuring environmental protection.</p>
      <h3>Survey Highlights</h3>
      <ul>
        <li>Detailed mapping of mineral deposits</li>
        <li>Assessment of extraction feasibility</li>
        <li>Environmental impact considerations</li>
        <li>Economic potential analysis</li>
      </ul>
      <p>Further studies are planned to develop sustainable extraction plans that benefit the community while protecting our natural environment.</p>
    `,
    category: 'minerals',
    featuredImageUrl: null,
    authorId: null,
    isPublished: true,
    publishedAt: '2024-12-10T14:30:00Z',
    viewsCount: 189,
    createdAt: '2024-12-10T14:30:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'Annual Festival Preparations Underway',
    slug: 'annual-festival-preparations-underway',
    excerpt: 'Preparations for the Ikoha Annual Festival in January are in full swing.',
    content: `
      <h2>Ikoha Annual Festival 2025</h2>
      <p>Preparations for the Ikoha Annual Festival are in full swing! The festival, scheduled for January 1st, 2025, promises to be a grand celebration of our culture, traditions, and community spirit.</p>
      <p>This year's festival will feature traditional performances, cultural displays, local cuisine, and various entertainment activities for all ages.</p>
      <h3>Festival Activities</h3>
      <ul>
        <li>Traditional dance performances</li>
        <li>Cultural exhibitions</li>
        <li>Local food vendors</li>
        <li>Community games and competitions</li>
        <li>Musical performances</li>
      </ul>
      <p>All community members, indigenes, and visitors are welcome to join us in this celebration. More details will be announced soon.</p>
    `,
    category: 'events',
    featuredImageUrl: null,
    authorId: null,
    isPublished: true,
    publishedAt: '2024-12-05T09:15:00Z',
    viewsCount: 312,
    createdAt: '2024-12-05T09:15:00Z',
    updatedAt: '2024-12-05T09:15:00Z',
  },
  {
    id: '4',
    title: 'New Road Construction Project Approved',
    slug: 'new-road-construction-project-approved',
    excerpt: 'The community has approved a new road construction project to improve connectivity.',
    content: `
      <h2>Road Construction Project Approved</h2>
      <p>The Ikoha Community Council has approved a major road construction project that will significantly improve connectivity within and around the community.</p>
      <p>The project includes the construction of new roads and the rehabilitation of existing ones, making transportation easier for residents and businesses.</p>
      <h3>Project Scope</h3>
      <ul>
        <li>Construction of 5km of new roads</li>
        <li>Rehabilitation of existing road networks</li>
        <li>Installation of proper drainage systems</li>
        <li>Road signage and safety measures</li>
      </ul>
      <p>Construction is expected to begin in the coming months and will be completed in phases to minimize disruption to daily activities.</p>
    `,
    category: 'development',
    featuredImageUrl: null,
    authorId: null,
    isPublished: true,
    publishedAt: '2024-11-28T11:00:00Z',
    viewsCount: 156,
    createdAt: '2024-11-28T11:00:00Z',
    updatedAt: '2024-11-28T11:00:00Z',
  },
  {
    id: '5',
    title: 'Community Meeting Scheduled',
    slug: 'community-meeting-scheduled',
    excerpt: 'A general community meeting has been scheduled to discuss upcoming projects and initiatives.',
    content: `
      <h2>Community Meeting Announcement</h2>
      <p>A general community meeting has been scheduled to discuss upcoming projects, initiatives, and community development plans.</p>
      <p>All community members are encouraged to attend and participate in discussions about the future of Ikoha.</p>
      <h3>Meeting Agenda</h3>
      <ul>
        <li>Review of ongoing projects</li>
        <li>Discussion of new initiatives</li>
        <li>Community concerns and suggestions</li>
        <li>Budget and resource allocation</li>
      </ul>
      <p>Your participation is important as we work together to build a better community for everyone.</p>
    `,
    category: 'announcements',
    featuredImageUrl: null,
    authorId: null,
    isPublished: true,
    publishedAt: '2024-11-20T08:00:00Z',
    viewsCount: 278,
    createdAt: '2024-11-20T08:00:00Z',
    updatedAt: '2024-11-20T08:00:00Z',
  },
  {
    id: '6',
    title: 'Agricultural Program Expansion',
    slug: 'agricultural-program-expansion',
    excerpt: 'The agricultural support program is expanding to include more farmers and new crops.',
    content: `
      <h2>Agricultural Program Expansion</h2>
      <p>The Ikoha Community Agricultural Support Program is expanding to include more farmers and support for new crop varieties.</p>
      <p>This expansion aims to increase agricultural productivity, support local farmers, and enhance food security in the community.</p>
      <h3>Program Benefits</h3>
      <ul>
        <li>Training and capacity building for farmers</li>
        <li>Access to improved seeds and farming inputs</li>
        <li>Market linkage support</li>
        <li>Financial assistance programs</li>
      </ul>
      <p>Interested farmers are encouraged to register with the Agricultural Department to benefit from this program.</p>
    `,
    category: 'general',
    featuredImageUrl: null,
    authorId: null,
    isPublished: true,
    publishedAt: '2024-11-15T13:45:00Z',
    viewsCount: 201,
    createdAt: '2024-11-15T13:45:00Z',
    updatedAt: '2024-11-15T13:45:00Z',
  },
]

// Ensure this route is always dynamic (uses request.url for query params)
export const dynamic = 'force-dynamic'

// GET /api/news - Fetch all published news articles
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const slug = searchParams.get('slug')

    // If slug is provided, return single article
    if (slug) {
      const article = sampleNews.find(n => n.slug === slug && n.isPublished)
      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
      }
      return NextResponse.json({ article })
    }

    // Filter published articles
    let filteredNews = sampleNews.filter(article => article.isPublished)

    // Filter by category
    if (category && category !== 'all') {
      filteredNews = filteredNews.filter(article => article.category === category)
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredNews = filteredNews.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
      )
    }

    // Sort by published date (newest first)
    filteredNews.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return dateB - dateA
    })

    // Pagination
    const total = filteredNews.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNews = filteredNews.slice(startIndex, endIndex)

    return NextResponse.json({
      articles: paginatedNews,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    )
  }
}
