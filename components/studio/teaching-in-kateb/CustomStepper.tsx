import { Card } from "@/components/ui/card";
import { Step, StepItem, Stepper, StepperProps } from "@/components/ui/stepper";
import { toast } from "@/components/ui/use-toast";
import { stepInfoByStatus } from "@/constant/course/form.constant";
import { course_form_context } from "@/context/course/form.context";
import { cn } from "@/utils/cn";
import { filter } from "lodash-es";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

interface CustomStepperProps extends Omit<StepperProps, "steps"> {
  stepList: StepItem[];
  backendStepIndex?: number;
  onStepClick?: (index: number) => void;
  stepPath?: number;
  showMiniSteps?: boolean;
  showStepperBackground?: boolean;
  loading?: boolean;
  apiPath?: number;
}

export default function CustomStepper({
  stepList,
  backendStepIndex = 1,
  onStepClick = () => {},
  stepPath = 1,
  showMiniSteps = false,
  showStepperBackground = true,
  loading,
  apiPath = 1,
  ...restProps
}: CustomStepperProps) {
  const { trigger, handleSubmit, formState } = useFormContext();
  const { isSubmitting } = formState;
  //disabled readonly Step without submit form
  const { formDisabledSteps }: any = useContext(course_form_context);
  const isFormDisabled = formDisabledSteps.includes(stepPath);

  const allSteps: any[] = filter(stepList, (step) => {
    return !showMiniSteps ? step?.type !== "mini" : step;
  });

  const isStepDisabled = (step: number): boolean => {
    const parentStep = Math.floor(step);
    return step > backendStepIndex && parentStep > backendStepIndex;
  };

  const handleStepClick = async (stepNumber: number) => {
    const parentStep = Math.floor(stepNumber);
    if ((stepNumber > apiPath || parentStep > apiPath) && !isFormDisabled) {
      const isValid = await trigger();

      if (!isValid) {
        toast({
          variant: "destructive",
          title: "لطفا از پر شدن فیلد های اجباری اطمینان حاصل کنید.",
        });
      } else {
        await handleSubmit(async (data) => {
          if (!isStepDisabled(stepNumber)) {
            onStepClick(stepNumber);
          }
        })();
      }
    } else {
      onStepClick(stepNumber);
    }
  };

  return (
    <div className='relative'>
      {showStepperBackground ? (
        <Card className='absolute left-0 top-0 hidden h-full w-full items-center justify-center overflow-hidden border-slate-300 sm:flex'>
          {allSteps.map((step, i) => (
            <div className={step?.bgClassName} key={i}></div>
          ))}
        </Card>
      ) : null}

      <Stepper
        variant='circle-alt'
        className='my-2 hidden w-full justify-center rounded py-2 md:flex'
        key={stepPath}
        steps={allSteps}
        onClickStep={handleStepClick}
        {...restProps}
      >
        {allSteps.map((step: StepItem) => (
          <Step
            key={step.id}
            {...step}
            disabled={isStepDisabled(step?.id)}
            className={cn(
              "bg-slate-300 text-lg text-white hover:bg-slate-400/80 hover:text-white",
              step?.type == "mini" && step?.status
                ? stepInfoByStatus?.[step?.status]?.className
                : "",
              step?.iconClassName
            )}
            state={
              (isSubmitting && stepPath === step?.id) || loading
                ? "loading"
                : undefined
            }
            containerClassName={step?.containerClassName}
            isCompletedStep={step?.status === "confirmed" || undefined}
            icon={
              step?.type == "mini" &&
              step?.status &&
              step?.status !== "confirmed"
                ? stepInfoByStatus?.[step?.status]?.icon
                : undefined
            }
            label={
              <div className='flex items-center justify-center'>
                {step?.type == "mini" && step?.status
                  ? stepInfoByStatus?.[step?.status]?.label || step?.label
                  : step?.label}
              </div>
            }
          />
        ))}
      </Stepper>
    </div>
  );
}
