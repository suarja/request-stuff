"use client";
import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingIcon from "@/common/icons/LoadingIcon";
import ChromeIcon from "@/common/icons/ChromeIcon";
import { authAdapter } from "../../application/adapters/auth-adapter";
import { BASE_URL, PATHS } from "@/common/constants";
import { useAuthContext } from "../../application/services/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { loading, error, success, setOptions } =
    authAdapter.useSignInWithEmailAndPassword();
  const user = useAuthContext();
  useEffect(() => {
    if (success == true || user) {
      router.refresh();
    }
  }, [success]);

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setOptions({ email, password });
  };
  return (
    <div className="mx-auto max-w-md space-y-6 flex flex-col justify-center h-full">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>
      <div className="space-y-4">
        <Button className="w-full" variant="outline">
          <ChromeIcon className="h-5 w-5 mr-2" />
          Sign in with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        <form onSubmit={handleForm} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
            {error && (
              <span className="text-red-500 text-sm font-thin">
                invalid combination of email and password
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
              type="password"
            />
            {error && (
              <span className="text-red-500 text-sm font-thin">
                invalid combination of email and password
              </span>
            )}
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? <LoadingIcon /> : "Sign in"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account? {""}
          <Link
            className="font-medium underline underline-offset-4"
            href="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
