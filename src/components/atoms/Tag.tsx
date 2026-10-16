import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
}

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full",
        className
      )}
    >
      {label}
    </span>
  );
}

