import {
  FirestoreDatabase,
  FirebaseDatabase,
} from "@/common/data/firebase/firestore/firestore";
import FileRepository, {
  FileSenderData,
} from "@/features/file/application/repositories/file-repository";
import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";
import RequestDto from "../../infra/dto's/request-dto";
import {
  Request,
  RequestBase,
  UserUpload,
} from "../../domain/entities/request-types";
import { Either, left, right } from "fp-ts/lib/Either";
import IDatabase from "@/common/interfaces/idatabase";

export interface RequestRepositoryOptions {
  db: IDatabase;
  fileStorage: FileRepository;
}

export default class RequestRepository {
  private db: IDatabase;
  private fileRepository: FileRepository;

  constructor(options: RequestRepositoryOptions) {
    this.db = options.db;
    this.fileRepository = options.fileStorage;
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
    const fileUrl = await this.fileRepository.uploadFile({
      path,
      value: file,
      customMetadata: fileSenderData,
    });
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
      fileUrl: fileSenderData.fileUrl,
      fileSenderData: {
        ...fileSenderData,
      },
    };
    console.log({ path, requestId: requestData.id, requestData });
    await this.db.updateArrayInDocument({
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
      const id = await this.db.addDocument(props.path, props, props.id);
      return right(undefined);
    } catch (error) {
      return left(new Error("Error adding request to public collection"));
    }
  }
  async getRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<RequestBase | null> {
    const requestInfra = await this.db.getDocument("requests", requestId);
    if (!requestInfra) return null;
    const requestDto = new RequestDto();

    const request = requestDto.toDomain({ data: requestInfra });
    return request;
  }

  async getPublicRequests({ userId }: { userId: string }): Promise<Request[]> {
    const requests = await this.db.queryWhere({
      a: "userId",
      b: userId,
      operand: "==",
      ref: "requests",
    });
    const requestDto = new RequestDto();
    const requestsDomain = requests.map((request) =>
      requestDto.toDomain({ data: request })
    );
    return requestsDomain;
  }
  async getRequestsByUser({ userId }: { userId: string }): Promise<Request[]> {
    const path = `users/${userId}/requests`;
    const requests = await this.db.getCollection(path);
    const requestDto = new RequestDto();
    const requestsDomain = requests.map((request) =>
      requestDto.toDomain({ data: request })
    );
    return requestsDomain;
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
      await this.db.addDocument(path, request, request.id);
      return right(undefined);
    } catch (error) {
      return left(new Error("Error adding request to user collection"));
    }
  }

  updateRequest(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteRequest(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export const requestRepository = new RequestRepository({
  db: FirebaseDatabase,
  fileStorage: fileRepositoryImplementation,
});
