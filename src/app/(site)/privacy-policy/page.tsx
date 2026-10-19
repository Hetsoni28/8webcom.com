import { PolicyPageTemplate, policyMetadata } from "@/components/templates/PolicyPageTemplate";

// Content: Sanity → Policy Pages → "privacy-policy"
export const generateMetadata = () => policyMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return <PolicyPageTemplate slug="privacy-policy" />;
}
