import useSignInWithEmailAndPassword from "../../presentation/hooks/useSignInWithEmailAndPassword";
import AuthUsecases from "../usecases/auth-usecases";
import { authUsecases } from "../usecases/auth-usecases";
export function AuthAdapter({ authUsecases }: { authUsecases: AuthUsecases }) {
  return {
    useSignInWithEmailAndPassword: useSignInWithEmailAndPassword.bind(null, {
      authUsecases,
    }),
  };
}

export const authAdapter = AuthAdapter({ authUsecases });
