import { UploadResult } from "firebase/storage";

export default abstract class FileRepository {
  abstract uploadFile(path: string, value: any): Promise<UploadResult>;
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
