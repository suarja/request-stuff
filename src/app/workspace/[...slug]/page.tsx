import CustomDialog from "@/common/components/CustomDialog";
import { Nav } from "@/common/components/Nav";
import { store } from "@/context/params-server-components";
import { fileUsecases } from "@/features/file/application/usecases/file-usecases";
import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";
import FileUpload from "@/features/file/presentation/components/FileUpload";
import FolderTree from "@/features/file/presentation/components/Foldertree";
import CreateRequestForm from "@/features/request/presentation/components/RequestForm";
import { getUserIdFromSessionCookie } from "@/lib/firebase/auth/server-side-user-id";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { slug: string[] } }) {
  //~ Create usecase to get user id from session cookie
  const session = cookies().get("session")?.value || "";

  const userId = await fileUsecases.getUserIdFromCookies({ session });

  if (!userId) {
    return <div>Not logged in</div>;
  }

  const paramsConcat = params.slug.join("/");
  const path = paramsConcat === "files" ? "files" : paramsConcat;

  //~ Create usecase to get path content and remove repository from application layer
  const pathContent = await fileRepositoryImplementation.getPathContent({
    path: `users/${userId}/${path}`,
    root: params.slug[params.slug.length - 1],
  });

  return (
    <main className="flex min-h-screen w-full flex-col gap-12 items-center justify-start p-12">
      <Nav />
      <section className="flex flex-col h-full w-full justify-center gap-4 p-1">
        <FolderTree title="Documents" root={pathContent} />
        <div>
          <CustomDialog buttonText="Add File" title="Add File">
            <FileUpload />
          </CustomDialog>
        </div>
        <div>
          <CustomDialog buttonText="Create Request" title="Create Request">
            <CreateRequestForm />
          </CustomDialog>
        </div>
      </section>
    </main>
  );
}
