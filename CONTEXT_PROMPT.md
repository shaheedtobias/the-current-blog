# The Current Blog Platform - Context for Next Session

## Project Overview
Building "The Current" - a news and content blog platform covering South Africa and global stories. Focus on readability, fast page loads, ad revenue optimization, and scalable design system.

## Tech Stack
- **Frontend:** Astro (blog template, no git initialized)
- **CMS:** Sanity (headless CMS with built-in admin studio)
- **Styling:** Tailwind CSS v4 (already installed in project)
- **Fonts:** Playfair Display (headings), Inter (body), JetBrains Mono (meta/data)
- **Deployment:** Netlify (direct deploy, no git)

## Current Status
- ✅ Astro project created with blog template
- ✅ Dependencies installed: @sanity/client, @portabletext/react, lucide-react, date-fns
- ✅ Tailwind CSS v4 installed
- ⏳ Design system configuration (next step)
- ⏳ Sanity project setup
- ⏳ Component development
- ⏳ Page development

## CRITICAL: Strict Design System Requirements

This is not just a website - it's a reusable design system. DO NOT deviate from these constraints.

### 1. Typography Hierarchy (The Core Engine)
**Editorial Voice (Headings):** Playfair Display
- Tight line-spacing: line-height: 1.15
- High contrast
- Semantic tokens: text-heading-xl, text-heading-lg, etc.

**Utility Engine (Body & UI):** Inter
- Exceptionally legible on mobile
- Semantic tokens: text-body-md, text-body-sm, etc.

**Data/Meta Layer:** JetBrains Mono
- For dates, reading times, category tags
- Signals "raw data" and modernizes layout
- Semantic token: text-meta

**Reusability Rule:** Every piece of text must map to a token. No arbitrary pixel sizes.

### 2. Color System (Digital Editorial Palette)
Token | Value | Purpose
-----|-------|--------
Primary (Ink) | #0F172A (Slate 900) | Headings, heavy text, structural UI
Secondary (Paper) | #F8FAFC (Slate 50) | Main background (softer than pure white)
Surface (Card) | #FFFFFF | Article cards, headers, elevated elements
Accent (Signal) | #0284C7 (Sky 600) | Category tags, text links, active states
Muted (Graphite) | #475569 (Slate 600) | Body text (easier on eyes than pure black)

### 3. Component Blueprinting (Atomic Design)
Build exactly four flexible components that assemble the entire site:

**A. Content Card (Multi-Form)**
- One master Card component with horizontal/vertical orientation toggle
- Desktop Grid: Horizontal layout (Image left, text right)
- Mobile/Sidebar: Vertical stack (Image top, text bottom)
- Props: orientation: 'horizontal' | 'vertical'

**B. Slot-Based Grid**
- Layout grid that accepts optional adSlot property
- If adSlot={true}: 3-column layout (articles + ad container)
- If adSlot={false}: 2-column layout (articles fill space)
- No layout shifts

**C. Ad Wrap Component**
- Fixed aspect ratio
- Subtle background color: #F1F5F9
- "Advertisement" text in 6px JetBrains Mono
- Prevents Cumulative Layout Shift (CLS)

**D. Header/Footer Components**
- Reusable across all pages
- Navigation, search, social links

### 4. Layout Constraints (Grid Guide)
- **Container:** Max-width locked at 1280px for desktop
- **Whitespace:** Strict 8px spacing grid
- **Padding:** 16px on mobile, 32px on desktop (rem values)
- **Borders:** 1px border of #E2E8F0 for separation
- **Shadows:** Subtle only (box-shadow: 0 1px 3px rgba(0,0,0,0.05))
- **Style:** Flat elegance, not 3D blocks

### 5. Execution Mandate (Code Rules)
- **No scroll animations** - kills mobile battery and page scores
- **Instant CSS hover states** - transition: color 0.15s ease
- **Mobile targets** - minimum 44x44px hit targets for all links/buttons
- **Fast page loads** - Astro's zero-JS by default

## Next Steps

### 1. Configure Design System
- Install fonts (Playfair Display, Inter, JetBrains Mono)
- Configure Tailwind v4 with custom color tokens
- Create semantic typography tokens
- Set up spacing grid (8px system)

### 2. Build Atomic Components
- `ContentCard.astro` - with orientation prop
- `SlotGrid.astro` - with adSlot prop
- `AdWrap.astro` - fixed aspect ratio, CLS prevention
- `Header.astro` - navigation
- `Footer.astro` - links, social

### 3. Sanity Setup
- Create Sanity project (in subdirectory: studio/)
- Set up post schema with categories/tags
- Configure Sanity client
- Test content creation

### 4. Page Development
- Homepage with featured articles
- Blog list page with category navigation
- Single post page with rich content
- Category/tag pages for series navigation

### 5. Testing & Deployment
- Test mobile responsiveness
- Test ad placement (no CLS)
- Test page load speed
- Deploy to Netlify

## Sanity Schema Requirements
Post schema should include:
- title (string, required)
- slug (slug, auto from title)
- excerpt (text)
- publishedAt (datetime)
- content (array of blocks + images)
- featuredImage (image with hotspot)
- status (draft/published)
- categories (array of references to category schema)
- tags (array of strings)

## UI Structure
- **Header:** Logo/brand, navigation menu, search icon
- **Hero Section:** Featured article with large image
- **Content Grid:** 2-column article cards (desktop), 1-column (mobile)
- **Article Card:** Image, title, excerpt, date, category tag
- **Single Post:** Large title, date, author, rich content, related articles
- **Footer:** About, links, social icons

## Design Philosophy
- Clean, minimal like NYT, BBC, Medium
- High contrast for readability
- Typography-focused design
- Generous whitespace
- Subtle shadows for depth
- Fast page loads (no scroll animations)
- Ad-friendly (designated slots that don't disrupt reading)
- Accessible (WCAG AA compliance)
- Mobile-first (touch-friendly targets)

## Important Notes
- Use Sanity Studio for all content management (no custom admin needed)
- Astro handles server-side rendering automatically
- Content is fetched at build time (static generation)
- Images are optimized via Sanity
- No JavaScript sent to client by default (Astro)
- Use PortableText for rendering rich content
- Keep UI simple and functional
- Mobile-first design
- STRICT adherence to design system tokens

## Development Commands
- Astro dev server: `npm run dev` (port 4321)
- Sanity Studio: `npm run dev` in studio directory (port 3333)
- Build: `npm run build`
- Preview: `npm run preview`

## Deployment
- Netlify direct deploy (no git)
- Environment variables needed: SANITY_PROJECT_ID, SANITY_DATASET
- Deploy Astro site and Sanity Studio as separate projects

## Benefits of This Architecture
- **Performance:** Astro's zero-JS = fast page loads
- **SEO:** Server-side rendering = better search rankings
- **Ad Revenue:** Fast pages = higher ad viewability
- **Development Speed:** No custom admin/editor needed
- **Cost:** Both Astro and Sanity have generous free tiers
- **Scalability:** Can handle high traffic easily
- **Maintenance:** Less custom code to maintain
- **Reusability:** Atomic design system = consistent UI across all pages
