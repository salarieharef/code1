import { authOptions } from "@/utils/functions/authentication/next-authOptions.function";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Studio() {
  const session: any = await getServerSession(authOptions);

  if (session?.user?.id) redirect(`/studio/dashboard`);
}
