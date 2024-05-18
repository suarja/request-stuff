import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "./requests-handler";

export async function POST(req: NextRequest): Promise<NextResponse> {
  //   console.log({ headers: req.headers });
  return requestHandler(req);
}
