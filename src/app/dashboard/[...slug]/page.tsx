import LoadingPage from "@/common/components/LoadingPage";
import { fileUsecases } from "@/features/file/application/usecases/file-usecases";
import { requestUsecases } from "@/features/request/application/usecases/request-usecases";
import RequestGrid from "@/features/request/presentation/views/RequestGrid";
import { isLeft } from "fp-ts/lib/Either";
import { cookies } from "next/headers";
import { Suspense } from "react";
export default async function Page({ params }: { params: { slug: string[] } }) {
  const session = cookies().get("session")?.value || "";

  const paramsConcat = params.slug.join("/");
  const path = paramsConcat === "files" ? "files" : paramsConcat;
  const userId = await fileUsecases.getUserIdFromCookies({ session });

  if (!userId) {
    return <div>Not logged in</div>;
  }
  const eitherRequests = await requestUsecases.getRequestsByUser({ userId });
  if (isLeft(eitherRequests)) {
    return <div>Error getting requests</div>;
  }
  const requests = eitherRequests.right;
  return (
    <Suspense fallback={<LoadingPage />}>
      <RequestGrid requests={requests} params={path} />
    </Suspense>
  );
}
