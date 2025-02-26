// Form imports
import validations from "@/utils/validations";
import * as yup from "yup";

// Api imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";

// Util imports
import {
  filter,
  find,
  first,
  flatMap,
  get,
  groupBy,
  map,
  reject,
  split,
  trim,
} from "lodash-es";

// Function imports
import { FlattenCategories } from "../category/categoryOperations.function";
import { EditUser, UpdateUserBody } from "../user/infoOperations.function";
import { verifyOTP } from "../user/signOperation.function";
import {
  CollaborationFormDataPrepare,
  ConclusionFormDataPrepare,
  CourseFormDataPrepare,
  HeadlineFormDataPrepare,
} from "./prepare-data.function";

export type Inputs = yup.InferType<typeof validations.ClassCreate>;

const UploadSign = async (toast: any, courseId: any, preparedData: any) => {
  if (preparedData) {
    try {
      const responseData = await nextFetcher({
        url: routes.courseRoutes.uploadSign(courseId),
        method: "POST",
        body: preparedData,
        useToken: true,
      });

      if (responseData?.success) {
        toast({
          variant: "success",
          title: responseData?.msg,
        });

        return responseData;
      } else if (responseData?.error) {
        throw new Error(responseData?.error);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    }
  } else {
    return { success: true };
  }
};

const transformReferences = (original: any, include_file: boolean = false) => {
  //? _.flatMap: This function iterates over each key-value pair in the original object. For each key (which represents a reference type), it processes the associated array of references.
  //? _.map: Inside flatMap, we use _.map to transform each reference object into the desired format: an object containing title, link, and type.
  //? Final Output: The result is a flattened array of reference objects, which combines all the transformed references from both main_references and additional_references.
  return reject(
    flatMap(original, (refs, type) => {
      return map(refs, (ref) => ({
        id: ref.original_id,
        title: ref.reference,
        file: include_file ? ref.file : "",
        type: type,
      }));
    }),
    { title: "" }
  );
};

const reverseTransformReferences = (
  references: any,
  include_file: boolean = true
) => {
  //? _.groupBy: This function groups the array of reference objects based on the type property. It produces an object where the keys are main_references and additional_references, and the values are arrays of corresponding reference objects.
  //? Mapping: For each group, we use _.map to create a new array containing reference objects in the original format, where each reference object contains a reference key.
  //? Return Structure: The final output is an object containing two properties: main_references and additional_references, each being an array of objects structured as { reference: "url" }.

  const groupedReferences = groupBy(references, "type");

  return {
    main_references: map(groupedReferences.main_references, (ref) => ({
      reference: ref?.title,
      file: include_file ? ref?.file : null,
      original_id: ref?.id,
    })),
    additional_references: map(
      groupedReferences.additional_references,
      (ref) => ({
        reference: ref?.title,
        file: include_file ? ref?.file : null,
        original_id: ref?.id,
      })
    ),
  };
};

const AddCourse = async (data: any, toast: any, preparedData: any) => {
  const image = data?.image;

  try {
    const responseData = await nextFetcher({
      url: routes.courseRoutes.add,
      method: "POST",
      body: preparedData,
      useToken: true,
    });

    if (!responseData?.success) {
      toast({
        variant: "destructive",
        title: responseData?.msg || "خطا در ایجاد دوره",
      });
      return;
    }

    if (image && typeof image == "object") {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      await nextFetcher({
        url: routes.courseRoutes.uploadImage(responseData?.data?.id),
        method: "POST",
        body: imageFormData,
        useToken: true,
      });
    }

    toast({
      variant: "success",
      title: responseData?.msg || "با موفقیت",
    });

    return responseData;
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: e.message || "خطای نامشخص",
    });
  }
};

const EditCourse = async (
  data: any,
  courseId: any,
  preparedData: any,
  toast?: any,
  mutate?: any,
  shouldMutate: boolean = true
) => {
  try {
    const image = data?.image;

    const responseData = await nextFetcher({
      url: routes.courseRoutes.edit(courseId),
      method: "POST",
      body: preparedData,
      useToken: true,
    });
    if (!responseData?.success) {
      toast({
        variant: "destructive",
        title: responseData?.msg || "خطا در ایجاد یا تغییر دوره",
      });
      return;
    }

    const imageFormData = new FormData();
    if (typeof image == "object") {
      imageFormData.append("image", image);
    }

    if (responseData.success) {
      if (typeof image == "object") {
        await nextFetcher({
          url: routes.courseRoutes.uploadImage(responseData?.data?.id),
          method: "POST",
          body: imageFormData,
          useToken: true,
        });
      }

      toast({
        variant: "success",
        title: responseData.msg,
      });
      if (shouldMutate) {
        mutate(routes.courseRoutes.detail(courseId));
      }

      return responseData;
    } else if (responseData.error) {
      throw Error(responseData.error);
    } else if (responseData.msg) {
      toast({
        variant: "destructive",
        title: responseData.msg,
      });
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: e.message,
    });
  }
};

