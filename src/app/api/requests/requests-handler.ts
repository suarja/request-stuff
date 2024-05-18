import { NextRequest, NextResponse } from "next/server";

export async function requestHandler(request: NextRequest): Promise<NextResponse> {
  // Rate limiting
  //! Check if the request is from a valid user (authentication)
  //! check if the user is authorized to make the request
  //! Check the target of the request (e.g. addPublicRequest, addPrivateRequest, etc.)

  //! Invoke the usecase

  //~ Check if the request is valid in each usecase

  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
