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
}
