import ServerUsecases from "@/features/server/application/usecases/server-usecases";
import { NextRequest, NextResponse } from "next/server";
import { inject, injectable } from "tsyringe";
import {
  ServerRequestBodySchema,
  serverRequestBodySchema,
} from "./server-request-schema";
import { Either } from "fp-ts/lib/Either";
import ServerAdapter from "@/features/server/application/adapters/server-adapter";

@injectable()
export default class RequestRouter {
  private readonly _serverUsecases: ServerAdapter;
  constructor(@inject("serverAdapter") serverUsecases: ServerAdapter) {
    this._serverUsecases = serverUsecases;
  }

  async handler(req: NextRequest): Promise<NextResponse> {
    const body = serverRequestBodySchema.safeParse(await req.json());
    if (body.success) {
      switch (body.data.target) {
        case "addPublicRequest":
          const payload = body.data.payload;
          return this._serverUsecases.addPublicRequest({
            request: payload.request,
          });
        case "updatePublicRequest":
          return NextResponse.json(
            { message: "update public request" },
            { status: 200 }
          );
        case "updatePublicRequestUploads":
          return NextResponse.json(
            { message: "update public request uploads" },
            { status: 200 }
          );

        case "deletePublicRequest":
          return NextResponse.json(
            { message: "delete public request" },
            { status: 200 }
          );
        default:
          return NextResponse.json(
            { error: "Invalid target" },
            { status: 400 }
          );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
  }
}
