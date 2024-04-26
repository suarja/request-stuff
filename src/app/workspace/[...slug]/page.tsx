import { Nav } from "@/common/components/Nav";
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
    <main className="flex min-h-screen w-full flex-col gap-12 items-center justify-start p-12">
      <Nav />
      <section className="flex flex-col h-full w-full justify-center gap-4 p-1">
        <FolderTree title="Documents" root={pathContent} />
      </section>
    </main>
  );
}
