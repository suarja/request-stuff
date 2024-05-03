import { BucktStorage } from "@/common/data/firebase/bucket/bucket";

import {
  FirebaseStorage,
  FullMetadata,
  StorageReference,
  UploadResult as string,
  deleteObject,
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
import IStorage, {
  FileFromStorage,
  FileSenderData,
} from "@/common/interfaces/istorage";
export interface FirebaseStorageOptions {
  storage: FirebaseStorage;
}
export default class FirebaseStorageService extends IStorage {
  private storage: FirebaseStorage;

  constructor(options: FirebaseStorageOptions) {
    super();
    this.storage = options.storage;
  }
  async uploadFile({
    path,
    value,
    customMetadata,
  }: {
    path: string;
    value: File;
    customMetadata?: FileSenderData;
  }): Promise<string> {
    try {
      const storageRef = ref(this.storage, path);

      const result = await uploadBytes(storageRef, value, { customMetadata });
      const url = await getDownloadURL(result.ref);
      return url;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  async getUserFiles({
    userId,
  }: {
    userId: string;
  }): Promise<FileFromStorage[]> {
    const path = `users/${userId}/files`;
    const files = await listAll(ref(this.storage, path));
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
    const storageRef = ref(this.storage, path);
    const pathContentInfra = await listAll(storageRef);

    const folders: SubFolder[] = pathContentInfra.prefixes.map((folder) => {
      return {
        name: folder.name,
        fullPath: folder.fullPath,
      };
    });
    const files: TreeFile[] = [];
    for (const file of pathContentInfra.items) {
      const { url, metadata } = await this.getFileUrlAndMetadata({
        ref: file,
      });
      files.push({
        name: file.name,
        fullPath: file.fullPath,
        url,
        size: metadata?.size ?? 0,
        metadata: {
          name: metadata?.name ?? "",
          fullPath: metadata?.fullPath ?? "",
          contentType: metadata?.contentType ?? "",
          size: metadata?.size ?? 0,
          timeCreated: metadata?.timeCreated ?? "",
          updated: metadata?.updated ?? "",
        },
        parent: {
          name: file.parent?.name || "",
          fullPath: file.parent?.fullPath || "",
        },
      });
    }

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

    const metadata: FullMetadata | null =
      fileInformation[1].status === "fulfilled"
        ? fileInformation[1].value
        : null;

    return { url, metadata };
  }

  async remove({ path }: { path: string }): Promise<"ok" | "not ok"> {
    try {
      const refPath = ref(this.storage, path);
      await deleteObject(refPath);
      return "ok";
    } catch (error) {
      return "not ok";
    }
  }
}

export const FirebaseStorageServiceInstance = new FirebaseStorageService({
  storage: BucktStorage,
});
