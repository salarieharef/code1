"use client";
import { useContext } from "react";
import { useSearchParams } from "next/navigation";

// Component imports
import SwitchStepsTeaching from "@/components/studio/teaching-in-kateb/SwitchStepsTeaching";
import WrapperTeachingInKateb from "@/components/studio/teaching-in-kateb/WrapperTeachingInKateb";
import VerticalTooltipStepper from "@/components/ui/stepper/VerticalTooltipStepper";

// Constant imports
import { stepList } from "@/constant/course/form.constant";

// Context imports
import { course_form_context } from "@/context/course/form.context";

// Util imports
import { updateStep } from "@/utils/functions/teaching-in-kateb/stepOperations.function";

export default function CourseAddTeaching() {
  const { setStepPath, stepPath, stateBackendStep }: any =
    useContext(course_form_context);

  const searchParams = useSearchParams();

  return (
    <WrapperTeachingInKateb
      showProgress={
        <VerticalTooltipStepper
          stepPath={stepPath}
          stepList={stepList}
          backendStepIndex={stateBackendStep} // Assuming total steps is 6, adjust as needed
          onStepClick={(newStep) =>
            updateStep(newStep, stateBackendStep, setStepPath)
          }
          showMiniSteps={false}
        />
      }
    >
      <SwitchStepsTeaching type='teaching-in-kateb' />
    </WrapperTeachingInKateb>
  );
}
