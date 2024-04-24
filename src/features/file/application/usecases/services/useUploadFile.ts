import { useEffect, useState } from "react";
import { fileUsecases } from "../file-usecases";
import { toast } from "sonner";
import { filesStore } from "@/context/files-context";

export type UploadFileProps = {
  file: File;
  userId: string;
};

export default function useUploadFile() {
  const [uploadFileProps, setUploadFileProps] =
    useState<UploadFileProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { setRevalidate } = filesStore((state) => ({
    setRevalidate: state.setRevalidate,
  }));
  useEffect(() => {
    if (uploadFileProps) {
      setLoading(true);

      const path = `users/${uploadFileProps.userId}/files/${uploadFileProps.file.name}`;
      fileUsecases
        .uploadFile(path, uploadFileProps.file)
        .then((result) => {
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
  }, [uploadFileProps]);

  return {
    setUploadFileProps,
    loading,
    error,
    success,
  };
}
