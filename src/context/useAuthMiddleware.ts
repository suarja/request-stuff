import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthMiddleware() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);
  // Access the user object from the authentication context
  // const { user } = useAuthContext();

  //! Find a way to avoid the any type and add a type to the user object
  const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
  const router = useRouter();

  //! TODO: Redirect to login page if user is not logged in
  useEffect(() => {
    if (user == null) {
      router.push("/login");
    }
  }, [user, router]); // Include 'router' in the dependency array to resolve eslint warning
}
