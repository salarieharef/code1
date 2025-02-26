"use client";

// Component imports
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { course_form_context } from "@/context/course/form.context";
import { useUploadWithProgress } from "@/hooks/api/useUploadWithProgress";
import { memo, useContext } from "react";
import { useFormContext } from "react-hook-form";
import ResumeUpload from "../resume-upload";
import TipTapTeaching from "../tip-tap-teaching";
import VideoIntroUpload from "../video-intro-upload";
import BasicInfo from "./BasicInfo";
import EducationalActivities from "./educational_activities";
import EducationalHistories from "./educational_histories";
import RulesAcceptance from "./RulesAcceptance";

// Define TypeScript types for props
interface ProgressItem {
  progress?: number;
  label: string;
}

interface UserInfoFormContentProps {
  type?: "teaching-in-kateb" | "course";
  userInfo: any;
  avatarProgress?: number;
  resumeProgress?: number;
  educationFileProgress?: number;
  introductionVideoProgress?: number;
}

// Memoizing ProgressBar component
const ProgressBar = memo(
  ({ progress, label }: { progress?: number; label: string }) => {
    if (!progress || progress <= 0) return null;

    return (
      <div className='flex flex-col items-center justify-between gap-1'>
        <span className='text-center text-xs text-slate-600'>{label}</span>
        <Progress value={progress} className='w-2/3' />
      </div>
    );
  }
);

ProgressBar.displayName = "";

// Memoizing ProgressBars component
const ProgressBars = memo(
  ({ progressItems }: { progressItems: ProgressItem[] }) => {
    const hasProgress = progressItems.some(
      (item) => item?.progress && item.progress > 0
    );

    return (
      hasProgress && (
        <div className='flex flex-col justify-center space-y-2 px-4'>
          {progressItems.map((item, index) => (
            <ProgressBar
              key={index}
              progress={item.progress}
              label={item.label}
            />
          ))}
        </div>
      )
    );
  }
);

ProgressBars.displayName = "ProgressBars";

const UserInfoContent: React.FC<UserInfoFormContentProps> = ({
  type,
  userInfo,
  avatarProgress,
  resumeProgress,
  educationFileProgress,
  introductionVideoProgress,
}) => {
  const { toast } = useToast();
  const form = useFormContext();

  const { progress, timeRemaining, isUploading, totalSize, uploadFile } =
    useUploadWithProgress();

  //disabled readonly Step without submit form
  const { formDisabledSteps, stepPath }: any = useContext(course_form_context);
  const isFormDisabled = formDisabledSteps?.includes(stepPath);

  const progressItems: ProgressItem[] = [
    {
      progress: avatarProgress,
      label: "پیشرفت آپلود عکس پروفایل:",
    },
    {
      progress: resumeProgress,
      label: "پیشرفت آپلود رزومه:",
    },
    {
      progress: educationFileProgress,
      label: "پیشرفت آپلود مدرک تحصیلی:",
    },
    {
      progress: introductionVideoProgress || progress,
      label: "پیشرفت آپلود ویدیو معرفی:",
    },
  ];

  return (
    <div className='space-y-10 sm:space-y-12'>
      <BasicInfo type={type} />
      <EducationalActivities
        type={type}
        disabled={isFormDisabled}
        read_only={isFormDisabled}
      />
      <EducationalHistories
        type={type}
        disabled={isFormDisabled}
        read_only={isFormDisabled}
      />

      <ResumeUpload type={type} readOnly={isFormDisabled} />

      <VideoIntroUpload
        type={type}
        name='introduction_video'
        readOnly={isFormDisabled}
      />

      <TipTapTeaching
        name='user_description'
        TextLabelCard='توضیحات'
        type={type}
        disabled={isFormDisabled}
        read_only={isFormDisabled}
      />

      <TipTapTeaching
        name='about_me'
        TextLabelCard='درباره‌ی من'
        type={type}
        checkboxName='is_about_me_public'
        disabled={isFormDisabled}
        read_only={isFormDisabled}
      />

      <RulesAcceptance
        rule_id={userInfo?.id}
        rule_type='user_info'
        name='rules_agreed'
        disabled={isFormDisabled}
        read_only={isFormDisabled}
      />

      <ProgressBars progressItems={progressItems} />
    </div>
  );
};

UserInfoContent.displayName = "UserInfoContent";
export default UserInfoContent;
