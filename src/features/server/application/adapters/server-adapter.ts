import { inject, injectable } from "tsyringe";
import ServerUsecases from "../usecases/server-usecases";
import UserEntity from "@/features/auth/domain/entities/user-entity";
import PublicRequestEntity from "@/features/request/domain/entities/request-entity";
import {
  PublicRequest,
  Upload,
} from "@/features/request/domain/entities/request-types";
import { FileSenderData } from "@/common/interfaces/istorage";
import { NextResponse } from "next/server";
import { Either, left } from "fp-ts/lib/Either";
import { error } from "node:console";

@injectable()
export default class ServerAdapter {
  private readonly _usecases: ServerUsecases;

  constructor(@inject("serverUsecases") serverUsecases: ServerUsecases) {
    this._usecases = serverUsecases;
  }

  async userAuthentication({ cookie }: { cookie: string }) {
    return await this._usecases.userAuthentication({
      cookie,
    });
  }

  async getUser({ userId }: { userId: string }): Promise<{
    returnOptions: { error: boolean; message: string; status: number };
    user: UserEntity | null;
  }> {
    const result = await this._usecases.getUser({ userId });
    if (result.error) {
      return {
        returnOptions: {
          error: true,
          message: result.message,
          status: 200,
        },
        user: null,
      };
    }
    return {
      returnOptions: { error: false, message: "", status: 200 },
      user: result.user,
    };
  }

  async uploadFile({
    userId,
    file,
    requestId,
  }: {
    userId: string;
    file: File;
    requestId: string;
  }): Promise<{
    returnOptions: { error: boolean; message: string; status: number };
    url: string | null;
  }> {
    const result = await this._usecases.uploadFile({
      userId,
      file,
      requestId,
    });
    if (result.error) {
      return {
        returnOptions: {
          error: true,
          message: result.message,
          status: 200,
        },
        url: null,
      };
    }
    return {
      returnOptions: { error: false, message: "", status: 200 },
      url: result.url,
    };
  }

  async addUploadToPublicRequest({
    ip,
    senderName,
    fileName,
    request,
  }: {
    request: PublicRequestEntity;
    ip: string;
    senderName: string;
    fileName: string;
  }): Promise<{
    returnOptions: { error: boolean; message: string; status: number };
  }> {
    const result = await this._usecases.addUploadToPublicRequest({
      request,
      ip,
      senderName,
      fileName,
    });
    if (result.error) {
      return {
        returnOptions: {
          error: true,
          message: result.message,
          status: 200,
        },
      };
    }
    return {
      returnOptions: { error: false, message: "", status: 200 },
    };
  }

  async addUploadToUserRequest({
    senderData,
    fileName,
    request,
    fileUrl,
  }: {
    request: PublicRequestEntity;
    senderData: FileSenderData;
    fileName: string;
    fileUrl: string;
  }): Promise<{
    returnOptions: { error: boolean; message: string; status: number };
  }> {
    const result = await this._usecases.addUploadToUserRequest({
      request,
      senderData,
      fileName,
      fileUrl,
      userId: request.getOrCrash().userId,
    });
    if (result.error) {
      return {
        returnOptions: {
          error: true,
          message: result.message,
          status: 200,
        },
      };
    }
    return {
      returnOptions: { error: false, message: "", status: 200 },
    };
  }

  async updateUserCurrentStorage({
    user,
    file,
  }: {
    user: UserEntity;
    file: File;
  }): Promise<{
    returnOptions: { error: boolean; message: string; status: number };
  }> {
    const result = await this._usecases.updateUserCurrentStorage({
      user,
      file,
    });
    if (result.error) {
      return {
        returnOptions: {
          error: true,
          message: result.message,
          status: 200,
        },
      };
    }
    return {
      returnOptions: { error: false, message: "", status: 200 },
    };
  }
  async addPublicRequest({ request }: { request: PublicRequest }): Promise<
    NextResponse<{
      error: boolean;
      message: string;
      payload: {};
    }>
  > {
    const result = await this._usecases.registerRequest({
      request,
    });
    if (result.error) {
      return NextResponse.json(result, { status: 200 });
    }
    return NextResponse.json(
      {
        error: false,
        message: "",
        payload: {},
      },
      { status: 200 }
    );
  }

  async getUserRequests({
    userId,
  }: {
    userId: string;
  }): Promise<
    NextResponse<Awaited<ReturnType<ServerUsecases["getUserRequests"]>>>
  > {
    const result = await this._usecases.getUserRequests({ userId });
    if (result.error) {
      return NextResponse.json(result, { status: 200 });
    }
    return NextResponse.json(result, { status: 200 });
  }

  async deleteRequest({
    requestId,
    userId,
  }: {
    requestId: string;
    userId: string;
  }): Promise<
    NextResponse<Awaited<ReturnType<ServerUsecases["deleteRequest"]>>>
  > {
    return NextResponse.json(
      await this._usecases.deleteRequest({ requestId, userId }),
      { status: 200 }
    );
  }
}
