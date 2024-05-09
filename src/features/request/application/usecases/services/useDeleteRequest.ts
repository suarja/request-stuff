import { useAuthContext } from "@/features/auth/application/services/AuthContext";
import { isRight } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { requestUsecases } from "../client/request-usecases";
import { PrivateRequest } from "@/features/request/domain/entities/request-types";

export default function useDeleteRequest() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deleteRequestOptions, setDeleteRequestOptions] =
    useState<PrivateRequest | null>(null);
  const user = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (deleteRequestOptions && user) {
      setLoading(true);
      toast.loading("Deleting request...");
      requestUsecases
        .deleteRequest({
          userId: user.uid,
          requestId: deleteRequestOptions.id,
        })
        .then((eitherErrorOrUndefined) => {
          if (isRight(eitherErrorOrUndefined)) {
            setSuccess(true);
            toast.success(`Request deleted successfully`);
            router.refresh();
          } else {
            setError(eitherErrorOrUndefined.left.message);
            toast.error(eitherErrorOrUndefined.left.message);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Failed to delete request");
          toast.error("Failed to delete request");
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
    }
  }, [deleteRequestOptions]);

  return {
    loading,
    success,
    error,
    setDeleteRequestOptions,
  };
}
