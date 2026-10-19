// ─── Site Info ───────────────────────────────────────────────
export const SITE = {
  name: "8webcom.com",
  tagline: "Web Development Company in Ahmedabad",
  description:
    "Leading web development company in Ahmedabad offering SEO, digital marketing, CRM & web portal solutions. 15+ years experience, 2000+ clients.",
  url: "https://www.8webcom.com",
  logo: "https://www.8webcom.com/admin/upload/general/eNLCZOpr.png",
  favicon: "https://www.8webcom.com/assets/img/favicons/favicon.png",
  established: 2011,
  geo: {
    region: "IN-GJ",
    city: "Ahmedabad",
    lat: 23.011063,
    lng: 72.531111,
  },
};

// ─── Contact Info ─────────────────────────────────────────────
export const CONTACT = {
  address: "503, Sun Gravitas, Near Shyamal Cross Rd, Satellite, Ahmedabad, Gujarat - 380015, India",
  addressShort: "503, Sun Gravitas, Satellite, Ahmedabad, Gujarat 380015",
  phone: "+91 97277 00459",
  phoneTel: "+919727700459",
  email: "info@8webcom.com",
  website: "www.8webcom.com",
  whatsapp: "https://wa.me/919727700459?text=Hello, I visited your website www.8webcom.com and I would like to start a conversation with 8webcom.",
  recaptchaSiteKey: "6LdfW5QsAAAAALL_Qiwu3zpbYLHVMl7w17Ahqgjd",
};

// ─── Social Links ─────────────────────────────────────────────
export const SOCIAL = [
  { name: "Facebook",  href: "https://www.facebook.com/8webcom",          icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/8webcom/",         icon: "instagram" },
  { name: "WhatsApp",  href: "https://wa.me/919727700459?text=Hello, I visited your website www.8webcom.com and I would like to start a conversation with 8webcom.", icon: "whatsapp" },
  { name: "LinkedIn",  href: "https://www.linkedin.com/company/8webcom",   icon: "linkedin" },
  { name: "YouTube",   href: "https://www.youtube.com/@8webcom",           icon: "youtube" },
  { name: "Twitter",   href: "https://x.com/coo8webcom",                  icon: "twitter" },
  { name: "Pinterest", href: "https://in.pinterest.com/8webcom/",          icon: "pinterest" },
];

// ─── Navigation ───────────────────────────────────────────────
import { NavLink } from "@/types";
export const NAV_LINKS: NavLink[] = [
  { label: "Home",         href: "/" },
  { label: "About Us",     href: "/about-us" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Development",   href: "/services/web-development" },
      { label: "Web Portal",        href: "/services/web-portal" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "CRM Solutions",     href: "/services/crm-solutions" },
    ],
  },
  { label: "Our Projects", href: "/projects" },
  { label: "Careers",      href: "/careers" },
  { label: "Contact Us",   href: "/contacts" },
];

// ─── Footer Links (matches live site) ─────────────────────────
export const FOOTER_USEFUL_LINKS = [
  { label: "About us",     href: "/about-us" },
  { label: "Services",     href: "/services" },
  { label: "Our Projects", href: "/projects" },
  { label: "Careers",      href: "/careers" },
  { label: "Contact Us",   href: "/contacts" },
];

export const FOOTER_SERVICE_LINKS = [
  { label: "Web Development",   href: "/services/web-development" },
  { label: "Web Portal",        href: "/services/web-portal" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "CRM Solutions",     href: "/services/crm-solutions" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Disclaimer Policy",              href: "/disclaimer-policy" },
  { label: "Refund And Cancellation Policy", href: "/refund-and-cancellation-policy" },
  { label: "Privacy Policy",                href: "/privacy-policy" },
];

// ─── Contact Form Services ────────────────────────────────────
export const CONTACT_FORM_SERVICES = [
  "Website Design and Development",
  "E-commerce Development",
  "Digital Marketing",
  "Others",
];

