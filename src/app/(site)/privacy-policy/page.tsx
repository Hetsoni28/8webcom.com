import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { PolicyPageContent } from "@/components/organisms/sections/PolicyPageContent";
import { PRIVACY_POLICY } from "@/lib/page-data";

export const metadata: Metadata = {
  title: "Privacy Policy | 8webcom.com",
  description:
    "Privacy Policy of 8webcom.com — how we collect, use, store and protect your personal information. We do not sell personal data to third parties.",
  alternates: { canonical: "https://www.8webcom.com/privacy-policy" },
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      {/* Policy Page Hero with Beast Typography */}
      <PageHero
        title="Privacy"
        highlight="Policy"
        subTitle="Data Protection"
        image="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* Interactive Policy Body with Sticky TOC and Mouse Spotlight Animations */}
      <PolicyPageContent
        policy={PRIVACY_POLICY}
        activeSlug="privacy-policy"
        badgeLabel="DATA PROTECTION & PRIVACY"
      />
    </div>
  );
}
