import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/atoms/ProgressBar";
import Badge from "@/components/atoms/Badge";
import { uploadService } from "@/services/api/uploadService";
const FileItem = ({ 
  file, 
  onRemove, 
  onPreview,
  className 
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(file.id);
    setIsRemoving(false);
  };

  const handlePreview = () => {
    if (file.type.startsWith("image/") && onPreview) {
      onPreview(file);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "uploading": return "default";
      case "completed": return "success";
      case "failed": return "error";
      case "cancelled": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "uploading": return "Uploading";
      case "completed": return "Completed";
      case "failed": return "Failed";
      case "cancelled": return "Cancelled";
      default: return "Pending";
    }
  };

  const fileIcon = uploadService.getFileIcon(file.type);
  const formattedSize = uploadService.formatFileSize(file.size);
  const canPreview = file.type.startsWith("image/");

  return (
    <div className={cn(
      "card-elevated p-4 transition-all duration-300 hover:shadow-2xl group",
      className
    )}>
      <div className="flex items-center space-x-4">
        {/* File Icon */}
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200",
          canPreview ? "bg-purple-500/20 cursor-pointer hover:bg-purple-500/30" : "bg-gray-500/20"
        )} onClick={canPreview ? handlePreview : undefined}>
          <ApperIcon 
            name={fileIcon} 
            size={24} 
            className={canPreview ? "text-purple-400" : "text-gray-400"} 
          />
        </div>

        {/* File Details */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium truncate pr-2" title={file.name}>
              {file.name}
            </h4>
            <Badge variant={getStatusVariant(file.status)}>
              {getStatusText(file.status)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{formattedSize}</span>
            <span className="text-gray-500 capitalize">{file.type.split("/")[0]}</span>
          </div>

          {/* Progress Bar */}
          {(file.status === "uploading" || (file.status === "completed" && file.progress === 100)) && (
            <div className="pt-1">
              <ProgressBar 
                value={file.progress} 
                max={100}
                size="sm"
                showPercentage={false}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {canPreview && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreview}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ApperIcon name="Eye" size={16} />
            </Button>
          )}
          
<Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={isRemoving || file.status_c === "uploading"}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            {isRemoving ? (
              <ApperIcon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <ApperIcon name="Trash2" size={16} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileItem;