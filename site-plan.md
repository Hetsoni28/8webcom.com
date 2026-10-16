# 8webcom.com — Full Site Rebuild Plan

> [!IMPORTANT]
> Source: https://8webcom.com/ — fully analyzed and mapped below.

---

## Site Structure (Pages)

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage |
| `/about-us` | `src/app/about-us/page.tsx` | About Us |
| `/services` | `src/app/services/page.tsx` | Services overview |
| `/services/web-development` | `src/app/services/web-development/page.tsx` | Web Dev |
| `/services/web-portal` | `src/app/services/web-portal/page.tsx` | Web Portal |
| `/services/digital-marketing` | `src/app/services/digital-marketing/page.tsx` | Digital Marketing |
| `/services/crm-solutions` | `src/app/services/crm-solutions/page.tsx` | CRM Solutions |
| `/projects` | `src/app/projects/page.tsx` | Our Projects |
| `/careers` | `src/app/careers/page.tsx` | Careers |
| `/contacts` | `src/app/contacts/page.tsx` | Contact Us |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | Privacy Policy |
| `/disclaimer-policy` | `src/app/disclaimer-policy/page.tsx` | Disclaimer |
| `/refund-and-cancellation-policy` | `src/app/refund-and-cancellation-policy/page.tsx` | Refund Policy |

---

## Homepage Sections (in order)

```
1. Header / Navbar
2. Hero Slider (3 slides: Web Designing, Digital Marketing, CRM Solutions)
3. About Section
4. Our Services (4 cards: Web Dev, Web Portal, Digital Marketing, CRM)
5. What We Offer (tech slider: WordPress, Magento, Shopify, etc.)
6. Stats / Counter Section
7. Testimonials
8. Client Logos (brand slider)
9. Contact Form Section ("Need Expert Help?")
10. Footer
11. Floating Social Sidebar (WhatsApp, Instagram, Facebook, LinkedIn, Twitter)
12. Scroll To Top Button
```

---

## Components to Build

### Layout Components
- `src/components/layout/Header.tsx` — Sticky navbar with logo, nav links, "Get In Touch" CTA, sidebar toggler
- `src/components/layout/MobileMenu.tsx` — Mobile drawer menu
- `src/components/layout/SideMenu.tsx` — Right sidebar (info panel)
- `src/components/layout/Footer.tsx` — 4-column footer
- `src/components/layout/ScrollToTop.tsx` — Scroll to top button
- `src/components/layout/FloatingSocial.tsx` — Fixed right-side social icons

### Homepage Sections
- `src/components/sections/HeroSlider.tsx` — Auto-play hero with 3 slides
- `src/components/sections/AboutSection.tsx` — 3-image layout + text + 3 feature items
- `src/components/sections/ServicesGrid.tsx` — 4 service cards (2×2 grid)
- `src/components/sections/TechSlider.tsx` — Scrolling tech/platform cards
- `src/components/sections/StatsSection.tsx` — Counter: 10+ years, 2000+ clients, etc.
- `src/components/sections/Testimonials.tsx` — Client testimonial slider
- `src/components/sections/BrandLogos.tsx` — Infinite scroll client logo strip
- `src/components/sections/ContactForm.tsx` — Name, Phone, Email, Service select, Message

### Shared / UI
- `src/components/ui/Button.tsx` — Primary, Secondary, Outlined variants
- `src/components/ui/SectionTitle.tsx` — Sub-title + h2 pattern
- `src/components/ui/ServiceCard.tsx` — Hover image card with number
- `src/components/ui/TestimonialCard.tsx`

---

## Navigation Links (from live site)

```
Home          → /
About Us      → /about-us
Services      → /services
  Web Development   → /services/web-development
  Web Portal        → /services/web-portal
  Digital Marketing → /services/digital-marketing
  CRM Solutions     → /services/crm-solutions
Our Projects  → /projects
Careers       → /careers
Contact Us    → /contacts
```

---

## Contact Info (from live site)

| Field | Value |
|---|---|
| Address | 503, Sun Gravitas, Near Shyamal Cross Rd, Satellite, Ahmedabad, Gujarat - 380015, India |
| Phone | +91 97277 00459 |
| Email | info@8webcom.com |
| Website | www.8webcom.com |
| WhatsApp | https://wa.me/919727700459 |

