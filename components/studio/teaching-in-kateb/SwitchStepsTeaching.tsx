"use client";
import { useParams, useRouter } from "next/navigation";
import { memo, useCallback, useContext, useEffect } from "react";

// Component imports
import { useToast } from "@/components/ui/use-toast";
import CustomStepper from "./CustomStepper";
import RenderStepContent from "./render-step-content";

// Form imports
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Hook imports
import { yupResolver } from "@hookform/resolvers/yup";

// Lib imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";

// Api imports
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

// Util imports
import {
  setDefaultValues,
  submitStep,
} from "@/utils/functions/course/courseOperations.function";
import { HeadlineSetDefaultValues } from "@/utils/functions/course/lessonsOperations.function";
import { defaultValues } from "@/utils/functions/teaching-in-kateb/formOperations.function";
import { setDefaultValues as setUserDefaultValues } from "@/utils/functions/user/infoOperations.function";
import { filter, find } from "lodash-es";

// Context imports
import { course_form_context } from "@/context/course/form.context";

// Icon imports
import AccessModal from "./AccessModal";
import { AlertInfoTeaching } from "./AlertInfo";

// Constant imports
import { Button } from "@/components/ui/button";
import { SkeletonDataTeachingInKateb } from "@/components/ui/skeleton-loading/SkeltoneTeachingKateb";
import { stepList, stepListStatus } from "@/constant/course/form.constant";
import { useHasChanges } from "@/hooks/state";
import { createDecimalArray } from "@/utils/functions/global/array.function";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

