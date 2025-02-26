
const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const helpRoutes = {
	helps: ({
		q,
		group_id,
		sort,
		limit,
	}: {
		q?: string;
		group_id?: string | number;
		sort?: string;
		limit?: string | number;
	}) => ({
		method: "GET",
		url: `${apiHost}/${apiVersion}/helps?q=${q || ""}&group_id=${
			group_id || ""
		}&sort=${sort || ""}&limit=${limit || ""}`,
	}),
	helpGroups: () => ({
		method: "GET",
		url: `${apiHost}/${apiVersion}/helps/groups`,
	}),
};
