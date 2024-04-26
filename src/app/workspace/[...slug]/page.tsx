import { Nav } from "@/common/components/Nav";
import { fileUsecases } from "@/features/file/application/usecases/file-usecases";
import FolderTree from "@/features/file/presentation/components/Foldertree";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const session = cookies().get("session")?.value || "";

  const userId = await fileUsecases.getUserIdFromCookies({ session });

  if (!userId) {
    return <div>Not logged in</div>;
  }

  const paramsConcat = params.slug.join("/");
  const path = paramsConcat === "files" ? "files" : paramsConcat;

  const pathContent = await fileUsecases.getPathContent({
    path: `users/${userId}/${path}`,
    root: params.slug[params.slug.length - 1],
  });

  return (
    <main className="flex min-h-screen w-full flex-col gap-12 items-center justify-start px-4 py-24  ">
      <Nav />
      <section className="flex flex-col h-full w-full justify-center gap-4 ">
        <FolderTree params={path} title="Documents" root={pathContent} />
      </section>
    </main>
  );
}
