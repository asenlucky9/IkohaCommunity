# Quick Start Guide

## Step-by-Step Setup

### 1. Initialize Next.js Project

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**OR** if you prefer to use the existing structure:

```bash
# Install dependencies
npm install

# Create the src directory structure
mkdir -p src/app src/components src/lib src/types src/styles
mkdir -p src/components/ui src/components/layout
mkdir -p src/components/minerals src/components/projects
mkdir -p src/components/businesses src/components/news
mkdir -p src/components/events src/components/forms src/components/maps
mkdir -p src/lib/db src/lib/api src/lib/auth src/lib/utils src/lib/hooks
mkdir -p public/images/minerals public/images/projects
mkdir -p public/images/businesses public/images/community public/images/icons
mkdir -p public/documents
```

### 2. Set Up Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values.

### 3. Choose Your Database

**Option A: PostgreSQL (Recommended for Production)**
- Install PostgreSQL
- Create database: `createdb "Ikoha Community Development"` (use quotes for names with spaces)
- Update `DATABASE_URL` in `.env.local` to: `postgresql://user:password@localhost:5432/Ikoha Community Development`

**Option B: SQLite (Easy for Development)**
- No setup needed
- Update `DATABASE_URL` to: `sqlite:./ikoha-community-development.db`

### 4. Install Additional Dependencies

```bash
# Database (choose one)
npm install drizzle-orm drizzle-kit
npm install pg  # For PostgreSQL
# OR
npm install better-sqlite3  # For SQLite

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Authentication (optional)
npm install next-auth

# Maps (choose one)
npm install @react-google-maps/api
# OR
npm install mapbox-gl react-map-gl

# Image Upload (optional)
npm install cloudinary

# Date handling
npm install date-fns
```

### 5. Create Basic File Structure

Run these commands to create the initial folder structure:

```bash
# App routes
mkdir -p src/app/about
mkdir -p src/app/minerals/\[id\]
mkdir -p src/app/projects/\[id\]
mkdir -p src/app/businesses/\[id\]
mkdir -p src/app/news/\[slug\]
mkdir -p src/app/events/\[id\]
mkdir -p src/app/resources
mkdir -p src/app/contact
mkdir -p src/app/admin/login
mkdir -p src/app/admin/minerals/new
mkdir -p src/app/admin/minerals/\[id\]
mkdir -p src/app/admin/projects/new
mkdir -p src/app/admin/projects/\[id\]
mkdir -p src/app/admin/businesses
mkdir -p src/app/admin/news/new
mkdir -p src/app/admin/news/\[id\]
mkdir -p src/app/admin/events/new
mkdir -p src/app/admin/events/\[id\]
mkdir -p src/app/admin/settings
```

### 6. Create Initial Files

**Create `src/app/layout.tsx`:**
```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ikoha Community Development',
  description: 'Official platform for Ikoha Community, Ovia South-West, Edo State, Nigeria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Create `src/app/globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #2D5016;
  --secondary: #D4AF37;
  --accent: #1E3A8A;
}

body {
  @apply text-gray-900 bg-white;
}
```

**Create `src/app/page.tsx`:**
```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-20">
        Welcome to Ikoha Community
      </h1>
      <p className="text-center text-gray-600">
        Ovia South-West, Edo State, Nigeria
      </p>
    </main>
  )
}
```

### 7. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Next Steps

1. **Set up database schema** - Use the schema from `DATABASE_SCHEMA.md`
2. **Create components** - Start with layout components (Header, Footer)
3. **Build pages** - Follow the wireframes in `WIREFRAMES.md`
4. **Add functionality** - Implement CRUD operations for resources
5. **Style with Tailwind** - Use the color scheme from wireframes
6. **Deploy to Netlify** - Follow deployment instructions in README

## Development Tips

- Use TypeScript for type safety
- Follow the folder structure in `FOLDER_STRUCTURE.md`
- Refer to wireframes for UI design
- Test on mobile devices (responsive design)
- Use environment variables for sensitive data
- Commit frequently with meaningful messages

## Getting Help

- Check the documentation files in the root directory
- Review Next.js documentation: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
