# Product Requirements Document (PRD)
## 8webcom.com — Website Rebuild

**Version:** 1.0  
**Date:** October 2026  
**Owner:** 8webcom.com  
**Status:** 🟢 Active Development

---

## 1. Project Overview

### 1.1 Background
8webcom.com is a leading web development and digital marketing company based in Ahmedabad, Gujarat, India. Founded in 2011, the company has served 2000+ clients globally across web development, web portals, digital marketing, CRM solutions, and enterprise software.

The existing website is a legacy PHP/jQuery-based site. This project is a **full rebuild** using modern technologies (Next.js 16, TypeScript, Tailwind CSS v4) to improve performance, SEO, maintainability, and user experience.

### 1.2 Objective
Rebuild the 8webcom.com website as a pixel-faithful, modern Next.js application that:
- Matches the design, structure, and content of the live site
- Achieves 90+ Lighthouse score across all metrics
- Is fully responsive across all 10 target breakpoints
- Is maintainable and scalable for future updates

---

## 2. Stakeholders

| Role | Name / Entity |
|---|---|
| Client | 8webcom.com |
| Location | Ahmedabad, Gujarat, India |
| Primary Contact | info@8webcom.com / +91 97277 00459 |
| Developer | (internal) |

---

## 3. Goals & Success Metrics

### 3.1 Business Goals
- Recreate the full production site with no content loss
- Improve page load speed by 40% vs the current site
- Improve Google Lighthouse scores to 90+ across all categories
- Enable future CMS integration (Sanity) for content updates without code changes

### 3.2 Success Metrics

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse Best Practices | ≥ 90 |
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Mobile Responsiveness | 100% across all 10 breakpoints |
| Pages Built | 13 |
| Components Built | 30+ |

---

## 4. Tech Stack

### 4.1 Core

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Runtime | Node.js | 22.x |
| Package Manager | npm | 10.x |

### 4.2 Libraries

| Purpose | Library |
|---|---|
| CMS | `next-sanity`, `@sanity/client`, `@sanity/image-url` |
| Database / Auth | `@supabase/supabase-js`, `@supabase/ssr` |
| Animations | `framer-motion` |
| Forms | `react-hook-form`, `@hookform/resolvers` |
| Validation | `zod` |
| Icons | `lucide-react` |
| Image optimization | `sharp` |
| UI primitives | `@radix-ui/react-dialog`, `@radix-ui/react-slot` |
| Class utilities | `clsx`, `tailwind-merge`, `class-variance-authority` |

### 4.3 Design System

| Token | Value |
|---|---|
| Primary Color | `#0799B3` (Teal) |
| Secondary Color | `#F58220` (Orange) |
| Tertiary Color | `#C47B2E` (Amber) |
| Neutral Color | `#1F2429` (Dark Charcoal) |
| Background | `#FFFFFF` |
| Font Family | Plus Jakarta Sans (300–800) |

---

## 5. Responsive Breakpoints

| Group | Prefix | Width |
|---|---|---|
| Mobile | `xs-320:` | 320px |
| Mobile | `xs-375:` | 375px |
| Mobile | `xs-390:` | 390px |
| Mobile | `xs-430:` | 430px |
| Tablet | `md-768:` | 768px |
| Tablet | `md-820:` | 820px |
| Tablet | `lg-1024:` | 1024px |
| Desktop | `xl-1280:` | 1280px |
| Desktop | `xl-1440:` | 1440px |
| Desktop | `2xl-1920:` | 1920px |

---

## 6. Site Map (Pages)

| # | Route | File | Priority |
|---|---|---|---|
| 1 | `/` | `src/app/page.tsx` | P0 — Homepage |
| 2 | `/about-us` | `src/app/about-us/page.tsx` | P1 |
| 3 | `/services` | `src/app/services/page.tsx` | P1 |
| 4 | `/services/web-development` | `src/app/services/web-development/page.tsx` | P1 |
| 5 | `/services/web-portal` | `src/app/services/web-portal/page.tsx` | P1 |
| 6 | `/services/digital-marketing` | `src/app/services/digital-marketing/page.tsx` | P1 |
| 7 | `/services/crm-solutions` | `src/app/services/crm-solutions/page.tsx` | P1 |
| 8 | `/projects` | `src/app/projects/page.tsx` | P2 |
| 9 | `/careers` | `src/app/careers/page.tsx` | P2 |
| 10 | `/contacts` | `src/app/contacts/page.tsx` | P1 |
| 11 | `/privacy-policy` | `src/app/privacy-policy/page.tsx` | P3 |
| 12 | `/disclaimer-policy` | `src/app/disclaimer-policy/page.tsx` | P3 |
| 13 | `/refund-and-cancellation-policy` | `src/app/refund-and-cancellation-policy/page.tsx` | P3 |

