"use client";
import Image from "next/image";
import { useContext } from "react";
import useSWR from "swr";

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modals/modal";

// Context and API
import { global_context } from "@/context/global";

// Custom Components
import RenderWelcomeItems from "./RenderWelcomeItems";
import { UserType } from "@/types/welcome.types";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";

// Types

export default function WelcomeModal() {
  const { welcomeDialog, setWelcomeDialog }: any = useContext(global_context);

  const { data: userInfo, isLoading: userInfoLoading } = useSWR(
    routes.userRoutes.me,
    (url) => nextFetcher({ url, useToken: true })
  );

  const getUserType = (): UserType => {
    if (userInfo?.data?.type === "organ") return "organ";
    if (userInfo?.data?.type === "teacher") return "teacher";
    return "student";
  };

  const userType = getUserType();

  return (
    <Modal
      open={welcomeDialog}
      onOpenChange={setWelcomeDialog}
      size='lg'
      asDrawerInMobile={true}
    >
      <div className='flex flex-col items-center justify-center'>
        <Avatar className='size-32'>
          <AvatarImage src={userInfo?.data?.image} />
          <AvatarFallback>
            <Image
              src='/static/icons/user-no-image.svg'
              width={20}
              height={20}
              alt='profiel'
              className='h-full w-full'
            />
            <div className='absolute bottom-0 mb-1'>
              {userInfo?.data?.first_name?.charAt(0).toUpperCase() ?? ""}
              ‌.
              {userInfo?.data?.last_name?.charAt(0).toUpperCase() ?? ""}
            </div>
          </AvatarFallback>
        </Avatar>
        <div className='my-4 space-y-1'>
          <p className='text-center text-lg font-bold md:text-2xl'>
            {`${userInfo?.data?.name || "کاربر"} عزیز`}
          </p>
          <p className='text-md text-slate-400'>
            به سامانه آموزشی پژوهشی کاتب خوش آمدید
          </p>
        </div>
        <div className='my-6 space-y-2 md:my-8'>
          <RenderWelcomeItems userType={userType} />
        </div>
        <Button
          className='my-2 w-full max-w-xs md:my-4'
          onClick={() => setWelcomeDialog(false)}
        >
          ورود به سایت
        </Button>
      </div>
    </Modal>
  );
}
