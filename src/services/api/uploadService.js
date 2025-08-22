import { toast } from 'react-toastify';

// Initialize ApperClient for database operations
const initializeApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const uploadService = {
  async getAll() {
    try {
      const apperClient = initializeApperClient();
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "size_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "progress_c" } },
          { field: { Name: "uploaded_at_c" } },
          { field: { Name: "url_c" } }
        ],
        orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }]
      };
      
      const response = await apperClient.fetchRecords("upload_c", params);
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      return response.data || [];
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
      const apperClient = initializeApperClient();
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "size_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "progress_c" } },
          { field: { Name: "uploaded_at_c" } },
          { field: { Name: "url_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById("upload_c", parseInt(id), params);
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      return response.data;
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
      const apperClient = initializeApperClient();
      const params = {
        records: [{
          // Only include updateable fields based on database schema
          Name: uploadData.Name || uploadData.name,
          Tags: uploadData.Tags || "",
          size_c: uploadData.size_c || uploadData.size,
          type_c: uploadData.type_c || uploadData.type,
          status_c: uploadData.status_c || uploadData.status || "pending",
          progress_c: uploadData.progress_c || uploadData.progress || 0,
          uploaded_at_c: uploadData.uploaded_at_c || uploadData.uploadedAt || new Date().toISOString(),
          url_c: uploadData.url_c || uploadData.url || null
        }]
      };
      
      const response = await apperClient.createRecord("upload_c", params);
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
      const apperClient = initializeApperClient();
      const updateData = {
        Id: parseInt(id)
      };
      
      // Only include updateable fields that are provided in data
      if (data.Name !== undefined || data.name !== undefined) {
        updateData.Name = data.Name || data.name;
      }
      if (data.Tags !== undefined) updateData.Tags = data.Tags;
      if (data.size_c !== undefined || data.size !== undefined) {
        updateData.size_c = data.size_c || data.size;
      }
      if (data.type_c !== undefined || data.type !== undefined) {
        updateData.type_c = data.type_c || data.type;
      }
      if (data.status_c !== undefined || data.status !== undefined) {
        updateData.status_c = data.status_c || data.status;
      }
      if (data.progress_c !== undefined || data.progress !== undefined) {
        updateData.progress_c = data.progress_c || data.progress;
      }
      if (data.uploaded_at_c !== undefined || data.uploadedAt !== undefined) {
        updateData.uploaded_at_c = data.uploaded_at_c || data.uploadedAt;
      }
      if (data.url_c !== undefined || data.url !== undefined) {
        updateData.url_c = data.url_c || data.url;
      }
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord("upload_c", params);
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
      const apperClient = initializeApperClient();
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord("upload_c", params);
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
      Name: file.name,
      size_c: file.size,
      type_c: file.type,
      status_c: "uploading"
    });

    // Simulate upload progress
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for (let progress = 0; progress <= 100; progress += Math.random() * 15 + 5) {
      await delay(Math.random() * 200 + 100);
      const currentProgress = Math.min(progress, 100);
      
      await this.update(newUpload.Id, {
        progress_c: currentProgress,
        status_c: currentProgress === 100 ? "completed" : "uploading"
      });
      
      if (onProgress) {
        onProgress(currentProgress, newUpload.Id);
      }
      
      if (currentProgress >= 100) break;
    }

    return this.getById(newUpload.Id);
  },

  async cancelUpload(id) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(200);
    return this.update(id, {
      status_c: "cancelled",
      progress_c: 0
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
    if (type?.startsWith("image/")) return "Image";
    if (type?.includes("pdf")) return "FileText";
    if (type?.includes("document") || type?.includes("word")) return "File";
    if (type?.includes("sheet") || type?.includes("excel")) return "FileSpreadsheet";
    if (type?.includes("presentation") || type?.includes("powerpoint")) return "Presentation";
    if (type?.startsWith("video/")) return "Video";
    if (type?.startsWith("audio/")) return "Music";
    if (type?.includes("zip") || type?.includes("rar")) return "Archive";
    return "File";
  }
};