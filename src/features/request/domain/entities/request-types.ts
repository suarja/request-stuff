import { FileSenderData } from "@/common/interfaces/istorage";
import { Dispatch, SetStateAction } from "react";

export interface RequestBase {
  id: string;
  userId: string;
  maxFileSize?: number;
  dateLimit?: number;
  name: string;
  description?: string;
  maxFiles?: number;
  numberOfUploads: number;
  path: string;
  url: string;
  uploads: Upload[];
}

export type Upload = {
  fileName: string;
  senderIp?: string;
  senderHash?: string;
  date?: string;
};

export type UserUpload = {
  fileName: string;
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
  subFolders?: RequestSubFolder[];
  params: string;
}

export interface ClientRequestFolder extends RequestFolder {
  setSelectedRequest: Dispatch<SetStateAction<Request | null>>;
}
