import { withAuth } from "next-auth/middleware";
import { options } from "@/utils/functions/authentication/authorizationOptions.function";

// Apply the withAuth middleware with the specified options
export default withAuth(options);

export const config = {
  // Specify the paths for the middleware to match
  matcher: ["/studio/:path*", "/teaching-in-kateb/:path*", "/redirect"],
};
