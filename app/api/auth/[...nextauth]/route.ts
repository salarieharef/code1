import { authOptions } from "@/utils/functions/authentication/next-authOptions.function";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// export default NextAuth(authOptions);
export { handler as GET, handler as POST };
