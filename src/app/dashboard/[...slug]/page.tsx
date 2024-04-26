import { mockRequests, mockRequestSubFolders } from "@/app/workspace/[...slug]/mock-request-data";
import CustomDialog from "@/common/components/CustomDialog";
import { Nav } from "@/common/components/Nav";
import FileUpload from "@/features/file/presentation/components/FileUpload";
import RequestFolderTree from "@/features/request/presentation/components/RequestFolderTree";
import CreateRequestForm from "@/features/request/presentation/components/RequestForm";
import { cookies } from "next/headers";
export default async function Page({ params }: { params: { slug: string[] } }) {
  const session = cookies().get("session")?.value || "";

  const paramsConcat = params.slug.join("/");
  const path = paramsConcat === "files" ? "files" : paramsConcat;

  

  return (
    <main className="flex min-h-screen w-full flex-col gap-12 items-center justify-start px-4 py-24  ">
      <Nav />
      <section className="flex flex-col h-full w-full justify-center gap-4 ">
        <RequestFolderTree
          params={path}
          title="Requests"
          requests={mockRequests}
          subFolders={mockRequestSubFolders}
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
    </main>
  );
}
