import "reflect-metadata";

import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "./requests-handler";
import { cookies } from "next/headers";

export async function POST(req: NextRequest): Promise<NextResponse> {
 
  return requestHandler(req);
}
