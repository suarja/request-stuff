"use client";
import { BASE_URL } from "@/common/constants";

import { useEffect, useState } from "react";

export default function Page() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
  });

  useEffect(() => {
    async function check() {
      const authPayload = await fetch(`${BASE_URL}/api/requests`, {
        method: "POST",
        headers: {},
        body: JSON.stringify({
          target: "addPublicRequest",
          payload: {
            user: "user",
            file: "file",
          },
        }),
      });
      const authData = await authPayload.json();
      console.log(authData);
      return authData;
    }

    check().then((data) => {
      setAuthState({
        isAuthenticated: data.isAuthenticated,
      });
    });
  }, []);

  return (
    <div>
      <h1>Page</h1>
      <p> isAuthenticated {authState.isAuthenticated ? "true" : " false"}</p>
    </div>
  );
}
