"use client";
import { nextFetcher } from "@/utils/api/next-fetcher";

type DeleteOptions = {
  url: string; // API endpoint for deletion
  fileType?: string; // File type (PDF, Resume, etc.)
  mutateKey?: string; // Key to invalidate cache in SWR
  onSuccess?: () => void; // Callback for successful deletion
  onError?: () => void; // Callback for failed deletion
  toast?: any; // Toast notification handler
  mutate?: any; // Mutate function from SWR
};

export const DeleteFile = async ({
  url,
  fileType,
  mutateKey,
  onSuccess,
  onError,
  toast,
  mutate,
}: DeleteOptions) => {
  try {
    const res = await nextFetcher({
      url,
      method: "POST",
      useToken: true,
    });

    if (res.success) {
      toast?.({
        variant: "success",
        title: `${fileType} با موفقیت حذف شد`,
      });

      if (mutateKey) {
        mutate?.(mutateKey);
      }

      onSuccess?.();
    } else {
      throw new Error(res.error || "خطا در حذف");
    }
  } catch (e: any) {
    toast?.({
      variant: "destructive",
      title: `خطا در حذف ${fileType}`,
      description: e.message,
    });

    onError?.();
  }
};
