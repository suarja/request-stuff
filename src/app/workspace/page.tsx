import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";
import FolderTree from "@/features/file/presentation/components/Foldertree";
import { getUserIdFromSessionCookie } from "@/lib/firebase/auth/server-side-user-id";
import { cookies } from "next/headers";

export default async function Page() {
  const session = cookies().get("session")?.value || "";

  const userId = await getUserIdFromSessionCookie({
    sessionCookie: session,
  });
  console.log({ userId });

  if (!userId) {
    return <div>Not logged in</div>;
  }
  const pathContent = await fileRepositoryImplementation.getPathContent({
    path: `users/${userId}/files`,
    root: `root`,
  });
  console.log({ pathContent });

  return (
    <div>
      <FolderTree title="Documents" root={pathContent} />
    </div>
  );
}
