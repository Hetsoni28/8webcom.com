import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { SocialLink } from '@/components/molecules/SocialLink';
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  LinkedInIcon,
  YouTubeIcon,
  XIcon,
  PinterestIcon,
} from '@/components/atoms/SocialIcons';
import { MapPin, Phone, Mail, Globe, ArrowUpRight, ChevronRight } from 'lucide-react';
import {
  FOOTER_USEFUL_LINKS,
  FOOTER_SERVICE_LINKS,
  FOOTER_LEGAL_LINKS,
  CONTACT,
} from '@/lib/constants';

// Server Component: no client JS ships for the footer on any page.

const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '2000+', label: 'Happy Clients' },
  { value: '1500+', label: 'Project Completed' },
  { value: '10+', label: 'Countries Clients Served' },
];

const SOCIAL_ICONS = [
  { platform: 'Facebook',  icon: FacebookIcon,  href: 'https://www.facebook.com/8webcom' },
  { platform: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/8webcom/' },
  { platform: 'WhatsApp',  icon: WhatsAppIcon,  href: CONTACT.whatsapp },
  { platform: 'LinkedIn',  icon: LinkedInIcon,  href: 'https://www.linkedin.com/company/8webcom' },
  { platform: 'YouTube',   icon: YouTubeIcon,   href: 'https://www.youtube.com/@8webcom' },
  { platform: 'X',         icon: XIcon,         href: 'https://x.com/coo8webcom' },
  { platform: 'Pinterest', icon: PinterestIcon, href: 'https://in.pinterest.com/8webcom/' },
];

const LINK_COLUMNS = [
  { title: 'Useful Link', links: FOOTER_USEFUL_LINKS },
  { title: 'Our Service', links: FOOTER_SERVICE_LINKS },
];

function FooterNavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 text-base text-gray-400 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded"
    >
      <ChevronRight
        className="w-4 h-4 text-[#0799B3] shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5"
        aria-hidden="true"
      />
      <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">{label}</span>
    </Link>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const contactRows = [
    {
      Icon: MapPin,
      content: (
        <span>
          503, Sun Gravitas, Near Shyamal Cross Rd,<br />
          Satellite, Ahmedabad, Gujarat&nbsp;–&nbsp;380015
        </span>
      ),
    },
    { Icon: Phone, content: <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-white transition-colors">{CONTACT.phone}</a> },
    { Icon: Mail, content: <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">{CONTACT.email}</a> },
    {
      Icon: Globe,
      content: (
        <a href="https://www.8webcom.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          www.8webcom.com
        </a>
      ),
    },
  ];

  return (
    <footer className="relative bg-[#0B131D] text-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 900px' }}>
      {/* Brand gradient hairline */}
      <span aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#0799B3]/60 to-transparent" />

      {/* ── Top: brand + stats ── */}
      <div className="container-site pt-20 pb-14 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-sm space-y-6">
            <Logo width={180} className="h-14 sm:h-14 lg:h-16" />
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIAL_ICONS.map((s) => (
                <SocialLink
                  key={s.platform}
                  platform={s.platform}
                  icon={s.icon}
                  href={s.href}
                  iconSize={16}
                  className="w-10 h-10 hover:scale-100"
                />
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="text-gray-400 text-[13px] mt-1.5 leading-snug max-w-36">{label}</dt>
                <dd className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Middle: link columns + contact ── */}
      <div className="container-site py-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {LINK_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="col-span-1 lg:col-span-3">
              <h2 className="text-xl font-bold tracking-tight text-white mb-7">{col.title}</h2>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink label={link.label} href={link.href} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-5 lg:col-start-8">
            <h2 className="text-xl font-bold tracking-tight text-white mb-7">Get In Touch</h2>
            <ul className="space-y-4">
              {contactRows.map(({ Icon, content }, i) => (
                <li key={i} className="flex items-start gap-3.5 text-[15px] text-gray-400 leading-relaxed">
                  <Icon className="w-4 h-4 text-[#0799B3] shrink-0 mt-1" aria-hidden="true" />
                  {content}
                </li>
              ))}
            </ul>

            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 h-12 pl-5 pr-2 rounded-full bg-[#25D366] hover:bg-[#20b558] text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B131D]"
            >
              <WhatsAppIcon size={16} />
              Chat on WhatsApp
              <span className="w-8 h-8 rounded-full bg-white/20 inline-flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-site py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Copyright &copy; {currentYear}&nbsp;
            <span className="text-[#F58220] font-semibold">8</span>
            <span className="text-[#0799B3] font-semibold">webcom.com</span>
            &nbsp;— All Rights Reserved.
          </p>
          <ul className="flex items-center gap-6 flex-wrap justify-center text-[13px]">
            {FOOTER_LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-gray-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
