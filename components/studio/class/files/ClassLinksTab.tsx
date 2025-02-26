"use client";
import { useParams } from "next/navigation";

// Component imports
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { useFieldArray, useForm } from "react-hook-form";
import { LinkCard } from "./link-card";

// Icon imports
import { Plus } from "lucide-react";

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR from "swr";

// Util imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useEffect } from "react";

export default function ClassLinksTab({}: any) {
  const params = useParams();

  // const {
  //   data: links,
  //   isLoading: linksIsLoading,
  //   mutate: mutateLinks,
  // } = useSWR(
  //   routes.courseRoutes.links(params.classId || params.fieldId),
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: links,
    isLoading: linksIsLoading,
    mutate: mutateLinks,
  } = useSWR(
    routes.courseRoutes.links(params.classId || params.fieldId),
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
    setValue("files", links?.data);
  }, [links]);

  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {linksIsLoading ? (
        <>
          <Skeleton className='h-52 w-full' />
          <Skeleton className='h-52 w-full' />
        </>
      ) : (
        fields.map((field, index) => (
          <LinkCard
            key={field._id}
            removeFile={() => remove(index)}
            mutate={mutateLinks}
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
