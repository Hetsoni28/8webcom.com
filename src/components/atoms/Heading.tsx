import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "beast";
  color?: "default" | "white";
  className?: string;
  children: ReactNode;
}

export function Heading({
  as: Component = "h2",
  size = "lg",
  color = "default",
  className,
  children,
}: HeadingProps) {
  const sizes = {
    xs: "text-lg md:text-xl",
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl lg:text-5xl",
    xl: "text-4xl md:text-5xl lg:text-6xl",
    "2xl": "text-5xl md:text-6xl lg:text-7xl",
    beast: "text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter",
  };

  return (
    <Component
      className={cn(
        "leading-tight break-words",
        size !== 'beast' && "font-bold",
        color === "default" ? "text-[#1F2429]" : "text-white",
        sizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

