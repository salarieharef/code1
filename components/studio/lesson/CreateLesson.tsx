"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// Component imports
import LessonTitleInput from "@/components/global/form/lesson/lesson-title-input";
import VideoPreview from "@/components/global/form/VideoPreview";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

// Icon imports
import { FileVideo, Loader2 } from "lucide-react";

// Util imports
import validations from "@/utils/validations";

// Form imports
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Fetch imports
import LessonDescriptionTextarea from "@/components/global/form/lesson/lesson-description-textarea";
import LessonNameInput from "@/components/global/form/lesson/lesson-name-input";
import Dropzone from "@/components/ui/dropzone";
import UploadIcon from "@/static/icons/upload.svg?url";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import Image from "next/image";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import VideoSessionsTab from "./VideoSessionsTab";

export type Inputs = yup.InferType<typeof validations.LessonCreate>;

export default function CreateLesson() {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const searchParams = useSearchParams();

  const [uploadProgress, setUploadProgress] = useState(0);

  const UploadVideo = async (data: any, lessonId: any) => {
    try {
      const fileFormData = new FormData();
      fileFormData.append("title", data.name);
      fileFormData.append("file", data.file[0]);
      fileFormData.append("file_type", "video_topic");
      const res = await nextFetcher({
        url: routes.lessonRoutes.upload(lessonId),
        method: "POST",
        body: fileFormData,
        options: {
          onUploadProgress: (progressEvent: any) => {
            const { loaded, total } = progressEvent;
            let percentage = Math.floor((loaded * 100) / total);
            setUploadProgress(percentage);
          },
        },
        useToken: true,
      });
      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });

        await mutate("LessonTable");

        form.resetField("name");
        form.resetField("description");
        form.resetField("image");
        form.resetField("file");

        setUploadProgress(0);
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

  const classId = searchParams.get("classId") || searchParams.get("fieldId");

  const form = useForm<Inputs>({
    defaultValues: {
      title: "",
      name: "",
      description: "",
      level: "",
      status: "public",
      course_id: classId || "",
      image: null,
    },
    resolver: yupResolver(validations.LessonCreate),
  });

  const AddLesson: SubmitHandler<Inputs> = async (data: any) => {
    try {
      const res = await nextFetcher({
        url: routes.lessonRoutes.add,
        method: "POST",
        body: {
          name: data.name,
          title: data.title,
          description: data.description,
          level: data.level,
          status: data.status,
          course_id: data.course_id,
        },
        useToken: true,
      });
      const imageFormData = new FormData();
      if (typeof data?.image == "object") {
        imageFormData.append("image", data?.image);
        const image = await nextFetcher({
          url: routes.lessonRoutes.uploadImage(res?.data?.id),
          method: "POST",
          body: imageFormData,
          options: {
            "Content-Type": "multipart/form-data",
          },
          useToken: true,
        });
      }
      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });

        mutate("VideoSessionsTable");
        await UploadVideo(data, res?.data?.id);
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

  const fileValue: any = form.watch("file");

  const { data: courseDetail } = useSWR(
    routes.courseRoutes.detail(classId),
    (url) =>
      nextFetcher({
        url: url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div>
      <Suspense>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(AddLesson)}
            className='flex flex-col items-center'
          >
            <div className='grid w-full gap-4 md:grid-cols-4 lg:grid-cols-6'>
              <div className='sm:col-span-2'>
                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }: any) => (
                    <FormItem>
                      <FormControl>
                        <Dropzone
                          fileType='image'
                          showDeleteButton
                          value={field.value}
                          onChange={field.onChange}
                          styles={{
                            dropzone:
                              "aspect-video w-full h-44 bg-white hover:bg-muted",
                            previewContainer: "p-2 rounded-md w-full",
                            instructions:
                              "max-w-48 text-center text-sm font-normal text-muted-foreground",
                            deleteButton: "left-2 bottom-2",
                            preview: "aspect-video w-full object-cover",
                          }}
                          placeholder='تصویر جلسه خود را انتخاب کنید یا بکشید اینجا (اختیاری)'
                          icon={
                            <Image
                              src={UploadIcon}
                              alt=''
                              width={100}
                              height={100}
                              className='h-12 w-12'
                            />
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid gap-x-2 gap-y-4 sm:col-span-4 sm:grid-cols-4'>
                <div className={`grid gap-2 sm:col-span-full`}>
                  <LessonTitleInput
                    tooltip='میتوانید برای دسته بندی بهتر جلسات، هفته جلسه خود را انتخاب کنید.'
                    required={courseDetail?.data?.section == "university"}
                    week_count={courseDetail?.data?.week_count}
                    section={courseDetail?.data?.section}
                    name='title'
                  />

                  <LessonNameInput required={true} />
                </div>
              </div>
              <div className='col-span-full'>
                <div className='col-span-full'>
                  {fileValue?.length ? (
                    <VideoPreview fileValue={fileValue} />
                  ) : null}
                </div>

                <div>
                  {/* <UploadVideoForm /> */}
                  <FormField
                    control={form.control}
                    name='file'
                    render={({ field }: any) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                            fileType='video'
                            maxVideoDuration={100}
                            maxFileSize={100 * 1024 * 1024}
                            // uploadTimeRemaining={3600}
                            // uploadSizeRemaining={100 * 1024 * 1024}
                            // showProgressBar
                            // uploadProgress={50}
                            // isUploading
                            showPreview={false}
                            showDeleteButton={false}
                            placeholder='ویدئو جلسه خود را انتخاب کنید یا بکشید اینجا'
                            value={field.value}
                            styles={{
                              dropzone:
                                "group gap-1 h-48 w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-500",
                              previewContainer: field.value
                                ? "max-w-4xl mx-auto"
                                : "w-80 border p-2 rounded-md",
                              instructions:
                                "max-w-48 text-center text-sm font-normal text-slate-700",
                            }}
                            icon={
                              <FileVideo className='h-16 w-16 stroke-1 text-slate-700' />
                            }
                            onChange={(files) => {
                              const selectedFiles = Array.isArray(files)
                                ? files
                                : [files];
                              field.onChange(selectedFiles);
                            }}
                          />
                        </FormControl>
                        <FormMessage className='text-xs dark:text-red-500' />
                      </FormItem>
                    )}
                  />

                  <div className='mt-2 flex flex-col items-center'>
                    <small>
                      با ارسال ویدیوهای خود به کاتب، تأیید می‌کنید که با{" "}
                      <Link href='' className='text-primary hover:underline'>
                        شرایط خدمات
                      </Link>{" "}
                      و{" "}
                      <Link href='' className='text-primary hover:underline'>
                        دستورالعمل‌های انجمن کاتب
                      </Link>{" "}
                      موافقت می‌کنید.
                    </small>
                    <small>
                      لطفاً مطمئن شوید که حق چاپ یا حریم خصوصی دیگران را نقض
                      نکنید.{" "}
                      <Link href='' className='text-primary hover:underline'>
                        بیشتر بدانید
                      </Link>
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-span-full w-full'>
              <LessonDescriptionTextarea />
            </div>

            <Button
              className='my-4 w-max px-6'
              type='submit'
              disabled={form.formState.isSubmitting}
              name='Verify'
              size='sm'
            >
              {form.formState.isSubmitting && (
                <Loader2 className='ml-2 h-4 w-4 animate-spin' />
              )}
              ثبت و ایجاد جلسه بعدی
            </Button>

            {form.formState.isSubmitting && uploadProgress ? (
              <div className='flex w-full flex-col items-center justify-center'>
                <div className='mt-4 flex w-full items-center justify-center gap-4'>
                  <span>{uploadProgress}%</span>
                  <Progress value={uploadProgress} className='w-1/2' />
                </div>
                <span>
                  درحال آپلود ویدئو شما هستیم. لطفا تا اتمام آپلود از صفحه خارج
                  نشوید.
                </span>
              </div>
            ) : null}

            {form.formState.isSubmitting ? (
              <span>لطفا شکیبا باشید.</span>
            ) : null}
          </form>
        </Form>
      </Suspense>

      {/* <LessonTable /> */}
      <VideoSessionsTab />
    </div>
  );
}
