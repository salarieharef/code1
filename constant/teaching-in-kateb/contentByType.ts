// constants/contentByType.ts
type AccessModalType = "trackingCode" | "pendingRequest" | "contractSubmission";

const contentByType: Record<
  AccessModalType,
  {
    introduction: (userFullName: string) => string;
    title: (courseId?: string | number, courseName?: string) => string;
    description: (step?: number) => string;
  }
> = {
  trackingCode: {
    introduction: (userFullName) => `${userFullName}؛`,
    title: (courseId, courseName) =>
      `درخواست شما به کد رهگیری ${courseId ?? ""}# با موفقیت ثبت شد.`,
    description: () =>
      `این درخواست جهت بررسی برای کمیته تخصصی داوران کاتب ارسال شد. نتیجه داوری به زودی در قسمت اعلانات سامانه برای شما مشخص میشود.`,
  },
  pendingRequest: {
    introduction: (userFullName) => `${userFullName}؛`,
    title: (courseId, courseName) =>
      `درخواست تدریس شما برای درس "${courseName ?? ""}" با کد رهگیری ${courseId ?? ""}# ثبت شد.`,
    description: (step) => {
      if (step === 5.5) {
        return `این درخواست جهت بررسی برای کمیته تخصصی داوران کاتب ارسال شد. نتیجه داوری به زودی در قسمت اعلانات سامانه برای شما مشخص میشود.`;
      }
      if (step === 6.5) {
        return `قرارداد شما جهت ثبت در کاتب برای کمیته حقوقی ارسال شد. شما میتوانید مطابق قرارداد و براساس قوانین کاتب تولید محتوا خود را انجام دهید.`;
      }
      return `این درخواست جهت بررسی برای کمیته تخصصی داوران کاتب ارسال شد. نتیجه داوری به زودی در قسمت اعلانات سامانه برای شما مشخص میشود.`;
    },
  },
  contractSubmission: {
    introduction: (userFullName) => `${userFullName}؛`,
    title: (courseId, courseName) =>
      `درخواست تدریس شما برای درس "${courseName ?? ""}" با کد رهگیری ${courseId ?? ""}# ثبت شد.`,
    description: () => {
      //   if (step === 5.5) {
      //     return `این درخواست جهت بررسی برای کمیته تخصصی داوران کاتب ارسال شد. نتیجه داوری به زودی در قسمت اعلانات سامانه برای شما مشخص میشود.`;
      //   }
      //   if (step === 6.5) {
      //     return `قرارداد شما جهت ثبت در کاتب برای کمیته حقوقی ارسال شد. شما میتوانید مطابق قرارداد و براساس قوانین کاتب تولید محتوا خود را انجام دهید.`;
      //   }
      return `این درخواست جهت بررسی برای کمیته تخصصی داوران کاتب ارسال شد. نتیجه داوری به زودی در قسمت اعلانات سامانه برای شما مشخص میشود.`;
    },
  },
};

export default contentByType;
