
const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const slideRoutes = {
	slides: ({ type }: { type?: string }) =>
		`${apiHost}/${apiVersion}/slides?${type ? `type=${type}` : ""}`,
};
