import { PaginationType } from "@/types/api-pagination";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const lessonRoutes = {
  lessons: ({ page = 1, limit = 20 }: PaginationType) =>
    `${apiHost}/${apiVersion}/lessons?page=${page}&limit=${limit}`,
  details: (id: any) => `${apiHost}/${apiVersion}/lessons/${id}/details`,
  add: `${apiHost}/${apiVersion}/lessons/add`,
  upload: (id: number | string | string[]) =>
    `${apiHost}/${apiVersion}/lessons/${id}/upload`,
  uploadImage: (id: number | string | string[]) =>
    `${apiHost}/${apiVersion}/lessons/${id}/upload/image`,
  delete: (id: number) => `${apiHost}/${apiVersion}/lessons/${id}/delete`,
  edit: (id: number | string | string[]) =>
    `${apiHost}/${apiVersion}/lessons/${id}/edit`,
  like: (id: number) => `${apiHost}/${apiVersion}/lessons/${id}/like`,
  unlike: (id: number) => `${apiHost}/${apiVersion}/lessons/${id}/unlike`,
  save: (id: number) => `${apiHost}/${apiVersion}/lessons/${id}/save`,
  unsave: (id: number) => `${apiHost}/${apiVersion}/lessons/${id}/unsave`,
  view: (id: number) => `${apiHost}/${apiVersion}/lessons/${id}/view`,

  stats: (id: any) => `${apiHost}/${apiVersion}/lessons/${id}/stats`,

  contents: (id: any, type?: string) =>
    `${apiHost}/${apiVersion}/lessons/${id}/contents${
      type ? `?type=${type}` : ""
    }`,
  addContent: (id?: any) => `${apiHost}/${apiVersion}/lessons/${id}/upload`,
  deleteContent: (id?: any, contentId?: any) =>
    `${apiHost}/${apiVersion}/lessons/${id}/contents/${contentId}/delete`,

  links: (id?: any, type?: string) =>
    `${apiHost}/${apiVersion}/lesson/${id}/links${type ? `?type=${type}` : ""}`,
  addLink: (id?: any) => `${apiHost}/${apiVersion}/lesson/${id}/add/link`,
  deleteLink: (id?: any, linkId?: any) =>
    `${apiHost}/${apiVersion}/lesson/${id}/links/${linkId}/delete`,

  reorderLessons: (id?: any) =>
    `${apiHost}/${apiVersion}/courses/${id}/lessons/reorder`,
};
