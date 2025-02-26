import { PaginationType } from "@/types/api-pagination";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const studentRoutes = {
	stats: (id: any) => `${apiHost}/${apiVersion}/students/${id}/stats`,
	students: ({ page = 1, limit, sort = "" }: PaginationType) =>
		`${apiHost}/${apiVersion}/students?page=${page}&limit=${limit}`,
};
