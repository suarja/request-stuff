import { useEffect, useState } from "react";
import { requestUsecases } from "../request-usecases";
import { FileSenderData } from "@/common/interfaces/istorage";
import { isLeft } from "fp-ts/lib/Either";

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
      setSuccess(null);
      setError(null);
      setLoading(true);
      requestUsecases
        .uploadFileFromRequest({
          requestId: uploadFileFromRequestProps.requestId,
          file: uploadFileFromRequestProps.file,
          fileSenderData: uploadFileFromRequestProps.senderData,
        })
        .then((eitherFileUrl) => {
          if (isLeft(eitherFileUrl)) {
            setError(eitherFileUrl.left.message);
            setLoading(false);
            return;
          }
          setSuccess(true);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error uploading file in hook");
          setLoading(false);
        })
        .finally(() => {
          setUploadFileFromRequestProps(null);
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
