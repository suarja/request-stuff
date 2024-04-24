import { useEffect, useState } from "react";
import { RequestData } from "../../repositories/request-repository";
import { requestRepository } from "@/features/request/infra/request-repository-impl";

export default function useGetRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [request, setRequest] = useState<RequestData | null>(null);

  useEffect(() => {
    if (requestId) {
      setLoading(true);

      requestRepository
        .getRequest({ requestId })
        .then((data) => {
          setRequest(data as RequestData);
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
