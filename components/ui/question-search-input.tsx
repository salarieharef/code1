"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Component imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icon imports
import { Search } from "lucide-react";
import { Suspense } from "react";
// Form imports
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { Form, FormControl, FormField, FormItem } from "../../ui/form";

type QuestionSearchInputProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

export function QuestionSearchInput({
  placeholder = "",
  onSearch = () => {},
}: QuestionSearchInputProps) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();

  return (
    <div className='flex w-full items-center overflow-hidden rounded-md border border-slate-300 bg-white'>
      <Suspense>
        <Input
          type='text'
          placeholder={placeholder}
          onInput={(e: any) => onSearch(e.target.value)}
          className='rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        <Button
          variant='ghost'
          size='icon'
          className='mr-2 hover:bg-transparent'
          name='Search'
        >
          <Search className='h-4 w-4 stroke-[1.5] text-slate-600' />
        </Button>
      </Suspense>
    </div>
  );
}
