import {
  FirestoreFactory,
  firestoreFactory,
} from "@/firebase/firestore/firestore";
import RequestRepository, {
  Request,
  RequestWithId,
} from "../application/repositories/request-repository";
import { DocumentData } from "firebase/firestore";
import FileRepository, {
  FileSenderData,
} from "@/features/file/application/repositories/file-repository";
import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";
import RequestDto from "./dto's/request-dto";

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
    requestData: RequestWithId;
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
  async createRequest({
    props,
  }: {
    props: Request;
  }): Promise<string | undefined> {
    // const path = `users/${props.userId}/requests`;
    const id = await this.firestoreRepository.addDocument(props.path, props);
    return id;
  }
  async getRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<Request | null> {
    const requestInfra = await this.firestoreRepository.getDocument(
      "requests",
      requestId
    );
    if (!requestInfra) return null;
    const requestDto = new RequestDto();

    const request = requestDto.toDomain({ data: requestInfra });
    return request;
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
