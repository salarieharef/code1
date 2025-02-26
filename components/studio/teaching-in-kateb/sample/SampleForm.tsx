"use client";

import { useUploadWithProgress } from "@/hooks/api/useUploadWithProgress";
import routes from "@/utils/api/routes";
import { FileDataPrepare } from "@/utils/functions/global/prepare-data.function";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useSWRConfig } from "swr";

// Image imports
import Dropzone from "@/components/ui/dropzone";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UploadVideoIcon from "@/static/icons/upload-video.svg?url";
import { cancelRequest } from "@/utils/api/next-fetcher";
import UploadFile from "../upload-file";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { handleDeleteContent } from "@/utils/functions/course/contentOperations.function";
import { useToast } from "@/components/ui/use-toast";
import { find, includes } from "lodash-es";

interface CourseFormProps {
  type?: string;
  courseInfo?: any;
  name?: string;
  read_only?: boolean;
  read_only_video?: boolean;
  PublicCheckbox?: boolean;
}

const SampleForm: React.FC<CourseFormProps> = ({
  type,
  courseInfo,
  name = "part_of_video",
  read_only,
  read_only_video,
}) => {
  const form = useFormContext();

  const {
    progress,
    timeRemaining,
    sizeRemaining,
    totalSize,
    uploadFile,
    isUploading,
  }: any = useUploadWithProgress();

  // const videoUploaded = form.watch(name);

  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const sampleVideoContent = find(
    courseInfo?.contents,
    (content: any) => content?.type == "part_of_video"
  );

  const textButton = (
    <p className='md:text-md my-1 max-w-80 text-center text-sm font-medium leading-6 text-slate-800'>
      <span className='text-blue-500'>کلیک کنید</span> یا فایل‌های ویدیویی را
      برای آپلود بکشید و رها کنید.
      <span className='block py-1 text-xs font-normal text-slate-400'>
        فایل‌های با فرمت MP4, MPG, AVI, MOV (کمتر از 50مگابایت)
      </span>
    </p>
  );

  const description = (
    <>
      <span className='block'>
        حجم ویدئو بیشتر از <span className='font-bold'>50</span> مگابایت و مدت
        زمان ویدئو بیشتر از
        <span className='font-bold'> 5 </span>
        دقیقه نباشد.
      </span>
      <span className='block'>
        این ویدئو می‌تواند برشی از هر قسمتی از آموزش‌های شما باشد.
      </span>
    </>
  );

  const handleUpload = async (file: any) => {
    if (read_only) return;
    if (file) {
      await uploadFile({
        url: routes.courseRoutes.addContent(courseInfo?.id),
        body: FileDataPrepare(file, "part_of_video"),
        requestId: "cancelFetchSampleVideo",
        useToken: true,
      });
      //
      mutate(routes.courseRoutes.detail(courseInfo?.id));
    } else {
      form.resetField(name);
    }
  };

  console.log("video", form.watch(name));

  return (
    <>
      {/* <UploadFile
        textButton={textButton}
        description={description}
        name={name}
        form={form}
        type='video'
        pageType={type}
        placeholder='کلیک کنید یا فایل‌های ویدیویی را برای آپلود بکشید و رها کنید.'
        wrapperClassName='mt-6 px-2 sm:mt-0 sm:px-6 border-none shadow-none max-w-4xl mx-auto'
        noFillClassName='w-full md:w-full h-full aspect-video min-h-96 flex justify-center items-center'
        IconUploadVideo={
          <Image
            src={UploadVideoIcon}
            alt=''
            width={100}
            height={100}
            className='h-12 w-12'
          />
        }
        styleDescription='text-right text-sm text-slate-400 w-full leading-6'
        fileType='sample_video'
        progress={progress}
        read_only_video={read_only_video}
        timeRemaining={timeRemaining}
        sizeRemaining={sizeRemaining}
      /> */}
      <div className='mx-auto mt-6 max-w-3xl space-y-6 border-none px-2 py-4 shadow-none sm:mt-0'>
        <FormField
          control={form.control}
          name={name}
          render={({ field }: any) => (
            <FormItem>
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
                  value={
                    field.value?.file
                      ? field.value.file
                      : includes(field.value?.type, "video")
                        ? field.value
                        : null
                  }
                  mediaStatus={sampleVideoContent?.status}
                  onFileUpload={(file: any) => {
                    field.onChange(file);
                    handleUpload(file);
                  }}
                  icon={
                    <Image
                      src={UploadVideoIcon}
                      alt='video'
                      width={100}
                      height={100}
                      className='h-10 w-10'
                    />
                  }
                  onFileDelete={() =>
                    handleDeleteContent({
                      fileType: "sample_video",
                      toast,
                      mutate,
                      value: field.value?.file || field.value,
                      contentId: sampleVideoContent?.id,
                      courseId: courseInfo?.id,
                      form,
                      name,
                    })
                  }
                  onUploadCancel={() => {
                    try {
                      cancelRequest("cancelFetchSampleVideo");
                      toast({
                        variant: "success",
                        title: "با موفقیت لغو شد.",
                      });
                      field.onChange(null);
                    } catch (error) {
                      toast({
                        variant: "destructive",
                        title: "متوقف شدن با مشکل مواجه شد",
                      });
                    }
                  }}
                  placeholder={textButton}
                  readOnly={read_only_video}
                  styles={{
                    container: field.value ? "opacity-100" : "",
                    dropzone:
                      "mx-auto md:px-8 mt-4 rounded-lg border border-dashed border-blue-400 min-h-96 bg-blue-100 text-sm text-blue-400 cursor-pointer hover:bg-blue-200 hover:text-blue-500 w-full md:w-full  aspect-video flex justify-center items-center",
                    previewContainer: "h-full w-full border p-2 rounded-md",
                    instructions: "text-sm hover:text-blue-500 text-primary",
                  }}
                />
              </FormControl>
              <FormMessage className='text-xs text-red-500' />
            </FormItem>
          )}
        />

        {!read_only ? (
          <p className={"text-sm text-slate-400"}>{description}</p>
        ) : null}
      </div>
    </>
  );
};

export default SampleForm;
