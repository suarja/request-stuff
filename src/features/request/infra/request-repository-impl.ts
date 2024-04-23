import {
  FirestoreFactory,
  firestoreFactory,
} from "@/firebase/firestore/firestore";
import RequestRepository, {
  CreateRequest,
} from "../application/repositories/request-repository";

export default class RequestRepositoryImpl extends RequestRepository {
  private firestoreRepository: FirestoreFactory;

  constructor({ firestoreFactory }: { firestoreFactory: FirestoreFactory }) {
    super();
    this.firestoreRepository = firestoreFactory;
  }

  async createRequest({ props }: { props: CreateRequest }): Promise<void> {
    // const path = `users/${props.userId}/requests`;
    const id = await this.firestoreRepository.addDocument(props.path, props);
    return;
  }
  getRequest(): Promise<void> {
    throw new Error("Method not implemented.");
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
