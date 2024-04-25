import { ListResult, UploadResult } from "firebase/storage";

export default abstract class FileRepository {
  abstract uploadFile({
    path,
    value,
    customMetadata,
  }: {
    path: string;
    value: File;
    customMetadata?: FileSenderData;
  }): Promise<UploadResult>;
  abstract getUserFiles({
    userId,
  }: {
    userId: string;
  }): Promise<FileFromStorage[]>;

  abstract getPathContent({ path }: { path: string }): Promise<ListResult>;

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
  requestId: string;
  requestName: string;
  requestDescription?: string;
};
