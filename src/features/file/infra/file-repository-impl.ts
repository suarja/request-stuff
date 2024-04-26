import { BucktStorage } from "@/lib/firebase/bucket/bucket";

import FileRepository, {
  FileFromStorage,
  FileSenderData,
} from "../application/repositories/file-repository";
import {
  FirebaseStorage,
  ListResult,
  StorageReference,
  UploadResult,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  RootFolder,
  SubFolder,
  TreeFile,
} from "../presentation/components/Folder";
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

  async getPathContent({
    path,
    root,
  }: {
    path: string;
    root: string;
  }): Promise<RootFolder> {
    const storageRef = ref(this.bucket, path);
    const pathContentInfra = await listAll(storageRef);

    const folders: SubFolder[] = pathContentInfra.prefixes.map((folder) => {
      return {
        name: folder.name,
        fullPath: folder.fullPath,
      };
    });
    const files: TreeFile[] = pathContentInfra.items.map((file) => {
      return {
        name: file.name,
        fullPath: file.fullPath,
        parent: {
          name: file.parent?.name || "",
          fullPath: file.parent?.fullPath || "",
        },
      };
    });

    const rootFolder: RootFolder = {
      name: root,
      files,
      folders,
    };
    return rootFolder;
  }

  async getFileUrlAndMetadata({ ref }: { ref: StorageReference }) {
    const fileInformation = await Promise.allSettled([
      getDownloadURL(ref),
      getMetadata(ref),
    ]);

    const url =
      fileInformation[0].status === "fulfilled" ? fileInformation[0].value : "";
    const metadata =
      fileInformation[1].status === "fulfilled" ? fileInformation[1].value : {};

    return { url, metadata };
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
