"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Dropzone from "react-dropzone";

// Hook imports
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Icon imports
import { FileAudio, FileText, Loader2, Trash2 } from "lucide-react";
import UploadIcon from "@/static/icons/upload.svg?url";

// Util imports
import find from "lodash-es/find";

// Fetch imports
import { DeleteAlert } from "@/components/global/DeleteAlert";
import { Progress } from "@/components/ui/progress";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import validations from "@/utils/validations";

const fileTypes = [
  {
    name: "کتاب الکترونیکی",
    value: "e_book",
    acceptedFile: {
      "audio/mpeg": [".mp3"],
    },
    accept: "mp3",
  },
  {
    name: "جزوه",
    value: "handout",
    acceptedFile: {
      "application/pdf": [".pdf"],
    },
    accept: "pdf",
  },
  {
    name: "کاربرگ",
    value: "worksheet",
    acceptedFile: {
      "application/pdf": [".pdf"],
    },
    accept: "pdf",
  },
];

export type Inputs = yup.InferType<typeof validations.ClassFileCreate>;

export function FileCard({ removeFile, mutate, data }: any) {
  const { toast } = useToast();
  const params = useParams();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const form = useForm<Inputs>({
    resolver: yupResolver(validations.ClassFileCreate),
    defaultValues: {
      type: "",
      file: "",
      title: "",
    },
  });
  const AddFile: SubmitHandler<Inputs> = async (data: any) => {
    if (!data?.id) {
      try {
        const dataFormData = new FormData();
        dataFormData.append("file_type", data.type);
        dataFormData.append("file", data.file[0]);
        dataFormData.append("title", data.title);

        const res = await nextFetcher({
          url: routes.lessonRoutes.addContent(params.lessonId),
          method: "POST",
          body: dataFormData,
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

          mutate();
        } else if (res.error) {
          throw Error(res.error);
        }
      } catch (e: any) {
        toast({
          variant: "destructive",
          title: e.message,
        });
      }
    }
  };

  const removeRemote = async () => {
    try {
      setDeleting(true);
      // const res = await postFetcher(
      //   routes.lessonRoutes.deleteContent(params?.lessonId, data?.id)
      // );
      const res = await nextFetcher({
        url: routes.lessonRoutes.deleteContent(params?.lessonId, data?.id),
        method: "POST",
        useToken: true,
      });

      if (res.success) {
        toast({
          variant: "success",
          title: res.msg,
        });

        mutate();
      } else if (res.error) {
        throw Error(res.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    form.setValue("type", data?.type || "");
    form.setValue("file", data?.file);
    form.setValue("title", data?.title);
  }, [data]);

  const typeValue = form.watch("type");

  return (
    <Card className='h-max overflow-hidden rounded-xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(AddFile)}>
          <CardContent className='flex flex-col gap-y-4 pt-4'>
            <div className='flex items-center gap-2'>
              <div>
                <DeleteAlert
                  title='حذف فایل'
                  message='آیا مطمئن هستید قصد حذف این فایل را دارید؟'
                  onAccept={() => (data?.id ? removeRemote() : removeFile())}
                >
                  <Button variant='destructive' size='icon'>
                    {deleting ? (
                      <Loader2 className='animate-spin' />
                    ) : (
                      <Trash2 />
                    )}
                  </Button>
                </DeleteAlert>
              </div>

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <Select
                      dir='rtl'
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`w-full border-0 bg-secondary focus:ring-0 focus:ring-offset-0`}
                        >
                          <SelectValue placeholder='نوع فایل...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fileTypes.map((type, key) => (
                          <SelectItem value={type.value} key={key}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            </div>

            {typeValue ? (
              <FormField
                control={form.control}
                name='file'
                render={({ field }: any) => (
                  <FormItem>
                    <FormControl>
                      <>
                        {!data?.id ? (
                          <Dropzone
                            multiple={false}
                            onDrop={async (acceptedFile) => {
                              form.setValue("file", acceptedFile);
                            }}
                            // @ts-ignore
                            accept={
                              find(fileTypes, { value: typeValue })
                                ?.acceptedFile || {
                                "application/pdf": [".pdf"],
                              }
                            }
                          >
                            {({
                              getRootProps,
                              getInputProps,
                              acceptedFiles,
                            }) => (
                              <div
                                className={`group flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 px-4 py-2 transition-colors hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-800`}
                                {...getRootProps()}
                              >
                                <div
                                  className={`flex items-center justify-center gap-2`}
                                >
                                  <Image
                                    src={UploadIcon}
                                    alt=''
                                    width={100}
                                    height={100}
                                    className='h-8 w-8'
                                  />
                                  <span className='text-sm text-blue-500'>
                                    فایل مورد نظر خود را برای آپلود اینجا بکشید
                                    و رها کنید.
                                  </span>
                                </div>
                                <input
                                  {...getInputProps()}
                                  type='file'
                                  id='dropzone-file'
                                  className='hidden'
                                />
                              </div>
                            )}
                          </Dropzone>
                        ) : null}

                        {field?.value ? (
                          <div>
                            <div className='flex items-center gap-2'>
                              <div className='rounded-lg border p-1'>
                                {find(fileTypes, { name: typeValue })?.accept ==
                                "mp3" ? (
                                  <FileAudio />
                                ) : (
                                  <FileText />
                                )}
                              </div>

                              {data?.file ? (
                                <a
                                  href={data?.file}
                                  target='_blank'
                                  className='text-primary hover:underline'
                                >
                                  {data?.title}
                                </a>
                              ) : (
                                <span className='truncate'>
                                  {field?.value?.[0]?.name}
                                </span>
                              )}
                            </div>

                            {form.formState.isSubmitting && uploadProgress ? (
                              <div className='mt-4 flex w-full items-center justify-center gap-4'>
                                <span className='text-sm'>
                                  {uploadProgress}%
                                </span>
                                <Progress
                                  value={uploadProgress}
                                  className='h-2 w-full'
                                />
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </>
                    </FormControl>
                    <FormMessage className='text-xs dark:text-red-500' />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    عنوان فایل:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='عنوان فایل خود را وارد کنید...'
                      {...field}
                      type='text'
                      className='border-0 bg-secondary'
                    />
                  </FormControl>
                  <FormMessage className='text-xs dark:text-red-500' />
                </FormItem>
              )}
            />
          </CardContent>

          {!data?.id ? (
            <CardFooter className='flex justify-between p-0'>
              <Button
                className='w-full rounded-none'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                ) : null}
                <span>ثبت</span>
              </Button>
            </CardFooter>
          ) : null}
        </form>
      </Form>
    </Card>
  );
}
