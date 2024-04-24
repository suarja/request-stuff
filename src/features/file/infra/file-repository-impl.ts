import { BucktStorage } from "@/firebase/bucket/bucket";

import FileRepository, {
  FileFromStorage,
} from "../application/repositories/file-repository";
import {
  FirebaseStorage,
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
  async uploadFile(path: string, value: any): Promise<UploadResult> {
    const storageRef = ref(this.bucket, path);
    const result = await uploadBytes(storageRef, value);
    console.log({ result });
    return result;
  }

  async getUserFiles({
    userId,
  }: {
    userId: string;
  }): Promise<FileFromStorage[]> {
    const path = `users/${userId}/files`;
    const files = await listAll(ref(this.bucket, path));
    console.log({ prefixes: files.prefixes, items: files.items });
    const filesFromStorage: FileFromStorage[] = [];
    for (const file of files.items) {
      const url = await getDownloadURL(file);
      filesFromStorage.push({ name: file.name, url, key: file.fullPath });
    }
    console.log({ filesFromStorage });
    return filesFromStorage;
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
