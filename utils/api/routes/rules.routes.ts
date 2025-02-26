const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
export const rulesRoutes = {
  getRules: ({ type }: any) => {
    return {
      url: `${apiHost}/${apiVersion}/user/rules/types/${type}/details`,
      // user/rules/types/key_to_access_rule/details
      method: "GET",
    };
  },

  checkObjectRule: (payload: any) => {
    return {
      url: `${apiHost}/${apiVersion}/user/rules/check`,
      // user/rules/types/key_to_access_rule/details
      method: "POST",
      body: payload,
    };
  },

  addRules: (payload: any) => ({
    url: `${apiHost}/${apiVersion}/user/rules/add`,
    method: "POST",
    body: payload,
  }),
};
