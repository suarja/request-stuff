import { RequestData } from "@/features/request/application/repositories/request-repository";
import { UploadResult } from "firebase/storage";

export default abstract class FileRepository {
  abstract uploadFile({
    path,
    value,
  }: {
    path: string;
    value: File;
    metadata?: FileSenderData;
  }): Promise<UploadResult>;
  abstract getUserFiles({
    userId,
  }: {
    userId: string;
  }): Promise<FileFromStorage[]>;
  abstract remove(key: string): Promise<void>;
  abstract clear(): Promise<void>;
}

export type FileFromStorage = {
  name: string;
  url: string;
  key: string;
};

export type FileSenderData = {
  senderName?: string;
  senderEmail?: string;
  requestId?: string;
  requestName?: string;
  requestDescription?: string;
};
