import { useAuthContext } from "@/context/AuthContext";
import { storageRepository } from "../../../infra/firebase-impl";
import { useEffect, useState } from "react";
import { FileFromStorage } from "../../repositories/storage-repository";
import { toast } from "sonner";
import { filesStore } from "@/context/FilesContext";

export default function useGetUserFiles() {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<FileFromStorage[]>([]);
  const user = useAuthContext();
  const { setFilesLocal, filesLocal, revalidate } = filesStore((state) => ({
    setFilesLocal: state.setFiles,
    filesLocal: state.files,
    revalidate: state.revalidate,
  }));

  useEffect(() => {
    setFiles(filesLocal);
  }, [filesLocal]);
  useEffect(() => {
    if (user) {
      setLoading(true);
      storageRepository
        .getUserFiles({
          userId: user.uid,
        })
        .then((files) => {
          setFilesLocal({ files });
          setLoading(false);
          toast.success("Files loaded successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error loading files");
        });
    }

    setLoading(false);
  }, [user, revalidate]);

  return {
    files,
    loading,
  };
}
