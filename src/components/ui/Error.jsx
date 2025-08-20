import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Upload Error",
  message = "Something went wrong while uploading your files. Please try again.",
  onRetry,
  showRetry = true
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30">
        <ApperIcon name="AlertCircle" size={32} className="text-red-400" />
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{message}</p>
      </div>
      {showRetry && onRetry && (
        <div className="flex space-x-4">
          <Button 
            onClick={onRetry} 
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RotateCcw" size={16} />
            <span>Try Again</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Error;