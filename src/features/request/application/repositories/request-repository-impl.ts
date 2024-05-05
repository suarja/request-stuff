import { FirebaseDatabase } from "@/common/data/firebase/firestore/firestore";

import { FirebaseStorageServiceInstance } from "@/features/file/infra/file-repository-impl";
import RequestDto from "../../infra/dto's/request-dto";
import {
  Request,
  RequestBase,
  UserUpload,
} from "../../domain/entities/request-types";
import { Either, isLeft, isRight, left, right } from "fp-ts/lib/Either";
import IDatabase from "@/common/interfaces/idatabase";
import IStorage, { FileSenderData } from "@/common/interfaces/istorage";

export interface RequestRepositoryOptions {
  db: IDatabase;
  storage: IStorage;
}

export default class RequestRepository {
  private _db: RequestRepositoryOptions["db"];
  private _storage: RequestRepositoryOptions["storage"];

  constructor(options: RequestRepositoryOptions) {
    this._db = options.db;
    this._storage = options.storage;
  }
  async uploadFileFromRequest({
    requestData,
    file,
    fileSenderData,
  }: {
    requestData: RequestBase;
    file: File;
    fileSenderData: FileSenderData;
  }): Promise<string> {
    const path = `users/${requestData.userId}/requests/${requestData.id}/files/${file.name}`;
    console.log({ path, fileSenderData });
    const fileUrl = await this._storage.uploadFile({
      path,
      value: file,
      customMetadata: fileSenderData,
    });
    //! Move this to usecases since it's business logic
    // Update user request entry
    await this.updateRequestInUserCollection({
      requestData,
      fileSenderData: {
        ...fileSenderData,
        fileUrl,
      },
    });
    return fileUrl;
  }

  async updateRequestInUserCollection({
    requestData,
    fileSenderData,
  }: {
    requestData: RequestBase;
    fileSenderData: FileSenderData;
  }): Promise<void> {
    const path = `users/${requestData.userId}/requests`;
    const data: UserUpload = {
      fileName: fileSenderData.fileName,
      fileUrl: fileSenderData.fileUrl,
      fileSenderData: {
        ...fileSenderData,
      },
    };
    console.log({ path, requestId: requestData.id, requestData });
    await this._db.updateArrayInDocument({
      collection: path,
      field: "uploads",
      data,
      id: requestData.id,
      incrementNumber: "numberOfUploads",
    });
    return;
  }
  async addRequestToPublic({
    props,
  }: {
    props: RequestBase;
  }): Promise<Either<Error, void>> {
    try {
      const id = await this._db.addDocument(props.path, props, props.id);
      return right(undefined);
    } catch (error) {
      return left(new Error("Error adding request to public collection"));
    }
  }
  async getPublicRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<RequestBase | null> {
    const requestInfra = await this._db.getDocument("requests", requestId);
    if (!requestInfra) return null;
    const requestDto = new RequestDto();

    const request = requestDto.toDomain({ data: requestInfra });
    if (isLeft(request)) {
      return null;
    }
    return request.right;
  }

  async getPublicRequests({ userId }: { userId: string }): Promise<Request[]> {
    const requests = await this._db.queryWhere({
      a: "userId",
      b: userId,
      operand: "==",
      ref: "requests",
    });
    const requestDto = new RequestDto();
    const parsedrequests: Request[] = [];
    for (const req of requests) {
      const eihterRequest = requestDto.toDomain({ data: req });
      if (isRight(eihterRequest)) {
        parsedrequests.push(eihterRequest.right);
      }
    }

    return parsedrequests;
  }
  async getRequestsByUser({ userId }: { userId: string }): Promise<Request[]> {
    const path = `users/${userId}/requests`;
    const requests = await this._db.getCollection(path);
    const requestDto = new RequestDto();
    const parsedrequests: Request[] = [];
    for (const req of requests) {
      const eihterRequest = requestDto.toDomain({ data: req });
      if (isRight(eihterRequest)) {
        parsedrequests.push(eihterRequest.right);
      }
    }

    return parsedrequests;
  }

  async addRequestToUser({
    path,
    userId,
    request,
  }: {
    path: string;
    userId: string;
    request: Request;
  }): Promise<Either<Error, void>> {
    try {
      await this._db.addDocument(path, request, request.id);
      return right(undefined);
    } catch (error) {
      return left(new Error("Error adding request to user collection"));
    }
  }

  async updatePublicRequest({
    request,
  }: {
    request: RequestBase;
  }): Promise<void> {
    const path = `requests`;
    await this._db.updateDocument(path, request.id, request);
  }
  deleteRequest(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export const requestRepository = new RequestRepository({
  db: FirebaseDatabase,
  storage: FirebaseStorageServiceInstance,
});
