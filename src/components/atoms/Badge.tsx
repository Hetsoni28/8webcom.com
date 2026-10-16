import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "neutral";
  className?: string;
}

export function Badge({ label, variant = "primary", className }: BadgeProps) {
  const variants = {
    primary: "text-[#0799B3] bg-transparent border border-[#0799B3]",
    secondary: "text-[#F58220] bg-transparent border border-[#F58220]",
    neutral: "text-[#1F2429] bg-transparent border border-gray-300",
  };

  return (
    <span
      className={cn(
        "text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wider inline-block",
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
}

