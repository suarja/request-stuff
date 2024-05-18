import { NextRequest, NextResponse } from "next/server";
import { requestRouter, serverAdapter } from "../upload/dependency-injection";
import { isLeft } from "fp-ts/lib/Either";
import { cookies } from "next/headers";

export async function requestHandler(
  request: NextRequest
): Promise<NextResponse> {
  // Rate limiting

  const cookie = cookies().get("session")?.value || "";
  const eitherUserAuthentication = await serverAdapter.userAuthentication({
    cookie,
  });
  if (isLeft(eitherUserAuthentication)) {
    return eitherUserAuthentication.left;
  }

  return await requestRouter.handler(request);
  //! Invoke the usecase

  //~ check if the user is authorized to make the request

  //~ Check if the request is valid in each usecase

  return NextResponse.json(
    { message: "Hello World", isAuthenticated: true },
    { status: 200 }
  );
}
