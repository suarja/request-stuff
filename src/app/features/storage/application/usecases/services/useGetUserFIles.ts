import { useAuthContext } from "@/context/AuthContext";
import { storageRepository } from "../../../infra/firebase-impl";
import { useEffect, useState } from "react";
import { FileFromStorage } from "../../repositories/storage-repository";
import { toast } from "sonner";

export default function useGetUserFiles() {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<FileFromStorage[]>([]);
  const user = useAuthContext();

  useEffect(() => {
    if (user) {
      setLoading(true);
      storageRepository
        .getUserFiles({
          userId: user.uid,
        })
        .then((files) => {
          setFiles(files);
          setLoading(false);
          toast.success("Files loaded successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error loading files");
        });
    }

    setLoading(false);
  }, [user]);

  return {
    files,
    loading,
  };
}
