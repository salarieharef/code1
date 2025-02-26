// lib/upload-video.ts
import { toast } from "@/components/ui/use-toast";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";

interface UploadVideoOptions {
  file: File;
  lessonId: any;
  onUploadProgress: (percentage: number) => void;
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
  resetFields?: () => void;
  setLoading: (loading: boolean) => void;
  onUploadSuccess?: () => void; // Add this line
}

export const uploadVideo = async ({
  file,
  lessonId,
  onUploadProgress,
  onSuccess,
  onError,
  resetFields,
  setLoading,
}: UploadVideoOptions) => {
  try {
    setLoading(true);
    const fileFormData = new FormData();
    fileFormData.append("title", file?.name);
    fileFormData.append("file", file);
    fileFormData.append("file_type", "video_topic");

    const response = await nextFetcher({
      url: routes.lessonRoutes.upload(lessonId),
      method: "POST",
      body: fileFormData,
      options: {
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          onUploadProgress(percentage); // Update progress
        },
      },
      useToken: true,
    });

    if (response.code === 200) {
      toast({
        variant: "success",
        title: response.msg || "آپلود موفقیت‌آمیز بود.",
      });
      onSuccess && onSuccess(response.msg || "آپلود موفقیت‌آمیز بود.");
      resetFields && resetFields(); // Reset form fields if provided
    } else {
      throw new Error(response.msg || "مشکلی در آپلود ویدئو رخ داده است.");
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در آپلود ویدئو",
      description: e.message || "خطایی رخ داده است.",
    });
    onError && onError(e.message || "خطا در آپلود ویدئو.");
  } finally {
    setLoading(false);
  }
};
