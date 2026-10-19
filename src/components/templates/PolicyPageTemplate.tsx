import type { Metadata } from 'next';
import { PageHero } from '@/components/organisms/sections/PageHero';
import { PolicyPageContent } from '@/components/organisms/sections/PolicyPageContent';
import { buildMetadata, getPolicyContent } from '@/sanity/content';
import type { PolicySlug } from '@/sanity/defaults';

// Shared by the three policy routes. Content: Sanity → Policy Pages (one per slug).

export async function policyMetadata(slug: PolicySlug): Promise<Metadata> {
  const { seo } = await getPolicyContent(slug);
  return buildMetadata(seo, `/${slug}`, { robots: { index: true, follow: false } });
}

export async function PolicyPageTemplate({ slug }: { slug: PolicySlug }) {
  const policy = await getPolicyContent(slug);
  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
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
