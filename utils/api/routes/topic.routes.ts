import { PaginationType } from "@/types/api-pagination";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const topicRoutes = {
	topics: ({ page = 1, limit, sort = "" }: PaginationType) =>
		`${apiHost}/${apiVersion}/topics?page=${page}${sort ? `&sort=${sort}` : ""}`,

	details: ({ id }: { id: any }) =>
		`${apiHost}/${apiVersion}/topics/${id}/details`,
	add: `${apiHost}/${apiVersion}/topics/add`,
	answer: (id: any) => `${apiHost}/${apiVersion}/topics/${id}/answers/add`,
	answers: (id: any) => `${apiHost}/${apiVersion}/topics/${id}/answers`,
};
