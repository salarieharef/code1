import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { global_context } from "@/context/global";
import { useSession } from "next-auth/react";

interface StepperNavigationProps {
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onBack: () => void;
}

const StepperNavigation: React.FC<StepperNavigationProps> = ({
  hasNext,
  hasPrevious,
  onNext,
  onBack,
}) => {
  const { setTeachingHelpDialog }: any = useContext(global_context);
  const { data: session }: any = useSession();

  return (
    <div className='mt-4 flex justify-center gap-4'>
      {hasNext ? (
        <Button onClick={onNext}>مرحله بعدی</Button>
      ) : (
        <Link
          href={
            "/studio/teaching-in-kateb/course/add"
            // session?.user?.teaching_in_kateb && session?.user?.type == "teacher"
            // ?
            // : "/studio/teaching-in-kateb"
          }
        >
          <Button onClick={() => setTeachingHelpDialog(false)}>
            تدریس در کاتب
          </Button>
        </Link>
      )}
      {hasPrevious && (
        <Button onClick={onBack} variant='outline'>
          مرحله قبلی
        </Button>
      )}
    </div>
  );
};

export default StepperNavigation;
