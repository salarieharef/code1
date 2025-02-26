// Api imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSWRConfig } from "swr";

interface DeleteFileParams {
  url: string;
  fileType: string;
  mutateKey?: string | string[];
  onSuccess?: () => void;
  toast: any; // Add toast as a parameter
  mutate?: any; // Add mutate here
}
const UploadContent = async (toast: any, courseId: any, preparedData: any) => {
  if (preparedData) {
    try {
      const responseData = await nextFetcher({
        url: routes.courseRoutes.addContent(courseId),
        method: "POST",
        body: preparedData,
        useToken: true,
      });

      if (responseData?.success) {
        toast({
          variant: "success",
          title: responseData?.msg,
        });

        return responseData;
      } else if (responseData?.error) {
        throw new Error(responseData?.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    }
  } else {
    return { success: true };
  }
};
const deleteFile = async ({
  url,
  fileType,
  mutateKey,
  onSuccess,
  toast,
  mutate = () => {}, // Receive mutate here
}: DeleteFileParams) => {
  try {
    // Send file deletion request
    const response = await nextFetcher({
      url,
      method: "POST",
      useToken: true,
    });

    // Check if the request was successful
    if (response.success) {
      toast({
        variant: "success",
        title: response.msg || `فایل مورد نظر شما با موفقیت حذف شد`,
      });

      // Update SWR data if mutateKey is provided
      if (mutateKey) {
        await mutate(mutateKey);
      }

      // Execute onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } else {
      throw new Error(response.error || "Error deleting file");
    }
  } catch (error: any) {
    // Error handling and showing appropriate message to the user
    toast({
      variant: "destructive",
      title: error.message || `خطا در حذف `,
    });
  }
};

const handleDeleteContent = async ({
  fileType,
  toast,
  mutate,
  onChange,
  setVideoUrl,
  value,
  contentId,
  courseId,
  form,
  videoUrl,
  name,
}: any) => {
  try {
    if (fileType === "intro-video") {
      // sample
      const res = await nextFetcher({
        url: routes.userRoutes.removeIntroductionVideo,
        method: "POST",
        useToken: true,
      });

      if (res.success) {
        toast({
          variant: "success",
          title: "ویدیو معرفی با موفقیت حذف شد",
        });
        mutate(routes.userRoutes.me);
        onChange(null);
        if (setVideoUrl) {
          setVideoUrl(null);
        }
      } else if (res.error) {
        throw new Error(res.error);
      }
    } else if (fileType === "sample_video" && typeof value == "string") {
      // sample
      deleteFile({
        url: routes.courseRoutes.deleteContent(courseId, contentId),
        fileType: "Video",
        mutateKey: routes.courseRoutes.detail(courseId),
        // onSuccess: () => {
        //   onChange(null);
        //   // if (setVideoUrl) {
        //   //   setVideoUrl(null);
        //   // }
        // },
        toast, // Pass toast as a parameter
        // mutate, // Pass mutate from SWR config
      });
      form.resetField(name);
    } else {
      onChange(null);
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
        if (setVideoUrl) {
          setVideoUrl(null);
        }
      }
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در حذف ویدیو",
      description: e.message,
    });
  }
};
export { UploadContent, deleteFile, handleDeleteContent };
