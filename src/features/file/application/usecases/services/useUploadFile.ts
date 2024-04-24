import { useEffect, useState } from "react";
import { fileUsecases } from "../file-usecases";
import { getAuth } from "firebase/auth";
import { UploadResult } from "firebase/storage";
import { toast } from "sonner";
import { filesStore } from "@/context/files-context";

export default function useUploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { setRevalidate } = filesStore((state) => ({
    setRevalidate: state.setRevalidate,
  }));
  useEffect(() => {
    if (file) {
      setLoading(true);
      const auth = getAuth();
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error("No user id");
      }

      const path = `users/${userId}/files/${file.name}`;
      fileUsecases
        .uploadFile(path, file)
        .then((result: UploadResult) => {
          console.log({ result });
          setLoading(false);
          setSuccess(true);
          toast.success("File uploaded successfully");
          setRevalidate();
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
