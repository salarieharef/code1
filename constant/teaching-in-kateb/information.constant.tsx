import CollaborationForm from "@/components/studio/teaching-in-kateb/collaboration/CollaborationForm";
import HeadlineFormWrapper from "@/components/studio/teaching-in-kateb/headline/HeadlineFormWrapper";
import {
  OriginalReferences,
  SupplementaryReferences,
} from "@/components/studio/teaching-in-kateb/ReferencesTable";
import ResumeUpload from "@/components/studio/teaching-in-kateb/resume-upload";
import SampleFormWrapper from "@/components/studio/teaching-in-kateb/sample/SampleFormWrapper";
import TipTapTeaching from "@/components/studio/teaching-in-kateb/tip-tap-teaching";
import EducationalActivities from "@/components/studio/teaching-in-kateb/user-info/educational_activities";
import EducationalHistories from "@/components/studio/teaching-in-kateb/user-info/educational_histories";
import BasicInformation from "@/components/studio/teaching-in-kateb/verify-information/basicInformation";
import VideoIntroUpload from "@/components/studio/teaching-in-kateb/video-intro-upload";

type SectionItemType = {
  key: string;
  field: string;
  type?: string;
};

type SectionType = {
  sectionTitle: string;
  items?: SectionItemType[];
  sectionComponent: (data: any) => JSX.Element;
};

const baseInformationItems: SectionItemType[] = [
  {
    key: "آیا جزو جامعه دانشگاه آزاد اسلامی هستید؟",
    field: "academic_affiliation",
  },
  { key: "حوزه فعالیت:", field: "bio" },
  { key: "نام:", field: "first_name" },
  { key: "نام خانوادگی:", field: "last_name" },
  { key: "شماره تلفن همراه:", field: "mobile" },
  //!Todo parent name
  { key: "جنسیت:", field: "gender" },
  { key: "نام پدر:", field: "father_name" },
  { key: "کد ملی:", field: "nation_code" },
  { key: "استان:", field: "state" },
  { key: "شهر:", field: "city_id" },
  { key: "پست الکترونیک:", field: "email" },
  { key: "واحد دانشگاهی:", field: "university_id" },
  { key: "رشته:", field: "field_id" },
  { key: "گرایش:", field: "education_tendency" },
  { key: "آخرین مدرک تحصیلی:", field: "education_title" },
];

const sectionsDataInformation: SectionType[] = [
  {
    sectionTitle: "اطلاعات پایه",
    items: baseInformationItems,
    sectionComponent: (data: any) => (
      <BasicInformation
        informationData={[
          {
            sectionTitle: "اطلاعات پایه",
            items: baseInformationItems,
          },
        ]}
        wrapperStyle='mt-0'
      />
    ),
  },
];

const courseInformationItems: SectionItemType[] = [
  { key: "نوع درس:", field: "section" },
  { key: "عنوان درس:", field: "name" },
  { key: "تعداد هفته آموزشی:", field: "week_count" },
  { key: "مدت زمان آموزش:", field: "avg_lesson_time" },
  { key: "تعداد واحد نظری:", field: "theoretical_count" },
  { key: "تعداد واحد عملی:", field: "practical_count" },
  { key: "دانشکدگان:", field: "colleges", type: "multiselect" },
  { key: "تولید شده در دانشکدگان؟", field: "is_college" },
  { key: "معلومات پایه‌ای موردنیاز:", field: "basic_info" },
  { key: "شاخه تحصیلی", field: "academic_branch", type: "autocomplete" },
  { key: "گروه‌های تحصیلی", field: "academic_group", type: "multiselect" },
  { key: "گرایش‌های تحصیلی", field: "academic_field", type: "multiselect" },
  { key: "معرفی درس:", field: "description" },
];

const sectionsDataCourse: SectionType[] = [
  {
    sectionTitle: "اطلاعات درس",
    items: courseInformationItems,
    sectionComponent: (data: any) => (
      <BasicInformation
        informationData={[
          {
            sectionTitle: "اطلاعات درس",
            items: courseInformationItems,
          },
        ]}
      />
    ),
  },
];

const educationalActivitiesSection = {
  sectionTitle: "فعالیت‌های آموزشی",
  sectionComponent: () => <EducationalActivities read_only={true} />,
};

const educationalHistoriesSection = {
  sectionTitle: "سوابق تحصیلی",
  sectionComponent: () => <EducationalHistories read_only={true} />,
};

const resumeUploadSection = {
  sectionTitle: "آپلود رزومه",
  sectionComponent: (data: any) => (
    <ResumeUpload type={"course"} readOnly={true} />
  ),
};

const introductionVideoUploadSection = {
  sectionTitle: "آپلود ویدئو معرفی",
  sectionComponent: (data: any) => (
    <VideoIntroUpload
      type={"course"}
      name='introduction_video'
      readOnly={true}
    />
  ),
};

const descriptionSection = {
  sectionTitle: "توضیحات",
  sectionComponent: (data: any) => (
    <TipTapTeaching
      name='description'
      TextLabelCard='توضیحات'
      read_only={true}
    />
  ),
};

const aboutMeSection = {
  sectionTitle: "درباره‌ی من",
  sectionComponent: (data: any) => {
    return (
      <TipTapTeaching
        name='about_me'
        TextLabelCard='درباره‌ی من'
        checkboxName='is_about_me_public'
        read_only={true}
      />
    );
  },
};

const originalReferencesSection = {
  sectionTitle: "مراجع اصلی",
  sectionComponent: (data: any) => (
    <OriginalReferences read_only={true} name='references.main_references' />
  ),
};

const supplementaryReferencesSection = {
  sectionTitle: "مراجع تکمیلی",
  sectionComponent: (data: any) => (
    <SupplementaryReferences
      read_only={true}
      name='references.additional_references'
    />
  ),
};

const headlineFormSection = {
  sectionTitle: "فرم عنوان",
  sectionComponent: (data: any) => (
    <HeadlineFormWrapper read_only={true} courseId={data.courseId} />
  ),
};

const collaborationFormSection = {
  sectionTitle: "فرم همکاری",
  sectionComponent: (data: any) => <CollaborationForm readonly={true} />,
};

const sampleFormSection = {
  sectionTitle: "فرم نمونه",
  sectionComponent: (data: any) => (
    <SampleFormWrapper
      readonly={true}
      courseId={data.courseId}
      read_only_video={true}
    />
  ),
};

// const userSignFormSection = {
//   sectionTitle: "فرم امضا کاربر",
//   sectionComponent: () => <UserSignForm name='acceptance_otp' />,
// };

const sectionTitles: Record<string, string> = {
  university: "دانشگاهی",
  school: "مدرسه‌ای",
  skill: "مهارتی",
  deep_learn: "یادگیری عمیق",
  teaching_assistants: "دستیاران آموزشی",
};
const roleTitlesInformation: Record<string, string> = {
  teacher_faculty: "استاد (هیات علمی)",
  teacher_adjunct: "استاد (حق التدریس)",
  student: "دانشجو",
  staff: "کارمند",
};

const sectionsAll = [
  ...sectionsDataInformation,
  ...sectionsDataCourse,
  educationalActivitiesSection,
  educationalHistoriesSection,
  resumeUploadSection,
  introductionVideoUploadSection,
  descriptionSection,
  aboutMeSection,
  originalReferencesSection,
  supplementaryReferencesSection,
  headlineFormSection,
  collaborationFormSection,
  sampleFormSection,
  // userSignFormSection,
];

export {
  //
  roleTitlesInformation,
  sectionsAll,
  sectionTitles,
};
