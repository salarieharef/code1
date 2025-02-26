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
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useEffect } from "react";

export default function ClassFilesTab({}: any) {
  const params = useParams();

  // const {
  //   data: contents,
  //   isLoading: contentsIsLoading,
  //   mutate: mutateContents,
  // } = useSWR(
  //   routes.courseRoutes.contents(params.classId || params.fieldId),
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: contents,
    isLoading: contentsIsLoading,
    mutate: mutateContents,
  } = useSWR(
    routes.courseRoutes.contents(params.classId || params.fieldId),
    (url) => nextFetcher({ url, method: "GET", useToken: true }),
    {
      revalidateOnFocus: false,
    }
  );
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

      <Button
        className='h-full w-full bg-gradient-to-r from-blue-400 to-blue-500'
        onClick={() => append({})}
      >
        <div className='flex flex-col items-center justify-center'>
          <Plus className='h-14 w-14' />
          <span>اضافه کردن مورد جدید</span>
        </div>
      </Button>
    </div>
  );
}
