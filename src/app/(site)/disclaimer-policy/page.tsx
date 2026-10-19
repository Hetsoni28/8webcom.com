import { PolicyPageTemplate, policyMetadata } from "@/components/templates/PolicyPageTemplate";

// Content: Sanity → Policy Pages → "disclaimer-policy"
export const generateMetadata = () => policyMetadata("disclaimer-policy");

export default function DisclaimerPolicyPage() {
  return <PolicyPageTemplate slug="disclaimer-policy" />;
}
