const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const agreementRoutes = {
  groups: () => ({
    url: `${apiHost}/${apiVersion}/rules/groups`,
    method: "GET",
  }),
  rules: (group_id?: string) => ({
    url: `${apiHost}/${apiVersion}/rules?group_id=${group_id || ""}`,
    method: "GET",
  }),
};
