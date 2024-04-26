import CustomDialog from "@/common/components/CustomDialog";
import { Nav } from "@/common/components/Nav";
import { fileUsecases } from "@/features/file/application/usecases/file-usecases";
import FileUpload from "@/features/file/presentation/components/FileUpload";
import { requestUsecases } from "@/features/request/application/usecases/request-usecases";
import RequestFolderTree from "@/features/request/presentation/components/RequestFolderTree";
import RequestGrid from "@/features/request/presentation/views/RequestGrid";
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
    <RequestGrid requests={requests} params={path} />
  );
}
