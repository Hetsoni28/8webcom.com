import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { PolicyPageContent } from "@/components/organisms/sections/PolicyPageContent";
import { REFUND_POLICY } from "@/lib/page-data";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | 8webcom.com",
  description:
    "Refund and Cancellation Policy of 8webcom.com — understand conditions for refunds on web development and digital marketing services. Contact info@8webcom.com for queries.",
  alternates: { canonical: "https://www.8webcom.com/refund-and-cancellation-policy" },
  robots: { index: true, follow: false },
};

export default function RefundAndCancellationPolicyPage() {
  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      {/* Policy Page Hero with Beast Typography */}
      <PageHero
        title="Refund &"
        highlight="Cancellation"
        subTitle="Billing & Terms"
        image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* Interactive Policy Body with Sticky TOC and Mouse Spotlight Animations */}
      <PolicyPageContent
        policy={REFUND_POLICY}
        activeSlug="refund-and-cancellation-policy"
        badgeLabel="SERVICE TERMS & BILLING"
      />
    </div>
  );
}
