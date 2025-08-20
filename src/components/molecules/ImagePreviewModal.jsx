import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { uploadService } from "@/services/api/uploadService";

const ImagePreviewModal = ({ file, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!file) return null;

  const imageUrl = file.file ? URL.createObjectURL(file.file) : file.url;
  const formattedSize = uploadService.formatFileSize(file.size);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface/90 backdrop-blur-sm border border-gray-700/50 rounded-xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white truncate">
                  {file.name}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{formattedSize}</span>
                  <span>•</span>
                  <span>{file.type}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            {/* Image */}
            <div className="p-4 flex items-center justify-center max-h-[70vh]">
              <img
                src={imageUrl}
                alt={file.name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                onLoad={() => {
                  if (file.file) {
                    URL.revokeObjectURL(imageUrl);
                  }
                }}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-700/50">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Image" size={16} className="text-purple-400" />
                <span className="text-sm text-gray-400">
                  Preview • Press ESC to close
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;