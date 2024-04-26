import { store } from "@/context/params-server-components";
import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";
import FolderTree from "@/features/file/presentation/components/Foldertree";
import { getUserIdFromSessionCookie } from "@/lib/firebase/auth/server-side-user-id";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const session = cookies().get("session")?.value || "";

  const userId = await getUserIdFromSessionCookie({
    sessionCookie: session,
  });

  if (!userId) {
    return <div>Not logged in</div>;
  }

  const paramsConcat = params.slug.join("/");
  const path = paramsConcat === "files" ? "files" : paramsConcat;

  store.setData(path);
  const pathContent = await fileRepositoryImplementation.getPathContent({
    path: `users/${userId}/${path}`,
    root: params.slug[params.slug.length - 1],
  });

  return (
    <div>
      <FolderTree title="Documents" root={pathContent} />
    </div>
  );
}
