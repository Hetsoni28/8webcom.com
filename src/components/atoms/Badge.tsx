import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "neutral";
  className?: string;
}

/**
 * Badge — eyebrow label shown above headings (short rule + uppercase text).
 * Visually identical to the homepage SectionHeader eyebrow so every page matches.
 */
export function Badge({ label, variant = "primary", className }: BadgeProps) {
  const variants = {
    primary: "text-[#0799B3]",
    secondary: "text-[#F58220]",
    neutral: "text-gray-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em]",
        variants[variant],
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current shrink-0" />
      {label}
    </span>
  );
}
