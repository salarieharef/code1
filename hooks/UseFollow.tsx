"use client";

import { useToast } from "@/components/ui/use-toast";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { useState } from "react";

export interface FollowResponse {
  success: boolean;
  msg: string;
}

export const useFollow = (mutate: any) => {
  const { toast } = useToast();
  const [following, setFollowing] = useState<string>("");

  // Function to follow a user
  const Follow = async (id: string) => {
    try {
      setFollowing(id); // Show spinner

      const res: FollowResponse = await nextFetcher({
        url: routes.userRoutes.follow,
        method: "POST",
        body: { user_id: id },
        useToken: true,
      });

      if (res.success) {
        // await mutate(mutateKey, { revalidate: true });
        if (mutate) {
          await mutate();
        }
        toast({ variant: "success", title: res.msg });
      } else {
        toast({ variant: "destructive", title: "خطا در دنبال کردن" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFollowing(""); // Hide spinner
    }
  };

  // Function to unfollow a user
  const UnFollow = async (id: string) => {
    try {
      setFollowing(id); // Show spinner

      const res: FollowResponse = await nextFetcher({
        url: routes.userRoutes.unFollow,
        method: "POST",
        body: { user_id: id },
        useToken: true,
      });

      if (res.success) {
        // await mutate(mutateKey, { revalidate: true });
        if (mutate) {
          await mutate();
        }
        toast({ variant: "success", title: res.msg });
      } else {
        toast({ variant: "destructive", title: "خطا در لغو دنبال کردن" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFollowing(""); // Hide spinner
    }
  };

  return { following, Follow, UnFollow };
};
