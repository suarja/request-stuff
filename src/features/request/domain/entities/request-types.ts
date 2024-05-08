import { FileSenderData } from "@/common/interfaces/istorage";
import { Dispatch, SetStateAction } from "react";

export interface BaseRequest {
  id: string;
  userId: string;
  maxFileSize?: number;
  dateLimit?: number | string;
  name: string;
  description?: string;
  maxFiles?: number;
  numberOfUploads: number;
  path: string;
  url: string;
}

export interface PublicRequest extends BaseRequest {
  uploads: Upload[];
}
export interface PrivateRequest extends BaseRequest {
  uploads: UserUpload[];
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

export interface RequestTree {
  requests: PrivateRequest[];
}

export type RequestSubFolder = {
  title: string;
  path: string;
};
export interface RequestFolder {
  title: string;
  path: string;
  requests: PrivateRequest[];
  subFolders?: RequestSubFolder[];
  params: string;
}

export interface ClientRequestFolder extends RequestFolder {
  setSelectedRequest: Dispatch<SetStateAction<PrivateRequest | null>>;
}
