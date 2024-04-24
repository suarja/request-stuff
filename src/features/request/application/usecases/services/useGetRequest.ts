import { useEffect, useState } from "react";
import { RequestData } from "../../repositories/request-repository";
import { requestUsecases } from "../request-usecases";

export default function useGetRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [request, setRequest] = useState<RequestData | null>(null);

  useEffect(() => {
    if (requestId) {
      setLoading(true);

      requestUsecases
        .getRequest({ requestId })
        .then((data) => {
          if (!data) {
            setError("Request not found");
            setLoading(false);
            return;
          }
          const request = {
            id: requestId,
            userId: data.userId,
            maxFileSize: data.maxFileSize,
            dateLimit: data.dateLimit,
            name: data.name,
            description: data.description,
            maxFiles: data.maxFiles,
            path: data.path,
          };
          setRequest(request);
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
