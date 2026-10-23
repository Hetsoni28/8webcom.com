import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { ContactCtaSection } from "@/components/organisms/sections/ContactCtaSection";
import { ServiceProcess } from "@/components/organisms/sections/ServiceProcess";
import { SectionTitle } from "@/components/molecules/SectionTitle";
import { Reveal } from "@/components/atoms/Reveal";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem } from "@/lib/animations";
import { CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema, serviceSchema, SERVICE_SCHEMAS } from "@/lib/schemas";
import {
  buildMetadata,
  getHomeContent,
  getServiceDetail,
  getServiceSlugs,
  getServicesPageContent,
} from "@/sanity/content";

const WHY_ICONS = {
  shield: { Icon: Shield, color: "text-[#0799B3]", border: "hover:border-[#0799B3]/50" },
  zap: { Icon: Zap, color: "text-[#F58220]", border: "hover:border-[#F58220]/50" },
  trending: { Icon: TrendingUp, color: "text-[#0799B3]", border: "hover:border-[#0799B3]/50" },
} as const;

export async function generateStaticParams() {
  return (await getServiceSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) return { title: "Service Not Found | 8webcom.com" };

  const seo = {
    metaTitle: service.seo.metaTitle || `${service.title} | 8webcom.com`,
    metaDescription: service.seo.metaDescription || service.description,
    ogImage: service.seo.ogImage,
  };
  return buildMetadata(seo, `/services/${slug}`, {
    keywords: service.keywords.length ? service.keywords : [`${service.title} Ahmedabad`, "8webcom services"],
  });
}

// Content: Sanity → Services (this service) + Services Pages (shared sections)
// + Homepage → Contact band.
export default async function ServiceInnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, page, home] = await Promise.all([getServiceDetail(slug), getServicesPageContent(), getHomeContent()]);
  if (!service) notFound();

  const { detail, process, whyChoose } = page;
  const cta = home.contactCta;
  const headline = service.headline || `${service.title} Services`;
  const description = service.seo.metaDescription || service.description;

  return (
    <div className="bg-white">
      <JsonLd
        schema={[
          serviceSchema({
            name: headline,
            description,
            url: `/services/${slug}`,
            serviceType: SERVICE_SCHEMAS[slug]?.serviceType ?? service.title,
            keywords: service.keywords,
          }),
          webPageSchema({ name: `${headline} — 8webcom.com`, description, url: `/services/${slug}` }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.title, href: `/services/${slug}` },
          ]),
        ]}
      />

      <PageHero title={service.title} subTitle={detail.heroEyebrow} image={service.image} />

      {/* Overview */}
      <section className="py-24 lg:py-32">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal variants={fadeLeft} className="reveal-media">
              <div className="relative aspect-4/5 lg:aspect-auto lg:h-150 rounded-2xl overflow-hidden group bg-gray-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="eager"
                  className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#12161C]/90 via-[#12161C]/30 to-transparent" />

                {(detail.imageCardTitle || detail.imageCardText) && (
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 bg-white/10 backdrop-blur-md border border-white/15 p-6 sm:p-7 rounded-2xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-[#0799B3] flex items-center justify-center mb-5">
                      <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-tight mb-1.5">{detail.imageCardTitle}</h3>
                    <p className="text-white/80 font-medium">{detail.imageCardText}</p>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal variants={fadeRight}>
              <SectionTitle
                subTitle={detail.overviewEyebrow}
                heading={headline}
                description={service.intro}
                size="lg"
                noAnimate
                className="mb-10"
              />

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50 hover:bg-[#0799B3]/5 transition-colors duration-300 border border-transparent hover:border-[#0799B3]/20">
                    <CheckCircle2 className="w-6 h-6 text-[#F58220] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="text-[#1F2429] font-bold leading-snug">{feat.title}</h3>
                      {feat.description && <p className="text-gray-600 text-sm leading-relaxed mt-1">{feat.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>

              {service.technologies.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-500 mb-4">{detail.technologiesLabel}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <li key={tech} className="text-sm font-semibold text-[#1F2429] bg-white border border-gray-200 rounded-full px-3.5 py-1.5">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <ServiceProcess subTitle={process.subTitle} heading={process.heading} description={process.description} steps={process.steps} />

      {/* Why choose */}
      <section className="py-24 lg:py-32 bg-[#1F2429] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container-site relative z-10">
          <Reveal variants={fadeUp} className="mb-16 lg:mb-20">
            <SectionTitle
              heading={whyChoose.headingPrefix}
              highlight={service.title}
              headingSuffix={whyChoose.headingSuffix}
              description={whyChoose.description}
              align="center"
              size="beast"
              theme="dark"
              noAnimate
            />
          </Reveal>

          <Reveal variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyChoose.items.map((item, i) => {
              const { Icon, color, border } = WHY_ICONS[item.icon as keyof typeof WHY_ICONS] ?? WHY_ICONS.shield;
              return (
                <Reveal key={`${item.title}-${i}`} variants={staggerItem} margin="0px">
                  <div className={`group bg-white/3 border border-white/10 p-8 lg:p-10 rounded-2xl hover:bg-white/6 ${border} transition-all duration-500 h-full`}>
                    <Icon className={`w-12 h-12 ${color} mb-7 transition-transform duration-500 group-hover:scale-110`} aria-hidden="true" />
                    <h4 className="text-2xl font-bold tracking-tight mb-3">{item.title}</h4>
                    <p className="text-gray-400 text-[15px] leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </Reveal>
        </div>
      </section>

      <ContactCtaSection
        heading={cta.heading}
        subTitle={cta.subTitle}
        description={cta.description}
        ctaLabel={cta.ctaLabel}
        ctaHref={cta.ctaHref}
      />
    </div>
  );
}
