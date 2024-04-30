import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthUsecases from "../../application/usecases/auth-usecases";
import { isLeft } from "fp-ts/lib/Either";

export interface ISignInWithEmailAndPasswordOptions {
  email: string;
  password: string;
}

export default function useSignInWithEmailAndPassword({
  authUsecases,
}: {
  authUsecases: AuthUsecases;
}) {
  const [options, setOptions] =
    useState<ISignInWithEmailAndPasswordOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (options) {
      authUsecases
        .signInWithMailAndPassword({
          email: options.email,
          password: options.password,
        })
        .then((eitherId) => {
          if (isLeft(eitherId)) {
            setError(eitherId.left.message);
          }
          setSuccess("User signed in.");
        })
        .catch((e) => {
          setError("An error occured while sign in the user.");
        });
    }
  }, [options]);

  return {
    loading,
    error,
    success,
    setOptions,
  };
}
