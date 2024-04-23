"use client";
import { Nav } from "@/common/components/Nav";
import { useAuthMiddleware } from "@/context/useAuthMiddleware";
import FileUpload from "../features/storage/presentation/components/FileUpload";
import FilesTable from "../features/storage/presentation/components/FilesTable";

function Page(): JSX.Element {
  useAuthMiddleware();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav />
      <section className="flex flex-col justify-center gap-4">
        <FilesTable />
        <div>
          <FileUpload />
        </div>
      </section>
    </main>
  );
}

export default Page;
