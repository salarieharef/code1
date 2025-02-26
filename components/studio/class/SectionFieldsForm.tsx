"use client";

import RenderUniversityFields from "./RenderUniversityFields";
import RenderSkillFields from "./RenderSkillFields";
import SchoolFieldsForm from "./SchoolFieldsForm";

interface SectionFieldsFormProps {
  section: string;
}

const SectionFieldsForm = ({ section }: SectionFieldsFormProps) => {
  return (
    <div className='col-span-full grid gap-4 md:grid-cols-3'>
      {section === "university" ||
      section === "deep_learn" ||
      section === "teaching_assistants" ? (
        <RenderUniversityFields />
      ) : null}

      {section === "school" ? <SchoolFieldsForm /> : null}

      {section === "skill" ? <RenderSkillFields /> : null}
    </div>
  );
};

export default SectionFieldsForm;
