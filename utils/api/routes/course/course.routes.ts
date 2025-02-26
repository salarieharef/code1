import { PaginationType } from "@/types/api-pagination";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const courseRoutes = {
  //   courses: ({ page = 1, limit = 20, sort = "" }: any) => ({
  //     method: "POST",
  //     url: `${apiHost}/${apiVersion}/courses?page=${page}&limit=${limit}&sort=${sort || ""}`,
  //   }),
  courses: ({ page = 1, limit = 20, sort = "" }: any) =>
    `${apiHost}/${apiVersion}/courses?page=${page}&limit=${limit}&sort=${sort || ""}`,
  coursesRelatedTeachers: (id: any) =>
    `${apiHost}/${apiVersion}/courses/${id}/related/teachers`,
  coursesRelatedCourses: (id: any, page: number = 1) =>
    `${apiHost}/${apiVersion}/courses/${id}/related/courses?page=${page}&limit=5`,
  detail: (id: any) => `${apiHost}/${apiVersion}/courses/${id}/details`,
  course_lessons: ({ id, page = 1 }: any) =>
    `${apiHost}/${apiVersion}/courses/${id}/lessons?page=${page}`,
  add: `${apiHost}/${apiVersion}/courses/add`,
  edit: (id?: any) => `${apiHost}/${apiVersion}/courses/${id}/edit`,
  delete: (id?: number) => `${apiHost}/${apiVersion}/courses/${id}/delete`,
  uploadImage: (id: any) =>
    `${apiHost}/${apiVersion}/courses/${id}/upload/image`,

  toggleStatus: (id?: number) =>
    `${apiHost}/${apiVersion}/courses/${id}/toggle/status`,

  contents: (id?: any, type?: string) =>
    `${apiHost}/${apiVersion}/courses/${id}/contents${
      type ? `?type=${type}` : ""
    }`,
  addContent: (id?: any) => `${apiHost}/${apiVersion}/courses/${id}/upload`,
  deleteContent: (id?: any, contentId?: any) =>
    `${apiHost}/${apiVersion}/courses/${id}/contents/${contentId}/delete`,

  uploadSign: (id?: any) =>
    `${apiHost}/${apiVersion}/courses/${id}/upload/sign`,

  links: (id?: any, type?: string) =>
    `${apiHost}/${apiVersion}/course/${id}/links${type ? `?type=${type}` : ""}`,
  addLink: (id?: any) => `${apiHost}/${apiVersion}/course/${id}/add/link`,
  deleteLink: (id?: any, linkId?: any) =>
    `${apiHost}/${apiVersion}/course/${id}/links/${linkId}/delete`,

  comments: (id: any, page: number = 1) =>
    `${apiHost}/${apiVersion}/course/${id}/comments?page=${page}`,
  like: (id: any) => `${apiHost}/${apiVersion}/courses/${id}/like`,
  unlike: (id: any) => `${apiHost}/${apiVersion}/courses/${id}/unlike`,
  save: (id: any) => `${apiHost}/${apiVersion}/courses/${id}/save`,
  unsave: (id: any) => `${apiHost}/${apiVersion}/courses/${id}/unsave`,
  view: (id: any) => `${apiHost}/${apiVersion}/courses/${id}/view`,
  courseLessons: (id: any, page: number = 1) =>
    `${apiHost}/${apiVersion}/courses/${id}/lessons?page=${page}`,
  addComment: (id: any) => `${apiHost}/${apiVersion}/course/${id}/add/comment`,

  stats: (id: any) => `${apiHost}/${apiVersion}/courses/${id}/stats`,

  topics: ({ page = 1, limit }: PaginationType, sort: any = "", id: any) =>
    `${apiHost}/${apiVersion}/courses/${id}/topics?page=${page}${sort ? `&sort=sort` : ""}`,

  references: ({ page = 1, limit, type }: any, sort: any = "", id: any) =>
    `${apiHost}/${apiVersion}/courses/${id}/reference?page=${page}&type=${type || ""}&sort=${sort || ""}`,
  add_reference: (id: any) =>
    `${apiHost}/${apiVersion}/course/${id}/add/reference`,
  edit_reference: (id: any, reference_id: any) =>
    `${apiHost}/${apiVersion}/course/${id}/reference/${reference_id}/edit`,
  delete_reference: (id: any, reference_id: any) =>
    `${apiHost}/${apiVersion}/course/${id}/reference/${reference_id}/delete`,

  // getPartnershipFiles: () => ({
  //   url: `${apiHost}/${apiVersion}/files/partnership`,
  //   method: "GET",
  // }),

  // getFullPaymentFiles: () => ({
  //   url: `${apiHost}/${apiVersion}/files/full_payment`,
  //   method: "GET",
  // }),

  // getMemberExclusiveFiles: () => ({
  //   url: `${apiHost}/${apiVersion}/files/member_exclusive`,
  //   method: "GET",
  // }),
};
