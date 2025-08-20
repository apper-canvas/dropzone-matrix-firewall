import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { uploadService } from "@/services/api/uploadService";

const UploadStats = ({ files, stats, totalSize }) => {
  const formattedSize = uploadService.formatFileSize(totalSize);
  
  const statItems = [
    { 
      label: "Total Files", 
      value: stats.total, 
      icon: "Files", 
      color: "text-blue-400" 
    },
    { 
      label: "Completed", 
      value: stats.completed, 
      icon: "CheckCircle", 
      color: "text-green-400" 
    },
    { 
      label: "Uploading", 
      value: stats.uploading, 
      icon: "Upload", 
      color: "text-yellow-400" 
    },
    { 
      label: "Failed", 
      value: stats.failed, 
      icon: "AlertCircle", 
      color: "text-red-400" 
    }
  ];

  if (stats.total === 0) {
    return null;
  }

  return (
    <div className="card-elevated p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <ApperIcon name="BarChart3" size={20} className="text-primary" />
          <span>Upload Summary</span>
        </h3>
        <Badge variant="default" className="text-sm">
          {formattedSize} total
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="text-center space-y-2">
            <div className="flex items-center justify-center">
              <ApperIcon name={item.icon} size={24} className={item.color} />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-xs text-gray-400">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {stats.uploading > 0 && (
        <div className="flex items-center space-x-2 text-sm text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <ApperIcon name="Zap" size={16} className="animate-pulse" />
          <span>Upload in progress...</span>
        </div>
      )}
    </div>
  );
};

export default UploadStats;