import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/utils/cn";
import { usePagination } from "@mantine/hooks";
import dropRightWhile from "lodash-es/dropRightWhile";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

type PaginationAdsProps = {
  total: number;
  current: number;
  className?: string;
};

export function PaginationAds({
  total,
  current,
  className,
}: PaginationAdsProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  // Calculate the pagination range
  const pagination = usePagination({ total: total, page: current });
  const range = dropRightWhile(
    pagination.range,
    (element, index, collection) => {
      return element === "dots" && index >= collection.length - 2;
    }
  );

  return (
    <PaginationComponent className={className}>
      <PaginationContent>
        {range.map((page, i) =>
          page == "dots" ? (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem onClick={() => handlePageChange(page)} key={i}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={current == page}
                scroll={false}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
      </PaginationContent>
    </PaginationComponent>
  );
}

export function PaginationSkeleton({ className }: any) {
  return (
    <div className={cn(`flex items-center justify-center gap-3`, className)}>
      <Skeleton className='h-10 w-10 rounded-sm' />
      <Skeleton className='h-10 w-10 rounded-sm' />
      <Skeleton className='h-10 w-10 rounded-sm' />
      <Skeleton className='h-10 w-10 rounded-sm' />
    </div>
  );
}
