import { FileSenderData } from "@/features/file/application/repositories/file-repository";
import { DocumentData } from "firebase/firestore";
import { Request, RequestBase } from "../../domain/entities/request-types";

export default abstract class RequestRepository {
  abstract addRequestToPublic({
    props,
  }: {
    props: RequestBase;
  }): Promise<string | undefined>;
  //! Remove infra return type
  abstract getRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<RequestBase | null>;

  abstract uploadFileFromRequest({
    requestData,
    file,
    fileSenderData,
  }: {
    requestData: RequestBase;
    file: File;
    fileSenderData?: FileSenderData;
  }): Promise<void>;

  abstract addRequestToUser({
    path,
    userId,
  }: {
    path: string;
    userId: string;
    request: Request;
  }): Promise<"ok" | "not ok">;

  abstract getRequests({ userId }: { userId: string }): Promise<RequestBase[]>;
  abstract updateRequest(): Promise<void>;
  abstract deleteRequest(): Promise<void>;
}
