import { useState, useCallback } from "react";
import { uploadService } from "@/services/api/uploadService";
import { toast } from "react-toastify";
export const useFileUpload = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});

  const addFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles);
    const processedFiles = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending",
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...processedFiles]);
    return processedFiles;
  }, []);

  const removeFile = useCallback((fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  }, []);

  const updateFileStatus = useCallback((fileId, status, progress = 0) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, status, progress } : file
    ));
  }, []);

  const uploadFiles = useCallback(async () => {
    const pendingFiles = files.filter(f => f.status === "pending");
    
    if (pendingFiles.length === 0) {
      toast.warning("No files to upload");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const uploadPromises = pendingFiles.map(async (fileData) => {
        updateFileStatus(fileData.id, "uploading", 0);
        
        try {
          await uploadService.uploadFile(fileData.file, (progress, uploadId) => {
            setUploadProgress(prev => ({
              ...prev,
              [fileData.id]: progress
            }));
            updateFileStatus(fileData.id, "uploading", progress);
          });
          
          updateFileStatus(fileData.id, "completed", 100);
          return { success: true, file: fileData };
        } catch (uploadError) {
          updateFileStatus(fileData.id, "failed", 0);
          return { success: false, file: fileData, error: uploadError };
        }
      });

      const results = await Promise.all(uploadPromises);
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      if (successful > 0) {
        toast.success(`Successfully uploaded ${successful} file${successful > 1 ? "s" : ""}`);
      }
      
      if (failed > 0) {
        toast.error(`Failed to upload ${failed} file${failed > 1 ? "s" : ""}`);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [files, updateFileStatus]);

  const clearCompleted = useCallback(() => {
    setFiles(prev => prev.filter(f => f.status !== "completed"));
    toast.info("Cleared completed uploads");
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setUploadProgress({});
    toast.info("Cleared all files");
  }, []);

  const validateFiles = useCallback((fileList) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      "image/jpeg", "image/png", "image/gif", "image/webp",
      "application/pdf", "text/plain",
      "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "video/mp4", "video/avi", "video/mov",
      "audio/mp3", "audio/wav", "audio/mpeg"
    ];

    const errors = [];
    
    Array.from(fileList).forEach(file => {
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large (max 100MB)`);
      }
      
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name} has an unsupported file type`);
      }
    });

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }

    return true;
  }, []);

  const getTotalSize = useCallback(() => {
    return files.reduce((total, file) => total + file.size, 0);
  }, [files]);

const getUploadStats = useCallback(() => {
const total = files.length;
    const completed = files.filter(f => f.status_c === "completed").length;
    const uploading = files.filter(f => f.status_c === "uploading").length;
    const failed = files.filter(f => f.status_c === "failed").length;
    const pending = files.filter(f => f.status_c === "pending").length;

    return { total, completed, uploading, failed, pending };
  }, [files]);

  // Helper function to convert MIME type to user-friendly category
  const getFileTypeCategory = useCallback((mimeType) => {
    if (!mimeType) return "File";
    
    const type = mimeType.toLowerCase();
    
    if (type.startsWith('image/')) return "Image";
    if (type.startsWith('video/')) return "Video";
    if (type.startsWith('audio/')) return "Audio";
    if (type.includes('pdf')) return "Document";
    if (type.includes('word') || type.includes('document')) return "Document";
    if (type.includes('sheet') || type.includes('excel')) return "Spreadsheet";
    if (type.includes('presentation') || type.includes('powerpoint')) return "Presentation";
    if (type.includes('text/')) return "Text";
    if (type.includes('zip') || type.includes('rar') || type.includes('7z')) return "Archive";
    if (type.includes('json') || type.includes('xml')) return "Data";
    
    return "File";
  }, []);

  // Process files to add file_type_c field
  const processFileWithType = useCallback((file) => {
    const fileType = getFileTypeCategory(file.type);
    return {
      ...file,
      file_type_c: fileType
    };
  }, [getFileTypeCategory]);

  return {
    files,
    loading,
    error,
    uploadProgress,
    addFiles,
    removeFile,
    uploadFiles,
    clearCompleted,
    clearAll,
    validateFiles,
    getTotalSize,
    getUploadStats,
    updateFileStatus
  };
};