---

## 7. Homepage Sections (P0)

| # | Section | Component | Status |
|---|---|---|---|
| 1 | Sticky Header + Nav | `Header.tsx` | ⬜ To Do |
| 2 | Mobile Menu Drawer | `MobileMenu.tsx` | ⬜ To Do |
| 3 | Right Side Info Panel | `SideMenu.tsx` | ⬜ To Do |
| 4 | Hero Slider (3 slides, fade) | `HeroSlider.tsx` | ⬜ To Do |
| 5 | About Section | `AboutSection.tsx` | ⬜ To Do |
| 6 | Our Services (2×2 grid) | `ServicesGrid.tsx` | ⬜ To Do |
| 7 | What We Offer (tech slider) | `TechSlider.tsx` | ⬜ To Do |
| 8 | Stats / Counters | `StatsSection.tsx` | ⬜ To Do |
| 9 | Testimonials slider | `Testimonials.tsx` | ⬜ To Do |
| 10 | Client Logos infinite strip | `BrandLogos.tsx` | ⬜ To Do |
| 11 | Contact CTA + Form | `ContactForm.tsx` | ⬜ To Do |
| 12 | Footer (4-col) | `Footer.tsx` | ⬜ To Do |
| 13 | Floating Social sidebar | `FloatingSocial.tsx` | ⬜ To Do |
| 14 | Scroll To Top button | `ScrollToTop.tsx` | ⬜ To Do |

---

## 8. Component Architecture

### 8.1 Layout Components
```
src/components/layout/
├── Header.tsx          — Logo, nav, "Get In Touch" CTA, hamburger
├── MobileMenu.tsx      — Full-screen drawer for mobile
├── SideMenu.tsx        — Right-side info panel (about, contact, social)
├── Footer.tsx          — 4-column footer + copyright + legal links
├── FloatingSocial.tsx  — Fixed right-side social icon bar
└── ScrollToTop.tsx     — SVG progress circle scroll-to-top
```

### 8.2 Section Components
```
src/components/sections/
├── HeroSlider.tsx      — Auto-play hero, fade transition, 3 slides
├── AboutSection.tsx    — 3-image collage + text + 3 feature pills
├── ServicesGrid.tsx    — 2×2 hover image cards with number overlay
├── TechSlider.tsx      — Responsive carousel of tech/platform cards
├── StatsSection.tsx    — Animated count-up numbers (10+, 2000+, 5000+)
├── Testimonials.tsx    — Swiper testimonial carousel
├── BrandLogos.tsx      — Infinite auto-scroll client logos
└── ContactForm.tsx     — Form with zod validation + react-hook-form
```

### 8.3 UI Primitives
```
src/components/ui/
├── Button.tsx          — Primary, Secondary, Outlined, Ghost variants
├── SectionTitle.tsx    — Sub-title badge + h2 heading pattern
├── ServiceCard.tsx     — Hover image card with number and link
├── TechCard.tsx        — Platform card with image + icon overlay
├── TestimonialCard.tsx — Star rating + quote + author
├── StatCard.tsx        — Animated counter + label
└── Badge.tsx           — Small label/tag component
```

---

## 9. Content Architecture (Files)

| File | Purpose |
|---|---|
| `src/lib/constants.ts` | Site info, contact, social links, nav links, footer links |
| `src/lib/data.ts` | All homepage section data (hero, about, services, stats, testimonials, logos) |
| `src/lib/metadata.ts` | SEO metadata for all 13 pages |
| `src/lib/page-data.ts` | Inner page content (services, about, careers, policies) |
| `src/lib/utils.ts` | Shared utilities: `cn()`, `formatTel()`, `truncate()` |
| `src/types/index.ts` | TypeScript interfaces for all data shapes |

---

## 10. Feature Requirements

