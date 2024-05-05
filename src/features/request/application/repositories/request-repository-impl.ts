import { FirebaseDatabase } from "@/common/data/firebase/firestore/firestore";

import { FirebaseStorageServiceInstance } from "@/features/file/infra/file-repository-impl";
import RequestDto from "../../infra/dto's/request-dto";
import {
  Request,
  RequestBase,
  Upload,
  UserUpload,
} from "../../domain/entities/request-types";
import { Either, isLeft, isRight, left, right } from "fp-ts/lib/Either";
import IDatabase from "@/common/interfaces/idatabase";
import IStorage, { FileSenderData } from "@/common/interfaces/istorage";
import { Failure } from "fp-ddd";

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

    //* Update request entry
    await this.updatePublicRequestUploads({
      upload: {
        fileName: file.name,
        //! This is not the best way to handle this, but it's a quick fix for now
        senderHash: fileSenderData.senderName,
      },
      requestId: requestData.id,
    });

    //* Update user request entry
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
  async addPublicRequest({
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

  async updatePublicRequestUploads({
    upload,
    requestId,
  }: {
    upload: Upload;
    requestId: string;
  }): Promise<void> {
    const path = `requests`;
    await this._db.updateArrayInDocument({
      collection: path,
      field: "uploads",
      data: upload,
      id: requestId,
    });
  }
  async deletePublicRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<void> {
    const path = `requests`;
    await this._db.deleteDocument(path, requestId);
  }

  async deleteRequestFromUserCollection({
    userId,
    requestId,
  }: {
    userId: string;
    requestId: string;
  }): Promise<void> {
    const path = `users/${userId}/requests`;
    await this._db.deleteDocument(path, requestId);
  }

  async deleteRequest({
    userId,
    requestId,
  }: {
    userId: string;
    requestId: string;
  }): Promise<Either<Failure<string>, void>> {
    //! Recursively delete all files in the request storage

    const eitherDeleted = await this._storage.deleteFolder({
      path: `users/${userId}/requests/${requestId}`,
    });
    if (isLeft(eitherDeleted)) {
      return left(eitherDeleted.left);
    }

    //! Delete the request from the public collection
    //! Delete the request from the user collection

    return right(undefined);
  }
}

export const requestRepository = new RequestRepository({
  db: FirebaseDatabase,
  storage: FirebaseStorageServiceInstance,
});
