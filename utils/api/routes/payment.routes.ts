const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const paymentRoutes = {
  //   userTransactionsId: (userId: any) =>
  //     `${apiHost}/${apiVersion}/user/${userId}/transactions`,
  userTransactions: () => `${apiHost}/${apiVersion}/user/transactions`,
};
