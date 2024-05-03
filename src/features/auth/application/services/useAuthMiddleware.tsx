import { useAuthContext } from "@/features/auth/application/services/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthMiddleware() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);

  const user = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/login");
    }
  }, [user, router]);
}
