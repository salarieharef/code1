"use client";
import { useParams } from "next/navigation";

// Component imports
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";

// Icon imports
import { Plus } from "lucide-react";
import { FileCard } from "./file-card";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Util imports
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { filter } from "lodash-es";
import { useEffect } from "react";
import { nextFetcher } from "@/utils/api/next-fetcher";

export default function LessonFilesTab({}: any) {
  const params = useParams();

  // const {
  //   data: contents,
  //   isLoading: contentsIsLoading,
  //   mutate: mutateContents,
  // } = useSWR(routes.lessonRoutes.contents(params.lessonId), fetcher, {
  //   revalidateOnFocus: false,
  // });
  const {
    data: contents,
    isLoading: contentsIsLoading,
    mutate: mutateContents,
  } = useSWR(
    routes.lessonRoutes.contents(params.lessonId),
    (url) =>
      nextFetcher({
        url,
        method: "GET",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  if (contents?.data) {
    contents.data = filter(
      contents?.data,
      (content) => content.type !== "video_topic"
    );
  }

  const { control, setValue } = useForm({ defaultValues: { files: [{}] } });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<
    any,
    any,
    any
  >({
    name: "files",
    control: control,
    keyName: "_id",
  });

  useEffect(() => {
    setValue("files", contents?.data);
  }, [contents]);

  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {contentsIsLoading ? (
        <>
          <Skeleton className='h-52 w-full' />
          <Skeleton className='h-52 w-full' />
        </>
      ) : (
        fields.map((field, index) => (
          <FileCard
            key={field._id}
            removeFile={() => remove(index)}
            mutate={mutateContents}
            data={field}
          />
        ))
      )}
      <div className='h-20 sm:max-h-10'>
        <Button
          className='h-10 w-full bg-gradient-to-r from-blue-400 to-blue-500 sm:max-h-10'
          onClick={() => append({})}
        >
          <div className='flex flex-col items-center justify-center'>
            <Plus className='h-14 w-14' />
            <span>اضافه کردن مورد جدید</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
