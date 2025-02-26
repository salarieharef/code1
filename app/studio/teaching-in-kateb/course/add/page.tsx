"use client";
import ProgressCircle from "@/components/global/ProgressCircle";
import SwitchStepsTeaching from "@/components/studio/teaching-in-kateb/SwitchStepsTeaching";
import WrapperTeachingInKateb from "@/components/studio/teaching-in-kateb/WrapperTeachingInKateb";

export default function CourseAddTeaching() {
  return (
    <WrapperTeachingInKateb
      showProgress={
        <ProgressCircle
          totalSteps={6}
          size={42}
          strokeWidth={2}
          className='md:hidden'
          colorClass='text-blue-500'
        />
      }
    >
      <SwitchStepsTeaching type='teaching-in-kateb' />
    </WrapperTeachingInKateb>
  );
}
