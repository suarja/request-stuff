"use client";
import { Nav } from "@/common/components/Nav";
import { useAuthMiddleware } from "@/context/useAuthMiddleware";
import FileUpload from "../features/storage/presentation/components/FileUpload";

function Page(): JSX.Element {
  useAuthMiddleware();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav />
      <section>
        <FileUpload />
      </section>
    </main>
  );
}

export default Page;
