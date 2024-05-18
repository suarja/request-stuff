import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "./requests-handler";



export async function POST(req: NextRequest): Promise<NextResponse> {
  return requestHandler(req);
}
