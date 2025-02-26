import { PaginationType } from "@/types/api-pagination";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const fieldRoutes = {
  fields: ({
    limit = 50,
    page = 1,
    q,
  }: PaginationType & { q?: string } = {}) => {
    return {
      method: "GET",
      url: `${apiHost}/${apiVersion}/fields?page=${page}${`&limit=${limit || ""}`}&q=${q || ""}`,
    };
  },
};
