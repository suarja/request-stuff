import { NextRequest, NextResponse } from "next/server";
import { serverAdapter } from "../upload/dependency-injection";
import { isLeft } from "fp-ts/lib/Either";

export async function requestHandler(
  request: NextRequest
): Promise<NextResponse> {
  // Rate limiting
  //! Check if the request is from a valid user (authentication)
  const eitherUserAuthentication = await serverAdapter.userAuthentication({
    headers: () => request.headers,
  });
  if (isLeft(eitherUserAuthentication)) {
    // console.log("Error: ", eitherUserAuthentication.left.body);
    return eitherUserAuthentication.left;
  }
  //! check if the user is authorized to make the request
  //! Check the target of the request (e.g. addPublicRequest, addPrivateRequest, etc.)

  //! Invoke the usecase

  //~ Check if the request is valid in each usecase

  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
