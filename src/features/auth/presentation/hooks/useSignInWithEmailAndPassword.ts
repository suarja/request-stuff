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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (options) {
      setLoading(true);
      authUsecases
        .signInWithMailAndPassword({
          email: options.email,
          password: options.password,
        })
        .then((eitherId) => {
          if (isLeft(eitherId)) {
            setError(eitherId.left.message);
          }
          setLoading(false);
          setSuccess("User signed in.");
        })
        .catch((e) => {
          setLoading(false);
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
