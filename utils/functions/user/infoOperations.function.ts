// Util imports
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { find, reject } from "lodash-es";

// Type imports
import { UploadAvatar } from "./avatarOperations.function";

const defaultValues = {
  // Basic info
  avatar: "",
  academic_affiliation: null,
  academic_role: "",
  job_title: "",
  workplace: "",
  bio: "",
  first_name: "",
  last_name: "",
  mobile: "",
  nation_code: "",
  gender: "",
  father_name: "",
  state: "",
  city_id: "",
  email: "",
  university_id: "",
  field_id: "",
  education_tendency: "",
  last_degree_university: "",
  education_title: "",
  education_image: "",

  // Activities
  education_activities: [{ organization: "", position: "" }],

  // Histories
  education_histories: [{ title: "", type: "", url: "" }],

  // Resume
  resume: "",

  // Introduction video
  introduction_video: "",
  is_introduction_video_public: "",

  // Description
  description: "",

  // About
  about_me: "",

  // Rules
  rules_agreed: false,
};

const setDefaultValues = (form: any, data: any) => {
  // Basic info
  form.setValue("avatar", data?.image);
  form.setValue("academic_role", data?.academic_role);
  form.setValue(
    "academic_affiliation",
    data?.academic_affiliation === "other"
      ? "false"
      : data?.academic_affiliation === "islamic_azad_university"
        ? "true"
        : ""
  );
  form.setValue("job_title", data?.job_title);
  form.setValue("workplace", data?.workplace);
  form.setValue("bio", data?.bio);
  form.setValue("first_name", data?.first_name);
  form.setValue("last_name", data?.last_name);
  form.setValue("mobile", data?.mobile);
  form.setValue("nation_code", data?.nation_code);
  form.setValue("gender", data?.gender);
  form.setValue("father_name", data?.father_name);

  form.setValue("state", data?.state?.id);
  form.setValue("city_id", data?.city?.id);
  form.setValue("email", data?.email);
  form.setValue("university_id", data?.university?.id);
  form.setValue("university_title", data?.university_title);
  form.setValue("field_id", data?.field?.id);
  form.setValue("field_title", data?.field_title);
  form.setValue("education_tendency", data?.education_tendency);
  form.setValue("last_degree_university", data?.last_degree_university);
  form.setValue("education_title", data?.education_title);
  form.setValue("education_image", data?.education_certificate?.image);

  // Activities
  form.setValue(
    "education_activities",
    data?.education_activities?.length
      ? data?.education_activities
      : [{ organization: "", position: "" }]
  );

  // Histories
  form.setValue(
    "education_histories",
    data?.education_histories?.length
      ? data?.education_histories
      : [{ title: "", type: "", url: "" }]
  );

  // Resume
  form.setValue("resume", data?.resume);

  // Introduction video
  form.setValue(
    "introduction_video",
    find(data?.contents, { type: "introduction_video" })?.file
  );
  form.setValue(
    "is_introduction_video_public",
    data?.is_introduction_video_public || false
  );

  // Description
  form.setValue("user_description", data?.description);

  // About
  form.setValue("about_me", data?.about_me);
  form.setValue("is_about_me_public", data?.is_about_me_public || false);
};

const UploadIntroductionVideo = async (
  data: any,
  file: any,
  toast?: any,
  setProgress?: any
) => {
  try {
    const fileFormData = new FormData();
    fileFormData.append("file", file || data?.introduction_video);
    if (file) {
      fileFormData.append("title", `${data?.first_name} ${data?.last_name}`);
    }

    const res = await nextFetcher({
      url: routes.userRoutes.uploadIntroductionVideo,
      method: "POST",
      body: fileFormData,
      useToken: true,
      options: {
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded * 100) / total);
          if (setProgress) {
            setProgress(percentage);
          }
        },
      },
    });

    if (res.success) {
      toast({
        variant: "success",
        title: "ویدئو معرفی با موفقیت آپلود شد",
      });
    } else if (res.error) {
      throw Error(res.error);
    }
  } catch (e: any) {
    console.error(e);
    toast({
      variant: "destructive",
      title: "خطا در آپلود ویدئو معرفی",
      description: e.message,
    });
  } finally {
    if (setProgress) {
      setProgress(0);
    }
  }
};

// Function to delete introduction video
const DeleteIntroductionVideo = async (toast?: any, mutate?: any) => {
  try {
    const res = await nextFetcher({
      url: routes.userRoutes.removeIntroductionVideo,
      method: "POST",
      useToken: true,
    });

    if (res.success) {
      toast({
        variant: "success",
        title: "ویدیو معرفی با موفقیت حذف شد",
      });
      mutate(routes.userRoutes.me);
    } else if (res.error) {
      throw new Error(res.error);
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در حذف ویدیو معرفی",
      description: e.message,
    });
  }
};

