import RequestRepository, {
  requestRepository,
} from "../repositories/request-repository";
import { PublicRequest } from "../../domain/entities/request-types";
import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import { FileSenderData } from "@/common/interfaces/istorage";
import AuthUsecases, {
  authUsecases,
} from "@/features/auth/application/usecases/auth-usecases";
import { Failure } from "fp-ddd";

export interface RequestUsecasesOptions {
  requestRepository: RequestRepository;
  auth: AuthUsecases;
}
export default class RequestUsecases {
  private _requestRepository: RequestUsecasesOptions["requestRepository"];
  private _auth: RequestUsecasesOptions["auth"];

  constructor(options: RequestUsecasesOptions) {
    this._requestRepository = options.requestRepository;
    this._auth = options.auth;
  }

  async createRequest({
    props,
  }: {
    props: PublicRequest;
  }): Promise<Either<Failure<string>, void>> {
    const eitherRequestCreated = await this._requestRepository.createRequest({
      props,
    });
    if (isLeft(eitherRequestCreated)) {
      return eitherRequestCreated;
    }
    return right(undefined);
  }

  async getRequest({ requestId }: { requestId: string }) {
    return this._requestRepository.getPublicRequest({ requestId });
  }

  async getPublicRequests({ userId }: { userId: string }) {
    return this._requestRepository.getPublicRequests({ userId });
  }
  async getRequestsByUser({ userId }: { userId: string }) {
    return this._requestRepository.getRequestsByUser({ userId });
  }

  async uploadFileFromRequestServerCall({
    requestId,
    file,
    fileSenderData,
  }: {
    requestId: string;
    file: File;
    fileSenderData: FileSenderData;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const requestPayload = await this._requestRepository.getPublicRequest({
        requestId,
      });
      if (isLeft(requestPayload)) {
        return left(
          Failure.invalidValue({
            invalidValue: requestPayload,
            message: requestPayload.left.message,
          })
        );
      }
      const eitherFileUrl =
        await this._requestRepository.uploadFileFromRequestServerCall({
          requestData: requestPayload.right,
          file,
          fileSenderData,
        });
      if (isLeft(eitherFileUrl)) {
        return eitherFileUrl;
      }

      return right(eitherFileUrl.right);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "An unknown error happend",
        })
      );
    }
  }

  //! Remove this method
  /**
   * @deprecated Use `uploadFileFromRequestServerCall` instead.
   * @param requestId - The ID of the request.
   * @param file - The file to upload.
   * @param fileSenderData - Additional data about the file sender.
   * @returns A promise that resolves to either a `Failure` or the file URL.
   */
  async uploadFileFromRequest({
    requestId,
    file,
    fileSenderData,
  }: {
    requestId: string;
    file: File;
    fileSenderData: FileSenderData;
  }): Promise<Either<Failure<string>, string>> {
    try {
      console.log("uploading...");
      const requestPayload = await this._requestRepository.getPublicRequest({
        requestId,
      });
      if (isLeft(requestPayload)) {
        return left(
          Failure.invalidValue({
            invalidValue: requestPayload,
            message: "Could not get request",
          })
        );
      }

      //~ Check if request options
      const fileSizeInMb = file.size / 1024 ** 2;
      const request = requestPayload.right;
      if (fileSizeInMb > request?.maxFileSize!) {
        return left(
          Failure.invalidValue({
            invalidValue: request,
            message: `File is too large. It should be less than ${request.maxFileSize}`,
          })
        );
      }
      if (request.numberOfUploads + 1 > request.maxFiles!) {
        return left(
          Failure.invalidValue({
            invalidValue: request,
            message: `Max number of files reached. ${request.maxFiles}`,
          })
        );
      }
      const dateLimitFormatted = new Date(request?.dateLimit!).getTime();
      if (Date.now() > dateLimitFormatted) {
        return left(
          Failure.invalidValue({
            invalidValue: request.dateLimit,
            message: `Request date limit exceeded. ${new Date(
              request.dateLimit!
            ).toLocaleDateString()}`,
          })
        );
      }

      // Check if file already exists
      const fileExists = request.uploads.some(
        (upload) =>
          upload.fileName === file.name &&
          upload.senderHash === fileSenderData.senderName
      );
      if (fileExists) {
        return left(
          Failure.invalidValue({
            invalidValue: fileExists,
            message: "File already exists",
          })
        );
      }

      //~ check user has enough ressources (subscription plan, storage available)
      const eitherUser = await this._auth.getUser({
        userId: request.userId,
      });

      if (isLeft(eitherUser)) {
        return left(
          Failure.invalidValue({
            invalidValue: eitherUser,
            message: "Could not add file to request beacuse could not get user",
          })
        );
      }

      const user = eitherUser.right.getOrCrash();
      const userSpaceAvailable = user.maxStorage - user.currentStorage;
      if (fileSizeInMb > userSpaceAvailable) {
        return left(
          Failure.invalidValue({
            invalidValue: userSpaceAvailable,
            message: `Space available insuficient ${userSpaceAvailable}`,
          })
        );
      }
      //* Upload file
      const fileUrl = await this._requestRepository.uploadFileFromRequest({
        requestData: request,
        file,
        fileSenderData,
      });

      //* Update user after uploading file
      const updatedUser = {
        ...user,
        currentStorage: user.currentStorage + fileSizeInMb,
      };
      await this._auth.updateUser({
        userId: request.userId,
        user: updatedUser,
      });

      //* Update public request after uploading file
      const updatedRequest = {
        ...request,
        numberOfUploads: request.numberOfUploads + 1,
      };
      await this._requestRepository.updatePublicRequest({
        request: updatedRequest,
      });

      return right(fileUrl);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "An unknown error happend",
        })
      );
    }
  }

  async deleteRequest({
    requestId,
    userId,
  }: {
    requestId: string;
    userId: string;
  }) {
    return this._requestRepository.deleteRequest({ requestId, userId });
  }

  async updatePublicRequest({
    request,
  }: {
    request: PublicRequest;
  }): Promise<void> {
    return this._requestRepository.updatePublicRequest({ request });
  }
}

export const requestUsecases = new RequestUsecases({
  requestRepository: requestRepository,
  auth: authUsecases,
});
