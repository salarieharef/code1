"use client";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-4'>
      <h2 className='text-2xl font-semibold'>مشکلی پیش آمد!</h2>
      <Button
        className='bg-primary transition-colors hover:bg-primary/90'
        size='lg'
        onClick={reset}
      >
        دوباره امتحان کنید
      </Button>
    </div>
  );
}
