import Image from "next/image";
import Link from "next/link";

// Component imports
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";

export function ClassCard({
  image,
  title,
  teacher,
  teacherImage,
  duration,
  studentCount,
  link,
}: any) {
  return (
    <Link href={link || ""}>
      <Card className='rounded-2xl border-0 shadow'>
        <CardContent className='flex flex-col items-center justify-center p-2'>
          {teacherImage && (
            <Avatar className='absolute right-0 top-0 h-8 w-8 border-b-2 border-amber-500 text-base text-muted-foreground md:h-16 md:w-16'>
              <AvatarImage src={teacherImage || UserNoImageIcon}></AvatarImage>

              <AvatarFallback>
                {teacher ? teacher?.charAt(0).toUpperCase() : null}
              </AvatarFallback>
            </Avatar>
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              className='aspect-square rounded-md object-cover'
              width={250}
              height={250}
            />
          )}
          <h1 className='mt-1 text-center text-xl lg:mt-3 lg:text-2xl'>
            {teacher}
          </h1>
          <h3 className='text-center text-sm text-blue-500'>{title}</h3>
        </CardContent>
        <CardFooter className='flex justify-between pb-2'>
          <span className='flex items-center gap-1 text-xs text-muted-foreground'>
            <Users className='h-3 w-3 text-muted-foreground' />
            {studentCount}
          </span>
          <span className='flex items-center gap-1 text-xs text-muted-foreground'>
            <Clock className='h-3 w-3 text-muted-foreground' />
            {duration}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function ClassCardSkeleton() {
  return (
    <Skeleton className='h-32 w-full overflow-hidden rounded-2xl border-0 shadow-lg' />
  );
}
