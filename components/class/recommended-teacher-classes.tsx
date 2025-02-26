"use client";

// Component imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ClassCard, ClassCardSkeleton } from "./class-card";

// Fetch imports
import routes from "@/utils/api/routes";
import { nextFetcher } from "@/utils/api/next-fetcher";
import useSWR from "swr";

export default function RecommendedTeacherClasses({
  type,
  teacherImage,
  courseDetails,
}: {
  type: "related-courses" | "related-teachers";
  teacherImage?: string;
  courseDetails: any;
}) {
  // const {
  // 	data: classes,
  // 	error,
  // 	isLoading,
  // } = useSWR(
  // 	() => {
  // 		if (type === "related-courses")
  // 			return routes.courseRoutes.coursesRelatedCourses(courseDetails.id);
  // 		else if (type === "related-teachers")
  // 			return routes.courseRoutes.coursesRelatedTeachers(courseDetails.id);
  // 		return null;
  // 	},
  // 	fetcher,
  // 	{ revalidateOnFocus: false }
  // );
  const {
    data: classes,
    error,
    isLoading,
  } = useSWR(
    () => {
      if (type === "related-courses")
        return routes.courseRoutes.coursesRelatedCourses(courseDetails.id);
      else if (type === "related-teachers")
        return routes.courseRoutes.coursesRelatedTeachers(courseDetails.id);
      return null;
    },
    (url) =>
      nextFetcher({
        url: url,
        method: "GET",
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  return (
    <div className='relative mx-18 mt-4'>
      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
        }}
      >
        <CarouselContent>
          {classes?.data?.map((item: any, index: number) => (
            <CarouselItem key={index} className='basis-1/4 py-4'>
              <ClassCard
                image={item?.image}
                title={item?.name}
                teacher={item?.teacher?.name}
                teacherImage={teacherImage}
                duration={item?.lesson_details?.lessons_time}
                studentCount={item?.students_count}
                link={`/class/${item?.id}`}
              />
            </CarouselItem>
          )) || <ClassCardSkeleton />}
        </CarouselContent>
        <CarouselPrevious className='hidden sm:flex' />
        <CarouselNext className='hidden sm:flex' />
      </Carousel>
    </div>
  );
}
