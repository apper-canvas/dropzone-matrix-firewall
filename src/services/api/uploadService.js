import uploadsData from "@/services/mockData/uploads.json";

let uploads = [...uploadsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadService = {
  async getAll() {
    await delay(300);
    return [...uploads];
  },

  async getById(id) {
    await delay(200);
    return uploads.find(upload => upload.Id === parseInt(id));
  },

  async create(uploadData) {
    await delay(400);
    const newUpload = {
      Id: uploads.length > 0 ? Math.max(...uploads.map(u => u.Id)) + 1 : 1,
      ...uploadData,
      uploadedAt: new Date().toISOString(),
      status: "pending",
      progress: 0
    };
    uploads.push(newUpload);
    return { ...newUpload };
  },

  async update(id, data) {
    await delay(300);
    const index = uploads.findIndex(upload => upload.Id === parseInt(id));
    if (index !== -1) {
      uploads[index] = { ...uploads[index], ...data };
      return { ...uploads[index] };
    }
    throw new Error("Upload not found");
  },

  async delete(id) {
    await delay(250);
    const index = uploads.findIndex(upload => upload.Id === parseInt(id));
    if (index !== -1) {
      const deleted = uploads.splice(index, 1)[0];
      return { ...deleted };
    }
    throw new Error("Upload not found");
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