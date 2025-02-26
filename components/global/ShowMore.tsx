import { ReactNode } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import WarningMessageServer from "@/components/warning/warning-message-server";

// Api imports
import useSWRInfinite from "swr/infinite";

// Util imports
import { flatten, get, map } from "lodash-es";
import { Loader2 } from "lucide-react";
import { nextFetcher } from "@/utils/api/next-fetcher";

interface ShowMoreProps {
  url: string;
  api_method?: string;
  limit?: number;
  children: (item: any) => ReactNode;
  skeletonComponent?: ReactNode;
}

function ShowMore({
  url,
  api_method = "GET",
  limit = 10,
  children,
  skeletonComponent,
}: ShowMoreProps) {
  const { data, isLoading, isValidating, error, setSize, size } =
    useSWRInfinite(
      (index) => `${url}&page=${index + 1}&limit=${limit}`,
      (url) =>
        nextFetcher({
          url: url,
          method: api_method,
          useToken: true,
        }),
      {
        revalidateOnFocus: false,
      }
    );

  const allData = flatten(map(data, "data"));
  const totalPages = get(data, "[0].page_number", 0);

  if (!isLoading && error) {
    return (
      <div className='flex w-full justify-center py-8'>
        <WarningMessageServer>ارتباط با سرور برقرار نشد</WarningMessageServer>
      </div>
    );
  }

  const loadMore = async () => {
    if (size < totalPages) {
      await setSize((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className='w-full'>
      {allData.map((item, index) => (
        <div key={index}>{children(item)}</div>
      ))}
      {isLoading && skeletonComponent}
      {size < totalPages && (
        <div className='my-4 flex w-full items-center justify-center'>
          <Button
            onClick={loadMore}
            variant={"ghost"}
            className='gap-1 text-center text-sm font-semibold text-blue-500 hover:bg-blue-400/10 hover:text-blue-500'
          >
            {isValidating || isLoading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                نمایش بیشتر
              </>
            ) : (
              "نمایش بیشتر"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ShowMore;
