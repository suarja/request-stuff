import { DocumentData } from "firebase/firestore";
import {
  Request,
  RequestWithId,
} from "../../application/repositories/request-repository";

export default class RequestDto implements DTO<Request, DocumentData> {
  fromDomain({ data }: { data: RequestWithId }): void {
    throw new Error("Method not implemented.");
  }
  toDomain({ data }: { data: DocumentData }): Request {
    return {
      userId: data.userId,
      maxFileSize: data.maxFileSize,
      dateLimit: data.dateLimit,
      name: data.name,
      description: data.description,
      maxFiles: data.maxFiles,
      path: data.path,
      url: data.url,
      id: data.id,
    };
  }
}

export abstract class DTO<T, I = void, O = void> {
  abstract fromDomain({ data }: { data: T }): O;
  abstract toDomain({ data }: { data: I }): T;
}
