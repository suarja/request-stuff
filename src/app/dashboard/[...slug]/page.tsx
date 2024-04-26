
import CustomDialog from "@/common/components/CustomDialog";
import { Nav } from "@/common/components/Nav";
import { fileUsecases } from "@/features/file/application/usecases/file-usecases";
import FileUpload from "@/features/file/presentation/components/FileUpload";
import { requestUsecases } from "@/features/request/application/usecases/request-usecases";
import RequestFolderTree from "@/features/request/presentation/components/RequestFolderTree";
import CreateRequestForm from "@/features/request/presentation/components/RequestForm";
import { cookies } from "next/headers";
export default async function Page({ params }: { params: { slug: string[] } }) {
  const session = cookies().get("session")?.value || "";

  const paramsConcat = params.slug.join("/");
  const path = paramsConcat === "files" ? "files" : paramsConcat;
  const userId = await fileUsecases.getUserIdFromCookies({ session });

  if (!userId) {
    return <div>Not logged in</div>;
  }
  const requests = await requestUsecases.getRequestsByUser({ userId });

  return (
    
      <section className="flex flex-col h-full w-full justify-center gap-4 ">
        <RequestFolderTree
          params={path}
          title="Requests"
          requests={requests}
          path=""
        />
        <div>
          <CustomDialog buttonText="Add File" title="Add File">
            <FileUpload props={{ path }} />
          </CustomDialog>
        </div>
        <div>
          <CustomDialog buttonText="Create Request" title="Create Request">
            <CreateRequestForm />
          </CustomDialog>
        </div>
      </section>

  );
}
