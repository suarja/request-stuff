import { useEffect, useState } from "react";
import { fileUsecases } from "../file-usecases";
import { useRouter } from "next/navigation";

export default function useDeleteFile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  // const { setRevalidate } = filesStore((state) => ({
  //   setRevalidate: state.setRevalidate,
  // }));
  const router = useRouter();
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    if (path) {
      setLoading(true);
      fileUsecases
        .removeFile({ path })
        .then((result) => {
          setLoading(false);
          if (result === "ok") {
            setSuccess(true);
            router.refresh();
          } else {
            setError("Error deleting file");
          }
        })
        .catch((error) => {
          console.error("Error deleting file", error);
          setError("Error deleting file");
          setLoading(false);
        });
    }
  }, [path]);

  return {
    setPath,
    loading,
    error,
    success,
  };
}
