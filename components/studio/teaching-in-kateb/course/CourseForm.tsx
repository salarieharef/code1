"use client";

// Util imports
import validations from "@/utils/validations";
import * as yup from "yup";
import {
  OriginalReferences,
  SupplementaryReferences,
} from "../ReferencesTable";
import { WrapperOutlineText } from "../WrapperOutlineText";
import CourseFormContent from "./CourseFormContent";
import { useContext } from "react";
import { course_form_context } from "@/context/course/form.context";
import { memo } from "react";

export type Inputs = yup.InferType<typeof validations.ClassCreate>;

interface CourseFormProps {
  type?: string;
}

const CourseForm: React.FC<CourseFormProps> = memo(({ type }) => {
  //disabled readonly Step without submit form
  const { formDisabledSteps, stepPath }: any = useContext(course_form_context);
  const isFormDisabled = formDisabledSteps.includes(stepPath);

  return (
    <>
      <WrapperOutlineText titleBorder='اطلاعات پایه درس' type={type}>
        <CourseFormContent type={type} />
      </WrapperOutlineText>
      <div className='mt-10 space-y-8'>
        <OriginalReferences
          read_only={isFormDisabled}
          type={type}
          name='references.main_references'
        />
        <SupplementaryReferences
          read_only={isFormDisabled}
          type={type}
          name='references.additional_references'
        />
      </div>
    </>
  );
});

CourseForm.displayName = "CourseForm";
export default CourseForm;
