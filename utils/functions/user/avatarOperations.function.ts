// Api imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";

const UploadAvatar = async (
  image: any,
  toast?: any,
  mutate?: any,
  setProgress?: any
) => {
  try {
    const fileFormData = new FormData();
    fileFormData.append("image", image);

    const res = await nextFetcher({
      url: routes.userRoutes.avatar,
      method: "POST",
      body: fileFormData,
      useToken: true,
      options: {
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded * 100) / total);
          if (setProgress) {
            setProgress(percentage);
          }
        },
      },
    });

    if (res.success) {
      toast({
        variant: "success",
        title: "عکس پروفایل با موفقیت آپلود شد",
      });
      mutate(routes.userRoutes.me);
    } else if (res.error) {
      throw new Error(res.error);
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در آپلود عکس پروفایل",
      description: e.message,
    });
  } finally {
    if (setProgress) {
      setProgress(0);
    }
  }
};

// Function to delete avatar
const DeleteAvatar = async (
  toast?: any,
  mutate?: any,
  session?: any,
  update?: any
) => {
  try {
    const res = await nextFetcher({
      url: routes.userRoutes.remove,
      method: "POST",
      useToken: true,
    });

    if (res.success) {
      toast({
        variant: "success",
        title: "عکس پروفایل با موفقیت حذف شد",
      });
      await update({ user: { data: { ...session?.user, image: null } } });
      mutate(routes.userRoutes.me);
    } else if (res.error) {
      throw new Error(res.error);
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در حذف عکس پروفایل",
      description: e.message,
    });
  }
};

export { DeleteAvatar, UploadAvatar };
