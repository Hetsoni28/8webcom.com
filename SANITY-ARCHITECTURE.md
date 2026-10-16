# Sanity CMS Architecture
## 8webcom.com — Content Management Design

**Version:** 1.0 | **Date:** October 2026 | **Status:** 🟢 Active

---

## Philosophy

- Editors update **all content and images** via Sanity Studio — no source code changes needed
- Schemas are **typed and structured** (not a free-form page builder)
- Every page section is a **reusable, named document or object type**
- SEO fields live on **every page document**
- No content is hardcoded in `.tsx` files — all pulled via `next-sanity`

---

## 1. Global Settings (Singleton)

**Schema:** `siteSettings`  
**One document** shared across the entire site.

| Field | Type | Description |
|---|---|---|
| `siteName` | string | "8webcom.com" |
| `tagline` | string | Short brand tagline |
| `logo` | image | Header + footer logo |
| `favicon` | image | Browser favicon |
| `phone` | string | +91 97277 00459 |
| `email` | string | info@8webcom.com |
| `address` | text | Full address |
| `whatsappLink` | url | WhatsApp chat link |
| `googleAnalyticsId` | string | UA / G- tag |
| `recaptchaSiteKey` | string | reCAPTCHA key |

---

## 2. Navigation (Singleton)

**Schema:** `navigation`

| Field | Type | Description |
|---|---|---|
| `navLinks[]` | array of `navItem` | Top nav links |
| `ctaLabel` | string | "Get In Touch" |
| `ctaLink` | string | "/contacts" |
| `footerUsefulLinks[]` | array of `link` | Footer col 2 |
| `footerServiceLinks[]` | array of `link` | Footer col 3 |
| `footerLegalLinks[]` | array of `link` | Disclaimer, Privacy, Refund |
| `socialLinks[]` | array of `socialItem` | Facebook, Instagram, etc. |

**Object: `navItem`**
```
label: string
href: string
children[]: { label, href }   ← for Services dropdown
```

**Object: `socialItem`**
```
platform: select (facebook|instagram|whatsapp|linkedin|youtube|twitter|pinterest)
url: url
```

---

## 3. Homepage (Singleton)

**Schema:** `homePage`  
Each section is a **named object** inside the page document.

### 3.1 Hero Section — `heroSection`
| Field | Type |
|---|---|
| `slides[]` | array of `heroSlide` |

**Object: `heroSlide`**
```
title: string
description: text
backgroundImage: image (webp)
ctaLabel: string
ctaLink: string
```

### 3.2 About Section — `aboutSection`
| Field | Type |
|---|---|
| `subTitle` | string |
| `heading` | string |
| `description` | portableText |
| `images[]` | array of image (max 3) |
| `features[]` | array of `aboutFeature` |
| `ctaLabel` | string |
| `ctaLink` | string |

**Object: `aboutFeature`**
```
icon: image (SVG)
title: string
description: text
```

### 3.3 Services Grid — `servicesGridSection`
| Field | Type |
|---|---|
| `subTitle` | string |
| `heading` | string |
| `services[]` | reference → `service` documents |
| `ctaLabel` | string |
| `ctaLink` | string |

### 3.4 Tech/Platform Slider — `techSliderSection`
| Field | Type |
|---|---|
| `subTitle` | string |
| `heading` | string |
| `platforms[]` | array of `techPlatform` |

**Object: `techPlatform`**
```
name: string
image: image
icon: image (SVG)
description: text
```

### 3.5 Stats Section — `statsSection`
| Field | Type |
|---|---|
| `stats[]` | array of `stat` |

**Object: `stat`**
```
value: number
suffix: string ("+", "%", "x")
label: string
```

### 3.6 Testimonials — `testimonialsSection`
| Field | Type |
|---|---|
| `subTitle` | string |
| `heading` | string |
| `testimonials[]` | reference → `testimonial` documents |

### 3.7 Client Logos — `brandLogosSection`
| Field | Type |
|---|---|
| `logos[]` | array of `clientLogo` |

**Object: `clientLogo`**
```
name: string
logo: image
```

