import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { PolicyPageContent } from "@/components/organisms/sections/PolicyPageContent";
import { DISCLAIMER_POLICY } from "@/lib/page-data";

export const metadata: Metadata = {
  title: "Disclaimer Policy | 8webcom.com",
  description:
    "Disclaimer Policy of 8webcom.com — understand liability limitations, accuracy of information, external links, and warranty disclaimers for our web development services.",
  alternates: { canonical: "https://www.8webcom.com/disclaimer-policy" },
  robots: { index: true, follow: false },
};

export default function DisclaimerPolicyPage() {
  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      {/* Policy Page Hero with Beast Typography */}
      <PageHero
        title="Disclaimer"
        highlight="Policy"
        subTitle="Legal Notice"
        image="https://images.unsplash.com/photo-1450133064473-71024230f91b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* Interactive Policy Body with Sticky TOC and Mouse Spotlight Animations */}
      <PolicyPageContent
        policy={DISCLAIMER_POLICY}
        activeSlug="disclaimer-policy"
        badgeLabel="LEGAL NOTICE & TERMS"
      />
    </div>
  );
}
