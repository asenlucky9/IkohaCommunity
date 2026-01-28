# Database Integration Guide - News System

This guide shows how to connect the news system to your PostgreSQL database.

---

## 📋 Prerequisites

- PostgreSQL database set up (see `DATABASE_SETUP.md`)
- `news` table created (see `create_tables.sql`)
- Database connection configured in `.env.local`

---

## 🔌 Step 1: Install Database Client

Choose one of these options:

### Option A: pg (Recommended)
```bash
npm install pg
npm install --save-dev @types/pg
```

### Option B: Prisma (Full ORM)
```bash
npm install prisma @prisma/client
npx prisma init
```

### Option C: Drizzle ORM
```bash
npm install drizzle-orm drizzle-kit
npm install --save-dev @types/pg
```

---

## 🔧 Step 2: Create Database Connection

Create `src/lib/db.ts`:

```typescript
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export default pool
```

---

## 📝 Step 3: Update API Route

Update `src/app/api/news/route.ts`:

### Replace the sample data section with:

```typescript
import pool from '@/lib/db'

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
      const result = await pool.query(
        `SELECT * FROM news 
         WHERE slug = $1 AND is_published = true`,
        [slug]
      )

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
      }

      // Increment view count
      await pool.query(
        `UPDATE news SET views_count = views_count + 1 WHERE slug = $1`,
        [slug]
      )

      return NextResponse.json({ article: result.rows[0] })
    }

    // Build query
    let query = `SELECT * FROM news WHERE is_published = true`
    const params: any[] = []
    let paramCount = 1

    // Category filter
    if (category && category !== 'all') {
      query += ` AND category = $${paramCount}`
      params.push(category)
      paramCount++
    }

    // Search filter
    if (search) {
      query += ` AND (
        title ILIKE $${paramCount} OR 
        excerpt ILIKE $${paramCount} OR 
        content ILIKE $${paramCount}
      )`
      params.push(`%${search}%`)
      paramCount++
    }

    // Get total count
    const countResult = await pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*)'),
      params
    )
    const total = parseInt(countResult.rows[0].count)

    // Add sorting and pagination
    query += ` ORDER BY published_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`
    params.push(limit, (page - 1) * limit)

    const result = await pool.query(query, params)

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      articles: result.rows,
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
```

---

## 🔐 Step 4: Environment Variables

Add to `.env.local`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ikoha_community_development
```

For production (e.g., Netlify, Vercel), add this as an environment variable in your hosting platform.

---

## ✅ Step 5: Test the Integration

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Visit:** `http://localhost:3000/news`

3. **Check browser console** for any errors

4. **Test API directly:** `http://localhost:3000/api/news`

---

## 🎯 Additional Features to Add

### 1. Admin API Routes (Create/Update/Delete)

Create `src/app/api/admin/news/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// POST - Create new article
export async function POST(request: Request) {
  // Add authentication check here
  const body = await request.json()
  
  const result = await pool.query(
    `INSERT INTO news (title, slug, excerpt, content, category, is_published, published_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [body.title, body.slug, body.excerpt, body.content, body.category, body.isPublished, body.publishedAt]
  )
  
  return NextResponse.json({ article: result.rows[0] })
}

// PUT - Update article
export async function PUT(request: Request) {
  // Implementation
}

// DELETE - Delete article
export async function DELETE(request: Request) {
  // Implementation
}
```

### 2. Image Upload

- Use a service like Cloudinary, AWS S3, or Netlify Blob Storage
- Store image URLs in `featured_image_url` field

### 3. Author Information

Join with `users` table to get author details:

```typescript
const result = await pool.query(
  `SELECT n.*, u.full_name as author_name, u.email as author_email
   FROM news n
   LEFT JOIN users u ON n.author_id = u.id
   WHERE n.slug = $1`,
  [slug]
)
```

---

## 🐛 Troubleshooting

### Connection Issues
- Check `DATABASE_URL` format
- Verify database is running
- Check firewall/network settings

### Query Errors
- Verify table schema matches (`create_tables.sql`)
- Check column names match exactly
- Ensure `is_published` is boolean type

### Performance
- Add indexes (already in `create_tables.sql`)
- Consider caching with Redis or Next.js cache
- Use connection pooling (already using `pg.Pool`)

---

## 📚 Next Steps

1. ✅ Connect to database (this guide)
2. Add authentication for admin routes
3. Create admin dashboard for managing news
4. Add image upload functionality
5. Implement caching for better performance
6. Add RSS feed (`/api/news/rss.xml`)

---

*For questions or issues, refer to `DATABASE_SETUP.md` or check your database logs.*
