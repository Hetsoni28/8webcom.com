import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outlined" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  icon,
  loading,
  disabled,
  type = 'button',
  className,
  children,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseClasses =
    "rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2";

  const variants = {
    primary: "bg-[#0799B3] text-white hover:bg-[#0799B3]/90",
    secondary: "bg-[#F58220] text-white hover:bg-[#F58220]/90",
    outlined:
      "border-2 border-[#0799B3] text-[#0799B3] hover:bg-[#0799B3] hover:text-white",
    ghost: "text-[#0799B3] underline-offset-4 hover:underline",
    icon: "bg-transparent text-[#0799B3] hover:bg-gray-100 p-2.5 min-w-[44px] min-h-[44px]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[46px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    variant !== "icon" && sizes[size],
    (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : null}
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      aria-label={ariaLabel}
      aria-busy={loading ? "true" : undefined}
    >
      {content}
    </button>
  );
}