### 3.8 Contact CTA Section — `contactCtaSection`
| Field | Type |
|---|---|
| `subTitle` | string |
| `heading` | string |
| `ctaLabel` | string |
| `ctaLink` | string |
| `backgroundImage` | image |

### 3.9 Page SEO — `seo` (on every page)
```
seoTitle: string
seoDescription: text (max 160 chars)
seoKeywords: string
ogImage: image
canonicalUrl: url
```

---

## 4. About Us Page (Singleton)

**Schema:** `aboutPage`

| Field | Type |
|---|---|
| `subTitle` | string |
| `heading` | string |
| `heroImage` | image |
| `story` | portableText |
| `mission` | text |
| `vision` | text |
| `values[]` | array of `{ title, description }` |
| `whyUs[]` | array of `{ stat, label }` |
| `teamSection` | boolean (show/hide) |
| `seo` | seo object |

---

## 5. Services (Collection + Detail Pages)

### 5.1 Services Listing Page (Singleton)
**Schema:** `servicesPage`

| Field | Type |
|---|---|
| `heading` | string |
| `subTitle` | string |
| `heroImage` | image |
| `seo` | seo object |

### 5.2 Individual Service (Collection)
**Schema:** `service` — **4 documents** (one per service)

| Field | Type |
|---|---|
| `title` | string |
| `slug` | slug → `/services/[slug]` |
| `subTitle` | string |
| `heroImage` | image |
| `intro` | portableText |
| `features[]` | array of `serviceFeature` |
| `technologies[]` | array of string |
| `ctaLabel` | string |
| `ctaLink` | string |
| `order` | number (sort order) |
| `seo` | seo object |

**Object: `serviceFeature`**
```
title: string
description: text
icon: image (optional)
```

**Current 4 Service Slugs:**
- `web-development`
- `web-portal`
- `digital-marketing`
- `crm-solutions`

---

## 6. Projects / Portfolio (Collection)

**Schema:** `project`

| Field | Type |
|---|---|
| `title` | string |
| `slug` | slug |
| `client` | string |
| `category` | select (web-dev, web-portal, digital-marketing, crm) |
| `description` | portableText |
| `thumbnail` | image |
| `gallery[]` | array of image |
| `technologies[]` | array of string |
| `liveUrl` | url (optional) |
| `completedAt` | date |
| `featured` | boolean |
| `seo` | seo object |

**Projects Listing Page (Singleton):** `projectsPage`
```
heading: string
subTitle: string
heroImage: image
seo: seo object
```

---

## 7. Testimonials (Collection)

**Schema:** `testimonial`

| Field | Type |
|---|---|
| `name` | string |
| `company` | string |
| `designation` | string (optional) |
| `rating` | number (1–5) |
| `review` | text |
| `avatar` | image (optional) |
| `approved` | boolean ← **must be true to show on site** |
| `publishedAt` | date |

> [!IMPORTANT]
> Only testimonials with `approved: true` are queried and displayed. Editors control visibility.

---

## 8. Careers (Singleton + Collection)

### 8.1 Careers Page (Singleton)
**Schema:** `careersPage`

| Field | Type |
|---|---|
| `subTitle` | string |
| `heading` | string |
| `description` | portableText |
| `perks[]` | array of `{ title, icon }` |
| `heroImage` | image |
| `seo` | seo object |

### 8.2 Job Opening (Collection)
**Schema:** `jobOpening`

| Field | Type |
|---|---|
| `title` | string |
| `type` | select (Full Time, Part Time, Internship, Remote) |
| `location` | string |
| `experience` | string |
| `skills[]` | array of string |
| `description` | portableText |
| `applyLink` | url (optional) |
| `active` | boolean ← hides closed positions |
| `postedAt` | date |

---

## 9. Contact Page (Singleton)

**Schema:** `contactPage`

| Field | Type |
|---|---|
| `subTitle` | string |
| `heading` | string |
| `description` | text |
| `mapEmbedUrl` | url (Google Maps embed) |
| `formServices[]` | array of string ← dropdown options |
| `heroImage` | image |
| `seo` | seo object |

