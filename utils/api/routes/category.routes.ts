import { PaginationType } from "@/types/api-pagination";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const categoryRoutes = {
	// filters: `${apiHost}/${apiVersion}/categories/filters`,
	categories: ({
		limit = 50,
		page = 1,
	}: PaginationType & { q?: string } = {}) =>
		`${apiHost}/${apiVersion}/categories?page=${page}${
			limit ? `&limit=${limit}` : ""
		}`,
	// categoryCourses: (
	// 	main_category: any,
	// 	q?: string,
	// 	level?: string,
	// 	teacher?: string
	// ) =>
	// 	`${apiHost}/${apiVersion}/categories/courses?main_category=${main_category}${
	// 		q ? "&q=" + q : ""
	// 	}${level ? "&level=" + level : ""}${teacher ? "&teacher=" + teacher : ""}`,

	// addOther: () => `${apiHost}/${apiVersion}/categories/other/add`,
};
