"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Component imports
import LessonMultiClassSelector from "@/components/global/form/lesson/lesson-multi-class-selector";
import LessonTitleInput from "@/components/global/form/lesson/lesson-title-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

// Util imports
import validations from "@/utils/validations";

// Icon imports
import { FileVideo, Loader2 } from "lucide-react";

// Hook imports
import { yupResolver } from "@hookform/resolvers/yup";
import find from "lodash-es/find";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Fetch imports
import LessonDescriptionTextarea from "@/components/global/form/lesson/lesson-description-textarea";
import LessonNameInput from "@/components/global/form/lesson/lesson-name-input";
import Dropzone from "@/components/ui/dropzone";
import { cancelRequest, nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import UploadIcon from "@/static/icons/upload.svg?url";
import { useUploadWithProgress } from "@/hooks/api/useUploadWithProgress";
import VideoSessionsTab from "./VideoSessionsTab";

export type Inputs = yup.InferType<typeof validations.LessonCreate>;

export default function EditLesson() {
  const { toast } = useToast();
  const params = useParams();
  const [lessonCourseId, setLessonCourseId]: any = useState("");

  const lessonId: any = params.lessonId;

  const searchParams = useSearchParams();

  // const { data: lesson } = useSWR(
  //   routes.lessonRoutes.details(lessonId),
  //   fetcher
  // );
  const { data: lesson, mutate } = useSWR(
    routes.lessonRoutes.details(lessonId),
    (url) =>
      nextFetcher({
        url,
        method: "GET",
        useToken: true,
      })
  );

  const {
    progress,
    timeRemaining,
    sizeRemaining,
    isUploading,
    totalSize,
    uploadFile,
  } = useUploadWithProgress();

  const UploadVideo = async (data: any, lessonId: any) => {
    if (data) {
      const fileFormData = new FormData();
      fileFormData.append("title", data.name);
      fileFormData.append("file", data.file);
      fileFormData.append("file_type", "video_topic");
      await uploadFile({
        url: routes.lessonRoutes.upload(lessonId),
        body: fileFormData,
        requestId: `LessonVideoUpload${lessonId}`,
        useToken: true,
      });

      mutate(routes.lessonRoutes.details(lessonId));
    } else {
      form.resetField("title", data.name);
      form.resetField("file", data.file);
    }
  };

  const form = useForm<Inputs>({
    shouldUnregister: false,
    defaultValues: {
      title: "",
      name: "",
      description: "",
      level: "",
      status: "public",
      course_id: searchParams.get("classId") || "",
      image: null,
      file: undefined,
      // selectedCourseSection: lesson?.data?.course?.section || "", // for validation weekTitle

    },
    resolver: yupResolver(validations.LessonCreate),
  });
  const EditLesson: SubmitHandler<Inputs> = async (data: any) => {
    try {
      const res = await nextFetcher({
        url: routes.lessonRoutes.edit(lessonId),
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

      if (typeof data?.image == "object") {
        const imageFormData = new FormData();
        imageFormData.append("image", data?.image);
        await nextFetcher({
          url: routes.lessonRoutes.uploadImage(lessonId),
          method: "POST",
          body: imageFormData,
          useToken: true,
        });
      }
      if (res.success) {
        if (typeof data?.file == "object") {
          await UploadVideo(data, lessonId);
        } else {
          toast({
            variant: "success",
            title: res.msg,
          });
          mutate(routes.lessonRoutes.details(lessonId));
        }
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

  useEffect(() => {
    form.setValue("course_id", lesson?.data?.course_id || "");
    setLessonCourseId(lesson?.data?.course_id);
    // don't resend image after mutating video
    if (!form.watch("image")) {
      form.setValue("image", lesson?.data?.image);
    }
    form.setValue(
      "file",
      find(lesson?.data?.contents, { type: "video_topic" })?.file
    );
    form.setValue("name", lesson?.data?.name);
    form.setValue("title", lesson?.data?.title);
    form.setValue("description", lesson?.data?.description);
    form.setValue("level", lesson?.data?.level);
  }, [lesson]);

  const fileValue: any = form.watch("file");
  const content: any = find(lesson?.data?.contents, {
    type: "video_topic",
  });

  const deleteLesson = async (id: number) => {
    try {
      const res = await nextFetcher({
        url: routes.lessonRoutes.deleteContent(lessonId, id),
        method: "POST",
        useToken: true,
      });

      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });
        mutate(routes.lessonRoutes.details(lessonId));
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

  return (
    <>
      <Suspense>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(EditLesson)}
            className='flex flex-col gap-4'
          >
            <Badge
              className={`mb-2 w-max self-center sm:self-auto`}
              variant={lesson?.data?.is_active ? "success" : "destructive"}
            >
              {lesson?.data?.is_active
                ? "جلسه شما از طرف ادمین فعال شده است"
                : "جلسه شما از طرف ادمین هنوز فعال نشده است"}
            </Badge>
            <div className='grid w-full gap-4 sm:grid-cols-2'>
              <div>
                <LessonMultiClassSelector />

                {/* <ReusableFileDropzone
                name='image'
                placeholder='تصویر جلسه خود را انتخاب کنید یا بکشید اینجا (اختیاری)'
                showPreview={true}
              /> */}

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
                            deleteButton: "bottom-2 left-2 top-auto",
                            preview: "object-cover aspect-video w-full",
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
              <div className='flex flex-col gap-4'>
                <LessonTitleInput
                  tooltip='میتوانید برای دسته بندی بهتر جلسات، هفته جلسه خود را انتخاب کنید.'
                  required={lessonCourseId?.section === "university"}
                  week_count={lesson?.data?.course?.week_count}
                  section={lesson?.data?.course?.section}
                  name='title'
                />
                <LessonNameInput required={true} />
              </div>
            </div>

            <div className='grid gap-x-2 gap-y-4 sm:col-span-4 xl:grid-cols-4'>
              <div className='col-span-full'>
                {/* <div className='col-span-full'>
                <VideoStatus
                  fileValue={fileValue}
                  contentStatus={contentStatus}
                />
              </div> */}

                <div className='col-span-full mt-4'>
                  {/* <UploadVideoForm name='file' /> */}

                  <FormField
                    control={form.control}
                    name='file'
                    render={({ field }: any) => (
                      <FormItem>
                        <FormControl>
                          <Dropzone
                            name='file'
                            fileType='video'
                            // maxFileSize={totalSize || 0}
                            uploadTimeRemaining={timeRemaining || 0}
                            uploadSizeRemaining={totalSize || 0}
                            showProgressBar
                            uploadProgress={progress}
                            isUploading={isUploading}
                            showPreview
                            canDropAgain
                            showDeleteButton={!isUploading}
                            placeholder='ویدئو جلسه خود را انتخاب کنید یا بکشید اینجا'
                            value={field.value}
                            mediaStatus={content?.status}
                            styles={{
                              dropzone:
                                "group gap-1 h-48 w-full m  rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-500",
                              previewContainer:
                                "h-full w-full border p-2 rounded-md",
                              instructions:
                                "max-w-48 text-center text-sm font-normal text-slate-700",
                            }}
                            icon={
                              <FileVideo className='h-16 w-16 stroke-1 text-muted-foreground' />
                            }
                            onChange={(file) => {
                              field.onChange(file);
                              if (file) {
                                UploadVideo(form.getValues(), lessonId);
                              }
                            }}
                            onFileDelete={() => deleteLesson(content?.id)}
                            onUploadCancel={() =>
                              cancelRequest(`LessonVideoUpload${lessonId}`)
                            }
                          />
                        </FormControl>
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

            <div className='mt-4 w-full sm:col-span-full'>
              <LessonDescriptionTextarea />
            </div>

            <div className='flex flex-col items-center justify-center'>
              <Button
                className='mt-4 w-max rounded text-lg'
                name='Save'
                type='submit'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                )}
                ذخیره
              </Button>

              {form.formState.isSubmitting && progress ? (
                <div className='flex w-full flex-col items-center justify-center'>
                  <div className='mt-4 flex w-full items-center justify-center gap-4'>
                    <span>{progress}%</span>
                    <Progress value={progress} className='w-1/2' />
                  </div>
                  <span>
                    درحال آپلود ویدئو شما هستیم. لطفا تا اتمام آپلود از صفحه
                    خارج نشوید.
                  </span>
                </div>
              ) : null}

              {form.formState.isSubmitting ? (
                <span>لطفا شکیبا باشید.</span>
              ) : null}
            </div>
          </form>
        </Form>
      </Suspense>
      <VideoSessionsTab />
    </>
  );
}
