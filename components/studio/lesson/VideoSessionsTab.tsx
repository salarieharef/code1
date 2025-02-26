"use client";

import { DataTable } from "@/components/global/DataTable";
import { DraggableCards } from "@/components/ui/draggable-card";
import { useToast } from "@/components/ui/use-toast";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { SessionFileActions } from "./SessionFileActions";
import { formatTitleName } from "@/utils/string-formatter";
import CreateCardTeaching from "../teaching-in-kateb/create-card-teaching";
import { getImageUrlBase } from "@/utils/imageUtils";
import NoImageIcon from "@/static/icons/no-image.svg?url";
import { Expand, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export type VideoSession = {
  id: number;
  name: string;
  title: string;
  image: string;
  created_date: string;
};

export default function VideoSessionsTab({ course_id_param }: any) {
  const { toast } = useToast();
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const courseId = course_id_param || searchParams.get("classId");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdVideo, setSelectedIdVideo] = useState(null);

  const [lessons, setLessons]: any[] = useState([]);

  const {
    data: fetchedSessionsData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "VideoSessionsTable",
    () =>
      nextFetcher({
        url: routes.courseRoutes.course_lessons({ page: page, id: courseId }),
        method: "POST",
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (fetchedSessionsData?.data?.length) {
      setLessons(fetchedSessionsData?.data);
    }
  }, [fetchedSessionsData]);

  const openModal = (idVideo: any) => {
    setSelectedIdVideo(idVideo);
    setIsModalOpen(true);
  };
  const handleDeleteVideoSession = async (id: number) => {
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
      accessorKey: "row",
      header: () => <div className='w-4 text-right'></div>,
      cell: ({ row }: any) => <div className='text-center'></div>,
    },
    {
      accessorKey: "row",
      header: () => <div className='w-4 text-right'>ردیف</div>,
      cell: ({ row }: any) => (
        <div className='text-center'>{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "thumbnail",
      header: () => <div></div>, // Empty header as requested
      cell: ({ row }: any) => (
        <div className='relative aspect-video h-24 overflow-hidden rounded-lg'>
          <Image
            src={
              getImageUrlBase(row.original?.image) ||
              getImageUrlBase(row.original?.course?.image) ||
              NoImageIcon
            }
            alt='session-thumbnail'
            className='object-cover p-0'
            fill
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => <div className='text-right'>عنوان جلسه</div>,
      cell: ({ row }: any) => (
        <div>{formatTitleName(row.original?.title, row.original?.name)}</div>
      ),
    },
    // {
    //   accessorKey: "datetime",
    //   header: () => <div className='text-right'>تاریخ و زمان</div>,
    //   cell: ({ row }: any) => (
    //     <div className='flex flex-col items-start justify-start'>
    //       <span className='block'>
    //         {row.original?.created_date?.replace(/-/g, "/")}
    //       </span>
    //       <span className='block text-sm text-slate-400'>
    //         {row.original?.created_time}
    //       </span>
    //     </div>
    //   ),
    // },
    {
      id: "actions",
      header: () => <div className='text-center'>عملیات</div>,
      cell: ({ row }: any) => {
        return (
          <div className='flex items-center justify-center gap-2'>
            <Button
              href={`/studio/lesson/${row.original.id}/details?classId=${courseId}`}
              variant='secondary'
              className='flex h-10 cursor-pointer flex-row items-center justify-start gap-x-1 p-1.5 text-xs  font-normal text-slate-700 hover:text-slate-600'
            >
              <Expand className='h-4 w-4' />
              ویرایش و بارگذاری
            </Button>

            <Button
              href={`/class/${courseId}?lesson=${row.original.id}`}
              variant={"default"}
              className='flex h-10 cursor-pointer flex-row items-center justify-start gap-x-1 p-1.5 text-xs'
            >
              <Eye className='h-4 w-4' />
              مشاهده در کاتب
            </Button>
          </div>
        );
      },
    },
  ];

  const handleReorderVideoSessions = async (newItems: any[]) => {
    // Here you would typically update the order on the server
    // For example: updateLessonOrder(newItems.map(item => item.id).filter(id => id !== 'create-new'))
    const updatedItems = newItems.map((item) => item?.original || item);
    setLessons(updatedItems);

    const sessionPositions = updatedItems?.map((item, index) => ({
      lesson_id: parseInt(item?.id),
      position: index + 1,
    }));
    const reorderResponse = await nextFetcher({
      url: routes.lessonRoutes.reorderLessons(courseId),
      method: "POST",
      body: { positions: sessionPositions },
      useToken: true,
    });

    if (reorderResponse?.success) {
      toast({
        variant: "success",
        title: reorderResponse.msg,
      });
    } else {
      toast({
        variant: "destructive",
        title: reorderResponse.msg,
      });
    }
  };

  return (
    <div>
      {fetchedSessionsData?.data?.length ? (
        <>
          <DataTable
            className='hidden border-none py-8 md:block'
            columns={columns}
            data={lessons}
            loading={isLoading}
            draggableRows={true}
            onReorder={handleReorderVideoSessions}
          />

          {/* Mobile View */}
          <div className='space-y-4 md:hidden'>
            <DraggableCards
              items={lessons || []}
              onReorder={handleReorderVideoSessions}
              showDragHandle={true}
              gripType='vertical'
              dragHandleClassName={
                "absolute right-0 z-10 h-full flex items-center rounded-r-lg bg-slate-800/30 "
              }
              styleIcon={"text-slate-50 size-6"}
              renderItem={(item: any) => {
                return (
                  <div
                    key={item?.id}
                    className='rounded-lg bg-slate-100 p-3 shadow-sm'
                  >
                    <div className='mr-8 flex flex-col items-start gap-2'>
                      <div className='relative flex gap-2 '>
                        <div className='w-32 overflow-hidden rounded-md'>
                          <Image
                            src={
                              getImageUrlBase(item?.image) ||
                              getImageUrlBase(item?.course?.image) ||
                              NoImageIcon
                            }
                            alt='session-thumbnail'
                            className='aspect-video w-full object-cover'
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className='flex'>
                          <h3 className='font-medium'>{item?.name}</h3>
                          {/* <p className='text-sm text-muted-foreground'>
                            {item?.title}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {item?.created_date.replace(/-/g, "/")}
                          </p> */}
                        </div>
                      </div>

                      <div className='absolute left-1.5 top-1.5'>
                        <SessionFileActions
                          sessionId={item?.id}
                          courseId={courseId}
                        />
                      </div>
                    </div>
                  </div>
                );
              }}
              containerClassName='w-full grid-cols-1'
              layout='grid'
              columns={1}
              cardClassName='bg-transparent shadow-none border-none relative'
            />
          </div>
        </>
      ) : !isLoading ? (
        <CreateCardTeaching disableBtn={true} />
      ) : (
        <></>
      )}
    </div>
  );
}
