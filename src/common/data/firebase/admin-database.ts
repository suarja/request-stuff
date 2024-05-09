import { getFirestore } from "firebase-admin/firestore";
import { getStorage, getDownloadURL, Storage } from "firebase-admin/storage";
import { FieldValue } from "firebase-admin/firestore";
import { inject, injectable } from "tsyringe";

export interface FirebaseAdminDatabaseOptions {
  firestore: FirebaseFirestore.Firestore;
  storage: Storage;
}

@injectable()
export class FirebaseAdminDatabase {
  private _options: FirebaseAdminDatabaseOptions;

  constructor(@inject("options") options: FirebaseAdminDatabaseOptions) {
    this._options = options;
  }

  // Upload a file to Firebase Storage
  async uploadFile(file: File, path: string): Promise<string> {
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
    return url;
  }


  // Save a document in Firestore
  async saveDocument(collection: string, data: any) {
    const docRef = this._options.firestore.collection(collection).doc();
    await docRef.set(data);
  }

  // Get a document from Firestore
  async getDocument(collection: string, id: string) {
    const docRef = this._options.firestore.collection(collection).doc(id);
    const docSnap = await docRef.get();
    return docSnap.data();
  }

  // Update a document in Firestore
  async updateDocument(collection: string, id: string, data: any) {
    return await this._options.firestore.collection(collection).doc(id).update(data);
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
  }) {
    if (updateRest === true) {
      return await this._options.firestore
        .collection(collection)
        .doc(id)
        .update({
          ...rest,
          [field]: FieldValue.arrayUnion(data),
        });
    }
    return await this._options.firestore
      .collection(collection)
      .doc(id)
      .update({
        [field]: FieldValue.arrayUnion(data),
      });
  }
}

const firestore = getFirestore();
const storage = getStorage();

export const firebaseAdmin = new FirebaseAdminDatabase({
  firestore,
  storage,
});
