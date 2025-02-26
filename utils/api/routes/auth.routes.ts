const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
const sessionHost = process.env.NEXT_PUBLIC_SESSION_SERVER;

export const authRoutes = {
  forgotPassword: `${apiHost}/${apiVersion}/forget`,
  signup: `${apiHost}/${apiVersion}/signup`,
  login: `${apiHost}/${apiVersion}/login`,
  verify: `${apiHost}/${apiVersion}/verify`,
  verifyServer: `${sessionHost}/${apiVersion}/verify`,
  resend: `${apiHost}/${apiVersion}/resend`,
  forget: `${apiHost}/${apiVersion}/forget`,
  getCountries: `${apiHost}/${apiVersion}/countries`,
};