const UploadReferenceFile = async ({ course_id, reference_id, file }: any) => {
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }

  await nextFetcher({
    url: routes.courseRoutes.edit_reference(course_id, reference_id),
    method: "POST",
    body: formData,
    useToken: true,
  });
};

const setDefaultValues = (form: any, data: any) => {
  // Basic info
  form.setValue("image", data?.image);
  form.setValue(
    "section",
    data?.section == "college"
      ? "university"
      : data?.section || get(first(data?.categories), "section") == "college"
        ? "university"
        : get(first(data?.categories), "section") || "university"
  );
  form.setValue("name", data?.name || "");

  const prerequisite_titles = split(data?.prerequisite_title, ",");
  const formatted_prerequisite_titles = map(
    prerequisite_titles,
    (prerequisite_title) => ({
      text: trim(prerequisite_title),
    })
  );
  form.setValue(
    "prerequisite_title",
    data?.prerequisite_title ? formatted_prerequisite_titles : []
  );
  form.setValue(
    "week_count",
    data?.week_count ? String(data?.week_count) : null
  );
  form.setValue("avg_lesson_time", data?.avg_lesson_time || null);
  form.setValue("is_college", data?.is_college ? "true" : "false");
  form.setValue(
    "colleges",
    filter(data?.categories, { section: "college", type: "main_group" }) || []
  );
  form.setValue("grade", find(data?.categories, { type: "grade" })?.id || "");
  form.setValue("branch", filter(data?.categories, { type: "branch" }) || []);
  form.setValue(
    "main_group",
    filter(data?.categories, { type: "main_group" }) || []
  );
  form.setValue(
    "side_group",
    filter(data?.categories, { type: "side_group" }) || []
  );
  form.setValue("field", filter(data?.categories, { type: "field" }) || []);
  form.setValue("lesson", filter(data?.categories, { type: "lesson" }) || []);
  form.setValue(
    "academic_branch",
    find(data?.categories, { type: "academic_branch" })?.id || ""
  );
  form.setValue(
    "academic_group",
    filter(data?.categories, { type: "academic_group" }) || []
  );
  form.setValue(
    "academic_field",
    filter(data?.categories, { type: "academic_field" }) || []
  );
  form.setValue("theoretical_count", String(data?.theoretical_count) || "0");
  form.setValue("practical_count", String(data?.practical_count) || "0");
  form.setValue("basic_info", data?.basic_info || "");
  form.setValue("description", data?.description || "");

  // References
  form.setValue(
    "references.main_references",
    reverseTransformReferences(data?.references)?.main_references || [
      { reference: "", file: "", id: "" },
    ]
  );
  form.setValue(
    "references.additional_references",
    reverseTransformReferences(data?.references)?.additional_references || [
      { reference: "", file: "", id: "" },
    ]
  );

  // Part of video
  form.setValue(
    "part_of_video",
    find(data?.contents, { type: "part_of_video" }) || ""
  );

  // Cooperation method
  form.setValue("contract_type", data?.contract?.type || "");
  form.setValue("estimate_price", data?.estimate_price || "");

  // Contracts
  form.setValue("temp_contract", data?.temp_contract || "");
  form.setValue("signed_contract", data?.contract?.image || "");

  // Other
  form.setValue("level", data?.level || "");
  form.setValue("status", data?.status || "public");
  form.setValue("step", data?.status || 1);
  form.setValue(
    "content_id_pdf",
    find(data?.contents, { type: "temp_contract" })?.id || ""
  );
  form.setValue(
    "content_id_video",
    find(data?.contents, { type: "part_of_video" })?.id || ""
  );
};

const UploadReferencesFiles = async (
  references: any,
  courseId: any,
  apiReferences: any
) => {
  const transformed_references = transformReferences(references, true);
  transformed_references?.map(async (ref: any, i: number) =>
    typeof ref?.file == "object"
      ? await UploadReferenceFile({
          course_id: courseId,
          reference_id: apiReferences?.[i]?.id,
          file: ref?.file,
        })
      : null
  );
};

