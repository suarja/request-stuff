import { FileSenderData } from "@/features/file/application/repositories/file-repository";
import { DocumentData } from "firebase/firestore";

export default abstract class RequestRepository {
  abstract createRequest({
    props,
  }: {
    props: Request;
  }): Promise<string | undefined>;
  //! Remove infra return type
  abstract getRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<Request | null>;

  abstract uploadFileFromRequest({
    requestData,
    file,
    fileSenderData,
  }: {
    requestData: RequestWithId;
    file: File;
    fileSenderData?: FileSenderData;
  }): Promise<void>;

  abstract getRequests({ userId }: { userId: string }): Promise<Request[]>;
  abstract updateRequest(): Promise<void>;
  abstract deleteRequest(): Promise<void>;
}

export interface Request {
  id: string;
  userId: string;
  maxFileSize?: number;
  dateLimit?: number;
  name: string;
  description?: string;
  maxFiles?: number;
  path: string;
  url: string;
}

export interface RequestWithId extends Request {
  id: string;
}
