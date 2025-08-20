import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary/20 text-primary border-primary/30",
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    error: "bg-red-500/20 text-red-400 border-red-500/30",
    secondary: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;