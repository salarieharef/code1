"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Component imports
import SortFilter from "@/components/global/filters/sort-filter";
import { Pagination, PaginationSkeleton } from "@/components/global/Pagination";
import { ClassCard } from "@/components/studio/classes/class-card";
import { Separator } from "@/components/ui/separator";
import NoImageIcon from "@/static/icons/no-image.svg?url";

// Auth imports
import routes from "@/utils/api/routes";
import { useSession } from "next-auth/react";

import useSWR from "swr";

// Icon imports
import ApprovalDetails from "@/components/studio/classes/approval-details";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modals/modal";
import { ClassCardSkeletonByOverlay } from "@/components/ui/skeleton-loading/skeletons";
import { useDebounce, useResponsiveLimit } from "@/hooks/ui";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { BookDashed, GalleryVerticalEnd } from "lucide-react";
import CreateCardTeaching from "@/components/studio/teaching-in-kateb/create-card-teaching";

export default function StudioClasses() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("most_recent");
  const [q, setQ] = useState("");
  const [isModalDetails, setIsModalDetails] = useState(false);

  const debouncedSearchQuery = useDebounce(q, 1000);

  // Fetch session data
  const { data: _session } = useSession();
  const session: any = _session;

  const [limit, setLimit] = useState(20); // Default limit

  // Get limit from custom hook
  const responsiveLimit = useResponsiveLimit();

  useEffect(() => {
    setLimit(responsiveLimit);
  }, [responsiveLimit]);

  // Fetch classes based on page, sort, and debounced search query
  // const {
  //   data: classes,
  //   mutate: classesMutate,
  //   isLoading,
  // } = useSWR(
  //   [routes.teacherRoutes.courses({ page, sort }), debouncedSearchQuery],
  //   ([url, searchQuery]) =>
  //     postFetcher(url, { q: searchQuery, exclude_field_introducers: true }),
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: classes,
    mutate: classesMutate,
    isLoading,
  } = useSWR(
    [routes.teacherRoutes.courses({ page, sort, limit }), debouncedSearchQuery],
    ([url, searchQuery]) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          q: searchQuery,
          teacher_organ_type: "-field_introducer",
        },
        useToken: true,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  // Fetch user info
  // const { data: userInfo, isLoading: userInfoLoading } = useSWR(
  //   routes.userRoutes.me,
  //   fetcher
  // );

  const { data: userInfo, isLoading: userInfoLoading } = useSWR(
    routes.userRoutes.me,
    (url) =>
      nextFetcher({
        url,
        useToken: true,
      })
  );

  const handleApprovalDetails = (classData: any) => {
    setIsModalDetails(true); // Open modal when details button is clicked
  };
  return (
    <div className='min-h[100rem] mb-10 w-full rounded-lg bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <div className='flex items-center justify-between'>
        <h1 className='flex gap-1 text-xl font-medium text-blue-900 sm:text-3xl'>
          <GalleryVerticalEnd className='text-blue-400 sm:h-8 sm:w-8' />
          درخواست های تدریس ثبت شده
        </h1>
        {userInfo?.data?.is_user_info_completed ? (
          <Link href={`/studio/class/create`}>
            <Button size='sm'>درخواست تدریس جدید</Button>
          </Link>
        ) : null}
      </div>

      <Modal
        open={isModalDetails}
        onOpenChange={setIsModalDetails}
        size='xl'
        asDrawerInMobile={true}
      >
        <ApprovalDetails />
      </Modal>

      <Separator orientation='horizontal' className='my-4' />

      <SortFilter
        searchPlaceHolder='درس مورد نظر خود را جستجو کنید...'
        sort={sort}
        setSort={setSort}
        onSearch={setQ}
        isLoading={isLoading}
      />

      <div className='space-between mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'>
        {isLoading ? (
          <ClassCardSkeletonByOverlay count={limit} />
        ) : !classes?.data?.length ? (
          <CreateCardTeaching />
        ) : (
          classes?.data?.map((item: any, index: number) => (
            <ClassCard
              key={index}
              id={item?.id}
              isOwned={
                session?.user?.id && item?.teacher?.id === session?.user?.id
              }
              data={item}
              mutate={classesMutate}
              title={item?.name}
              image={item?.image || NoImageIcon}
              videosCount={item?.lesson_details?.lessons_count || 0}
              date={item?.created_date}
              viewCount={item?.stats?.views_count}
              handleApprovalDetails={handleApprovalDetails} // Pass the handler to open modal
            />
          ))
        )}
      </div>

      {isLoading ? (
        <PaginationSkeleton className='mb-4 mt-12' />
      ) : classes?.page_number > 1 ? (
        <Pagination
          className='mb-4 mt-12'
          total={classes?.page_number}
          current={page}
          setPage={setPage}
        />
      ) : null}
    </div>
  );
}
