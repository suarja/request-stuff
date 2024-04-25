import { useEffect, useState } from "react";
import { Request } from "../../repositories/request-repository";
import { requestUsecases } from "../request-usecases";

export default function useGetRequests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [requests, setRequests] = useState<Request[] | null>(null);

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
