import IDatabase from "@/common/interfaces/idatabase";
import firebase_app from "../config";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  collection,
  setDoc,
  Firestore,
  collection as Collection,
  query,
  where,
  arrayUnion,
  increment,
} from "firebase/firestore";
export const FirestoreDB = getFirestore(firebase_app);

export interface FirestoreDatabaseOptions {
  db: Firestore;
}

export class FirestoreDatabase extends IDatabase {
  private db: Firestore;

  constructor(firestoreDatabaseOptions: FirestoreDatabaseOptions) {
    super();
    this.db = firestoreDatabaseOptions.db;
  }

  // Make a query to the database
  async queryWhere({
    ref,
    a,
    b,
    operand,
  }: {
    ref: string;
    a: string;
    b: string | boolean | number;
    operand:
      | "<"
      | "<="
      | "=="
      | ">="
      | ">"
      | "!="
      | "array-contains"
      | "in"
      | "array-contains-any"
      | "not-in";
  }) {
    const queryRef = collection(this.db, ref);
    const q = query(queryRef, where(a, operand, b));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  }

  // A method to get a document from a collection
  async getDocument(collection: string, id?: string) {
    let docRef;
    if (id) {
      docRef = doc(this.db, collection, id);
    } else {
      docRef = doc(this.db, collection);
    }
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  // A method to get all documents from a collection
  async getCollection(collection: string) {
    const querySnapshot = await getDocs(Collection(this.db, collection));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  }

  // A method to add a document to a collection
  async addDocument(collection: string, data: any, id?: string) {
    if (id) {
      const docRef = doc(this.db, collection, id);
      await setDoc(docRef, data);
      return id;
    }
    const docRef = await addDoc(Collection(this.db, collection), data);
    return docRef.id;
  }

  // A method to update a document in a collection
  async updateDocument(collection: string, id: string, data: any) {
    const docRef = doc(this.db, collection, id);
    await updateDoc(docRef, data);
  }
  // A method to update an array in a document in a collection
  async updateArrayInDocument({
    collection,
    id,
    field,
    data,
    incrementNumber,
  }: {
    collection: string;
    id: string;
    field: string;
    data: any;
    incrementNumber: string;
  }) {
    try {
      const docRef = doc(this.db, collection, id);
      await updateDoc(docRef, {
        [incrementNumber]: increment(1),
        [field]: arrayUnion(data),
      });
    } catch (error) {
      console.error("Error while updating array", error);
    }
  }

  // A method to delete a document from a collection
  async deleteDocument(collection: string, id: string) {
    const docRef = doc(this.db, collection, id);
    await deleteDoc(docRef);
  }
}

export const FirebaseDatabase = new FirestoreDatabase({
  db: FirestoreDB,
});
