import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  className,
  showPercentage = true,
  size = "default"
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    sm: "h-1",
    default: "h-2",
    lg: "h-3"
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn("progress-bar", sizes[size])}>
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white/90">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;