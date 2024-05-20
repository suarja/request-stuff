import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuthContext } from "@/features/auth/application/services/AuthContext";
import path from "path";
import { requestUsecases } from "../request-usecases";
import { PrivateRequest } from "@/features/request/domain/entities/request-types";
import { isRight } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
import { FormContext } from "@/features/request/presentation/hooks/form-context";

export default function useCreateRequest() {
  const [loading, setLoading] = useState(false);
  const [requestCreationProps, setRequestCreationProps] =
    useState<PrivateRequest | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const { setRequestCreationFormContext } = useContext(FormContext);
  const user = useAuthContext();
  const router = useRouter();
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
        .then((eitherErrorOrUndefined) => {
          if (isRight(eitherErrorOrUndefined)) {
            setRequestId(props.id);
            toast.success(
              `Request created successfully: ${requestCreationProps.name}`
            );
            setRequestCreationFormContext(false);

            router.refresh();
          } else {
            toast.error("Failed to create request");
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
