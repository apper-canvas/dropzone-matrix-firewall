import { useState, useCallback } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FileDropZone = ({ onFilesSelected, className, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected, disabled]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input value to allow same file selection
    e.target.value = "";
  }, [onFilesSelected]);

  const handleBrowseClick = useCallback(() => {
    if (!disabled) {
      document.getElementById("file-input").click();
    }
  }, [disabled]);

  return (
    <div
      className={cn(
        "file-drop-zone p-12 text-center transition-all duration-300",
        isDragOver && "drag-over",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id="file-input"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        disabled={disabled}
        accept="image/*,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,video/*,audio/*"
      />
      
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className={cn(
            "flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300",
            isDragOver 
              ? "bg-primary/30 border-2 border-primary" 
              : "bg-gradient-primary/20 border border-primary/30"
          )}>
            <ApperIcon 
              name={isDragOver ? "Upload" : "CloudUpload"} 
              size={40} 
              className={cn(
                "transition-all duration-300",
                isDragOver ? "text-primary animate-bounce" : "text-primary/80"
              )}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white">
            {isDragOver ? "Drop your files here!" : "Upload Files"}
          </h3>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            {isDragOver 
              ? "Release to add these files to your upload queue"
              : "Drag and drop your files here, or click to browse your computer"
            }
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Supported formats: Images, PDFs, Documents, Videos, Audio</p>
            <p>Maximum file size: 100MB per file</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={handleBrowseClick}
            size="lg"
            disabled={disabled}
            className="flex items-center space-x-2 shadow-xl"
          >
            <ApperIcon name="FolderOpen" size={20} />
            <span>Browse Files</span>
          </Button>
          
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <ApperIcon name="Zap" size={16} />
            <span>Or drag & drop</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDropZone;