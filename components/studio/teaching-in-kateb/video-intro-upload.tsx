"use client";

import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Dropzone from "@/components/ui/dropzone";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUploadWithProgress } from "@/hooks/api/useUploadWithProgress";
import { cancelRequest, nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { cn } from "@/utils/cn";
import { find } from "lodash-es";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import useSWRImmutable from "swr/immutable";
import { WrapperOutlineText } from "./WrapperOutlineText";

interface VideoIntroUploadProps {
  type?: "teaching-in-kateb" | "course";
  readOnly?: boolean;
  name?: any;
  PublicCheckbox?: boolean;
}

const VideoIntroUpload: React.FC<VideoIntroUploadProps> = ({
  type,
  readOnly,
  name,
  PublicCheckbox = true,
}) => {
  const { toast } = useToast();
  const form = useFormContext();

  const { data: session }: any = useSession();

  const { data: userInfo } = useSWRImmutable(
    session?.user ? routes.userRoutes.me : null,
    (url) => nextFetcher({ url, useToken: true })
  );
  const { progress, timeRemaining, isUploading, totalSize, uploadFile } =
    useUploadWithProgress();

  const videoUploaded: any = form.watch(name);

  const handleUploadChange = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "title",
        `Video for ${userInfo?.first_name} ${userInfo?.last_name}`
      );

      try {
        const res = await uploadFile({
          url: routes.userRoutes.uploadIntroductionVideo,
          body: formData,
          requestId: "cancel_fetch_introduction_video",
          useToken: true,
        });
        if (!res.success) {
          toast({
            variant: "destructive",
            title: res.msg || "اپلود فایل با مشکل مواجه شد",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "اپلود فایل با مشکل مواجه شد",
        });
      }
    } else {
      form.resetField("file");
      form.resetField("title");
      form.resetField("introduction_video");
    }
  };

  const deleteIntroVideo = async () => {
    try {
      const res = await nextFetcher({
        url: routes.userRoutes.removeIntroductionVideo,
        method: "POST",
        useToken: true,
      });

      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });
      } else if (res.error) {
        throw Error(res.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    }
  };

  const introductionVideoContent = find(
    userInfo?.contents,
    (content: any) => content?.type === "introduction_video"
  );

  return (
    <WrapperOutlineText
      titleBorder='آپلود ویدئو معرفی'
      className={cn("mt-6 px-2 sm:mt-0 sm:px-6")}
      type={type}
    >
      <CardContent className='border-none bg-transparent p-1 shadow-none md:p-4'>
        <div className='flex flex-col items-center justify-center space-y-6 md:px-8'>
          <FormField
            control={form.control}
            name='introduction_video'
            render={({ field }: any) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Dropzone
                    fileType='video'
                    maxFileSize={100 * 1024 * 1024}
                    uploadTimeRemaining={timeRemaining || 0}
                    uploadSizeRemaining={totalSize || 0}
                    showProgressBar
                    uploadProgress={progress}
                    isUploading={isUploading}
                    showPreview
                    showDeleteButton={!isUploading}
                    placeholder='آپلود ویدئو معرفی'
                    value={field.value}
                    mediaStatus={introductionVideoContent?.status}
                    styles={{
                      container: "max-w-4xl mx-auto",
                      dropzone:
                        "group overflow-hidden dark:border-slate-500 mx-auto h-10 w-full items-center rounded-lg border border-dashed border-primary bg-blue-100 cursor-pointer hover:bg-blue-20 md:w-80 mt-6 p-0",
                      previewContainer:
                        "h-full mx-auto w-full max-w-4xl border p-2 rounded-md",
                      instructions: "text-sm hover:text-blue-500 text-primary",
                    }}
                    onChange={(file: any) => {
                      field.onChange(file);
                      if (file) {
                        handleUploadChange(file);
                      }
                    }}
                    onFileDelete={() => {
                      deleteIntroVideo();
                    }}
                    onUploadCancel={() => {
                      try {
                        cancelRequest("cancel_fetch_introduction_video");
                        field.onChange(null);
                        toast({
                          variant: "success",
                          title: "با موفقیت لغو شد.",
                        });
                      } catch (error) {
                        toast({
                          variant: "destructive",
                          title: "متوقف شدن با مشکل مواجه شد",
                        });
                      }
                    }}
                    readOnly={readOnly}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {videoUploaded && PublicCheckbox && !readOnly ? (
            <FormField
              control={form.control}
              name={"is_introduction_video_public"}
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-1'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={"is_introduction_video_public"}
                        disabled={readOnly}
                      />
                    </FormControl>
                    <Label
                      htmlFor={"is_introduction_video_public"}
                      className='text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      مایل به نمایش ویدیو معرفی به عموم هستم.
                    </Label>
                  </div>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          ) : null}
        </div>
      </CardContent>
    </WrapperOutlineText>
  );
};

export default VideoIntroUpload;
