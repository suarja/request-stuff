import { BucktStorage } from "@/firebase/bucket/bucket";

import StorageRepository from "../application/repositories/storage-repository";
import {
  FirebaseStorage,
  UploadResult,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
export default class StorageRepositoryImplementation extends StorageRepository {
  private bucket: FirebaseStorage;

  constructor({ bucket }: { bucket: FirebaseStorage }) {
    super();
    this.bucket = bucket;
  }
  async uploadFile(path: string, value: any): Promise<UploadResult> {
    const storageRef = ref(this.bucket, path);
    const result = await uploadBytes(storageRef, value);
    console.log({ result });
    return result;
  }

  async get(key: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async remove(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export const storageRepository = new StorageRepositoryImplementation({
  bucket: BucktStorage,
});
