"use client";
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
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (options) {
      setLoading(true);
      setError(false);
      setSuccess(false);
      authUsecases
        .signInWithMailAndPassword({
          email: options.email,
          password: options.password,
        })
        .then((eitherId) => {
          if (isLeft(eitherId)) {
            return setError(true);
          }
          setLoading(false);
          setSuccess(true);
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
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
