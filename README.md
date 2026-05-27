# Vaishnavi Designer Boutique — Frontend

Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + Motion. Public marketing site, blog, and admin panel for Vaishnavi Designer Boutique in Lucknow.

## Run

```powershell
copy .env.local.example .env.local       # fill in values
npm install
npm run dev                              # → http://localhost:3000
```

The backend must be running on `http://localhost:4000` for inquiries, blog content, and the admin panel to work.

## Routes

| Route | What it is | SEO target |
| --- | --- | --- |
| `/` | Home — hero, services, why-us, testimonials, inquiry CTA, FAQ | "boutique in Lucknow" + brand |
| `/about` | Story, atelier philosophy, timeline | branded / "designer boutique Lucknow" |
| `/services` | All services index | "boutique services Lucknow" |
| `/services/[slug]` | Service detail (5 slugs) | service-specific Lucknow queries |
| `/gallery` | Lookbook (placeholders for v1) | "Lucknow boutique gallery" |
| `/blog` | Journal index (DB-backed) | long-tail informational |
| `/blog/[slug]` | Article | per-post |
| `/contact` | Map, hours, phone, WhatsApp, form | "Vaishnavi Designer Boutique contact" |
| `/admin/login` | Admin sign-in | not indexed |
| `/admin/dashboard` | Counts + shortcuts | not indexed |
| `/admin/inquiries` | Inquiry table + drawer | not indexed |
| `/admin/blogs` | Posts table | not indexed |
| `/admin/blogs/new` and `/admin/blogs/[id]` | Markdown editor + Cloudinary cover upload | not indexed |
| `/sitemap.xml` | Dynamic, pulls blog slugs from backend | — |
| `/robots.txt` | Allows all, disallows `/admin` | — |

## SEO conventions

All page metadata flows through [src/lib/seo.ts](src/lib/seo.ts) (`buildMetadata`). JSON-LD blocks are emitted from [src/components/seo/JsonLd.tsx](src/components/seo/JsonLd.tsx):

- **LocalBusinessJsonLd** is rendered once in the root `layout.tsx`.
- **BreadcrumbJsonLd** on every non-home page.
- **ServiceJsonLd** + **FaqJsonLd** on each `/services/[slug]`.
- **ArticleJsonLd** on `/blog/[slug]`.

## Adding content

- **A new blog post** → admin UI (`/admin/blogs/new`). No code change. Cover images upload to Cloudinary via signed flow.
- **A new service page** → add an entry to [src/lib/content/services.ts](src/lib/content/services.ts). The dynamic `app/services/[slug]/page.tsx` picks it up and `generateStaticParams` includes it in the sitemap.
- **Owner contact info** → edit `.env.local` (`NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_ADDRESS_LINE_1` etc.). All consumers read from [src/lib/env.ts](src/lib/env.ts).

## Design system

Tokens live in [src/app/globals.css](src/app/globals.css) under Tailwind v4's `@theme` directive — no `tailwind.config.js`.

Brand palette (derived from the VD logo):
- Wine `#6B1733` · Wine-deep `#4A0F23` — primary, headlines
- Gold `#C9A24B` · Gold-soft `#E8D9A8` — accents
- Cream `#FBF7F1` · Ivory `#FFFFFF` — surfaces
- Ink `#2A1A1F` · Muted `#7A6B70` — text
- Blush `#F4E2DC` — soft section accents

Type pairing — display: **Cormorant Garamond**, body: **Inter Tight**, accents: **Marcellus**. Loaded via `next/font/google`.

Animations: **Motion** (`motion/react`) — one orchestrated hero reveal, viewport reveals elsewhere, editorial cubic-bezier ease.

## Admin credentials (dev only)

- Email: `vaishnavidesignerboutiques@gmail.com`
- Password: `Vaishnavi@2026`

Change before going public.
