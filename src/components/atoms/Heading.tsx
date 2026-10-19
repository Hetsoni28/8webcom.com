import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "beast";
  color?: "default" | "white";
  className?: string;
  children: ReactNode;
}

// One type scale for the whole site (matches homepage SectionHeader):
// extrabold, tight tracking, ~1.1 line-height on large sizes.
export function Heading({
  as: Component = "h2",
  size = "lg",
  color = "default",
  className,
  children,
}: HeadingProps) {
  const sizes = {
    xs: "text-lg md:text-xl font-bold tracking-tight",
    sm: "text-xl md:text-2xl font-bold tracking-tight",
    md: "text-2xl md:text-3xl font-bold tracking-tight",
    lg: "text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.12]",
    xl: "text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-[-0.025em] leading-[1.1]",
    "2xl": "text-[40px] sm:text-[52px] lg:text-[64px] font-extrabold tracking-[-0.035em] leading-[1.04]",
    beast: "text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-[-0.025em] leading-[1.1]",
  };

  return (
    <Component
      className={cn(
        "wrap-break-word",
        color === "default" ? "text-[#1F2429]" : "text-white",
        sizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
