"use client";
import useGetUserFiles from "@/features/file/application/usecases/services/useGetUserFIles";
import FolderTree from "@/features/file/presentation/components/Foldertree";

export default function Page() {
  const { files, loading } = useGetUserFiles();
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <FolderTree folders={[{ name: "Root", files }]} title="Files" />
    </>
  );
}
