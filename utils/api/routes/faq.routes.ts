const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const faqRoutes = {
  helps: (q?: string, group?: string, sort?: string) => ({
    url: `${apiHost}/${apiVersion}/helps?q=${q || ""}&group_id=${group || ""}&sort=${sort || ""}`,
    method: "GET",
  }),
  groups: () => ({
    url: `${apiHost}/${apiVersion}/helps/groups`,
    method: "GET",
  }),
};
