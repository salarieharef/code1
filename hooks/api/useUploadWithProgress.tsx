import { nextFetcher } from "@/utils/api/next-fetcher";
import { useTimeout } from "@mantine/hooks";
import { useState } from "react";

interface UploadOptions {
  url: string; // API endpoint for file upload
  method?: string; // HTTP method, default is POST
  body?: FormData | null; // FormData containing file and other info
  requestId?: string; // HTTP method, default is POST
  useToken?: boolean; // Whether to use authentication token, default is true
  onProgress?: (progress: number) => void; // Callback to handle upload progress
  toast?: (message: any) => void; // Callback for success/error messages
}

export const useUploadWithProgress = () => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null); // Remaining time for upload
  const [sizeRemaining, setSizeRemaining] = useState<number | null>(null); // Remaining time for upload
  const [totalSize, setTotalSize] = useState<number | null>(null); // Remaining time for upload
  const [isUploading, setIsUploading] = useState<boolean>(false); // Remaining time for upload
  const { start, clear } = useTimeout(() => {
    setProgress(0);
    setIsUploading(false);
  }, 5000);

  const uploadFile = async (options: UploadOptions) => {
    const {
      url,
      method = "POST",
      body,
      requestId,
      useToken = true,
      onProgress,
      toast,
    } = options;

    const startTime = Date.now(); // Start time of the upload

    try {
      setIsUploading(true);
      const res = await nextFetcher({
        url,
        method,
        body,
        requestId,
        useToken,
        options: {
          onUploadProgress: (progressEvent: any) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setProgress(percentage);

            // Calculate remaining time
            const timeElapsed = (Date.now() - startTime) / 1000; // Time elapsed in seconds
            const uploadSpeed = loaded / timeElapsed; // Upload speed in bytes per second
            const estimatedTimeRemaining = (total - loaded) / uploadSpeed; // Remaining time in seconds

            setTimeRemaining(Math.ceil(estimatedTimeRemaining)); // Set remaining time

            setSizeRemaining(loaded);

            setTotalSize(total);

            if (onProgress) {
              onProgress(percentage); // Pass the progress to callback if provided
            }
          },
        },
      });

      if (res.success) {
        toast?.({
          variant: "success",
          title: "File uploaded successfully",
        });

        return res;
      } else {
        throw new Error(res.error);
      }
    } catch (e: any) {
      toast?.({
        variant: "destructive",
        title: "File upload failed",
        description: e.message,
      });
    } finally {
      start(); // Reset progress after upload
    }
  };

  return {
    progress,
    sizeRemaining,
    timeRemaining,
    totalSize,
    isUploading,
    uploadFile,
  };
};

//______________ usage_____________
// const handleUpload = () => {
//   if (file) {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", "Custom Title");

//     uploadFile({
//       url: "/api/upload",  // Dynamic URL
//       body: formData,      // Dynamic FormData
//       useToken: true,      // Use token if needed
//       toast: (message) => console.log(message), // Custom toast for messages
//       onProgress: (progress) => console.log(`Progress: ${progress}%`), // Handle progress
//     });
//   }
// };
