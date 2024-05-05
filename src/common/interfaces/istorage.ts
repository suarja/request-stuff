import { RootFolder } from "@/features/file/presentation/components/Folder";
import { Failure } from "fp-ddd";
import { Either } from "fp-ts/lib/Either";

export default abstract class IStorage {
  abstract uploadFile({
    path,
    value,
    customMetadata,
  }: {
    path: string;
    value: File;
    customMetadata?: FileSenderData | undefined;
  }): Promise<string>;
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
  abstract removeFile({ path }: { path: string }): Promise<"ok" | "not ok">;

  abstract deleteFolder({
    path,
  }: {
    path: string;
  }): Promise<Either<Failure<String>, void>>;
}

export type FileFromStorage = {
  name: string;
  url: string;
  key: string;
};

export type FileSenderData = {
  senderName: string;
  senderEmail?: string;
  fileName: string;
  message?: string;
  uploadDate?: string;
  fileUrl: string;
};
