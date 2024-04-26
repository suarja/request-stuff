import { ListResult, UploadResult } from "firebase/storage";
import { RootFolder } from "../../presentation/components/Folder";

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

  abstract getPathContent({
    path,
    root,
  }: {
    path: string;
    root: string;
  }): Promise<RootFolder>;

  
  abstract remove({ path }: { path: string }): Promise<"ok" | "not ok">;
  abstract clear(): Promise<void>;
}

export type FileFromStorage = {
  name: string;
  url: string;
  key: string;
};

export type FileSenderData = {
  senderName: string;
  senderEmail?: string;
  message?: string;
  uploadDate?: string;
  
 
};
