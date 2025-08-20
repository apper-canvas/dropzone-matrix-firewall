import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No Files Yet",
  message = "Drop your files here or click to browse and start uploading.",
  action = "Browse Files",
  onAction,
  icon = "Upload"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary/20 border border-primary/30">
        <ApperIcon name={icon} size={40} className="text-primary" />
      </div>
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{message}</p>
      </div>
      {onAction && (
        <Button 
          onClick={onAction} 
          size="lg"
          className="flex items-center space-x-2 shadow-xl"
        >
          <ApperIcon name="Plus" size={20} />
          <span>{action}</span>
        </Button>
      )}
    </div>
  );
};

export default Empty;