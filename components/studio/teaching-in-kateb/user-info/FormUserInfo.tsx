"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

// Hook imports
import { useHasChanges } from "@/hooks/state"; // Import the custom hook

// Lib imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";

// Type imports
import { AccountInfoType } from "@/types/account-info";

// Util imports
import { UploadAvatar } from "@/utils/functions/user/avatarOperations.function";
import {
  UpdateUserBody,
  UploadEducationCertificate,
  UploadIntroductionVideo,
  UploadResume,
  defaultValues,
  setDefaultValues,
} from "@/utils/functions/user/infoOperations.function";
import validations from "@/utils/validations";

// Form imports
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";
import AccessModal from "../AccessModal";
import UserInfoFormContent from "./user-info-form-content";

export default function FormUserInfo({
  type,
}: {
  type?: "teaching-in-kateb" | "course";
}) {
  const params = useParams();
  const courseId = params?.id || params?.classId;
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isAccessModalOpen, setAccessModalOpen] = useState(false);

  const isEditing = Boolean(courseId);

  const [avatarProgress, setAvatarProgress] = useState(0);
  const [resumeProgress, setResumeProgress] = useState(0);
  const [educationFileProgress, setEducationFileProgress] = useState(0);
  const [introductionVideoProgress, setIntroductionVideoProgress] = useState(0);

  const methods = useForm<AccountInfoType>({
    defaultValues: defaultValues,
    resolver: yupResolver(validations.AccountInfo),
  });

  // Use the custom hook to track changes in the form
  const { setHasChanges, setIsInitialLoad } = useHasChanges(methods);

  const { data: userInfo } = useSWR(
    routes.userRoutes.me,
    (url) => nextFetcher({ url, useToken: true }),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (userInfo) {
      setIsInitialLoad(true);
      setDefaultValues(methods, userInfo?.data);
      setIsInitialLoad(false);
    }
  }, [userInfo, methods]);

  const updateUser: SubmitHandler<AccountInfoType> = async (
    data: AccountInfoType
  ) => {
    delete data.mobile;

    // If no changes were made, check validation before doing nothing
    // if (!hasChanges) {
    //   // If validation is successful, perform the additional action (push)
    //   router.push("?step=2");
    //   toast({ variant: "info", title: "تغییری در فرم وجود ندارد" });
    //   return;
    // }

    try {
      // Continue with the existing logic for updating the user
      if (data?.avatar && typeof data?.avatar !== "string") {
        UploadAvatar(data, toast, mutate, setAvatarProgress);
      }

      if (data?.education_image && typeof data?.education_image !== "string") {
        UploadEducationCertificate(data, toast, setEducationFileProgress);
      }

      if (
        data?.introduction_video &&
        typeof data?.introduction_video !== "string"
      ) {
        UploadIntroductionVideo(data, toast, setIntroductionVideoProgress);
      }

      if (data?.resume && typeof data?.resume !== "string") {
        UploadResume(data, toast, setResumeProgress);
      }

      delete data.avatar;
      delete data.education_image;
      delete data.introduction_video;
      delete data.resume;

      const res = await nextFetcher({
        url: routes.userRoutes.edit,
        method: "POST",
        body: UpdateUserBody(data, type || ""),
        useToken: true,
      });

      if (res.success) {
        toast({ variant: "success", title: res.msg });

        if (type == "course") {
          router.push(`?step=2`);
        }
      } else if (res.error) {
        throw new Error(res.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "خطا در به‌روزرسانی اطلاعات",
        description: e.message,
      });
    }
    setHasChanges(false);
  };

  return (
    <>
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(updateUser)}
          dir='rtl'
          className='mt-8'
        >
          <UserInfoFormContent
            userInfo={userInfo?.data}
            avatarProgress={avatarProgress}
            resumeProgress={resumeProgress}
            educationFileProgress={educationFileProgress}
            introductionVideoProgress={introductionVideoProgress}
          />

          {/* Submit button */}
          <div className='mt-4 flex w-full items-center justify-center pb-8'>
            <Button
              type='submit'
              className='w-44'
              disabled={
                methods.formState.isSubmitting || !methods.watch("rules_agreed")
              }
            >
              {methods.formState.isSubmitting ? (
                <Loader2 className='h-5 w-5 animate-spin py-4' />
              ) : null}
              {type == "teaching-in-kateb" ? "تایید و مرحله بعد" : "تایید"}
            </Button>
          </div>
        </form>
        <AccessModal
          isAccessModalOpen={isAccessModalOpen}
          setAccessModalOpen={setAccessModalOpen}
          type='pendingRequest'
          // step
        />
      </Form>
    </>
  );
}
