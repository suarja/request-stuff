import { useEffect, useState } from "react";
import { requestUsecases } from "../request-usecases";
import { PrivateRequest } from "@/features/request/domain/entities/request-types";
import { isLeft } from "fp-ts/lib/Either";

export default function useGetRequestsByUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [requests, setRequests] = useState<PrivateRequest[] | null>(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);

      requestUsecases
        .getRequestsByUser({ userId })
        .then((data) => {
          if (isLeft(data)) {
            setError(data.left.message);
            setLoading(false);
            return;
          }
          setRequests(data.right);
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
