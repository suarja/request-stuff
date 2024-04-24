import {
  FirestoreFactory,
  firestoreFactory,
} from "@/firebase/firestore/firestore";
import RequestRepository, {
  CreateRequest,
} from "../application/repositories/request-repository";
import { DocumentData } from "firebase/firestore";

export default class RequestRepositoryImpl extends RequestRepository {
  private firestoreRepository: FirestoreFactory;

  constructor({ firestoreFactory }: { firestoreFactory: FirestoreFactory }) {
    super();
    this.firestoreRepository = firestoreFactory;
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
});
