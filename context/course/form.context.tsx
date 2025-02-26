"use client";

import { clampStep } from "@/utils/functions/teaching-in-kateb/localOperations.function";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, createContext, useCallback, useState } from "react";

export const course_form_context = createContext({});

export default function CourseFormContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepPath = Number(searchParams.get("step"));

  const [stateBackendStep, setStateBackendStep]: any = useState<any>(3); // Add backend step context
  const [isAccessModalOpen, setAccessModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [apiPath, setApiPath] = useState(1);

  const [formDisabledSteps, setFormDisabled] = useState<number[]>([]);
  // Helper function to update the URL with the new step value
  const updateURLWithStep = (step: number) => {
    router.push(`?step=${step}`);
  };

  const setStepPath = useCallback(
    (newStep: number, setHasChanges?: any) => {
      console.log("newStep", newStep);
      const clampedStep = clampStep(newStep, stateBackendStep);
      updateURLWithStep(clampedStep);
      if (setHasChanges) {
        setHasChanges(false);
      }
    },
    [stateBackendStep]
    // [stepPath, stateBackendStep]
  );

  return (
    <course_form_context.Provider
      value={{
        stepPath,
        setStepPath,
        stateBackendStep, // Expose backend step state
        setStateBackendStep, // Expose backend step setter
        formDisabledSteps,
        setFormDisabled,
        isAccessModalOpen,
        setAccessModalOpen,
        isInfoModalOpen,
        setIsInfoModalOpen,
        apiPath,
        setApiPath,
      }}
    >
      {children}
    </course_form_context.Provider>
  );
}
