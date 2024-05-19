import { BASE_URL, PATHS } from "@/common/constants";
import Login from "@/features/auth/presentation/views/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  // Get cookies
  const session = cookies().get("session");
  console.log({ session });
  if (!session) {
    return <Login />;
  }
  const responseAPI = await fetch(PATHS.LOGIN_API(), {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (responseAPI.ok === true) {
    redirect(PATHS.DASHBOARD());
  }
  return <Login />;
}
