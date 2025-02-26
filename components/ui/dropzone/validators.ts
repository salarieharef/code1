export const validators = {
  video: async (file: File, maxDuration: number): Promise<void> => {
    if (!maxDuration) {
      return;
    }

    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (maxDuration && video.duration > maxDuration) {
          reject(`Video duration exceeds ${maxDuration} seconds`);
        }
        resolve();
      };

      video.onerror = () => {
        window.URL.revokeObjectURL(video.src);
        reject("Error loading video");
      };

      video.src = URL.createObjectURL(file);
    });
  },

  image: async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve();
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject("Invalid image file");
      };

      img.src = URL.createObjectURL(file);
    });
  },

  pdf: async (file: File): Promise<void> => {
    if (!file.type.includes("pdf")) {
      throw new Error("Invalid PDF file");
    }
    return Promise.resolve();
  },

  size: (file: File, maxSize: number): void => {
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB`);
    }
  },
};
