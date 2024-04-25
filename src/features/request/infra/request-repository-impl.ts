import {
  FirestoreFactory,
  firestoreFactory,
} from "@/firebase/firestore/firestore";
import RequestRepository, {
  CreateRequest,
  RequestData,
} from "../application/repositories/request-repository";
import { DocumentData } from "firebase/firestore";
import FileRepository, {
  FileSenderData,
} from "@/features/file/application/repositories/file-repository";
import { fileRepositoryImplementation } from "@/features/file/infra/file-repository-impl";

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
    requestData: RequestData;
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
    props: CreateRequest;
  }): Promise<string | undefined> {
    // const path = `users/${props.userId}/requests`;
    const id = await this.firestoreRepository.addDocument(props.path, props);
    return id;
  }
  async getRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<DocumentData | null> {
    const request = await this.firestoreRepository.getDocument(
      "requests",
      requestId
    );
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
