"use client";
import { useContext } from "react";

// Icon imports
import { Edit2 } from "lucide-react";

// Constant Imports
import { stepList } from "@/constant/course/form.constant";

// Context imports
import { course_form_context } from "@/context/course/form.context";

// Util imports
import { updateStep } from "@/utils/functions/teaching-in-kateb/stepOperations.function";

// Component  import
import { Separator } from "@/components/ui/separator";
import SwitchStepsTeaching from "@/components/studio/teaching-in-kateb/SwitchStepsTeaching";
import VerticalTooltipStepper from "@/components/ui/stepper/VerticalTooltipStepper";

export default function StudioClassCreate() {
  const { setStepPath, stepPath, stateBackendStep }: any =
    useContext(course_form_context);

  return (
    <div className='min-h[100rem] mb-10 w-full rounded-[7px] bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <div className='flex items-center justify-between'>
        <h1 className='flex flex-row gap-x-2 text-xl font-medium leading-10 text-blue-900 sm:text-3xl'>
          <Edit2 className='text-blue-400 sm:h-10 sm:w-10' />
          درخواست تدریس جدید
        </h1>
        <VerticalTooltipStepper
          stepPath={stepPath}
          stepList={stepList}
          backendStepIndex={stateBackendStep} // Assuming total steps is 6, adjust as needed
          onStepClick={(newStep) =>
            updateStep(newStep, stateBackendStep, setStepPath)
          }
          showMiniSteps={false}
        />
      </div>

      <Separator orientation='horizontal' className='my-4' />

      <SwitchStepsTeaching type="course" />
    </div>
  );
}
