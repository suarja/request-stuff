import { FileSenderData } from "@/features/file/application/repositories/file-repository";

export interface RequestBase {
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

export type UserUpload = {
  userId: string;
  fileUrl: string;
  fileSenderData?: FileSenderData;
};

export interface Request extends RequestBase {
  uploads: UserUpload[];
  numberOfUploads: number;
}

export interface RequestTree {
  requests: Request[];
}

export interface RootRequestFolder {
  name: string;
  path: string;
  requests: Request[];
}

export interface RootRequestFolderWithParams extends RootRequestFolder {
  params: string;
}
