import { useEffect, useState } from "react";
import { CreateRequest } from "../../repositories/request-repository";
import { requestRepository } from "@/features/request/infra/request-repository-impl";

export default function useCreateRequest() {
  const [loading, setLoading] = useState(false);
  const [requestCreationProps, setRequestCreationProps] =
    useState<CreateRequest | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    if (requestCreationProps) {
      setLoading(true);
      requestRepository
        .createRequest({
          props: requestCreationProps,
        })
        .then((id) => {
          if (id) {
            setRequestId(id);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [requestCreationProps]);

  return {
    loading,
    setRequestCreationProps,
    requestId,
  };
}
