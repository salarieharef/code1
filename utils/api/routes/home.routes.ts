import { PaginationType } from "@/types/api-pagination";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const homeRoutes = {
  // home: { method: "GET", url: `${apiHost}/${apiVersion}/home` },

  // slides: { method: "GET", url: `${apiHost}/${apiVersion}/home/slides` },

  teachers: { method: "GET", url: `${apiHost}/${apiVersion}/home/teachers` },

  courses: (category?: number) => ({
    method: "GET",
    url: `${apiHost}/${apiVersion}/home/courses${category ? `?category=${category}` : ""}`,
  }),

  // search: (q: string) => ({
  //   method: "GET",
  //   url: `${apiHost}/${apiVersion}/home/search?q=${q}`,
  // }),

  faqs: ({ limit, page = 1 }: PaginationType = {}) => ({
    method: "GET",
    url: `${apiHost}/${apiVersion}/home/faqs?page=${page}${limit ? `&limit=${limit}` : ""}`,
  }),

  // diffs: { method: "GET", url: `${apiHost}/${apiVersion}/home/diffs` },

  stats: { method: "GET", url: `${apiHost}/${apiVersion}/home/stats` },

  states: ({ limit, page = 1, q }: PaginationType = {}) => ({
    method: "GET",
    url: `${apiHost}/${apiVersion}/states?page=${page}${limit ? `&limit=${limit}` : ""}&q=${q || ""}`,
  }),

  cities: ({
    state,
    limit,
    page = 1,
    q,
  }: {
    state?: any;
    limit?: number;
    page?: number;
    q?: string;
  } = {}) => ({
    method: "GET",
    url: `${apiHost}/${apiVersion}/cities?state=${state || ""}&page=${page}${q ? `&q=${q}` : ""}${limit ? `&limit=${limit}` : ""}`,
  }),

  universities: ({
    limit,
    page = 1,
    q,
    sort,
  }: PaginationType & { q?: string; score?: string } = {}) => ({
    method: "POST",
    url: `${apiHost}/${apiVersion}/universities?page=${page}${limit ? `&limit=${limit}` : ""}&q=${q || ""}&sort=${sort || ""}`,
  }),

  universityDetails: ({ q, id }: { q?: string; id: string }) => ({
    method: "GET",
    url: `${apiHost}/${apiVersion}/universities/${id || ""}/details?q=${q || ""}`,
  }),
};
