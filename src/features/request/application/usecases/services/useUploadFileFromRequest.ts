import { useEffect, useState } from "react";
import { requestUsecases } from "../request-usecases";
import { FileSenderData } from "@/features/file/application/repositories/file-repository";

export type UseUploadFileFromRequestProps = {
  file: File;
  requestId: string;
  senderData: FileSenderData;
};

export default function useUploadFileFromRequest() {
  const [loading, setLoading] = useState(false);
  const [succes, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadFileFromRequestProps, setUploadFileFromRequestProps] =
    useState<UseUploadFileFromRequestProps | null>(null);

  useEffect(() => {
    if (uploadFileFromRequestProps) {
      setLoading(true);
      requestUsecases
        .uploadFileFromRequest({
          requestId: uploadFileFromRequestProps.requestId,
          file: uploadFileFromRequestProps.file,
          fileSenderData: uploadFileFromRequestProps.senderData,
        })
        .then(() => {
          setSuccess(true);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error uploading file");
          setLoading(false);
        });
    }
  }, [uploadFileFromRequestProps]);

  return {
    loading,
    succes,
    error,
    setUploadFileFromRequestProps,
  };
}
