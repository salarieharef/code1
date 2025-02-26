import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import routes from "@/utils/api/routes";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        code: { label: "Password", type: "password" },
        user: { label: "User", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.user && credentials?.user !== "null") {
            return JSON.parse(credentials?.user);
          } else {
            const response = await fetch(routes.authRoutes.verifyServer, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: credentials?.username,
                code: credentials?.code,
              }),
            });

            const data = await response.json();

            // If no error and we have user data, return it
            if (data?.success && data?.data) {
              return data?.data;
            } else {
              throw data?.msg;
            }
          }
        } catch (e: any) {
          console.error(e);
          throw e;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // Refresh the session every 24 hours
  },

  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update" && session) {
        token.user = session?.user?.data;
      }

      if (user) {
        token.token = user?.token;
        token.user = user?.user;
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user = await token.user;
        session.token = await token.token;
        return session;
      }
    },
  },

  pages: {
    signIn: "/auth/login",
  },
  events: {
    async session(session: any) {
      // Check if session has expired based on 'expires' property
      if (session.expires && new Date(session.expires).getTime() < Date.now()) {
        session.token = null;
        session.user = null;
      }
    },
  },
};
