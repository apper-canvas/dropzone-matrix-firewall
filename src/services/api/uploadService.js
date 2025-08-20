import { toast } from 'react-toastify';

// Mock data for development (replaces uploads.json)
const mockUploads = [
  {
    Id: 1,
    name: "presentation.pdf",
    size: 2048576,
    type: "application/pdf",
    status: "completed",
    progress: 100,
    uploadedAt: "2024-01-15T10:30:00Z",
    url: "/uploads/presentation.pdf"
  },
  {
    Id: 2,
    name: "image.jpg",
    size: 1024768,
    type: "image/jpeg",
    status: "completed",
    progress: 100,
    uploadedAt: "2024-01-15T10:25:00Z",
    url: "/uploads/image.jpg"
  },
  {
    Id: 3,
    name: "document.docx",
    size: 512000,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    status: "failed",
    progress: 0,
    uploadedAt: "2024-01-15T10:20:00Z",
    url: null
  }
];

let uploads = [...mockUploads];

// Initialize ApperClient for database operations
const initializeApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadService = {
  async getAll() {
    try {
      // For now, using mock service layer since no database schema provided
      await delay(300);
      return [...uploads];
      
      /* When database schema becomes available, replace with:
      const apperClient = initializeApperClient();
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name" } },
          { field: { Name: "size" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } },
          { field: { Name: "progress" } },
          { field: { Name: "uploadedAt" } },
          { field: { Name: "url" } }
        ],
        orderBy: [{ fieldName: "uploadedAt", sorttype: "DESC" }]
      };
      
      const response = await apperClient.fetchRecords("uploads_table", params);
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      return response.data || [];
      */
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching uploads:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error fetching uploads:", error);
        toast.error("Failed to load uploads");
      }
      return [];
    }
  },

  async getById(id) {
    try {
      // For now, using mock service layer since no database schema provided
      await delay(200);
      return uploads.find(upload => upload.Id === parseInt(id));
      
      /* When database schema becomes available, replace with:
      const apperClient = initializeApperClient();
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name" } },
          { field: { Name: "size" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } },
          { field: { Name: "progress" } },
          { field: { Name: "uploadedAt" } },
          { field: { Name: "url" } }
        ]
      };
      
      const response = await apperClient.getRecordById("uploads_table", parseInt(id), params);
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      return response.data;
      */
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching upload with ID ${id}:`, error.response.data.message);
      } else {
        console.error(`Error fetching upload with ID ${id}:`, error);
      }
      return null;
    }
  },

  async create(uploadData) {
    try {
      // For now, using mock service layer since no database schema provided
      await delay(400);
      const newUpload = {
        Id: uploads.length > 0 ? Math.max(...uploads.map(u => u.Id)) + 1 : 1,
        ...uploadData,
        uploadedAt: new Date().toISOString(),
        status: uploadData.status || "pending",
        progress: uploadData.progress || 0
      };
      uploads.push(newUpload);
      return { ...newUpload };
      
      /* When database schema becomes available, replace with:
      const apperClient = initializeApperClient();
      const params = {
        records: [{
          // Only include updateable fields based on database schema
          name: uploadData.name,
          size: uploadData.size,
          type: uploadData.type,
          status: uploadData.status || "pending",
          progress: uploadData.progress || 0,
          url: uploadData.url || null
        }]
      };
      
      const response = await apperClient.createRecord("uploads_table", params);
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create upload ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      throw new Error("Failed to create upload record");
      */
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating upload:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error creating upload:", error);
        toast.error("Failed to create upload");
      }
      throw error;
    }
  },

  async update(id, data) {
    try {
      // For now, using mock service layer since no database schema provided
      await delay(300);
      const index = uploads.findIndex(upload => upload.Id === parseInt(id));
      if (index !== -1) {
        uploads[index] = { ...uploads[index], ...data };
        return { ...uploads[index] };
      }
      throw new Error("Upload not found");
      
      /* When database schema becomes available, replace with:
      const apperClient = initializeApperClient();
      const params = {
        records: [{
          Id: parseInt(id),
          // Only include updateable fields based on database schema
          ...data
        }]
      };
      
      const response = await apperClient.updateRecord("uploads_table", params);
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update upload ${failedUpdates.length} records:${failedUpdates}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      throw new Error("Failed to update upload record");
      */
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating upload:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating upload:", error);
        toast.error("Failed to update upload");
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      // For now, using mock service layer since no database schema provided
      await delay(250);
      const index = uploads.findIndex(upload => upload.Id === parseInt(id));
      if (index !== -1) {
        const deleted = uploads.splice(index, 1)[0];
        return { ...deleted };
      }
      throw new Error("Upload not found");
      
      /* When database schema becomes available, replace with:
      const apperClient = initializeApperClient();
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord("uploads_table", params);
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete upload ${failedDeletions.length} records:${failedDeletions}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      return false;
      */
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting upload:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error deleting upload:", error);
        toast.error("Failed to delete upload");
      }
      throw error;
    }
  },

  async uploadFile(file, onProgress) {
    const newUpload = await this.create({
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading"
    });

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += Math.random() * 15 + 5) {
      await delay(Math.random() * 200 + 100);
      const currentProgress = Math.min(progress, 100);
      
      await this.update(newUpload.Id, {
        progress: currentProgress,
        status: currentProgress === 100 ? "completed" : "uploading"
      });
      
      if (onProgress) {
        onProgress(currentProgress, newUpload.Id);
      }
      
      if (currentProgress >= 100) break;
    }

    return this.getById(newUpload.Id);
  },

  async cancelUpload(id) {
    await delay(200);
    return this.update(id, {
      status: "cancelled",
      progress: 0
    });
  },

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },

  getFileIcon(type) {
    if (type.startsWith("image/")) return "Image";
    if (type.includes("pdf")) return "FileText";
    if (type.includes("document") || type.includes("word")) return "File";
    if (type.includes("sheet") || type.includes("excel")) return "FileSpreadsheet";
    if (type.includes("presentation") || type.includes("powerpoint")) return "Presentation";
    if (type.startsWith("video/")) return "Video";
    if (type.startsWith("audio/")) return "Music";
    if (type.includes("zip") || type.includes("rar")) return "Archive";
    return "File";
  }
};