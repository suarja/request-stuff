import { FileSenderData } from "@/features/file/application/repositories/file-repository";

// export type FileSenderData = {
//   senderName?: string;
//   senderEmail?: string;
//   message?: string;
//   uploadDate?: string;
// };

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

export type RequestSubFolder = {
  title: string;
  path: string;
};
export interface RequestFolder {
  title: string;
  path: string;
  requests: Request[];
  subFolders: RequestSubFolder[];
}

export interface RootRequestFolderWithParams extends RequestFolder {
  params: string;
}
