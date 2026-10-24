import type { Metadata } from 'next';
import { JsonLd } from '@/components/atoms/JsonLd';
import { PageHero } from '@/components/organisms/sections/PageHero';
import { PolicyPageContent } from '@/components/organisms/sections/PolicyPageContent';
import { buildMetadata, getPolicyContent } from '@/sanity/content';
import type { PolicySlug } from '@/sanity/defaults';
import { breadcrumbSchema, webPageSchema } from '@/lib/schemas';

// Shared by the three policy routes. Content: Sanity → Policy Pages (one per slug).

export async function policyMetadata(slug: PolicySlug): Promise<Metadata> {
  const { seo } = await getPolicyContent(slug);
  return buildMetadata(seo, `/${slug}`);
}

export async function PolicyPageTemplate({ slug }: { slug: PolicySlug }) {
  const policy = await getPolicyContent(slug);
  const name = policy.heading;
  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <JsonLd
        schema={[
          webPageSchema({ name: policy.seo.metaTitle ?? name, description: policy.seo.metaDescription ?? '', url: `/${slug}` }),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name, href: `/${slug}` },
          ]),
        ]}
      />
      <PageHero
        title={policy.hero.title}
        highlight={policy.hero.highlight}
        subTitle={policy.hero.eyebrow}
        image={policy.hero.image}
      />
      <PolicyPageContent policy={policy} activeSlug={slug} badgeLabel={policy.badgeLabel} />
    </div>
  );
}
