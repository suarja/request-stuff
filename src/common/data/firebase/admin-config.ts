import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage, getDownloadURL, Storage } from "firebase-admin/storage";
import { FieldValue } from "firebase-admin/firestore";
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
// Class to handle Firebase Admin SDK storage and firestore operations
export class FirebaseAdmin {
  // Init the Firebase SDK every time the server is called

  // Firestore instance
  private firestore: FirebaseFirestore.Firestore;
  // Storage instance
  private storage: Storage;

  constructor() {
    customInitApp();
    this.firestore = getFirestore();
    this.storage = getStorage();
  }

  // Upload a file to Firebase Storage
  async uploadFile(file: File, path: string): Promise<string> {
    console.log("uploading file");

    const fileRef = this.storage
      .bucket(process.env.BUCKET_NAME as string)
      .file(path);
    const buff = Buffer.from(await file.arrayBuffer());
    fileRef.setMetadata({
      contentType: file.type,
    });
    await fileRef.save(buff);
    // Return the download URL
    const url = await getDownloadURL(fileRef);
    console.log({ url });
    return url;
  }

  // Get a download URL from a file in Firebase Storage
  async getDownloadURL(path: string) {
    return getDownloadURL(this.storage.bucket().file(path));
  }

  // Save a document in Firestore
  async saveDocument(collection: string, data: any) {
    const docRef = this.firestore.collection(collection).doc();
    await docRef.set(data);
  }

  // Get a document from Firestore
  async getDocument(collection: string, id: string) {
    const docRef = this.firestore.collection(collection).doc(id);
    const docSnap = await docRef.get();
    return docSnap.data();
  }

  // // Get all documents from a collection in Firestore
  // async getCollection(collection: string) {
  //   const querySnapshot = await getDocs(collection(this.firestore, collection));
  //   return querySnapshot.docs.map((doc) => doc.data());
  // }

  // // Delete a document from Firestore
  // async deleteDocument(collection: string, id: string) {
  //   await deleteDoc(doc(this.firestore, collection, id));
  // }

  // Update a document in Firestore
  async updateDocument(collection: string, id: string, data: any) {
    return await this.firestore.collection(collection).doc(id).update(data);
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
      return await this.firestore
        .collection(collection)
        .doc(id)
        .update({
          ...rest,
          [field]: FieldValue.arrayUnion(data),
        });
    }
    return await this.firestore
      .collection(collection)
      .doc(id)
      .update({
        [field]: FieldValue.arrayUnion(data),
      });
  }
}

export const firebaseAdmin = new FirebaseAdmin();
