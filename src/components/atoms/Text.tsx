import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  as?: "p" | "span" | "div";
  size?: "sm" | "base" | "lg";
  color?: "default" | "muted" | "white" | "primary" | "secondary";
  className?: string;
  children: ReactNode;
}

export function Text({
  as: Component = "p",
  size = "base",
  color = "default",
  className,
  children,
}: TextProps) {
  const sizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  const colors = {
    default: "text-[#1F2429]",
    muted: "text-gray-500",
    white: "text-white",
    primary: "text-[#0799B3]",
    secondary: "text-[#F58220]",
  };

  return (
    <Component className={cn(sizes[size], colors[color], className)}>
      {children}
    </Component>
  );
}

