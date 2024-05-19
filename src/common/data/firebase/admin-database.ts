import { getDownloadURL, Storage } from "firebase-admin/storage";
import { FieldValue } from "firebase-admin/firestore";
import { inject, injectable } from "tsyringe";
import IServerDatabase from "@/common/interfaces/Iserver-database";
import { Failure } from "fp-ddd";
import { Either, left, right } from "fp-ts/lib/Either";
import { DocumentData } from "@/common/interfaces/idatabase";
import { Auth } from "firebase-admin/lib/auth/auth";

export interface FirebaseAdminDatabaseOptions {
  firestore: FirebaseFirestore.Firestore;
  storage: Storage;
  auth: Auth;
}

@injectable()
export class FirebaseAdminDatabase extends IServerDatabase {
  private _options: FirebaseAdminDatabaseOptions;

  constructor(
    @inject("firebaseDatabaseAdminOptions")
    firebaseDatabaseAdminOptions: FirebaseAdminDatabaseOptions
  ) {
    super();
    this._options = firebaseDatabaseAdminOptions;
  }

  async verifySessionCookie({
    sessionCookie,
  }: {
    sessionCookie: string;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const decodedClaims = await this._options.auth.verifySessionCookie(
        sessionCookie,
        true
      );
      return right(decodedClaims.uid);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error verifying session cookie",
        })
      );
    }
  }

  async uploadFile(
    file: File,
    path: string
  ): Promise<Either<Failure<string>, string>> {
    try {
      console.log("uploading file");

      const fileRef = this._options.storage
        .bucket(process.env.BUCKET_NAME as string)
        .file(path);
      const buff = Buffer.from(await file.arrayBuffer());

      await fileRef.save(buff, {
        contentType: file.type,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
      // Return the download URL
      const url = await getDownloadURL(fileRef);
      console.log({ url });
      return right(url);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error uploading file",
        })
      );
    }
  }

  async saveDocument(
    collection: string,
    data: any
  ): Promise<Either<Failure<string>, void>> {
    try {
      const docRef = this._options.firestore.doc(collection);
      await docRef.set(data);
      return right(undefined);
    } catch (error) {
      console.log({ error });
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error saving document",
        })
      );
    }
  }

  // Get a document from Firestore
  async getDocument(
    collection: string,
    id: string
  ): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const docRef = this._options.firestore.collection(collection).doc(id);
      const docSnap = await docRef.get();
      const doc = docSnap.data();
      if (!doc) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Document does not exist",
          })
        );
      }
      return right({ ...doc });
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error getting document",
        })
      );
    }
  }

  // Update a document in Firestore
  async updateDocument(
    collection: string,
    id: string,
    data: any
  ): Promise<Either<Failure<string>, void>> {
    try {
      await this._options.firestore.collection(collection).doc(id).update(data);
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error updating document",
        })
      );
    }
  }

  // A method to update an array in a document
  async updateArray({
    collection,
    id,
    field,
    data,
    updateRest = false,
    rest,
  }: {
    collection: string;
    id: string;
    field: string;
    data: any;
    updateRest?: boolean;
    rest?: any;
  }): Promise<Either<Failure<string>, void>> {
    try {
      if (updateRest === true) {
        await this._options.firestore
          .collection(collection)
          .doc(id)
          .update({
            ...rest,
            [field]: FieldValue.arrayUnion(data),
          });
        return right(undefined);
      }
      await this._options.firestore
        .collection(collection)
        .doc(id)
        .update({
          [field]: FieldValue.arrayUnion(data),
        });
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error updating array in document",
        })
      );
    }
  }

  // A method to delete a file from bucket storage
  async deleteFile(path: string): Promise<Either<Failure<string>, void>> {
    try {
      await this._options.storage
        .bucket(process.env.BUCKET_NAME as string)
        .file(path)
        .delete();
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error deleting file",
        })
      );
    }
  }

  // A method to get a collection from firestore database
  async getCollection(
    collection: string
  ): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const collectionRef = this._options.firestore.collection(collection);
      const snapshot = await collectionRef.get();
      const docs = snapshot.docs.map((doc) => doc.data());
      return right(docs);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error getting collection",
        })
      );
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
  async deleteRequestInStorage({
    path,
  }: {
    path: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const bucket = this._options.storage.bucket(
        process.env.BUCKET_NAME as string
      );
      await bucket.deleteFiles({ prefix: path });

      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error deleting folder",
        })
      );
    }
  }

  async deleteDoc({
    path,
  }: {
    path: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      await this._options.firestore.doc(path).delete();
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: `Error deleting document at path: ${path}`,
        })
      );
    }
  }
}
