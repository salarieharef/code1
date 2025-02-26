"use client";

// Icon imports
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useContext } from "react";
import { useFormContext } from "react-hook-form";

// Component imports for UI elements
import { Button } from "@/components/ui/button";
import {
  CourseFormSkeletonBasic,
  FormSkeletonBasic,
  HeadlineSkeletonBasic,
  PaymentPlansSkeleton,
  SkeletonSampleVideo,
  UploadLessonsSkeleton,
} from "@/components/ui/skeleton-loading/SkeltoneTeachingKateb";
import { StepStatus } from "@/components/ui/stepper/types";
import { toast } from "@/components/ui/use-toast";
import { sectionsAll } from "@/constant/teaching-in-kateb/information.constant";
import { course_form_context } from "@/context/course/form.context";
import { find, isEmpty } from "lodash-es";
import MiniStepContent from "./mini_step_content";
import ModalInformation from "./verify-information/modalInformation";

const CollaborationForm = dynamic(
  () => import("./collaboration/CollaborationForm"),
  {
    loading: () => <PaymentPlansSkeleton />,
  }
);

// Add TypeScript types
enum StepType {
  TEACHING_IN_KATEB = "teaching-in-kateb",
  COURSE = "course",
}

// Extract step components configuration
const STEP_COMPONENTS = {
  1: {
    Component: dynamic(() => import("./user-info/user-info-form-content"), {
      loading: () => <FormSkeletonBasic />,
    }),
    showNext: true,
  },
  2: {
    Component: dynamic(() => import("./course/CourseForm"), {
      loading: () => <CourseFormSkeletonBasic />,
    }),
    showNext: true,
  },
  3: {
    Component: dynamic(() => import("./headline/HeadlineFormWrapper"), {
      loading: () => <HeadlineSkeletonBasic />,
    }),
    showNext: true,
  },
  4: {
    Component: dynamic(() => import("./sample/SampleFormWrapper"), {
      loading: () => <SkeletonSampleVideo />,
    }),
    showNext: true,
  },
  5: {
    Component: (props: any) => {
      return (
        <>
          <CollaborationForm {...props} readonly={props.read_only} />
          <ModalInformation
            isOpen={props.isInfoModalOpen}
            onClose={() => props.setIsInfoModalOpen(false)}
            sections={sectionsAll}
            type={props.type}
            showUserSignForm={true}
            formSubmitter={props.formSubmitter}
          />
        </>
      );
    },
    showNext: true,
  },
  5.5: {
    Component: ({
      status,
      courseInfo,
    }: {
      status?: string;
      courseInfo?: any;
    }) => (
      <MiniStepContent
        courseId={courseInfo?.id}
        step={5.5}
        status={status as StepStatus}
      />
    ),
    showNext: true,
  },
  6: {
    Component: dynamic(() => import("./contract-conclusion/ConclusionForm"), {
      loading: () => <PaymentPlansSkeleton />,
    }),
    showNext: true,
  },
  6.5: {
    Component: ({
      status,
      courseInfo,
    }: {
      status?: string;
      courseInfo?: any;
    }) => (
      <MiniStepContent
        courseId={courseInfo?.id}
        step={6.5}
        status={status as StepStatus}
      />
    ),
    showNext: true,
  },
  7: {
    Component: dynamic(() => import("./lessons/UploadLessons"), {
      loading: () => <UploadLessonsSkeleton />,
    }),
    showNext: true,
  },
} as const;

// Add type for valid step numbers
type ValidStepNumbers = keyof typeof STEP_COMPONENTS;

// Component for handling step submission and navigation
interface StepContentSubmitterProps {
  stepPath: number;
  updateStep: (step: number) => void;
  stepList: Array<{ id: number; send_admin?: boolean; status?: string }>;
  stateBackendStep: number;
  showNext?: boolean;
  setIsInfoModalOpen?: any;
  apiStep?: number;
}

