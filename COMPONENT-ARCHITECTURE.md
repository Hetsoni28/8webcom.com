# Component Architecture — Atomic Design
## 8webcom.com

**Version:** 1.0 | **Methodology:** Atomic Design (Brad Frost)

---

## Mental Model

```
Atoms       → Smallest indivisible UI units (Button, Badge, Icon, Text)
Molecules   → Groups of atoms forming a reusable unit (NavItem, ServiceCard, StatCard)
Organisms   → Complex sections made of molecules (Header, HeroSlider, Footer)
Templates   → Page-level layout shells (no real content)
Pages       → Templates filled with real Sanity data (app/page.tsx etc.)
```

---

## Folder Structure

```
src/components/
├── atoms/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Icon.tsx
│   ├── Heading.tsx
│   ├── Text.tsx
│   ├── Tag.tsx
│   ├── Divider.tsx
│   ├── Logo.tsx
│   ├── StarRating.tsx
│   └── SanityImage.tsx
│
├── molecules/
│   ├── NavItem.tsx           ← link + optional dropdown
│   ├── SectionTitle.tsx      ← Badge + Heading + optional sub-text
│   ├── ServiceCard.tsx       ← image + number + title + link
│   ├── TechCard.tsx          ← image + icon + title + description
│   ├── StatCard.tsx          ← animated number + suffix + label
│   ├── TestimonialCard.tsx   ← stars + quote + name + company
│   ├── ClientLogo.tsx        ← logo image in brand strip
│   ├── AboutFeature.tsx      ← icon + title + description row
│   ├── JobCard.tsx           ← title + type + location + skills
│   ├── PolicySection.tsx     ← section heading + body text
│   ├── ContactInfo.tsx       ← icon + label + value
│   ├── SocialLink.tsx        ← icon + platform name + href
│   ├── FooterLink.tsx        ← simple nav anchor
│   └── FormField.tsx         ← label + input/textarea/select + error
│
├── organisms/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── SideMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingSocial.tsx
│   │   └── ScrollToTop.tsx
│   │
│   └── sections/
│       ├── HeroSlider.tsx
│       ├── AboutSection.tsx
│       ├── ServicesGrid.tsx
│       ├── TechSlider.tsx
│       ├── StatsSection.tsx
│       ├── Testimonials.tsx
│       ├── BrandLogos.tsx
│       ├── ContactForm.tsx
│       ├── ContactCtaSection.tsx
│       ├── PageHero.tsx          ← reused on every inner page
│       ├── ServiceFeatureList.tsx
│       ├── ProjectsGrid.tsx
│       ├── CareersSection.tsx
│       └── PolicyContent.tsx
│
└── templates/
    ├── PageShell.tsx         ← Header + children + Footer
    ├── InnerPageLayout.tsx   ← PageHero + content + ContactCta
    └── ServicePageLayout.tsx ← PageHero + features + tech + CTA
```

---

## Atoms

### `Button.tsx`
```
Props:
  variant: "primary" | "secondary" | "outlined" | "ghost" | "icon"
  size: "sm" | "md" | "lg"
  href?: string          ← renders <a> if provided
  onClick?: () => void   ← renders <button> if provided
  icon?: ReactNode       ← optional right icon
  loading?: boolean
  disabled?: boolean
  className?: string
  children: ReactNode

Variants:
  primary  → bg-primary text-white
  secondary→ bg-secondary text-white
  outlined → border-primary text-primary
  ghost    → transparent, text-primary, underline on hover
  icon     → square, icon only
```

### `Badge.tsx`
```
Props:
  label: string
  variant: "primary" | "secondary" | "neutral"
  className?: string

Use: Sub-title labels above section headings ("About Us", "Our Services")
```

### `Icon.tsx`
```
Props:
  name: LucideIconName   ← from lucide-react
  size?: number          ← default 20
  color?: string
  className?: string

Use: Wraps lucide-react icons with consistent sizing
```

