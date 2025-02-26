"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// Component imports
import { DataTable } from "@/components/global/DataTable";
import { useToast } from "@/components/ui/use-toast";

// Icon imports
import { Pencil, Play, Trash2 } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";

// Util imports
import validations from "@/utils/validations";

// Form imports
import * as yup from "yup";

// Fetch imports
import { DeleteAlert } from "@/components/global/DeleteAlert";
import { Button } from "@/components/ui/button";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export type Inputs = yup.InferType<typeof validations.LessonCreate>;

export default function LessonTable() {
  const { toast } = useToast();
  const params = useParams();
  const [page, setPage] = useState(1);

  const {
    data: lessons,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "LessonTable",
    () =>
      nextFetcher({
        url: routes.teacherRoutes.lessons({ page: page }),
        method: "POST",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const deleteLesson = async (id: number) => {
    try {
      const res = await nextFetcher({
        url: routes.lessonRoutes.delete(id),
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
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: () => <div>جلسه</div>,
      cell: ({ row }: any) => (
        <div className='flex flex-col gap-2 sm:flex-row'>
          <div className='relative flex w-24 overflow-hidden rounded-md'>
            <Image
              src={row?.original?.image || NoImageIcon}
              alt='question-image'
              className='aspect-video w-full object-cover'
              width={200}
              height={200}
            />

            <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
              <div className='rounded p-2 text-white'>
                <Play className='h-5 w-5 fill-current' />
              </div>
            </div>
          </div>
          <div className=' mt-2 flex flex-col items-center sm:mt-0 md:justify-center'>
            {row.getValue("name")}
          </div>
        </div>
      ),
    },

    {
      accessorKey: "title",
      header: () => <div>هفته</div>,
      cell: ({ row }: any) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "date",
      header: () => <div>تاریخ</div>,
      cell: ({ row }: any) => (
        <div className='flex'>
          {row.original.created_date.replace(/-/g, "/")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className='flex items-center justify-center gap-2'>
          <Link href={`${row?.original?.id}/details`}>
            <Button variant='ghost' size='icon'>
              <Pencil className='h-5 w-5 text-blue-400' />
            </Button>
          </Link>
          <DeleteAlert
            title='حذف جلسه'
            message='آیا مطمئن هستید قصد حذف این جلسه را دارید؟'
            onAccept={() => deleteLesson(row?.original?.id)}
          >
            <Button variant='ghost' size='icon'>
              <Trash2 className='h-5 w-5 text-red-400' />
            </Button>
          </DeleteAlert>
        </div>
      ),
    },
  ];

  return (
    <div>
      {lessons?.data?.length ? (
        <DataTable
          className={"border-bottom hidden border-none md:block"}
          columns={columns}
          isLoading={isLoading}
          data={lessons?.data}
        />
      ) : null}
    </div>
  );
}
