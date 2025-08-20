import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "btn-gradient",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-gray-300 hover:bg-surface hover:text-white",
    destructive: "bg-gradient-error hover:shadow-lg hover:scale-[1.02]",
  };

  const sizes = {
    default: "py-2 px-4",
    sm: "py-1 px-3 text-sm",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <button
      className={cn(
        "font-medium rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;