### `Heading.tsx`
```
Props:
  as: "h1" | "h2" | "h3" | "h4" | "h5"
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
  children: ReactNode

Use: Consistent heading typography across site
```

### `Text.tsx`
```
Props:
  as: "p" | "span" | "div"
  size: "sm" | "base" | "lg"
  color?: "default" | "muted" | "primary" | "secondary" | "white"
  className?: string
  children: ReactNode
```

### `Tag.tsx`
```
Props:
  label: string
  className?: string

Use: Technology/skill tags on service and job cards
```

### `Divider.tsx`
```
Props:
  color?: "primary" | "secondary" | "neutral"
  className?: string

Use: Horizontal rule with brand color
```

### `Logo.tsx`
```
Props:
  src: string
  alt: string
  width?: number
  href?: string    ← wraps in <a> if provided
  className?: string

Use: Site logo in header and footer (pulls from Sanity siteSettings)
```

### `StarRating.tsx`
```
Props:
  rating: number   ← 1-5
  className?: string

Use: Filled star icons in TestimonialCard
```

### `SanityImage.tsx`
```
Props:
  image: SanityImageSource
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean

Use: Wrapper for next/image + @sanity/image-url urlFor()
     All Sanity images must use this — never raw <img>
```

---

## Molecules

### `SectionTitle.tsx`
```
Props:
  subTitle?: string      ← Badge text
  heading: string        ← h2
  description?: string   ← optional paragraph below
  align?: "left" | "center" | "right"
  className?: string

Composes: Badge + Heading + Text
Use: Used at the top of every section
```

### `NavItem.tsx`
```
Props:
  label: string
  href: string
  children?: NavChild[]  ← renders dropdown
  active?: boolean
  className?: string

Composes: Text + optional dropdown list
Use: Header nav links
```

### `ServiceCard.tsx`
```
Props:
  number: string        ← "01", "02"
  title: string
  href: string
  image: string | SanityImageSource
  className?: string

Composes: SanityImage + Heading + Button
Use: Services 2×2 grid on homepage
Behaviour: Hover → image zoom + overlay reveal
```

### `TechCard.tsx`
```
Props:
  name: string
  image: string | SanityImageSource
  icon: string | SanityImageSource
  description: string
  className?: string

Composes: SanityImage (bg) + SanityImage (icon) + Heading + Text
Use: "What We Offer" slider cards
```

### `StatCard.tsx`
```
Props:
  value: number
  suffix: string    ← "+", "%", "x"
  label: string
  className?: string

Composes: Heading (animated count-up) + Text
Behaviour: Count-up animation when scrolled into view (framer-motion)
```

### `TestimonialCard.tsx`
```
Props:
  name: string
  company: string
  designation?: string
  rating: number
  review: string
  avatar?: string | SanityImageSource
  className?: string

Composes: StarRating + Text (quote) + Text (name) + Text (company)
```

### `ClientLogo.tsx`
```
Props:
  name: string
  src: string | SanityImageSource
  className?: string

Composes: SanityImage
Use: Single logo in infinite brand scroll strip
```

### `AboutFeature.tsx`
```
Props:
  icon: string | SanityImageSource
  title: string
  description: string
  className?: string

Composes: SanityImage (icon) + Heading + Text
Use: The 3 feature rows in the About section
```

### `JobCard.tsx`
```
Props:
  title: string
  type: string          ← "Full Time"
  location: string
  experience: string
  skills: string[]
  applyLink?: string
  className?: string

Composes: Heading + Badge + Tag[] + Button
Use: Each job opening on Careers page
```

### `PolicySection.tsx`
```
Props:
  title: string
  content: PortableTextBlock[]
  className?: string

Composes: Heading + PortableText renderer
Use: Each section block on Privacy/Disclaimer/Refund pages
```

### `ContactInfo.tsx`
```
Props:
  icon: string | LucideIconName
  label?: string
  value: string
  href?: string    ← wraps value in <a> if provided
  className?: string

Composes: Icon/SanityImage + Text
Use: Address, phone, email, website in footer & contact page
```

