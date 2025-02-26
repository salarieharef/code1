"use client";

import RulesAcceptance from "../user-info/RulesAcceptance";
// Component imports
import { WrapperOutlineText } from "../WrapperOutlineText";
import CollaborationFormContent from "./CollaborationFormContent"; // Adjust the path as needed

interface CourseFormProps {
  type?: string;
  courseId?: string;
  readonly?: boolean;
  name?: string;
  showRule?: boolean;
}

const CollaborationForm: React.FC<CourseFormProps> = ({
  courseId,
  readonly = false,
  name = "contract_type",
  type,
  showRule = true,
}) => {
  return (
    <>
      <WrapperOutlineText titleBorder='تعیین روش همکاری با کاتب' type={type}>
        <CollaborationFormContent
          courseId={courseId}
          readonly={readonly}
          name={name}
        />
      </WrapperOutlineText>
      {showRule ? (
        <div className='my-8'>
          <RulesAcceptance
            rule_type='course_creation'
            name='course_creation_rules_agreed'
            disabled
            readonly={readonly}
          />
        </div>
      ) : null}
    </>
  );
};

export default CollaborationForm;
