import { PaginationType } from "@/types/api-pagination";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const teacherRoutes = {
  courses: ({
    page = 1,
    q = "",
    limit,
    sort,
  }: PaginationType & { q?: string; sort?: string }) =>
    `${apiHost}/${apiVersion}/teachers/courses?page=${page}&q=${q}&sort=${
      sort ? sort : ""
    }${limit ? `&limit=${limit}` : ""}`,

  lessons: ({ page = 1, limit, sort = "" }: PaginationType) =>
    `${apiHost}/${apiVersion}/teachers/lessons?page=${page}&sort=${
      sort ? sort : ""
    }`,
  courseLessons: ({ page = 1, limit = 20, id }: PaginationType & { id: any }) =>
    `${apiHost}/${apiVersion}/teachers/courses/${id}/lessons?page=${page}&limit=${limit}`,
  comments: ({ limit, page = 1 }: PaginationType) =>
    `${apiHost}/${apiVersion}/teachers/comments?page=${page}`,

  details: (id: any) => `${apiHost}/${apiVersion}/teachers/${id}/details`,
  stats: (id: any) => `${apiHost}/${apiVersion}/teachers/${id}/stats`,
  teachers: ({ page = 1, limit = 10, sort = "" }: PaginationType) =>
    `${apiHost}/${apiVersion}/teachers?page=${page}&sort=${sort}&limit=${limit}`,

  introduction_video: (id: any) =>
    `${apiHost}/${apiVersion}/teachers/${id}/upload/video`,
  students: (
    id: number,
    { page = 1, limit = 10, q = "" }: PaginationType = { page: 1, limit: 10 }
  ) =>
    `${apiHost}/${apiVersion}/teachers/${id}/students?page=${page}${q ? `&q=${q}` : ""}`,
};
