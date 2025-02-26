"use client";
import Image from "next/image";
import { useContext, useState } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ClassCardSkeleton } from "../home/class-card";
import UnitAchievements from "./UnitAchievements";
import UniversityCourseStats from "./UniversityCourseStats";
import UniversityStudentStats from "./UniversityStudentStats";
import UniversityTeacherStats from "./UniversityTeacherStats";
import UniversityDepartments from "./department/UniversityDepartments";

// Icon imports
import { ArrowRight, Play } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";

// Context imports
import { university_context } from "@/context/university";
import { UniversitryDetailImageModal } from "./modals/UniversitryDetailImageModal";

// Fetch imports
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";
import { Ratings } from "../ui/Ratings";

export default function UniversityDetailSidebar({ className }: any) {
  const {
    setUniversityIdForDetail,
    setShowUniversityDetail,
    universityIdForDetail,
    isImageDetailOpen,
    setIsImageDetailOpen,
    selectedImage,
    setSelectedImage,
  }: any = useContext(university_context);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [descriptionRange, setDescriptionRange] = useState(300);

  // const {
  //   data: university,
  //   error,
  //   isLoading,
  // } = useSWR(
  //   [
  //     routes.homeRoutes.universityDetails({ id: universityIdForDetail })
  //       ?.url,
  //   ],
  //   ([url]) =>
  //     apiFetcher(
  //       url,
  //       routes.homeRoutes.universityDetails({ id: universityIdForDetail })
  //         .method
  //     ),
  //   { revalidateOnFocus: false }
  // );
  const {
    data: university,
    error,
    isLoading,
  } = useSWR(
    () => [
      routes.homeRoutes.universityDetails({ id: universityIdForDetail })?.url,
    ],
    ([url]) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.universityDetails({
          id: universityIdForDetail,
        }).method,
        // useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  const closeUniversityDetails = () => {
    // Set the universityId state
    setUniversityIdForDetail(0);
    setShowUniversityDetail(false);
  };

  const description = university?.data?.description;
  const truncatedDescription = `${description?.slice(0, descriptionRange)}...`; // slice range

  return (
    <aside
      className={`${className} flex h-[70vh] flex-col items-start overflow-y-auto lg:h-[100vh]`}
    >
      <Separator
        orientation='horizontal'
        className='mt-5 bg-transparent pt-2'
      />
      <div className='flex w-full flex-col justify-between px-4 lg:px-1'>
        <div className='flex flex-row items-center'>
          <Button
            variant={"ghost"}
            className='h-fit w-fit p-0 hover:bg-transparent'
            onClick={() => closeUniversityDetails()}
          >
            <ArrowRight className='h-5 w-5 text-blue-900' />
          </Button>

          {isLoading ? (
            <Skeleton className='h-4 w-full' />
          ) : (
            <span className='text-md xl:text-md font-bold text-blue-900 lg:text-sm'>
              معرفی {university?.data?.name}
            </span>
          )}
        </div>

        <div className='mx-5 flex flex-row justify-start'>
          <Ratings
            rating={university?.data?.stats?.avg_rate || 0}
            variant='yellow'
            size={16}
          />
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
        }}
        className={`mb-2 mt-4 w-full px-4 ${false ? "overflow-x-scroll" : ""}`}
      >
        <CarouselContent>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className='basis-2/5'>
                  <ClassCardSkeleton className='h-96' />
                </CarouselItem>
              ))
            : university?.data?.contents.map((content: any, key: number) => (
                <CarouselItem key={key} className='basis-2/5'>
                  <Card
                    className={`w-full border-0 shadow-none ${className} overflow-hidden`}
                  >
                    <CardContent
                      className='relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg p-0'
                      onClick={() => {
                        setSelectedImage(key);
                        setIsImageDetailOpen(true);
                      }}
                    >
                      <Image
                        src={
                          content?.format == "video"
                            ? NoImageIcon
                            : content?.file || NoImageIcon
                        }
                        alt={content?.name || ""}
                        className='aspect-video w-full object-cover'
                        width={500}
                        height={500}
                        priority
                      />
                      {content?.format == "video" ? (
                        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-slate-900/10 text-white'>
                          <Play className='fill-current' />
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" /> */}
      </Carousel>

      <div className='mt-2 flex w-full flex-col items-start gap-x-2 px-4 py-0'>
        <span
          className='flex items-center gap-x-1 text-xs text-slate-500 dark:text-slate-300'
          dangerouslySetInnerHTML={{
            __html: isDescriptionExpanded ? description : truncatedDescription,
          }}
        ></span>
        {description?.length > descriptionRange && (
          <Button
            variant={"ghost"}
            className='m-0 h-fit w-fit bg-transparent p-0 text-[0.65rem] font-medium text-blue-600 hover:bg-transparent hover:text-blue-900'
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            {isDescriptionExpanded ? "بستن" : "نمایش بیشتر"}
          </Button>
        )}
      </div>
      {/* details sub section */}
      <Separator orientation='horizontal' className='my-2' />

      <UniversityTeacherStats
        totalCount={university?.data?.stats?.teachers_counts}
        maleCount={university?.data?.stats?.male_teachers_count}
        femaleCount={university?.data?.stats?.female_teachers_count}
        id={university?.data?.id}
      />

      <Separator orientation='horizontal' className='my-2' />

      <UniversityStudentStats
        totalCount={university?.data?.stats?.student_counts}
        maleCount={university?.data?.stats?.male_students_count}
        femaleCount={university?.data?.stats?.female_students_count}
      />

      <Separator orientation='horizontal' className='my-2' />

      <UniversityCourseStats
        totalCount={university?.data?.stats?.course_count}
        id={university?.data?.id}
      />
      <Separator orientation='horizontal' className='my-2' />

      {university?.data?.categories &&
        university?.data?.categories.length > 0 && (
          <>
            <UniversityDepartments
              categories={university?.data?.categories}
              isLoading={isLoading}
            />
            <Separator orientation='horizontal' className='my-2' />
          </>
        )}
      {/* 
      <UniversitySchools />

      <Separator orientation="horizontal" className="my-2" />

      <UniversitySkills />

      <Separator orientation="horizontal" className="my-2" /> */}

      <UnitAchievements universityId={universityIdForDetail} />

      <Separator orientation='horizontal' className='my-2' />

      {/* modals */}
      <UniversitryDetailImageModal
        isOpen={isImageDetailOpen}
        onClose={() => setIsImageDetailOpen(false)}
        startIndex={selectedImage}
        onStartIndexChange={setSelectedImage}
        data={university?.data}
      />
    </aside>
  );
}
