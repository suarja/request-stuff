import { FileSenderData } from "@/features/file/application/repositories/file-repository";
import { requestRepository } from "../../infra/request-repository-impl";
import RequestRepository from "../repositories/request-repository";
import { RequestBase } from "../../domain/entities/request-types";
import { Either, isLeft, left, right } from "fp-ts/lib/Either";
export default class RequestUsecases {
  private requestRepository: RequestRepository;

  constructor({ requestRepository }: { requestRepository: RequestRepository }) {
    this.requestRepository = requestRepository;
  }

  async createRequest({
    props,
  }: {
    props: RequestBase;
  }): Promise<Either<Error, void>> {
    const pathForUserCollection = `users/${props.userId}/requests`;
    const batch = await Promise.allSettled([
      this.requestRepository.addRequestToPublic({ props }),
      this.requestRepository.addRequestToUser({
        path: pathForUserCollection,
        userId: props.userId,
        request: { ...props, numberOfUploads: 0, uploads: [] },
      }),
    ]);

    //! This is not handling the case of a request being added to the public collection but not to the user collection or viceversa.
    const isAnyError = batch.some((asyncResult) => {
      if (asyncResult.status === "rejected") {
        return true;
      }
      return isLeft(asyncResult.value);
    });
    if (isAnyError) {
      console.log({ isAnyError });
      return left(new Error("Error while batching request creations promises"));
    }
    return right(undefined);
  }

  async getRequest({ requestId }: { requestId: string }) {
    return this.requestRepository.getRequest({ requestId });
  }

  async getPublicRequests({ userId }: { userId: string }) {
    return this.requestRepository.getPublicRequests({ userId });
  }
  async getRequestsByUser({ userId }: { userId: string }) {
    return this.requestRepository.getRequestsByUser({ userId });
  }

  async uploadFileFromRequest({
    requestId,
    file,
    fileSenderData,
  }: {
    requestId: string;
    file: File;
    fileSenderData: FileSenderData;
  }) {
    try {
      const requestPayload = await this.requestRepository.getRequest({
        requestId,
      });
      if (!requestPayload) {
        throw new Error("Request not found");
      }

      const fileUrl = await this.requestRepository.uploadFileFromRequest({
        requestData: requestPayload,
        file,
        fileSenderData,
      });
      return fileUrl;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const requestUsecases = new RequestUsecases({
  requestRepository: requestRepository,
});
