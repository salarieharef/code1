export const options = {
  callbacks: {
    // Callback to determine if the user is authorized
    async authorized({ req, token }: { req: any; token: any }) {
      const url = req.nextUrl;

      // Redirect to sign-in page if the user is not authenticated
      if (!token) {
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/login", // Specify the sign-in page
  },
};
