import { NextRequest, NextResponse } from "next/server";
import { inject, injectable } from "tsyringe";
import {
  baseServerRequestBodySchema,
  serverRequestBodySchemaAddPublicRequest,
  serverRequestBodySchemaGetUserRequests,
} from "./server-request-schema";
import ServerAdapter from "@/features/server/application/adapters/server-adapter";

@injectable()
export default class RequestRouter {
  private readonly _serverUsecases: ServerAdapter;
  constructor(@inject("serverAdapter") serverUsecases: ServerAdapter) {
    this._serverUsecases = serverUsecases;
  }

  async handler(req: NextRequest): Promise<NextResponse> {
    const reqJson = await req.json();
    const body = baseServerRequestBodySchema.safeParse(reqJson);
    if (body.success) {
      switch (body.data.target) {
        case "addPublicRequest":
          const payload =
            serverRequestBodySchemaAddPublicRequest.safeParse(reqJson);
          if (payload.success) {
            //! Type next response type generic
            return this._serverUsecases.addPublicRequest({
              request: payload.data.payload.request,
            });
          } else {
            return NextResponse.json(
              { error: "Invalid request body", errorInfo: payload.error },
              { status: 400 }
            );
          }
        case "getRequestsByUser":
          const userRequestspayload =
            serverRequestBodySchemaGetUserRequests.safeParse(reqJson);
          if (userRequestspayload.success) {
            return this._serverUsecases.getUserRequests({
              userId: userRequestspayload.data.payload.userId,
            });
          } else {
            return NextResponse.json(
              {
                error: "Invalid request body",
                errorInfo: userRequestspayload.error,
              },
              { status: 400 }
            );
          }

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
        { error: "Invalid request body", errorInfo: body.error },
        { status: 400 }
      );
    }
  }
}
