import { BASE_URL } from "@/common/constants";

export async function getUserIdFromSessionCookie({
  sessionCookie,
}: {
  sessionCookie: string;
}): Promise<string | null> {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "GET",
    headers: {
      Cookie: `session=${sessionCookie}`,
    },
  });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data.userId;
}