### 10.1 Header (FR-001)
- **Sticky**: Sticks to top on scroll with shadow
- **Logo**: Links to `/`
- **Nav links**: Dropdown on hover for Services
- **CTA Button**: "Get In Touch" → `/contacts`
- **Hamburger**: Visible on mobile (<1024px), opens `MobileMenu`
- **Sidebar icon**: Opens `SideMenu` panel

### 10.2 Hero Slider (FR-002)
- **3 slides** with fade transition, auto-play (5s interval)
- **Full viewport height** on desktop, 500px on mobile
- **Background image** per slide (webp)
- **Text**: Title + description + CTA button, each slide has its own link
- **Prev/Next arrows**: Custom SVG arrows

### 10.3 About Section (FR-003)
- **3-image collage** layout (img1, img2, img3 overlapping)
- **Sub-title badge**: "About Us"
- **H1 heading**: "8WEBCOM.COM"
- **Body text** with inline links to service pages
- **3 feature items** with SVG icon + title + description
- **"Read More" CTA** → `/about-us`

### 10.4 Services Grid (FR-004)
- **2×2 card grid** (1-col mobile, 2-col tablet+)
- **Each card**: Hover zoom image, service title, number (01–04), "View Details" link
- **"More Details" CTA** below grid → `/services`

### 10.5 Tech Slider (FR-005)
- **Heading**: "What We Offer" / "Superfast, well designed, well researched, website with CMS"
- **Responsive**: 1 slide mobile → 2 tablet → 3 desktop
- **Each card**: Image + floating icon + title + description

### 10.6 Brand Logos (FR-006)
- **Infinite auto-scroll** loop (no pause)
- **Responsive**: 1 mobile → 2 sm → 3 md → 5 lg → 6 xl
- **14 client logos** (webp from CDN)

### 10.7 Contact Form (FR-007)
- **Fields**: Name, Mobile (10-digit), Email, Service (select), Message, reCAPTCHA
- **Validation**: Zod schema + react-hook-form
- **Phone**: Numeric-only, max 10 digits
- **Submit**: POST to `/api/contact` (Next.js API route)
- **reCAPTCHA** integration