### `SocialLink.tsx`
```
Props:
  platform: string
  href: string
  variant?: "default" | "colored" | "floating"
  className?: string

Composes: Icon (brand icon) + accessible aria-label
Use: Footer social icons, SideMenu, FloatingSocial bar
```

### `FormField.tsx`
```
Props:
  label?: string
  type: "text" | "email" | "tel" | "textarea" | "select"
  placeholder?: string
  options?: string[]     ← for select type
  error?: string
  register: UseFormRegister<any>  ← react-hook-form
  name: string
  className?: string

Composes: <label> + <input|textarea|select> + error Text
Use: All fields in ContactForm
```

### `FooterLink.tsx`
```
Props:
  label: string
  href: string
  className?: string

Composes: Next.js <Link>
Use: Footer column links
```

---

## Organisms

### Layout

#### `Header.tsx`
```
Composes: Logo + NavItem[] + Button (CTA) + Icon (menu) + Icon (sidebar)
State (client): mobileMenuOpen, sideMenuOpen, scrolled
Behaviour: Sticky on scroll, shadow on scroll
Data: Sanity `navigation` singleton
```

#### `MobileMenu.tsx`
```
Composes: Logo + NavItem[] + SocialLink[]
State (client): open/close drawer, active accordion for Services
Behaviour: Full-height slide-in panel from left/right
Data: Sanity `navigation` singleton
```

#### `SideMenu.tsx`
```
Composes: Logo + Text (about copy) + SocialLink[] + ContactInfo[]
State (client): open/close
Behaviour: Right-side slide-in panel with overlay
Data: Sanity `siteSettings` + `navigation`
```

#### `Footer.tsx`
```
Composes:
  Col 1: Logo + Text + SocialLink[]
  Col 2: Heading + FooterLink[] (Useful Links)
  Col 3: Heading + FooterLink[] (Services)
  Col 4: Heading + ContactInfo[]
  Bottom: Text (copyright) + FooterLink[] (legal)
Data: Sanity `siteSettings` + `navigation`
```

#### `FloatingSocial.tsx`
```
Composes: SocialLink[] (variant="floating")
Fixed position: right-0, top-50%
Platforms: WhatsApp, Instagram, Facebook, LinkedIn, Twitter
Behaviour: hover → all turn orange (#fa961a)
Data: Sanity `navigation.socialLinks`
```

#### `ScrollToTop.tsx`
```
State (client): scrollPercent
Composes: SVG circle progress + Icon (arrow up)
Behaviour: Hidden until 300px scroll, click scrolls to top
```

---

### Sections

#### `HeroSlider.tsx` `[use client]`
```
Composes: SanityImage (bg) + Heading + Text + Button (CTA)
State: activeSlide, autoPlay interval
Props: slides: HeroSlide[]
Behaviour: Fade transition, 5s autoplay, prev/next arrows
```

#### `AboutSection.tsx`
```
Composes:
  Left: SanityImage × 3 (collage layout)
  Right: SectionTitle + Text + AboutFeature × 3 + Button
Props: data: AboutSectionData (from Sanity homePage)
```

#### `ServicesGrid.tsx`
```
Composes: SectionTitle + ServiceCard × 4 (2×2 grid) + Button
Props: services: Service[], heading, subTitle
Layout: 1-col mobile → 2-col lg+
```

#### `TechSlider.tsx` `[use client]`
```
Composes: SectionTitle + TechCard[] in responsive slider
Props: platforms: TechPlatform[], heading, subTitle
Slides: 1 mobile → 2 tablet → 3 desktop
```

#### `StatsSection.tsx`
```
Composes: StatCard × 4 in row
Props: stats: Stat[]
Behaviour: framer-motion count-up on scroll enter
```