// Function to upload education certificate
const UploadEducationCertificate = async (
  data: any,
  toast?: any,
  setProgress?: any
) => {
  try {
    const fileFormData = new FormData();
    fileFormData.append("image", data?.education_image);
    fileFormData.append("title", data?.education_title);

    const res = await nextFetcher({
      url: routes.userRoutes.uploadEducation,
      method: "POST",
      body: fileFormData,
      useToken: true,
      options: {
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded * 100) / total);
          if (setProgress) {
            setProgress(percentage);
          }
        },
      },
    });

    if (res.success) {
      toast({
        variant: "success",
        title: "مدرک تحصیلی با موفقیت آپلود شد",
      });
    } else if (res.error) {
      throw new Error(res.error);
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در آپلود مدرک تحصیلی",
      description: e.message,
    });
  } finally {
    if (setProgress) {
      setProgress(0);
    }
  }
};

// Function to upload resume
const UploadResume = async (data: any, toast?: any, setProgress?: any) => {
  try {
    const fileFormData = new FormData();
    fileFormData.append("resume", data?.resume);

    const res = await nextFetcher({
      url: routes.userRoutes.uploadResume,
      method: "POST",
      body: fileFormData,
      useToken: true,
      options: {
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded * 100) / total);
          if (setProgress) {
            setProgress(percentage);
          }
        },
      },
    });

    if (res.success) {
      toast({
        variant: "success",
        title: "رزومه با موفقیت آپلود شد",
      });
    } else if (res.error) {
      throw new Error(res.error);
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در آپلود رزومه",
      description: e.message,
    });
  } finally {
    if (setProgress) {
      setProgress(0);
    }
  }
};

// Function to delete avatar
const DeleteResume = async (toast?: any, mutate?: any) => {
  try {
    const res = await nextFetcher({
      url: routes.userRoutes.removeResume,
      method: "POST",
      useToken: true,
    });

    if (res.success) {
      toast({
        variant: "success",
        title: "رزومه با موفقیت حذف شد",
      });
      mutate(routes.userRoutes.me);
      return { success: true };
    } else if (res.error) {
      throw new Error(res.error);
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در حذف رزومه",
      description: e.message,
    });
    return { success: false };
  }
};

const UpdateUserBody = (data: any, type: string) => ({
  job_title: data?.job_title,
  workplace: data?.workplace,
  bio: data?.bio,
  first_name: data?.first_name,
  last_name: data?.last_name,
  father_name: data?.father_name,
  gender: data?.gender,
  nation_code: data?.nation_code,
  state_id: data?.state,
  city_id: data?.city_id,
  email: data?.email,
  university_id: data?.university_id,
  university_title: data?.university_title,
  field_id: data.field_id,
  field_title: data.field_title,
  education_tendency: data?.education_tendency,
  last_degree_university: data?.last_degree_university,
  education_title: data?.education_title,
  academic_affiliation:
    data?.academic_affiliation === "true" ? "islamic_azad_university" : "other",
  academic_role: data?.academic_role,
  education_activities: reject(data.education_activities, {
    organization: "",
    position: "",
  }),
  education_histories: reject(data.education_histories, {
    title: "",
    type: "",
    url: "",
  }),
  teaching_in_kateb: type === "teaching-in-kateb",
  user_type: "teacher",
  description: data?.user_description,
  about_me: data?.about_me,
  is_about_me_public: data?.is_about_me_public,
});

const EditUser = async ({
  data,
  preparedData,
  type,
  toast,
  router,
  mutate = () => {},
  setAvatarProgress = () => {},
  setEducationFileProgress = () => {},
  setIntroductionVideoProgress = () => {},
  setResumeProgress = () => {},
}: {
  data: any;
  preparedData: any;
  type: string;
  toast: any;
  router: any;
  mutate?: any;
  setAvatarProgress?: any;
  setEducationFileProgress?: any;
  setIntroductionVideoProgress?: any;
  setResumeProgress?: any;
}) => {
  try {
    if (data?.avatar && typeof data?.avatar !== "string") {
      UploadAvatar(data, toast, mutate, setAvatarProgress);
    }

    if (data?.education_image && typeof data?.education_image !== "string") {
      UploadEducationCertificate(data, toast, setEducationFileProgress);
    }

    // if (
    //   data?.introduction_video &&
    //   typeof data?.introduction_video !== "string"
    // ) {
    //   UploadIntroductionVideo(data, toast, setIntroductionVideoProgress);
    // }

    if (data?.resume && typeof data?.resume !== "string") {
      UploadResume(data, toast, setResumeProgress);
    }

    const res = await nextFetcher({
      url: routes.userRoutes.edit,
      method: "POST",
      body: preparedData,
      useToken: true,
    });

    if (res.success) {
      toast({ variant: "success", title: res.msg });

      if (type == "course") {
        router.push(`?step=2`);
      }

      return res;
    } else if (res.error) {
      toast({
        variant: "destructive",
        title: "خطا در به‌روزرسانی اطلاعات",
        description: res.msg,
      });
    }
  } catch (e: any) {
    toast({
      variant: "destructive",
      title: "خطا در به‌روزرسانی اطلاعات",
      description: e.message,
    });
  }
};

export {
  defaultValues,
  DeleteIntroductionVideo,
  DeleteResume,
  EditUser,
  setDefaultValues,
  UpdateUserBody,
  UploadEducationCertificate,
  UploadIntroductionVideo,
  UploadResume,
};