const SwitchSteps = ({ type }: any) => {
  // const { data: session }: any = useSession();
  const params = useParams();
  const courseId = (params?.id || params?.classId) as string;
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const isEditing = Boolean(courseId);

  const {
    setStepPath,
    stepPath,
    stateBackendStep,
    setStateBackendStep,
    isAccessModalOpen,
    setAccessModalOpen,
    isInfoModalOpen,
    setIsInfoModalOpen,
    formDisabledSteps,
    setFormDisabled,
    apiPath,
    setApiPath,
  }: any = useContext(course_form_context);

  const currentSchema = find(stepList, {
    id: Math.floor(stepPath),
  })?.formSchema;

  const isFormDisabled = formDisabledSteps.includes(stepPath);

  const form = useForm({
    resolver: isFormDisabled ? undefined : yupResolver(currentSchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
    shouldFocusError: true,
  });

  const { hasChanges, setIsInitialLoad } = useHasChanges(form);

  const { data: details, isValidating: detailsIsValidating } = useSWRImmutable(
    courseId ? routes.courseRoutes.detail(courseId) : null,
    (url) => nextFetcher({ url, method: "GET", useToken: true })
  );

  const setCourseDefaultValues = useCallback(() => {
    // setIsInitialLoad(true);
    setDefaultValues(form, details?.data);
    // setIsInitialLoad(false);
  }, [details, form]);

  useEffect(() => {
    if (details?.data) {
      if (!detailsIsValidating) {
        setCourseDefaultValues();
      }
      let backendStepIndex = 5;

      if (apiPath == "old") {
        backendStepIndex = 7;
      } else {
        backendStepIndex = apiPath < 5 ? 5 : Number(apiPath);
      }

      setStateBackendStep(backendStepIndex);

      setApiPath(details?.data?.step);

      const disabledSteps =
        apiPath > 6 || details?.data?.step > 6
          ? createDecimalArray(6.5)
          : apiPath >= 5 || details?.data?.step >= 5
            ? createDecimalArray(5.5)
            : [];

      setFormDisabled(disabledSteps);
    }
  }, [details?.data, apiPath]);

  const { data: userInfo, isValidating: userInfoIsValidating } =
    useSWRImmutable([routes.userRoutes.me, "teaching-in-kateb"], ([url]: any) =>
      nextFetcher({ url, useToken: true })
    );

  const setUserInfoDefaultValues = useCallback(() => {
    // setIsInitialLoad(true);
    setUserDefaultValues(form, userInfo?.data);
    // setIsInitialLoad(false);
  }, [userInfo, form]);

  useEffect(() => {
    if (userInfo?.data && !userInfoIsValidating) {
      setUserInfoDefaultValues();

      if (!isEditing) {
        setStateBackendStep(2);
      }
    }
  }, [userInfo?.data]);

  const { data: lessonDetails, isValidating: lessonDetailsIsValidating } =
    useSWRImmutable(
      courseId ? routes.teacherRoutes.courseLessons({ id: courseId }) : null,
      (url) => nextFetcher({ url, method: "POST", useToken: true })
    );

  const setLessonDefaultValues = useCallback(() => {
    setIsInitialLoad(true);
    HeadlineSetDefaultValues(lessonDetails?.data, form);
    setIsInitialLoad(false);
  }, [lessonDetails]);

  useEffect(() => {
    if (lessonDetails?.data?.length && !lessonDetailsIsValidating) {
      setLessonDefaultValues();
    }
  }, [lessonDetails?.data]);

  // Loading state for stateBackendStep
  const isLoadingBackend =
    !stateBackendStep || detailsIsValidating || userInfoIsValidating;

  useEffect(() => {
    if (isLoadingBackend) {
      return; // Exit early if data is still loading
    }

    if (!isEditing) {
      // When not editing
      const allowedStep = userInfo?.data?.teaching_in_kateb ? 2 : 1;
      if (!stepPath) {
        // If not editing and step is null, go to step 1
        setStepPath(allowedStep);
      } else if (stepPath) {
        // If not editing and step is not null, go to provided step
        setStepPath(stepPath);
      }

      if (Math.floor(stepPath) > allowedStep) {
        // If not editing and provided step is greater than stateBackend, go to stateBackend step
        setStepPath(allowedStep);
      }
    } else {
      // When editing
      if (!stepPath) {
        // If editing and step is null, go to stateBackend
        setStepPath(apiPath);
      } else if (stepPath) {
        // If editing and step is not null, go to provided step
        setStepPath(stepPath);
      }

      if (Math.floor(stepPath) > stateBackendStep) {
        // If editing and provided step is greater than stateBackend, go to stateBackend step
        setStepPath(apiPath);
      }
    }
  }, [isEditing, stepPath, stateBackendStep, userInfo?.data]);

  const section = form.watch("section");

  useEffect(() => {
    [
      "grade",
      "branch",
      "main_group",
      "side_group",
      "field",
      "lesson",
      "academic_branch",
      "academic_group",
      "academic_field",
    ].forEach((field: any) => form.resetField(field));
  }, [section]);

  useEffect(() => {
    if (isEditing) {
      setIsInitialLoad(isEditing);
    }
  }, [isEditing]);

  const allDataLoaded =
    !detailsIsValidating && !userInfoIsValidating && !lessonDetailsIsValidating;

  const handleSubmit = useCallback(
    async (data: any) => {
      await submitStep(
        data,
        form,
        stepPath,
        isEditing,
        courseId,
        toast,
        mutate,
        setStepPath,
        type,
        router,
        stateBackendStep,
        hasChanges,
        setAccessModalOpen,
        apiPath
      );
    },
    [
      form,
      stepPath,
      isEditing,
      courseId,
      toast,
      mutate,
      setStepPath,
      type,
      router,
      stateBackendStep,
      hasChanges,
      setAccessModalOpen,
      apiPath,
    ]
  );

  const latestCourse = userInfo?.data?.last_teaching_course_id;

  const filteredStepList = filter(stepList, (step) => step.type != "mini");

  return (
    <>
      {!!latestCourse && !isEditing ? (
        <Link
          href={
            type == "teaching-in-kateb"
              ? `/studio/teaching-in-kateb/course/${latestCourse}/edit`
              : `/studio/class/${latestCourse}/details`
          }
          className='-mt-2 flex justify-center'
        >
          <Button variant='link' className='flex w-max items-center gap-2'>
            <LinkIcon className='size-5' />
            پیگیری آخرین درخواست خود
          </Button>
        </Link>
      ) : null}

      <Form {...form}>
        <CustomStepper
          stepPath={stepPath}
          stepList={stepListStatus(
            stepList,
            apiPath,
            apiPath
              ? createDecimalArray(
                  apiPath != filteredStepList?.length && apiPath > 5
                    ? apiPath - 0.5
                    : apiPath
                )
              : []
          )}
          initialStep={stepPath}
          backendStepIndex={stateBackendStep}
          apiPath={apiPath}
          onStepClick={setStepPath}
          showMiniSteps={true}
        />

        {details?.data?.msg ? (
          <AlertInfoTeaching
            position='inline'
            title={`نظرات داوران برای درس ${form.watch("name")}:`}
            description={
              details?.data?.step_status == "revision" ||
              details?.data?.step_status == "conditional_approval"
                ? `لطفا موارد ذیل مطابق نظرات داوران ویرایش شود و سپس در مرحله پنج ارسال مجدد جهت بررسی و تاییدیه انجام شود: <br /> ${details?.data?.msg}`
                : details?.data?.msg
            }
            // sub_description={}
            styleWrapper='flex justify-center items-center'
            className='my-2 max-w-2xl'
            stepStatus={details?.data?.step_status}
          />
        ) : null}

        <form className='p-4' onSubmit={form.handleSubmit(handleSubmit)}>
          {allDataLoaded ? (
            <RenderStepContent
              stepPath={stepPath}
              type={type}
              courseInfo={details?.data}
              updateStep={setStepPath}
              stepList={
                stepList as Array<{
                  id: number;
                  send_admin?: boolean;
                  status?: string;
                }>
              }
              stateBackendStep={stateBackendStep}
              userInfo={userInfo?.data}
              isInfoModalOpen={isInfoModalOpen}
              setIsInfoModalOpen={setIsInfoModalOpen}
              formSubmitter={form.handleSubmit(handleSubmit)}
              apiStep={apiPath}
            />
          ) : (
            <SkeletonDataTeachingInKateb />
          )}
        </form>
        <AccessModal
          isAccessModalOpen={isAccessModalOpen}
          setAccessModalOpen={setAccessModalOpen}
          type={
            Math.floor(stepPath) === 6
              ? "contractSubmission"
              : Math.floor(stepPath) === 5
                ? "trackingCode"
                : undefined // Ensure only valid AccessModalType or undefined is passed
          }
          courseId={courseId}
          // step
        />
      </Form>
    </>
  );
};

export default memo(SwitchSteps);
