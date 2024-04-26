import {
  FirestoreFactory,
  firestoreFactory,
} from "@/lib/firebase/firestore/firestore";
import RequestRepository from "../application/repositories/request-repository";
import FileRepository, {
  FileSenderData,
} from "@/features/file/application/repositories/file-repository";
import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";
import RequestDto from "./dto's/request-dto";
import { Request, RequestBase } from "../domain/entities/request-types";
import { Either, left, right } from "fp-ts/lib/Either";

export default class RequestRepositoryImpl extends RequestRepository {
  private firestoreRepository: FirestoreFactory;
  private fileRepository: FileRepository;

  constructor({
    firestoreFactory,
    fileRepository,
  }: {
    firestoreFactory: FirestoreFactory;
    fileRepository: FileRepository;
  }) {
    super();
    this.firestoreRepository = firestoreFactory;
    this.fileRepository = fileRepository;
  }
  async uploadFileFromRequest({
    requestData,
    file,
    fileSenderData,
  }: {
    requestData: RequestBase;
    file: File;
    fileSenderData: FileSenderData;
  }): Promise<void> {
    const path = `users/${requestData.userId}/requests/${requestData.id}/files/${file.name}`;
    await this.fileRepository.uploadFile({
      path,
      value: file,
      customMetadata: fileSenderData,
    });
  }
  async addRequestToPublic({
    props,
  }: {
    props: RequestBase;
  }): Promise<Either<Error, void>> {
    try {
      const id = await this.firestoreRepository.addDocument(
        props.path,
        props,
        props.id
      );
      return right(undefined);
    } catch (error) {
      console.log({ error });
      return left(new Error("Error adding request to public collection"));
    }
  }
  async getRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<RequestBase | null> {
    const requestInfra = await this.firestoreRepository.getDocument(
      "requests",
      requestId
    );
    if (!requestInfra) return null;
    const requestDto = new RequestDto();

    const request = requestDto.toDomain({ data: requestInfra });
    return request;
  }

  async getPublicRequests({ userId }: { userId: string }): Promise<Request[]> {
    const requests = await this.firestoreRepository.queryWhere({
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
    const requests = await this.firestoreRepository.getCollection(path);
    console.log({ requests, path });
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
      await this.firestoreRepository.addDocument(path, request, request.id);
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

export const requestRepository = new RequestRepositoryImpl({
  firestoreFactory: firestoreFactory,
  fileRepository: fileRepositoryImplementation,
});
