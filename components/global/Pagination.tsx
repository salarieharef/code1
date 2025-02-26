// Component imports
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import { cn } from "@/utils/cn";
import { usePagination } from "@mantine/hooks";
import { useMediaQuery } from "@/hooks/ui"; // Add media query hook

type PaginationAdditionalProps = {
  total: number;
  current: number;
  className?: string;
  setPage?: (page: number) => void; // Ensure setPage is passed correctly
};
type PaginationProps = React.PropsWithChildren<PaginationAdditionalProps>;

export function Pagination({
  total,
  current,
  className,
  setPage,
}: PaginationProps) {
  const isMobile = useMediaQuery("(max-width: 450px)"); // Mobile breakpoint
  const isTablet = useMediaQuery("(min-width: 451px) and (max-width: 768px)"); // Tablet breakpoint
  const isLaptop = useMediaQuery("(min-width: 769px)"); // Laptop/Desktop breakpoint

  let maxPagesToShow = 7; // Default for Laptop/Desktop

  // Set number of pages to show based on the device
  if (isMobile) {
    maxPagesToShow = 3; // Show 2 pages for mobile
  } else if (isTablet) {
    maxPagesToShow = 5; // Show 5 pages for tablet
  }

  const pagination = usePagination({ total: total, page: current });

  // Calculate the range of pages to display based on the current page
  const startPage = Math.max(current - Math.floor(maxPagesToShow / 2), 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, total);

  // Filter the range of pages to show including dots for skipped pages
  const range = pagination.range.filter(
    (page) => page === "dots" || (page >= startPage && page <= endPage)
  );

  const handlePreviousClick = () => {
    if (current > 1 && setPage) setPage(current - 1); // Move to previous page
  };

  const handleNextClick = () => {
    if (current < total && setPage) setPage(current + 1); // Move to next page
  };

  return (
    <PaginationComponent>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousClick}
            disabled={current === 1}
            href=''
            scroll={false}
          />
        </PaginationItem>

        {/* Pagination Links */}
        {range.map((page, i) =>
          page === "dots" ? (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem onClick={() => setPage?.(page)} key={i}>
              <PaginationLink
                href=''
                isActive={current === page}
                scroll={false}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextClick}
            disabled={current === total}
            href=''
            scroll={false}
          />
        </PaginationItem>
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
