"use client";
import { Button } from "@/common/components/ui/button";
import ChromeIcon from "@/common/icons/ChromeIcon";
import LoadingIcon from "@/common/icons/LoadingIcon";
import { authUsecases } from "@/features/auth/application/usecases/auth-usecases";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";

import { useState } from "react";

function Page(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError(false);
    setLoading(true);
    // Attempt to sign up with provided email and password
    const eitherUserCreated = await authUsecases.createUserWithEmailAndPassword(
      { email, password }
    );

    if (isLeft(eitherUserCreated)) {
      // Display and log any sign-up errors
      setError(true);
      setLoading(false);
      console.log("Could not create user", eitherUserCreated.left);
      return;
    }

    // Sign up successful
    console.log("user id", eitherUserCreated.right);

    // Redirect to the admin page
    router.push("/admin");
  };

  return (
    <div className="mx-auto max-w-md space-y-6 flex flex-col justify-center h-full">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome To Request Stuff </h1>
        <p className="text-gray-500 dark:text-gray-400">Sign up to continue</p>
      </div>
      <div className="space-y-4">
        <Button
          onClick={() => alert("Not available just yet")}
          className="w-full"
          variant="outline"
        >
          <ChromeIcon className="h-5 w-5 mr-2" />
          Sign up with Google
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
            {loading ? <LoadingIcon /> : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