### 10.8 Footer (FR-008)
- **4 columns**: About+Social | Useful Links | Our Services | Get In Touch
- **Copyright**: "Copyright © 2026 8webcom.com by All Rights Reserved"
- **Legal links**: Disclaimer | Refund Policy | Privacy Policy
- **Dark background** (#1F2429)

### 10.9 Floating Social (FR-009)
- **Fixed right side**, vertically centered
- **5 icons**: WhatsApp (green), Instagram (gradient), Facebook (blue), LinkedIn (blue), Twitter (black)
- **Hover**: All turn orange (`#fa961a`)

### 10.10 API Route — Contact Form (FR-010)
- `src/app/api/contact/route.ts`
- Validates form data server-side (zod)
- Sends email notification (nodemailer or Supabase)
- Returns `200` success or `400` validation error

---

## 11. SEO Requirements

| Requirement | Implementation |
|---|---|
| Unique `<title>` per page | `generateMetadata()` in each `page.tsx` |
| Meta description per page | From `src/lib/metadata.ts` |
| OG tags (title, description, image) | Next.js metadata API |
| Canonical URL | `<link rel="canonical">` |
| Structured data (JSON-LD) | LocalBusiness schema on homepage |
| `sitemap.xml` | `src/app/sitemap.ts` |
| `robots.txt` | `src/app/robots.ts` |
| Image alt text | Required on all `<Image>` components |
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| Geo meta tags | IN-GJ / Ahmedabad |

---

## 12. Performance Requirements

| Requirement | Implementation |
|---|---|
| Image optimization | Next.js `<Image>` with `width`, `height`, `loading="lazy"` |
| Font optimization | `next/font/google` with `display: swap` |
| Code splitting | Automatic via Next.js App Router |
| Server Components | All sections default to RSC (no unnecessary `use client`) |
| Client Components | Only for interactive elements (slider, form, mobile menu) |
| webp images | All images served as webp from CDN |

---

## 13. Accessibility Requirements

- All interactive elements keyboard accessible
- `aria-label` on all icon-only buttons and links
- Color contrast ratio ≥ 4.5:1 for text
- `alt` text on all images
- `role` attributes on landmark regions
- Focus visible states on all interactive elements

---

## 14. Build Phases & Delivery

### Phase 1 — Foundation ✅ Done
- [x] Next.js project setup
- [x] Tailwind CSS v4 config
- [x] Color palette locked (`globals.css`)
- [x] Plus Jakarta Sans font
- [x] Custom breakpoints
- [x] Content architecture (`lib/`, `types/`)

### Phase 2 — Layout
- [ ] `Header.tsx`
- [ ] `MobileMenu.tsx`
- [ ] `SideMenu.tsx`
- [ ] `Footer.tsx`
- [ ] `FloatingSocial.tsx`
- [ ] `ScrollToTop.tsx`

### Phase 3 — UI Primitives
- [ ] `Button.tsx`
- [ ] `SectionTitle.tsx`
- [ ] `ServiceCard.tsx`
- [ ] `TechCard.tsx`
- [ ] `TestimonialCard.tsx`

### Phase 4 — Homepage Sections
- [ ] `HeroSlider.tsx`
- [ ] `AboutSection.tsx`
- [ ] `ServicesGrid.tsx`
- [ ] `TechSlider.tsx`
- [ ] `StatsSection.tsx`
- [ ] `Testimonials.tsx`
- [ ] `BrandLogos.tsx`
- [ ] `ContactForm.tsx`
- [ ] Assemble `src/app/page.tsx`

### Phase 5 — Inner Pages
- [ ] `/about-us`
- [ ] `/services` + 4 sub-pages
- [ ] `/projects`
- [ ] `/careers`
- [ ] `/contacts`
- [ ] `/privacy-policy`
- [ ] `/disclaimer-policy`
- [ ] `/refund-and-cancellation-policy`

### Phase 6 — API & Integrations
- [ ] `/api/contact` route (form submission)
- [ ] reCAPTCHA integration
- [ ] Supabase form submissions storage
- [ ] `sitemap.ts` + `robots.ts`

### Phase 7 — QA & Polish
- [ ] Framer Motion animations
- [ ] Mobile responsiveness QA across all 10 breakpoints
- [ ] Lighthouse audit & fixes
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Final content review

---

## 15. Out of Scope (v1.0)

- Blog / CMS-driven blog (commented out on live site)
- Admin panel
- Multi-language support
- E-commerce / payment gateway
- AI chat widget (GlassCore — third-party script, add later)

---

## 16. File Structure (Target)

```
src/
├── app/
│   ├── page.tsx                        ← Homepage
│   ├── layout.tsx                      ← Root layout
│   ├── globals.css                     ← Tailwind + design tokens
│   ├── about-us/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── web-development/page.tsx
│   │   ├── web-portal/page.tsx
│   │   ├── digital-marketing/page.tsx
│   │   └── crm-solutions/page.tsx
│   ├── projects/page.tsx
│   ├── careers/page.tsx
│   ├── contacts/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── disclaimer-policy/page.tsx
│   ├── refund-and-cancellation-policy/page.tsx
│   ├── api/
│   │   └── contact/route.ts
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── SideMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingSocial.tsx
│   │   └── ScrollToTop.tsx
│   ├── sections/
│   │   ├── HeroSlider.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── TechSlider.tsx
│   │   ├── StatsSection.tsx
│   │   ├── Testimonials.tsx
│   │   ├── BrandLogos.tsx
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── SectionTitle.tsx
│       ├── ServiceCard.tsx
│       ├── TechCard.tsx
│       ├── TestimonialCard.tsx
│       ├── StatCard.tsx
│       └── Badge.tsx
│
├── lib/
│   ├── constants.ts    ← Site, contact, social, nav data
│   ├── data.ts         ← Homepage section content
│   ├── metadata.ts     ← SEO metadata per page
│   ├── page-data.ts    ← Inner page content
│   └── utils.ts        ← cn(), formatTel(), etc.
│
└── types/
    └── index.ts        ← All TypeScript interfaces
```

---

> [!NOTE]
> All images are served from the existing CDN at `https://www.8webcom.com/admin/upload/`. No local image downloads required for v1.0.

> [!TIP]
> Use `use client` directive **only** for: HeroSlider, MobileMenu, SideMenu, BrandLogos, ScrollToTop, ContactForm, and Testimonials. All other components should be Server Components.

> [!IMPORTANT]
> This PRD is the single source of truth for the rebuild. Any scope changes must be documented here with a version bump.
