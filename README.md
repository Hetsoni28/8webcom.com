# 8webcom.com

> Enterprise-grade, modern digital agency and web development platform built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and Sanity CMS.

---

## 🚀 Features

- **Next.js 16 (App Router & Turbopack):** Lightning-fast SSG and dynamic server components with optimized rendering.
- **Sanity CMS Integration:** Headless content management for dynamic hero slides, services, projects, and testimonials.
- **Accessibility (WCAG 2.1 AA):** Full keyboard navigation, screen reader ARIA landmarks, focus rings, accessible modal dialogs, and touch targets.
- **Performance Optimized:** Next/Image responsive loading, dynamic code splitting, and zero-layout-shift animations.
- **Full SEO Suite:** Automated OpenGraph/Twitter cards, canonical URLs, sitemap.xml, robots.txt, and JSON-LD structured data.
- **Responsive & Interactive UI:** Custom animations powered by Framer Motion, interactive sliders, and accessible forms.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **CMS:** Sanity v3

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file with your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
8webcom.com/
├── public/                 # Static assets (images, logos, icons)
├── src/
│   ├── app/                # Next.js App Router (pages, layout, metadata)
│   ├── components/         # Atomic Design Architecture
│   │   ├── atoms/          # Buttons, Badges, Headings, Text
│   │   ├── molecules/      # NavItems, ServiceCards, SectionTitles
│   │   ├── organisms/      # Header, Footer, Sliders, Forms, Modals
│   │   └── templates/      # PageShell layout wrapper
│   ├── lib/                # Sanity client, constants, animation variants, utils
│   └── types/              # TypeScript interfaces and data definitions
└── sanity/                 # Sanity Studio schemas and configuration
```

---

## 📄 License & Rights

Copyright &copy; 2026 8webcom.com. All rights reserved.
