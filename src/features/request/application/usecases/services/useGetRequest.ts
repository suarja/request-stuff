import { useEffect, useState } from "react";
import { requestUsecases } from "../request-usecases";
import { PublicRequest } from "@/features/request/domain/entities/request-types";
import { isLeft } from "fp-ts/lib/Either";

export default function useGetRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [request, setRequest] = useState<PublicRequest | null>(null);

  useEffect(() => {
    if (requestId) {
      setLoading(true);

      requestUsecases
        .getRequest({ requestId })
        .then((data) => {
          if (isLeft(data)) {
            setError("Request not found");
            setLoading(false);
            return;
          }
          const request = {
            ...data,
            id: requestId,
          };
          setRequest(request.right);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error getting request");

          setLoading(false);
        });
    }
  }, [requestId]);

  return {
    loading,
    setRequestId,
    error,
    request,
  };
}
