import { useEffect, useState } from "react";
import { Request } from "../../repositories/request-repository";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";
import path from "path";
import { requestUsecases } from "../request-usecases";

export default function useCreateRequest() {
  const [loading, setLoading] = useState(false);
  const [requestCreationProps, setRequestCreationProps] =
    useState<Request | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const user = useAuthContext();
  useEffect(() => {
    if (requestCreationProps && user) {
      const props = {
        ...requestCreationProps,
        userId: user.uid,
        path: path.join("requests"),
      };
      setLoading(true);
      toast.loading("Creating request...");
      requestUsecases
        .createRequest({
          props,
        })
        .then((id) => {
          if (id) {
            setRequestId(id);
            toast.success(`Request created successfully with id: ${id}`);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to create request");
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
    }
  }, [requestCreationProps]);

  return {
    loading,
    setRequestCreationProps,
    requestId,
  };
}
