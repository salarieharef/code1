"use client";

import Link from "next/link";
import { CircleOff, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import WarningMessageServer from "@/components/warning/warning-message-server";

interface ErrorBoundaryProps {
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  notFoundComponent?: React.ReactNode;
  noDataComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
  serverErrorComponent?: React.ReactNode;
  data: any;
  isLoading: boolean;
  error: any;
  children: React.ReactNode;
}

export default function ErrorBoundary({
  loadingComponent,
  errorComponent,
  notFoundComponent,
  noDataComponent,
  unauthorizedComponent,
  data,
  isLoading,
  error,
  children,
}: ErrorBoundaryProps) {
  // Show loading component if data is still being fetched
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  // If data is loaded but empty, render nothing
  if (!isLoading && data?.data?.length === 0) {
    return null;
  }

  // Handle error scenarios
  if (!isLoading && error) {
    // If error is 401, show unauthorized message

    if (error?.response?.status === 401) {
      return (
        <>
          {unauthorizedComponent ? (
            unauthorizedComponent
          ) : (
            <div className='flex h-screen w-full flex-col items-center justify-center gap-2'>
              <CircleOff className='h-8 w-8 stroke-1.5' />
              شما به این محتوا دسترسی ندارید
              <Link href='/'>
                <Button size='sm'>صفحه اصلی</Button>
              </Link>
            </div>
          )}
        </>
      );
    }

    // If error is 500 or data fetching failed, show server error message
    if (error?.response?.status === 500 || !data || !data.success) {
      return (
        <>
          {errorComponent ? (
            errorComponent
          ) : (
            <div className='flex w-full justify-center py-8'>
              <WarningMessageServer className='md:text-white'>
                ارتباط با سرور برقرار نشد
              </WarningMessageServer>
            </div>
          )}
        </>
      );
    }
  }

  // Handle 404 not found scenario
  if (!isLoading && !data?.success && data?.code === 404) {
    return (
      <>
        {notFoundComponent ? (
          notFoundComponent
        ) : (
          <div className='flex h-screen w-full flex-col items-center justify-center gap-2'>
            <SearchX className='h-8 w-8 stroke-1.5' />
            {data?.msg}
            <Link href='/'>
              <Button size='sm'>صفحه اصلی</Button>
            </Link>
          </div>
        )}
      </>
    );
  }

  // Render children if no errors and data is successfully fetched
  return <>{children}</>;
}
