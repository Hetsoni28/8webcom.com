import { PolicyPageTemplate, policyMetadata } from "@/components/templates/PolicyPageTemplate";

// Content: Sanity → Policy Pages → "refund-and-cancellation-policy"
export const generateMetadata = () => policyMetadata("refund-and-cancellation-policy");

export default function RefundAndCancellationPolicyPage() {
  return <PolicyPageTemplate slug="refund-and-cancellation-policy" />;
}
