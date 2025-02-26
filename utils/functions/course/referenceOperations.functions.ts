// Api imports
import { nextFetcher } from "@/utils/api/next-fetcher";

const deleteReference = async ({
  url,
  mutateKey,
  onSuccess,
  toast,
  mutate, // Receive mutate here
}: any) => {
  try {
    // Send file deletion request
    const response = await nextFetcher({
      url,
      method: "DELETE",
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

export { deleteReference };
