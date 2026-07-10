# Development Workflow

## Prerequisites

- Node.js 20 LTS
- npm 10+
- Local WordPress (LocalWP, Docker, or remote staging CMS)

## Quick Start

```bash
git clone <repo>
cd "Game website"
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WORDPRESS_GRAPHQL_URL=https://cms.example.com/graphql
WORDPRESS_PREVIEW_SECRET=dev-preview-secret
REVALIDATION_SECRET=dev-revalidation-secret
WORDPRESS_REVALIDATE_SECONDS=60
```

**Without WordPress:** The site runs with fallback content from `src/lib/site-config.ts`. All landing page sections work; blog shows empty state.

## Local WordPress Options

### Option 1 — Remote Staging CMS (Recommended)

Point `WORDPRESS_GRAPHQL_URL` to your staging WordPress. No local WP needed.

### Production frontend on Vercel

If your live site is on Vercel, see **[deployment-vercel.md](./deployment-vercel.md)** for env vars, custom domain, revalidation webhooks, and WordPress `wp-config.php` settings.

### Option 2 — LocalWP

1. Create new site in [LocalWP](https://localwp.com/)
2. Install plugins from [wordpress-setup.md](./wordpress-setup.md)
3. Copy MU-plugin to `wp-content/mu-plugins/`
4. Set `WORDPRESS_GRAPHQL_URL=http://your-site.local/graphql`

### Option 3 — Docker

```bash
docker run -d \
  --name wp-cms \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=db \
  wordpress:latest
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage (ISR)
│   ├── blog/                 # Blog routes
│   ├── api/
│   │   ├── revalidate/       # On-demand ISR webhook
│   │   ├── preview/          # Draft preview
│   │   └── exit-preview/
│   ├── feed.xml/route.ts     # RSS feed
│   ├── sitemap.ts            # Dynamic sitemap
│   └── robots.ts
├── components/
│   ├── blog/                 # Blog UI components
│   ├── layout/               # Navbar, Footer, AppChrome
│   └── sections/             # Landing page sections
└── lib/
    ├── wordpress/            # GraphQL layer
    │   ├── graphql.ts        # Fetch + cache tags
    │   ├── queries.ts        # GraphQL queries
    │   ├── fetchers.ts       # Data fetchers
    │   ├── mappers.ts        # WP → component props
    │   └── fallbacks.ts      # Static fallbacks
    ├── site-config.ts        # Default/fallback content
    ├── content-types.ts      # TypeScript types
    ├── schema.tsx            # JSON-LD
    └── seo.ts                # Metadata builders
```

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Testing Revalidation Locally

```bash
curl -X POST "http://localhost:3000/api/revalidate?secret=dev-revalidation-secret" \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/", "/blog"], "tags": ["site-settings", "posts"]}'
```

## Preview Mode

```
http://localhost:3000/api/preview?secret=dev-preview-secret&slug=my-draft-post
```

Exit preview:

```
http://localhost:3000/api/exit-preview
```

## Content Editing Flow

1. Edit content in WordPress admin (`cms.example.com/wp-admin`)
2. Publish or update
3. WordPress webhook triggers `/api/revalidate`
4. Next.js refreshes cached pages within seconds

## Adding New GraphQL Queries

1. Add query to `src/lib/wordpress/queries.ts`
2. Add fetcher to `src/lib/wordpress/fetchers.ts`
3. Add mapper if needed in `mappers.ts`
4. Export from `src/lib/wordpress/index.ts`
5. Use in page/component

## Code Conventions

- Server Components for all data fetching
- `"use client"` only for interactive UI (FAQ accordion, navbar scroll, theme toggle)
- ISR: `export const revalidate = 3600` on pages
- Cache tags for granular revalidation
- Sanitize all WP HTML via `src/lib/sanitize.ts`
