"use client";

import { useContext } from "react";

// Constant Imports
import { stepList } from "@/constant/course/form.constant";

// Context imports
import { course_form_context } from "@/context/course/form.context";

// Util imports
import { updateStep } from "@/utils/functions/teaching-in-kateb/stepOperations.function";

// Icon imports
import { Edit2 } from "lucide-react";

// Component imports
import SwitchStepsTeaching from "@/components/studio/teaching-in-kateb/SwitchStepsTeaching";
import { Separator } from "@/components/ui/separator";
import VerticalTooltipStepper from "@/components/ui/stepper/VerticalTooltipStepper";

export default function StudioClassDetails() {
  const { setStepPath, stepPath, stateBackendStep }: any =
    useContext(course_form_context);

  return (
    <div className='mb-10 min-h-screen w-full rounded-md bg-white p-4 shadow-xl sm:mt-10 sm:px-12 sm:py-8'>
      <div className='flex items-center justify-between'>
        <h1 className='flex gap-x-2 text-xl font-medium text-blue-900 sm:text-3xl'>
          <Edit2 className='text-blue-400 sm:h-10 sm:w-10' />
          جزئیات درس
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
