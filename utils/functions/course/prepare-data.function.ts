// Util imports
import { join, map } from "lodash-es";

// Function imports
import { removeSeparators } from "@/utils/persian-tools/tools-function";
import {
  category_types,
  FlattenCategories,
} from "../category/categoryOperations.function";
import { transformReferences } from "./courseOperations.function";

const CourseFormDataPrepare = (data: any) => {
  const categories = FlattenCategories(data);

  // Delete unneeded values from the data array
  map(category_types, (type) => delete data?.[type]);

  return {
    avg_lesson_time: data?.avg_lesson_time || 0,
    basic_info: data?.basic_info,
    description: data?.description,
    level: data?.level,
    name: data?.name,
    practical_count: data?.practical_count,
    prerequisite_title: join(map(data?.prerequisite_title, "text"), ", "),
    section: data?.section,
    status: data?.status,
    step: data?.step,
    theoretical_count: data?.theoretical_count,
    week_count: data?.week_count,
    references: transformReferences(data?.references),
    is_college: data.is_college === "true",
    categories,
  };
};

const HeadlineFormDataPrepare = (data: any) => {
  return {
    step: data?.step,
    avg_lesson_time: data?.avg_lesson_time || 0,
    week_count: data?.week_count,
    lessons: data?.headlines,
  };
};

const PartOfCourseVideoDataPrepare = (data: any) => {
  const fileFormData = new FormData();
  if (typeof data?.part_of_video !== "string") {
    fileFormData.append("title", data?.part_of_video?.name);
    fileFormData.append("file", data?.part_of_video);
    fileFormData.append("file_type", "part_of_video");
    return fileFormData;
  }

  return null;
};

const CollaborationFormDataPrepare = (data: any) => {
  return {
    step: data?.step,
    estimate_price: removeSeparators(String(data?.estimate_price) || ""),
    contract_type: data?.contract_type,
  };
};

const ConclusionFormDataPrepare = (data: any) => {
  const fileFormData = new FormData();
  if (typeof data?.signed_contract !== "string") {
    fileFormData.append("image", data?.signed_contract);
    return fileFormData;
  }

  return null;
};

export {
  CollaborationFormDataPrepare,
  ConclusionFormDataPrepare,
  CourseFormDataPrepare,
  HeadlineFormDataPrepare,
  PartOfCourseVideoDataPrepare,
};
