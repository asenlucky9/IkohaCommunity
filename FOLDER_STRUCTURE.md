# Project Folder Structure

## Complete Directory Tree

```
ikoha-community-development/
│
├── .next/                          # Next.js build output (generated)
├── .netlify/                       # Netlify configuration (generated)
├── node_modules/                   # Dependencies (generated)
│
├── public/                         # Static assets
│   ├── images/
│   │   ├── minerals/              # Mineral resource images
│   │   ├── projects/              # Project photos
│   │   ├── businesses/            # Business logos
│   │   ├── community/             # Community photos
│   │   └── icons/                 # Icon files
│   ├── documents/                  # Public documents
│   └── favicon.ico
│
├── src/                            # Source code (Next.js 14+ App Router)
│   │
│   ├── app/                        # App Router directory
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Homepage
│   │   ├── loading.tsx             # Loading UI
│   │   ├── error.tsx               # Error boundary
│   │   ├── not-found.tsx           # 404 page
│   │   │
│   │   ├── about/                  # About page
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── minerals/               # Mineral resources
│   │   │   ├── page.tsx            # List page
│   │   │   ├── [id]/               # Dynamic route
│   │   │   │   └── page.tsx        # Detail page
│   │   │   └── loading.tsx
│   │   │
│   │   ├── projects/               # Projects
│   │   │   ├── page.tsx            # List page
│   │   │   ├── [id]/               # Dynamic route
│   │   │   │   └── page.tsx        # Detail page
│   │   │   └── loading.tsx
│   │   │
│   │   ├── businesses/             # Business directory
│   │   │   ├── page.tsx            # List page
│   │   │   ├── [id]/               # Dynamic route
│   │   │   │   └── page.tsx        # Detail page
│   │   │   └── loading.tsx
│   │   │
│   │   ├── news/                   # News & Events
│   │   │   ├── page.tsx            # List page
│   │   │   ├── [slug]/             # Dynamic route
│   │   │   │   └── page.tsx        # Article page
│   │   │   └── loading.tsx
│   │   │
│   │   ├── events/                 # Events
│   │   │   ├── page.tsx            # List page
│   │   │   ├── [id]/               # Dynamic route
│   │   │   │   └── page.tsx        # Event detail
│   │   │   └── loading.tsx
│   │   │
│   │   ├── resources/              # Documents/Resources
│   │   │   ├── page.tsx            # List page
│   │   │   └── loading.tsx
│   │   │
│   │   ├── contact/                # Contact page
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   └── admin/                  # Admin dashboard (protected)
│   │       ├── layout.tsx          # Admin layout
│   │       ├── page.tsx            # Dashboard home
│   │       ├── login/
│   │       │   └── page.tsx
│   │       ├── minerals/
│   │       │   ├── page.tsx        # Manage minerals
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       ├── projects/
│   │       │   ├── page.tsx
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       ├── businesses/
│   │       │   └── page.tsx
│   │       ├── news/
│   │       │   ├── page.tsx
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       ├── events/
│   │       │   ├── page.tsx
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       └── settings/
│   │           └── page.tsx
│   │
│   ├── components/                 # Reusable components
│   │   ├── ui/                     # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Breadcrumb.tsx
│   │   │
│   │   ├── minerals/               # Mineral-specific components
│   │   │   ├── MineralCard.tsx
│   │   │   ├── MineralGrid.tsx
│   │   │   ├── MineralFilter.tsx
│   │   │   └── MineralDetail.tsx
│   │   │
│   │   ├── projects/               # Project-specific components
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectFilter.tsx
│   │   │   └── ProgressBar.tsx
│   │   │
│   │   ├── businesses/             # Business components
│   │   │   ├── BusinessCard.tsx
│   │   │   └── BusinessGrid.tsx
│   │   │
│   │   ├── news/                   # News components
│   │   │   ├── NewsCard.tsx
│   │   │   ├── NewsGrid.tsx
│   │   │   └── ArticleContent.tsx
│   │   │
│   │   ├── events/                 # Event components
│   │   │   ├── EventCard.tsx
│   │   │   └── EventCalendar.tsx
│   │   │
│   │   ├── forms/                  # Form components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   └── AdminForm.tsx
│   │   │
│   │   └── maps/                   # Map components
│   │       ├── CommunityMap.tsx
│   │       └── LocationMarker.tsx
│   │
│   ├── lib/                        # Utility libraries
│   │   ├── db/                     # Database utilities
│   │   │   ├── client.ts           # DB client
│   │   │   ├── schema.ts           # Database schema (Drizzle/Zod)
│   │   │   └── migrations/         # DB migrations
│   │   │
│   │   ├── api/                    # API utilities
│   │   │   ├── minerals.ts
│   │   │   ├── projects.ts
│   │   │   ├── businesses.ts
│   │   │   ├── news.ts
│   │   │   └── events.ts
│   │   │
│   │   ├── auth/                   # Authentication
│   │   │   ├── config.ts
│   │   │   └── middleware.ts
│   │   │
│   │   ├── utils/                  # General utilities
│   │   │   ├── format.ts           # Formatting functions
│   │   │   ├── validation.ts       # Validation schemas
│   │   │   └── constants.ts        # Constants
│   │   │
│   │   └── hooks/                  # Custom React hooks
│   │       ├── useMineral.ts
│   │       ├── useProject.ts
│   │       └── useDebounce.ts
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── database.ts             # DB types
│   │   ├── api.ts                  # API types
│   │   └── index.ts
│   │
│   └── styles/                     # Global styles
│       ├── globals.css
│       └── variables.css            # CSS variables
│
├── .env.local                      # Environment variables (gitignored)
├── .env.example                    # Example env file
├── .gitignore
├── .eslintrc.json                  # ESLint config
├── .prettierrc                     # Prettier config
├── next.config.js                  # Next.js config
├── netlify.toml                    # Netlify deployment config
├── package.json                    # Dependencies
├── package-lock.json               # Lock file
├── postcss.config.js               # PostCSS config
├── tailwind.config.js              # Tailwind CSS config
├── tsconfig.json                   # TypeScript config
│
└── README.md                       # Project documentation
```

## Key Directories Explained

### `/src/app`
- Next.js 14+ App Router structure
- Each folder represents a route
- `page.tsx` files are the actual pages
- `layout.tsx` files define layouts for routes
- `loading.tsx` and `error.tsx` for UI states

### `/src/components`
- Reusable React components
- Organized by feature/domain
- UI components are base building blocks
- Feature components are domain-specific

### `/src/lib`
- Utility functions and configurations
- Database connections and schemas
- API client functions
- Authentication setup
- Custom hooks

### `/public`
- Static assets served directly
- Images, documents, icons
- No processing by Next.js

### Configuration Files
- `next.config.js`: Next.js settings
- `tailwind.config.js`: Tailwind CSS customization
- `tsconfig.json`: TypeScript compiler options
- `netlify.toml`: Netlify deployment settings

## Next Steps

1. Initialize the project with `npx create-next-app@latest`
2. Install dependencies
3. Set up database connection
4. Create the folder structure
5. Build components incrementally
6. Implement pages following wireframes
