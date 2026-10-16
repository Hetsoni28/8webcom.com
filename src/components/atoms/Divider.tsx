import { cn } from "@/lib/utils";

interface DividerProps {
  color?: "primary" | "secondary" | "neutral";
  className?: string;
}

export function Divider({ color = "primary", className }: DividerProps) {
  const colors = {
    primary: "bg-[#0799B3]",
    secondary: "bg-[#F58220]",
    neutral: "bg-gray-200",
  };

  return (
    <div
      className={cn("h-[2px] w-16 rounded-full", colors[color], className)}
      aria-hidden="true"
    />
  );
}

