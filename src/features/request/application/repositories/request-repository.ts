import { FileSenderData } from "@/features/file/application/repositories/file-repository";
import { DocumentData } from "firebase/firestore";

export default abstract class RequestRepository {
  abstract createRequest({
    props,
  }: {
    props: CreateRequest;
  }): Promise<string | undefined>;
  //! Remove infra return type
  abstract getRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<DocumentData | null>;

  abstract uploadFileFromRequest({
    requestData,
    file,
    fileSenderData,
  }: {
    requestData: RequestData;
    file: File;
    fileSenderData?: FileSenderData;
  }): Promise<void>;
  abstract updateRequest(): Promise<void>;
  abstract deleteRequest(): Promise<void>;
}

export interface CreateRequest {
  userId: string;
  maxFileSize?: number;
  dateLimit?: number;
  name: string;
  description?: string;
  maxFiles?: number;
  path: string;
}

export interface RequestData extends CreateRequest {
  id: string;
}
