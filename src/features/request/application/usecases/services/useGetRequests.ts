import { useEffect, useState } from "react";
import { requestUsecases } from "../request-usecases";
import { RequestBase } from "@/features/request/domain/entities/request-types";

export default function useGetRequests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [requests, setRequests] = useState<RequestBase[] | null>(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);

      requestUsecases
        .getRequests({ userId })
        .then((data) => {
          setRequests(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error getting requests");
          console.log(error);

          setLoading(false);
        });
    }
  }, [userId]);

  return {
    loading,
    error,
    setUserId,
    requests,
  };
}
