"use client";

import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import Link from "next/link";
import signIn from "@/lib/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "@/common/constants";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(email, password);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    if (!result) {
      // Display and log any sign-in errors
      console.log("No result returned from signIn");
      return;
    }

    // Sign in successful
    console.log(result);

    // Typically you would send the token_id to your backend and verify the token_id
    // and then create a session for the user
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await result.user.getIdToken()}`,
      },
    });

    if (response.ok) {
      console.log("User is fully authenticated");
      // Redirect to the admin page
      // Typically you would want to redirect them to a protected page an add a check to see if they are admin or
      // create a new page for admin
      router.push("/admin");
    }
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
              type="password"
            />
          </div>
          <Button className="w-full" type="submit">
            Sign in
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

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
