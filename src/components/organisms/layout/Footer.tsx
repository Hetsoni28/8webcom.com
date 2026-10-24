import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { SocialLink } from '@/components/molecules/SocialLink';
import { WhatsAppIcon } from '@/components/atoms/SocialIcons';
import { MapPin, Phone, Mail, Globe, ArrowUpRight, ChevronRight } from 'lucide-react';
import type { ResolvedSiteSettings } from '@/sanity/content';

// Server Component: no client JS ships for the footer on any page.
// All content comes from Sanity → Site Settings.

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

export function Footer({ settings }: { settings: ResolvedSiteSettings }) {
  const currentYear = new Date().getFullYear();
  const { contact, footer, socialLinks, stats } = settings;
  const websiteHref = contact.website.startsWith('http') ? contact.website : `https://${contact.website}`;

  const linkColumns = [
    { title: footer.usefulTitle, links: footer.usefulLinks },
    { title: footer.servicesTitle, links: footer.serviceLinks },
  ].filter((col) => col.links.length > 0);

  const contactRows = [
    { Icon: MapPin, content: <span className="whitespace-pre-line">{contact.address}</span> },
    { Icon: Phone, content: <a href={`tel:${contact.phoneTel}`} className="hover:text-white transition-colors">{contact.phone}</a> },
    { Icon: Mail, content: <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a> },
    {
      Icon: Globe,
      content: (
        <a href={websiteHref} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          {contact.website}
        </a>
      ),
    },
  ];

  return (
    <footer className="relative bg-[#0B131D] text-white">
      {/* Brand gradient hairline */}
      <span aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#0799B3]/60 to-transparent" />

      {/* ── Top: brand + stats ── */}
      <div className="container-site pt-20 pb-14 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-sm space-y-6">
            <Logo width={180} className="h-14 sm:h-14 lg:h-16" />
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((s) => (
                <SocialLink
                  key={s.platform}
                  platform={s.platform}
                  href={s.url}
                  iconSize={16}
                  className="w-10 h-10 hover:scale-100"
                />
              ))}
            </div>
          </div>

          {stats.length > 0 && (
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-8">
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="text-gray-400 text-[13px] mt-1.5 leading-snug max-w-36">{label}</dt>
                  <dd className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">
                    {value}
                    {suffix}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {/* ── Middle: link columns + contact ── */}
      <div className="container-site py-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {linkColumns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="col-span-1 lg:col-span-3">
              <h2 className="text-xl font-bold tracking-tight text-white mb-7">{col.title}</h2>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <FooterNavLink label={link.label} href={link.href} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-5 lg:col-start-8">
            <h2 className="text-xl font-bold tracking-tight text-white mb-7">{footer.contactTitle}</h2>
            <ul className="space-y-4">
              {contactRows.map(({ Icon, content }, i) => (
                <li key={i} className="flex items-start gap-3.5 text-[15px] text-gray-400 leading-relaxed">
                  <Icon className="w-4 h-4 text-[#0799B3] shrink-0 mt-1" aria-hidden="true" />
                  {content}
                </li>
              ))}
            </ul>

            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 h-12 pl-5 pr-2 rounded-full bg-[#25D366] hover:bg-[#20b558] text-[#0B131D] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B131D]"
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
          <p className="text-gray-400 text-sm">
            Copyright &copy; {currentYear}&nbsp;
            <span className="text-[#F58220] font-semibold">8</span>
            <span className="text-[#0799B3] font-semibold">webcom.com</span>
            &nbsp;— All Rights Reserved.
          </p>
          <ul className="flex items-center gap-6 flex-wrap justify-center text-[13px]">
            {footer.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded">
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