const submitStep = async (
  data: any,
  form: any,
  stepPath: any,
  isEditing: boolean,
  courseId: any,
  toast: any,
  mutate: any,
  setStepPath: any,
  type: any,
  router: any,
  backendStepIndex: any,
  hasChanges?: boolean,
  setAccessModalOpen?: any,
  apiStep?: any
) => {
  // if (!hasChanges) {
  //   updateStep(stepPath + 1);
  //   return;
  // }
  switch (stepPath) {
    case 1:
      if (stepPath <= backendStepIndex) {
        data.step = String(stepPath);
      }

      const step1 = await EditUser({
        data: data,
        preparedData: UpdateUserBody(data, type),
        type: type,
        toast: toast,
        router: router,
      });

      if (step1?.success) {
        mutate(routes.userRoutes.me);

        setStepPath(stepPath + 1);
      }
      break;
    case 2:
      if (stepPath <= backendStepIndex) {
        data.step = String(stepPath + 1);
      }

      const step2 = isEditing
        ? await EditCourse(
            data,
            courseId,
            CourseFormDataPrepare(data),
            toast,
            mutate,
            false
          )
        : await AddCourse(data, toast, CourseFormDataPrepare(data));

      if (step2?.success) {
        await UploadReferencesFiles(
          data?.references,
          courseId || step2?.data?.id,
          step2?.data?.references
        );

        if (isEditing) {
          setStepPath(stepPath + 1);

          mutate(routes.courseRoutes.detail(courseId));
        } else {
          if (type == "teaching-in-kateb") {
            router.push(`${step2?.data?.id}/edit?step=3`);
          } else {
            router.push(`${step2?.data?.id}/details?step=3`);
          }
        }
      }
      break;
    case 3:
      if (stepPath <= backendStepIndex) {
        data.step = String(stepPath + 1);
      }

      if (apiStep && stepPath > apiStep) {
        toast({
          variant: "destructive",
          title: "لطفا فرم مراحل قبل را تکمیل کنید.",
        });
        break;
      }

      const step3 = await EditCourse(
        data,
        courseId,
        HeadlineFormDataPrepare(data),
        toast,
        mutate,
        true
      );

      if (step3?.success) {
        setStepPath(stepPath + 1);

        mutate(routes.courseRoutes.detail(courseId));
      }
      break;

    case 4:
      if (stepPath <= backendStepIndex) {
        data.step = String(stepPath);
      }

      if (apiStep && stepPath > apiStep) {
        toast({
          variant: "destructive",
          title: "لطفا فرم مراحل قبل را تکمیل کنید.",
        });
        break;
      }

      // const step4 = await UploadContent(
      //   toast,
      //   courseId,
      //   PartOfCourseVideoDataPrepare(data)
      // );

      const step4 = await EditCourse(
        data,
        courseId,
        { step: data?.step },
        toast,
        mutate
      );

      if (step4?.success) {
        setStepPath(stepPath + 1);
      }
      break;
    case 5:
      if (stepPath <= backendStepIndex) {
        data.step = String(stepPath);
      }

      if (apiStep && apiStep < 4) {
        toast({
          variant: "destructive",
          title: "لطفا فرم مراحل قبل را تکمیل کنید.",
        });
        break;
      }

      const step5 = await EditCourse(
        data,
        courseId,
        CollaborationFormDataPrepare(data),
        toast,
        mutate
      );

      if (step5?.success) {
        setAccessModalOpen(true);

        setStepPath(stepPath + 0.5);

        mutate(routes.courseRoutes.detail(courseId));
      }
      break;
    case 6:
      data.step = String(stepPath);

      if (backendStepIndex == 7) {
        setStepPath(stepPath + 1);
        break;
      }

      const otpVerification = await verifyOTP(
        { otp: data?.otp },
        data?.mobile,
        () => {}
      );

      if (otpVerification?.success) {
        const step6 = await UploadSign(
          toast,
          courseId,
          ConclusionFormDataPrepare(data)
        );

        if (step6?.success) {
          await EditCourse(data, courseId, { step: data?.step }, toast, mutate);

          setAccessModalOpen(true);

          setStepPath(stepPath + 0.5);
        }
      } else {
        toast({
          variant: "destructive",
          title: otpVerification?.msg || "کد وارد شده صحیح نمی باشد",
          position: "top-right",
        });
      }
      break;
    case 7:
      form.handleSubmit(async (data: any) => {
        router.push("/studio/classes");
      })();
      break;
    default:
      break;
  }
};

export {
  AddCourse,
  EditCourse,
  FlattenCategories,
  reverseTransformReferences,
  setDefaultValues,
  submitStep,
  transformReferences,
  UploadReferenceFile,
};
