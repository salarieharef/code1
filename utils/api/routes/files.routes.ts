const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const filesRoutes = {
  contract_files: ({ page }: any) => {
    return {
      url: `${apiHost}/${apiVersion}/files/contract_files?page=${page || 1}`,
      method: "GET",
    };
  },
};
