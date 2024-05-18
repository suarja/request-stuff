import { inject, injectable } from "tsyringe";
import ServerRepository from "../repositories/server-repository";
import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import UserDto from "@/features/auth/infra/dto's/user-dto";
import UserEntity from "@/features/auth/domain/entities/user-entity";
import PublicRequestEntity from "@/features/request/domain/entities/request-entity";
import { Upload } from "@/features/request/domain/entities/request-types";
import { FileSenderData } from "@/common/interfaces/istorage";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface ServerUsecasesOptions {
  serverRepository: ServerRepository;
}

@injectable()
export default class ServerUsecases {
  private readonly _serverRepository: ServerRepository;

  constructor(@inject("serverRepository") serverRepository: ServerRepository) {
    this._serverRepository = serverRepository;
  }

  async userAuthentication({
    headers,
  }: {
    headers: () => Headers;
  }): Promise<Either<NextResponse, void>> {
    // Check if the user is authenticated

    try {
      const authorization = headers().get("Authorization");
      if (authorization?.startsWith("Bearer ")) {
        const idToken = authorization.split("Bearer ")[1];
        console.log({ idToken });
        const eitherDecodedToken = await this._serverRepository.verifyIdToken({
          idToken,
        });
        if (isLeft(eitherDecodedToken)) {
          return left(
            NextResponse.json(
              { error: eitherDecodedToken.left.message },
              { status: 401 }
            )
          );
        }

        //Generate session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const eitherSessionCookie =
          await this._serverRepository.createSessionCookie({
            userId: idToken,
            expiresIn,
          });

        if (isLeft(eitherSessionCookie)) {
          return left(
            NextResponse.json(
              { error: eitherSessionCookie.left.message },
              { status: 401 }
            )
          );
        }

        const options = {
          name: "session",
          value: eitherSessionCookie.right,
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };

        //Add the cookie to the browser
        cookies().set(options);

        return right(undefined);
      }
      return left(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    } catch (error) {
      return left(NextResponse.json({ error: error }, { status: 401 }));
    }
  }

  async getUser({ userId }: { userId: string }): Promise<{
    error: boolean;
    message: string;
    user: UserEntity | null;
  }> {
    const eitherUserInfra = await this._serverRepository.getUser({
      userId,
    });

    if (isLeft(eitherUserInfra)) {
      console.log({ eitherUserInfra });
      return {
        error: true,
        message: eitherUserInfra.left.message,
        user: null,
      };
    }
    const userInfra = eitherUserInfra.right;
    const userDto = new UserDto();
    const eitherUser = userDto.toDomain({ data: userInfra });
    if (isLeft(eitherUser)) {
      return {
        error: true,
        message: eitherUser.left.message,
        user: null,
      };
    }
    const user = eitherUser.right;

    return {
      error: false,
      message: "",
      user,
    };
  }

  async uploadFile({
    file,
    userId,
    requestId,
  }: {
    file: File;
    userId: string;
    requestId: string;
  }): Promise<{
    error: boolean;
    message: string;
    url: string | null;
  }> {
    const eitherUrl = await this._serverRepository.uploadFile({
      file,
      userId,
      requestId,
    });

    if (isLeft(eitherUrl)) {
      return {
        error: true,
        message: eitherUrl.left.message,
        url: null,
      };
    }

    return {
      error: false,
      message: "",
      url: eitherUrl.right,
    };
  }

  async addUploadToPublicRequest({
    request,
    ip,
    senderName,
    fileName,
  }: {
    ip: string;
    senderName: string;
    fileName: string;
    request: PublicRequestEntity;
  }): Promise<{
    error: boolean;
    message: string;
  }> {
    const upload: Upload = request.createUpload({
      fileName,
      ip,
      senderName,
    });
    const eitherVoid = await this._serverRepository.addUploadToPublicRequest({
      request: request.getOrCrash(),
      upload,
    });

    if (isLeft(eitherVoid)) {
      return {
        error: true,
        message: eitherVoid.left.message,
      };
    }

    return {
      error: false,
      message: "",
    };
  }

  async addUploadToUserRequest({
    userId,
    request,
    fileName,
    fileUrl,
    senderData,
  }: {
    userId: string;
    fileName: string;
    request: PublicRequestEntity;
    fileUrl: string;
    senderData: FileSenderData;
  }): Promise<{
    error: boolean;
    message: string;
  }> {
    const eitherVoid = await this._serverRepository.addUploadToUserRequest({
      userId,
      request: request.getOrCrash(),
      upload: UserEntity.createUpload({
        fileName,
        fileUrl,
        senderData: {
          ...senderData,
          fileUrl,
        },
      }),
    });

    if (isLeft(eitherVoid)) {
      return {
        error: true,
        message: eitherVoid.left.message,
      };
    }

    return {
      error: false,
      message: "",
    };
  }

  async updateUserCurrentStorage({
    user,
    file,
  }: {
    user: UserEntity;
    file: File;
  }): Promise<{
    error: boolean;
    message: string;
  }> {
    const eitherVoid = await this._serverRepository.updateUserCurrentStorage({
      user: user.getOrCrash(),
      newCurrentStorage: user.updateCurrentStorage(file),
    });

    if (isLeft(eitherVoid)) {
      return {
        error: true,
        message: eitherVoid.left.message,
      };
    }

    return {
      error: false,
      message: "",
    };
  }
}
