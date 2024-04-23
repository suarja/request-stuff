import {

  FirebaseStorage,
  UploadResult,
} from "firebase/storage";

export default abstract class StorageRepository {
  abstract uploadFile(path: string, value: any): Promise<UploadResult>;
  abstract get(key: string): Promise<any>;
  abstract remove(key: string): Promise<void>;
  abstract clear(): Promise<void>;
}