#### `Testimonials.tsx` `[use client]`
```
Composes: SectionTitle + TestimonialCard[] in carousel
Props: testimonials: Testimonial[], heading, subTitle
Behaviour: Auto-play swiper, dots navigation
```

#### `BrandLogos.tsx` `[use client]`
```
Composes: ClientLogo[] × 2 sets (for seamless loop)
Props: logos: ClientLogo[]
Behaviour: CSS infinite scroll animation (no JS interval)
```

#### `ContactForm.tsx` `[use client]`
```
Composes: FormField × 5 + reCAPTCHA + Button (submit)
Props: services: string[], formAction: string
Validation: zod schema + react-hook-form
Submit: POST /api/contact
```

#### `ContactCtaSection.tsx`
```
Composes: SectionTitle + Button + SanityImage (bg)
Props: data: ContactCtaSectionData
Use: "Need Expert Help?" band above footer on homepage
```

#### `PageHero.tsx`
```
Composes: Heading + Badge + optional SanityImage (bg)
Props: title, subTitle, heroImage?, breadcrumb?
Use: Reused on EVERY inner page (About, Services, Projects, etc.)
```

#### `ServiceFeatureList.tsx`
```
Composes: AboutFeature[] (icon + title + desc)
Props: features: ServiceFeature[]
Use: Service detail pages
```

#### `ProjectsGrid.tsx`
```
Composes: SectionTitle + ProjectCard[] grid
ProjectCard: SanityImage + title + category + Tag[]
Props: projects: Project[]
```

#### `CareersSection.tsx`
```
Composes: SectionTitle + perks grid + JobCard[]
Props: data: CareersPageData, jobs: JobOpening[]
```

#### `PolicyContent.tsx`
```
Composes: Heading + Text (intro) + PolicySection[]
Props: data: PolicyPageData
Use: All 3 policy pages
```

---

## Templates

### `PageShell.tsx`
```
Composes: Header + <main>{children}</main> + Footer + FloatingSocial + ScrollToTop
Props: children: ReactNode
Use: Root layout wrapper — used in src/app/layout.tsx
```

### `InnerPageLayout.tsx`
```
Composes: PageHero + <main>{children}</main> + ContactCtaSection
Props: hero: PageHeroProps, children: ReactNode, showCta?: boolean
Use: About, Projects, Careers, Contacts, Policy pages
```

### `ServicePageLayout.tsx`
```
Composes: PageHero + Text (intro) + ServiceFeatureList + Tech tags + Button (CTA)
Props: data: ServiceDetailData
Use: All 4 service detail pages
```

---

## Reusability Rules

> [!IMPORTANT]
> **These rules must be followed for every component:**

1. **Never hardcode content** — all text/images come from props (sourced from Sanity)
2. **Always accept `className?`** — enables layout overrides without modifying the atom
3. **Use `cn()` for all class merging** — from `src/lib/utils.ts`
4. **Atoms have zero dependencies** on other components
5. **Molecules import only Atoms** — never other molecules or organisms
6. **Organisms import Molecules and Atoms** — never other organisms
7. **`use client`** only on: interactive components that need browser events or state
8. **Server Components by default** — data fetching happens in page.tsx or organism

---

## `use client` Map

| Component | Client? | Reason |
|---|---|---|
| `HeroSlider.tsx` | ✅ | autoplay, slide state |
| `MobileMenu.tsx` | ✅ | open/close state |
| `SideMenu.tsx` | ✅ | open/close state |
| `ScrollToTop.tsx` | ✅ | scroll event listener |
| `FloatingSocial.tsx` | ✅ | scroll visibility |
| `TechSlider.tsx` | ✅ | swiper/carousel |
| `Testimonials.tsx` | ✅ | swiper/carousel |
| `BrandLogos.tsx` | ✅ | animation loop |
| `ContactForm.tsx` | ✅ | react-hook-form, submit |
| `StatCard.tsx` | ✅ | framer-motion count-up |
| Everything else | ❌ | Server Component |