---

## 10. Policy Pages (Singletons)

Each policy page uses the same schema shape: `policyPage`

**Used for:**
- Privacy Policy → slug: `privacy-policy`
- Disclaimer Policy → slug: `disclaimer-policy`
- Refund & Cancellation Policy → slug: `refund-and-cancellation-policy`

| Field | Type |
|---|---|
| `title` | string |
| `slug` | slug |
| `lastUpdated` | date |
| `intro` | text |
| `sections[]` | array of `policySection` |
| `seo` | seo object |

**Object: `policySection`**
```
title: string
content: portableText
```

---

## 11. Sanity Schema File Map

```
sanity/
└── schemaTypes/
    ├── index.ts                  ← registers all schemas
    │
    ├── singletons/
    │   ├── siteSettings.ts
    │   ├── navigation.ts
    │   ├── homePage.ts
    │   ├── aboutPage.ts
    │   ├── servicesPage.ts
    │   ├── projectsPage.ts
    │   ├── careersPage.ts
    │   └── contactPage.ts
    │
    ├── collections/
    │   ├── service.ts
    │   ├── project.ts
    │   ├── testimonial.ts
    │   ├── jobOpening.ts
    │   └── policyPage.ts
    │
    └── objects/
        ├── seo.ts
        ├── heroSlide.ts
        ├── aboutFeature.ts
        ├── techPlatform.ts
        ├── stat.ts
        ├── clientLogo.ts
        ├── serviceFeature.ts
        ├── navItem.ts
        ├── socialItem.ts
        ├── link.ts
        └── policySection.ts
```

---

## 12. Next.js ↔ Sanity Data Flow

```
Sanity Studio (editors)
        │
        ▼
  Sanity Dataset (cloud)
        │
        ▼
  next-sanity GROQ queries
        │
        ▼
  Next.js Server Components (RSC)
        │
        ▼
  Page renders with live content
```

**Query pattern per page:**
```ts
// src/lib/sanity/queries.ts
export const HOME_QUERY = groq`*[_type == "homePage"][0]{
  heroSection { slides[] { title, description, backgroundImage, ctaLabel, ctaLink } },
  aboutSection { ... },
  servicesGridSection { services[]-> { title, slug, heroImage, intro } },
  ...
}`
```

---

## 13. What Editors Can Change (No Code Needed)

| Content | Editable in Sanity |
|---|---|
| Logo, favicon | ✅ |
| Nav links + dropdown items | ✅ |
| Hero slide images, titles, CTAs | ✅ |
| About text, images, features | ✅ |
| Service titles, descriptions, images | ✅ |
| Project portfolio (add/remove/edit) | ✅ |
| Testimonials (approve/reject/add) | ✅ |
| Client logos in brand strip | ✅ |
| Stats (10+, 2000+, etc.) | ✅ |
| Job openings (add/close) | ✅ |
| Contact form service dropdown options | ✅ |
| All policy pages (full text) | ✅ |
| SEO title + description per page | ✅ |
| OG images per page | ✅ |
| Footer columns and legal links | ✅ |
| Social media links | ✅ |
| Phone, email, address | ✅ |

---

## 14. Sanity Studio Setup

```
sanity/
├── sanity.config.ts    ← Studio config (project ID, dataset)
├── sanity.cli.ts       ← CLI config
└── schemaTypes/        ← All schemas (see §11)

src/lib/sanity/
├── client.ts           ← createClient() for GROQ queries
├── image.ts            ← urlFor() image helper
└── queries.ts          ← All GROQ query strings
```

**env variables needed:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

---

> [!NOTE]
> Singletons (homePage, aboutPage, etc.) are locked to one document each in the Studio using `__experimental_actions`. Editors cannot create duplicates.

> [!TIP]
> Use `revalidateTag('sanity')` with Next.js ISR so content updates in Sanity Studio reflect on the site within seconds — no redeploy needed.

> [!CAUTION]
> Never expose `SANITY_API_WRITE_TOKEN` on the client side. Read tokens only in `NEXT_PUBLIC_*`.

