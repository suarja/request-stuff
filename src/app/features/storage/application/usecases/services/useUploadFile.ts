import { useEffect, useState } from "react";
import { storageUsecases } from "../storage-usecases";
import { getAuth } from "firebase/auth";
import { UploadResult } from "firebase/storage";
import { toast } from "sonner";

export default function useUploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (file) {
      setLoading(true);
      const auth = getAuth();
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error("No user id");
      }

      const path = `users/${userId}/files/${file.name}`;
      storageUsecases
        .uploadFile(path, file)
        .then((result: UploadResult) => {
          console.log({ result });
          setLoading(false);
          setSuccess(true);
          toast.success("File uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading file", error);
          setError("Error uploading file");
          setLoading(false);
          toast.error("Error uploading file");
        });
    }
  }, [file]);

  return {
    setFile,
    loading,
    error,
    success,
  };
}
