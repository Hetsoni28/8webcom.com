import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { ContactCtaSection } from "@/components/organisms/sections/ContactCtaSection";
import { ServiceProcess } from "@/components/organisms/sections/ServiceProcess";
import { SectionTitle } from "@/components/molecules/SectionTitle";
import { Reveal } from "@/components/atoms/Reveal";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem } from "@/lib/animations";
import { SERVICES } from "@/lib/data";
import { CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema, serviceSchema, SERVICE_SCHEMAS } from "@/lib/schemas";
import { sanityFetch } from "@/sanity/fetch";
import { serviceBySlugQuery } from "@/sanity/queries";

export async function generateStaticParams() {
  const sanityServices = await sanityFetch<Array<{ slug: string }>>({
    query: `*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`,
    fallback: [],
  });

  const slugs = new Set<string>();
  SERVICES.forEach((s) => slugs.add(s.href.replace("/services/", "")));
  sanityServices.forEach((s) => {
    if (s.slug) slugs.add(s.slug);
  });

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const fallback = SERVICES.find((s) => s.href === `/services/${slug}`);
  const sanityData = await sanityFetch<any>({
    query: serviceBySlugQuery,
    params: { slug },
    fallback: null,
    tags: ['service', `service-${slug}`],
  });

  const schemaDef = SERVICE_SCHEMAS[slug];
  const title = sanityData?.seoTitle || schemaDef?.name || sanityData?.title || fallback?.title;
  const description = sanityData?.seoDescription || schemaDef?.description || sanityData?.description || fallback?.description;

  if (!title) return { title: 'Service Not Found | 8webcom.com' };

  const canonicalUrl = `https://www.8webcom.com/services/${slug}`;
  const OG_IMAGE = 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png';

  return {
    title: `${title} | 8webcom.com`,
    description: description || 'Professional digital services by 8webcom.com, Ahmedabad, India.',
    keywords: schemaDef?.keywords ?? [
      `${slug.replace(/-/g, ' ')} Ahmedabad`,
      '8webcom services',
      'digital services India',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: { 'en-IN': canonicalUrl },
    },
    openGraph: {
      title: `${title} | 8webcom.com`,
      description: description || 'Professional digital services by 8webcom.com, Ahmedabad, India.',
      url: canonicalUrl,
      type: 'website',
      siteName: '8webcom.com',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${title} — 8webcom.com` }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@coo8webcom',
      creator: '@coo8webcom',
      title: `${title} | 8webcom.com`,
      description: description || 'Professional digital services by 8webcom.com, Ahmedabad, India.',
      images: [{ url: OG_IMAGE, alt: `${title} — 8webcom.com` }],
    },
  };
}

const DEFAULT_FEATURES = [
  "End-to-end strategic planning and consultation.",
  "Seamless integration with your existing systems.",
  "Scalable architecture for future growth.",
  "24/7 dedicated support and maintenance.",
];

export default async function ServiceInnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const fallback = SERVICES.find((s) => s.href === `/services/${slug}`);
  const sanityData = await sanityFetch<any>({
    query: serviceBySlugQuery,
    params: { slug },
    fallback: null,
    tags: ['service', `service-${slug}`],
  });

  if (!sanityData && !fallback) {
    notFound();
  }

  const service = {
    title: sanityData?.title ?? fallback?.title ?? "",
    description: sanityData?.description ?? fallback?.description ?? "",
    image: sanityData?.image || fallback?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
    features: (sanityData?.features && sanityData.features.length > 0) ? sanityData.features : DEFAULT_FEATURES,
  };

  const schemaDef = SERVICE_SCHEMAS[slug];

  return (
    <div className="bg-white">
      {schemaDef && (
        <JsonLd schema={[
          serviceSchema({
            name: schemaDef.name,
            description: schemaDef.description,
            url: `/services/${slug}`,
            serviceType: schemaDef.serviceType,
          }),
          webPageSchema({
            name: `${schemaDef.name} — 8webcom.com`,
            description: schemaDef.description,
            url: `/services/${slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: schemaDef.name, href: `/services/${slug}` },
          ]),
        ]} />
      )}
      <PageHero
        title={service.title}
        subTitle="Our Expertise"
        image={service.image}
      />

      {/* Overview Section */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F58220]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0799B3]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 -z-10" />

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <Reveal variants={fadeLeft}>
              <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group border border-gray-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/40 to-transparent mix-blend-multiply" />
                
                {/* Floating Glass Box */}
                <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl transform group-hover:-translate-y-4 transition-transform duration-700">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0799B3] to-[#F58220] flex items-center justify-center mb-6 shadow-xl shadow-[#0799B3]/30">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white leading-tight mb-2">Empowering Businesses</h3>
                  <p className="text-white/80 font-medium">Through next-generation digital solutions.</p>
                </div>
              </div>
            </Reveal>

            <Reveal variants={fadeRight}>
              <SectionTitle 
                subTitle="Service Overview"
                heading="Transforming Ideas Into"
                highlight="Reality"
                description={`${service.description} At 8webcom, we don't just deliver projects; we engineer comprehensive digital solutions that act as catalysts for your business growth. Our approach is deeply analytical, highly creative, and entirely focused on ROI.`}
                size="beast"
                noAnimate
                className="mb-10"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {service.features.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#0799B3]/5 hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#0799B3]/20">
                    <CheckCircle2 className="w-7 h-7 text-[#F58220] shrink-0 mt-0.5" />
                    <span className="text-[#1F2429] font-bold">{feat}</span>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <ServiceProcess />

      {/* Why Choose Us Section for this Service */}
      <section className="py-24 lg:py-40 bg-[#0B1120] text-white relative overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Reveal variants={fadeUp} className="mb-24">
            <SectionTitle 
              heading={
                <>
                  Why Choose Our <br />
                </>
              }
              highlight={service.title}
              headingSuffix="Services?"
              description="We combine technical excellence with industry best practices to deliver solutions that outperform the competition."
              align="center"
              size="beast"
              theme="dark"
              noAnimate
            />
          </Reveal>

          <Reveal variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <Reveal variants={staggerItem} margin="0px">
              <div className="group bg-white/[0.02] backdrop-blur-md border border-white/10 p-12 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-[#0799B3]/50 transition-all duration-500 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0799B3]/20 blur-3xl rounded-full group-hover:bg-[#0799B3]/40 transition-colors duration-500" />
                <Shield className="w-14 h-14 text-[#0799B3] mb-8 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" />
                <h4 className="text-3xl font-black mb-4">Highly Secure</h4>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">Security is ingrained in our development lifecycle. We ensure your data and operations remain protected against modern threats.</p>
              </div>
            </Reveal>

            <Reveal variants={staggerItem} margin="0px">
              <div className="group bg-white/[0.02] backdrop-blur-md border border-white/10 p-12 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-[#F58220]/50 transition-all duration-500 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F58220]/20 blur-3xl rounded-full group-hover:bg-[#F58220]/40 transition-colors duration-500" />
                <Zap className="w-14 h-14 text-[#F58220] mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                <h4 className="text-3xl font-black mb-4">Lightning Fast</h4>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">Performance is a feature. We optimize every byte and query to ensure your digital presence is blazing fast across all devices.</p>
              </div>
            </Reveal>

            <Reveal variants={staggerItem} margin="0px">
              <div className="group bg-white/[0.02] backdrop-blur-md border border-white/10 p-12 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-[#0799B3]/50 transition-all duration-500 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0799B3]/20 blur-3xl rounded-full group-hover:bg-[#0799B3]/40 transition-colors duration-500" />
                <TrendingUp className="w-14 h-14 text-[#0799B3] mb-8 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" />
                <h4 className="text-3xl font-black mb-4">Scalable Growth</h4>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">Our solutions are built to grow with you. We use modern architecture patterns that effortlessly scale as your business expands.</p>
              </div>
            </Reveal>
          </Reveal>
        </div>
      </section>

      <ContactCtaSection />
    </div>
  );
}
