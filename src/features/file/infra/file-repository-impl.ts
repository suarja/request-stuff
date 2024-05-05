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
import { Failure } from "fp-ddd";
import { Either, left, right } from "fp-ts/lib/Either";
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

  async removeFile({ path }: { path: string }): Promise<"ok" | "not ok"> {
    try {
      const refPath = ref(this.storage, path);
      await deleteObject(refPath);
      return "ok";
    } catch (error) {
      return "not ok";
    }
  }

  /**
   * Deletes a folder and its contents recursively.
   *
   * @param path - The path of the folder to delete. The path should follow the format `folderName/`.
   * @returns A promise that resolves to `void` if the folder is successfully deleted, or an `Either` object containing a `Failure` if an error occurs.
   *
   * @example
   * ```typescript
   * const result = await FirebaseStorageServiceInstance.deleteFolder({ path: "folderName/" });
   * if (isLeft(result)) {
   *  console.error(result.value);
   * }
   * ```
   *
   * @remarks
   * This method uses Firebase Storage to delete a folder and its contents recursively. It first lists all the items and subfolders in the given path, and then deletes each item and recursively calls itself to delete subfolders.
   *
   * For more information, see the following Stack Overflow answer: [How to delete a folder and its contents using Firebase Storage in JavaScript?](https://stackoverflow.com/a/56844189)
   */
  async deleteFolder({
    path,
  }: {
    path: string;
  }): Promise<Either<Failure<String>, void>> {
    try {
      const refPath = ref(this.storage, path);
      listAll(refPath).then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef);
        });
        res.prefixes.forEach((folderRef) => {
          this.deleteFolder({ path: folderRef.fullPath });
        });
      });
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Could not delete folder",
        })
      );
    }
  }
}

export const FirebaseStorageServiceInstance = new FirebaseStorageService({
  storage: BucktStorage,
});