const StepContentSubmitter = ({
  stepPath,
  updateStep,
  stepList,
  stateBackendStep,
  showNext = true,
  setIsInfoModalOpen,
  apiStep,
}: StepContentSubmitterProps) => {
  const form = useFormContext();
  const { formDisabledSteps = [] } = useContext(course_form_context) as {
    formDisabledSteps: number[];
  };

  // Computed properties
  const isFormDisabled = formDisabledSteps.includes(stepPath);
  const isCollaborationFormDisabled =
    stepPath === 5 && !form.watch("course_creation_rules_agreed");
  const shouldSendToAdmin =
    find(stepList, { id: stepPath })?.send_admin &&
    stepPath === stateBackendStep;
  const canProceedToNextStep =
    (isFormDisabled && apiStep !== stateBackendStep) ||
    (apiStep === 7 && stateBackendStep === 7);

  const shouldShowAdminMessage =
    find(stepList, { id: stepPath })?.send_admin && stepPath === apiStep;

  const handleNextClick = () => {
    if (setIsInfoModalOpen && stepPath == 5) {
      setIsInfoModalOpen(true);
    }

    if (canProceedToNextStep) {
      const nextStep = stepList.find((step) => step.id > stepPath)?.id;
      if (nextStep) {
        updateStep(nextStep);
      }
    }

    if (shouldShowAdminMessage) {
      toast({
        variant: "info",
        title: "لطفا منتظر پاسخ از طرف تیم کاتب باشید.",
      });
    }
  };

  const handlePrevClick = () => {
    // Find the closest previous step by checking all steps between current and previous whole number
    const currentWholeStep = Math.floor(stepPath);
    const prevWholeStep = currentWholeStep - 1;

    // Get all steps between current whole number and previous whole number
    const possibleSteps = stepList
      .map((step) => step.id)
      .filter((id) => id >= prevWholeStep && id < stepPath)
      .sort((a, b) => b - a); // Sort descending to get closest step first

    // Take the first (closest) previous step
    const prevStep = possibleSteps[0];

    if (prevStep) {
      updateStep(prevStep);
    }
  };

  return (
    <div className='my-10 flex flex-col items-center justify-center gap-4'>
      <div className='flex justify-center gap-4'>
        <Button
          type='button'
          disabled={stepPath === 1}
          onClick={handlePrevClick}
        >
          مرحله قبلی
        </Button>

        {showNext && (
          <Button
            disabled={
              stepPath === stepList.length ||
              stepPath > stateBackendStep ||
              isCollaborationFormDisabled
            }
            type={!!setIsInfoModalOpen || isFormDisabled ? "button" : "submit"}
            onClick={handleNextClick}
          >
            {form.formState.isSubmitting && (
              <Loader2 className='ml-2 h-4 w-4 animate-spin' />
            )}
            {shouldSendToAdmin ? "ارسال جهت بررسی و تایید" : "مرحله بعدی"}
          </Button>
        )}
      </div>

      {!isEmpty(form.formState.errors) && (
        <p className='text-destructive'>لطفا فرم را به درستی وارد کنید</p>
      )}
    </div>
  );
};

// Add this interface before the RenderStepContent component
interface RenderStepContentProps {
  stepPath: number;
  type?: StepType;
  courseInfo?: any;
  updateStep: (step: number) => void;
  stepList: Array<{ id: number; send_admin?: boolean; status?: string }>;
  stateBackendStep: number;
  userInfo?: any;
  isInfoModalOpen?: boolean;
  setIsInfoModalOpen?: (isOpen: boolean) => void;
  formSubmitter?: () => void;
  apiStep?: number;
}

// Main component with improved type safety
const RenderStepContent = ({
  stepPath,
  type = StepType.TEACHING_IN_KATEB,
  courseInfo,
  updateStep,
  stepList,
  stateBackendStep,
  userInfo,
  isInfoModalOpen = false,
  setIsInfoModalOpen = () => {},
  formSubmitter = () => {},
  apiStep,
}: RenderStepContentProps) => {
  const form = useFormContext();
  const { formDisabledSteps = [] } = useContext(course_form_context) as {
    formDisabledSteps: number[];
  };
  const isFormDisabled = formDisabledSteps.includes(stepPath);

  // Add type assertion to ensure stepPath is a valid key
  const stepConfig = STEP_COMPONENTS[stepPath as ValidStepNumbers];

  // Handle invalid step access
  const parentStep = Math.floor(stepPath);
  if (stepPath > stateBackendStep && parentStep > stateBackendStep) {
    return <div>به این مرحله دسترسی ندارید.</div>;
  }

  if (!stepConfig) {
    return <div>گام یافت نشد</div>;
  }

  const { Component, showNext: defaultShowNext } = stepConfig;

  // Determine if next button should be shown
  const showNext =
    stepPath === 6
      ? !!form.watch("otp") || stateBackendStep === 7
      : stepPath === 7
        ? false
        : defaultShowNext;

  return (
    <Suspense
      fallback={
        <div className='flex h-80 items-center justify-center'>
          <Loader2 className='h-6 w-6 animate-spin' />
        </div>
      }
    >
      <Component
        type={type}
        courseInfo={courseInfo}
        userInfo={userInfo}
        read_only={isFormDisabled}
        read_only_video={isFormDisabled}
        status={find(stepList, { id: stepPath })?.status}
        isInfoModalOpen={isInfoModalOpen}
        formSubmitter={formSubmitter}
        setIsInfoModalOpen={setIsInfoModalOpen}
      />

      <StepContentSubmitter
        stepPath={stepPath}
        updateStep={updateStep}
        stepList={stepList}
        stateBackendStep={stateBackendStep}
        setIsInfoModalOpen={
          stepPath == 5 && !isFormDisabled
            ? (value: boolean) => setIsInfoModalOpen(value)
            : null
        }
        showNext={showNext}
        apiStep={apiStep}
      />
    </Suspense>
  );
};

export default RenderStepContent;
