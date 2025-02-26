import { Button } from "@/components/ui/button";
import { BookDashed } from "lucide-react";

interface CreateCardTeachingProps {
  disableBtn?: boolean;
}
export default function CreateCardTeaching({
  disableBtn = false,
}: CreateCardTeachingProps) {
  return (
    <div className='col-span-full flex h-full w-full flex-col items-center justify-center'>
      <BookDashed className='size-40 stroke-[.5] text-muted-foreground md:size-52' />
      <span>شما هنوز محتوایی ایجاد نکرده اید.</span>
      {!disableBtn ? (
        <Button href='/studio/class/create' className='mt-2'>
          درخواست تدریس جدید
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
