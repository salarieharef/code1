"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

// Component imports
import GradeAutocomplete from "@/components/global/form/grade-autocomplete";
import BranchMultiselector from "@/components/global/form/branch-multiselector";
import MainGroupMultiselector from "@/components/global/form/main-group-multiselector";
import SideGroupMultiselector from "@/components/global/form/side-group-multiselector";
import FieldMultiselector from "@/components/global/form/field-multiselector";

const SchoolFieldsForm: any = () => {
  // State for each level selector
  const form = useFormContext(); // Use the form context

  // const selectedGrade: any = form.watch("grade");
  const [selectedGradeObject, setSelectedGradeObject] = useState<any>(null);

  const selectedBranch: any = form.watch("branch");
  const selectedField: any = form.watch("field");
  const selectedMain_group: any = form.watch("main_group");

  // Check if any of the selected branches has children_count > 0
  const hasBranch = selectedGradeObject?.children_count > 0;
  const hasField: any = selectedBranch?.some(
    (branch: any) => branch?.children_count > 0
  );
  const hasMainGroup = selectedField?.some(
    (field: any) => field?.children_count > 0
  );
  const hasSideGroup = selectedMain_group?.some(
    (mainGroup: any) => mainGroup?.children_count > 0
  );

  return (
    <>
      {/* Grade selection */}
      <GradeAutocomplete
        setSelectedGradeObject={setSelectedGradeObject}
        placeholder='مقطع خود را انتخاب کنید...'
        label='مقطع تحصیلی:'
        required={true}
      />

      {/* Branch selection if Grade has children */}
      {hasBranch && (
        <BranchMultiselector
          required={true}
          placeholder='شاخه خود را انتخاب کنید...'
        />
      )}

      {/* Field selection if Side Group exists */}
      {hasField && <FieldMultiselector required={true} />}

      {/* Main Group selection if any selected Branch has children */}
      {hasMainGroup && (
        <MainGroupMultiselector
          required={true}
          placeholder='گروه اصلی خود را انتخاب کنید...'
        />
      )}

      {/* Side Group selection if Main Group has children */}
      {hasSideGroup && (
        <SideGroupMultiselector
          required={true}
          placeholder='گروه فرعی خود را انتخاب کنید...'
        />
      )}
    </>
  );
};

export default SchoolFieldsForm;
