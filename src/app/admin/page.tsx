"use client";
import { Nav } from "@/common/components/Nav";
import { useAuthMiddleware } from "@/features/auth/application/services/useAuthMiddleware";
import FileUpload from "../../features/file/presentation/components/FileUpload";
import FilesTable from "../../features/file/presentation/components/FilesTable";
import CustomDialog from "@/common/components/CustomDialog";
import CreateRequestForm from "@/features/request/presentation/components/RequestForm";
import useGetPublicRequests from "@/features/request/application/usecases/services/useGetPublicRequests";
import { Button } from "@/common/components/ui/button";
import { useAuthContext } from "@/features/auth/application/services/AuthContext";
import { useEffect } from "react";

function Page(): JSX.Element {
  useAuthMiddleware();
  const user = useAuthContext();
  const { loading, requests, setUserId } = useGetPublicRequests();

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (requests) console.log({ requests });
  }, [requests]);
  return (
    <main className="flex min-h-screen w-full flex-col gap-12 items-center justify-start p-12">
      <Nav />
      <section className="flex flex-col h-full w-full justify-center gap-4 p-1">
        <FilesTable />
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
        <Button>Requests</Button>
      </section>
    </main>
  );
}

export default Page;
