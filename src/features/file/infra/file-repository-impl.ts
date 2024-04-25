import { BucktStorage } from "@/lib/firebase/bucket/bucket";

import FileRepository, {
  FileFromStorage,
  FileSenderData,
} from "../application/repositories/file-repository";
import {
  FirebaseStorage,
  ListResult,
  UploadResult,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
export default class FileRepositoryImplementation extends FileRepository {
  private bucket: FirebaseStorage;

  constructor({ bucket }: { bucket: FirebaseStorage }) {
    super();
    this.bucket = bucket;
  }
  async uploadFile({
    path,
    value,
    customMetadata,
  }: {
    path: string;
    value: File;
    customMetadata?: FileSenderData;
  }): Promise<UploadResult> {
    const storageRef = ref(this.bucket, path);

    const result = await uploadBytes(storageRef, value, { customMetadata });
    return result;
  }

  async getUserFiles({
    userId,
  }: {
    userId: string;
  }): Promise<FileFromStorage[]> {
    const path = `users/${userId}/files`;
    const files = await listAll(ref(this.bucket, path));
    const filesFromStorage: FileFromStorage[] = [];
    for (const file of files.items) {
      const url = await getDownloadURL(file);
      filesFromStorage.push({ name: file.name, url, key: file.fullPath });
    }
    return filesFromStorage;
  }

  async getPathContent({ path }: { path: string }): Promise<ListResult> {
    const storageRef = ref(this.bucket, path);
    const pathContentInfra = await listAll(storageRef);

    return pathContentInfra;
  }

  async remove(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export const fileRepositoryImplementation = new FileRepositoryImplementation({
  bucket: BucktStorage,
});
