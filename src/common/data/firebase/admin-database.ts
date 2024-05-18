import { getDownloadURL, Storage } from "firebase-admin/storage";
import { FieldValue } from "firebase-admin/firestore";
import { inject, injectable } from "tsyringe";
import IServerDatabase from "@/common/interfaces/Iserver-database";
import { Failure } from "fp-ddd";
import { Either, left, right } from "fp-ts/lib/Either";
import { DocumentData } from "@/common/interfaces/idatabase";
import { Auth } from "firebase-admin/lib/auth/auth";
import { getIdToken } from "firebase/auth";

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
      const docRef = this._options.firestore.collection(collection).doc();
      await docRef.set(data);
      return right(undefined);
    } catch (error) {
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
}