---

## Social Links

| Platform | URL |
|---|---|
| Facebook | https://www.facebook.com/8webcom |
| Instagram | https://www.instagram.com/8webcom/ |
| WhatsApp | https://wa.me/919727700459 |
| LinkedIn | https://www.linkedin.com/company/8webcom |
| YouTube | https://www.youtube.com/@8webcom |
| Twitter/X | https://x.com/coo8webcom |
| Pinterest | https://in.pinterest.com/8webcom/ |

---

## Hero Slider Content

| Slide | Title | Description | CTA Link |
|---|---|---|---|
| 1 | Web Designing | Innovative design is not just a job for us, it is a passion. | /services/web-development |
| 2 | Digital Marketing | No longer is the success of our businesses completely reliant on word-of-mouth... | /services/digital-marketing |
| 3 | CRM Solutions | No longer is the success of our businesses completely reliant on word-of-mouth... | /services/crm-solutions |

---

## Services Section

| # | Service | Image URL |
|---|---|---|
| 01 | Web Development | https://www.8webcom.com/admin/upload/brochure/web-development.webp |
| 02 | Web Portal | https://www.8webcom.com/admin/upload/brochure/web-portal1.webp |
| 03 | Digital Marketing | https://www.8webcom.com/admin/upload/brochure/digital_marketing3.webp |
| 04 | CRM Solutions | https://www.8webcom.com/admin/upload/brochure/crm-solutions.webp |

---

## About Section Content

**Heading:** 8WEBCOM.COM

**Body:** Welcome to 8webcom.com. 8webcom started its journey in 2011 delivering business websites and related services. Since then we grew delivering end to end business solutions across the globe expanding in the areas of Web Portals, Enterprise Software, Digital Marketing, CRM, E-Commerce and consulting. With more than 2000 businesses locally and internationally trust us since more than a decade.

**Features:**
1. **Technology Consulting & Strategy** — Helping organizations plan and implement the right tech solutions.
2. **Digital Transformation Consulting** — Strategies that modernize business processes using advanced technologies.
3. **AI-Powered Automation** — Transform your business with intelligent tools that streamline workflows, reduce manual effort, and enable smarter, faster decision-making.

---

## Tech/Platform Slider (What We Offer)

WordPress, Magento, Shopify, + more (with icons)

---

## Contact Form Fields

1. Name (text, required)
2. Mobile (10-digit, numeric only, required)
3. Email (email, required)
4. Services (select: Website Design & Development, E-commerce Development, Digital Marketing, Others)
5. Message (textarea, required)
6. reCAPTCHA
7. Submit button

---

## Footer Structure

**Col 1:** Logo + about text + social icons  
**Col 2:** Useful Links (About us, Services, Our Projects, Careers, Contact Us)  
**Col 3:** Our Services (Web Dev, Web Portal, Digital Marketing, CRM Solutions)  
**Col 4:** Get In Touch (Address, Phone, Email, Website)

**Copyright:** Copyright © 2026 8webcom.com by All Rights Reserved

**Footer Links:** Disclaimer Policy | Refund And Cancellation Policy | Privacy Policy

---

## Build Order (Recommended)

```
Phase 1 — Foundation
  ✅ globals.css (colors, fonts, breakpoints) — DONE
  [ ] src/lib/constants.ts  — nav links, contact info, social links
  [ ] src/components/ui/Button.tsx
  [ ] src/components/ui/SectionTitle.tsx

Phase 2 — Layout
  [ ] Header + MobileMenu + SideMenu
  [ ] Footer
  [ ] FloatingSocial + ScrollToTop

Phase 3 — Homepage Sections
  [ ] HeroSlider
  [ ] AboutSection
  [ ] ServicesGrid
  [ ] TechSlider
  [ ] ContactForm
  [ ] BrandLogos

Phase 4 — Inner Pages
  [ ] /about-us
  [ ] /services (+ sub-pages)
  [ ] /projects
  [ ] /careers
  [ ] /contacts

Phase 5 — Polish
  [ ] Animations (framer-motion)
  [ ] SEO (metadata per page)
  [ ] Mobile responsiveness QA
```
