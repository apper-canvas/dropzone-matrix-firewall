import { useState } from "react";
import { motion } from "framer-motion";
import FileDropZone from "@/components/molecules/FileDropZone";
import FileItem from "@/components/molecules/FileItem";
import UploadStats from "@/components/molecules/UploadStats";
import ImagePreviewModal from "@/components/molecules/ImagePreviewModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import { useFileUpload } from "@/hooks/useFileUpload";

const FileUploadArea = () => {
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const {
    files,
    loading,
    addFiles,
    removeFile,
    uploadFiles,
    clearCompleted,
    clearAll,
    validateFiles,
    getTotalSize,
    getUploadStats
  } = useFileUpload();

  const stats = getUploadStats();
  const totalSize = getTotalSize();
  const hasFiles = files.length > 0;
  const canUpload = stats.pending > 0;
  const isUploading = stats.uploading > 0;

  const handleFilesSelected = (fileList) => {
    if (validateFiles(fileList)) {
      addFiles(fileList);
    }
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setPreviewFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FileDropZone 
          onFilesSelected={handleFilesSelected}
          disabled={isUploading}
        />
      </motion.div>

      {/* Upload Stats */}
      {hasFiles && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <UploadStats 
            files={files}
            stats={stats}
            totalSize={totalSize}
          />
        </motion.div>
      )}

      {/* Action Buttons */}
      {hasFiles && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button
            onClick={uploadFiles}
            disabled={!canUpload || loading}
            size="lg"
            className="flex items-center space-x-2"
          >
            {loading ? (
              <ApperIcon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <ApperIcon name="Upload" size={20} />
            )}
            <span>
              {loading ? "Uploading..." : `Upload ${stats.pending} File${stats.pending !== 1 ? "s" : ""}`}
            </span>
          </Button>

          {stats.completed > 0 && (
            <Button
              variant="outline"
              onClick={clearCompleted}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Check" size={16} />
              <span>Clear Completed</span>
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={clearAll}
            disabled={loading}
            className="flex items-center space-x-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <ApperIcon name="Trash2" size={16} />
            <span>Clear All</span>
          </Button>
        </motion.div>
      )}

      {/* File List */}
      {hasFiles ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-3"
        >
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <FileItem
                file={file}
                onRemove={removeFile}
                onPreview={handlePreview}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Empty
            title="Ready to Upload"
            message="Your uploaded files will appear here. Start by dropping files in the area above or clicking browse."
            action="Browse Files"
            onAction={() => document.getElementById("file-input").click()}
            icon="FileUp"
          />
        </motion.div>
      )}

      {/* Image Preview Modal */}
      <ImagePreviewModal
        file={previewFile}
        isOpen={showPreview}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default FileUploadArea;