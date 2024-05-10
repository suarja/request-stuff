import IDatabase, { DocumentData } from "@/common/interfaces/idatabase";
import firebase_app, { FirestoreDB } from "../config";
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
  connectFirestoreEmulator,
} from "firebase/firestore";
import { Either, left, right } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";

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
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const queryRef = collection(this.db, ref);
      const q = query(queryRef, where(a, operand, b));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return right(data);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error while making a query where request to db",
        })
      );
    }
  }

  // A method to get a document from a collection
  async getDocument(
    collection: string,
    id?: string
  ): Promise<Either<Failure<string>, DocumentData>> {
    try {
      let docRef;
      if (id) {
        docRef = doc(this.db, collection, id);
      } else {
        docRef = doc(this.db, collection);
      }
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return right(docSnap.data());
      } else {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Document does not exist",
          })
        );
      }
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error while getting document from db",
        })
      );
    }
  }

  // A method to get all documents from a collection
  async getCollection(
    collection: string
  ): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const querySnapshot = await getDocs(Collection(this.db, collection));
      const data = querySnapshot.docs.map((doc) => doc.data());
      return right(data);
    } catch (error: any) {
      console.log(error.toString());
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error while getting collection from db",
        })
      );
    }
  }

  // A method to add a document to a collection
  async addDocument(
    collection: string,
    data: any,
    id?: string
  ): Promise<Either<Failure<string>, string>> {
    try {
      if (id) {
        const docRef = doc(this.db, collection, id);
        await setDoc(docRef, data);
        return right(id);
      }
      const docRef = await addDoc(Collection(this.db, collection), data);
      return right(docRef.id);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error while adding document to db",
        })
      );
    }
  }

  // A method to update a document in a collection
  async updateDocument(
    collection: string,
    id: string,
    data: any
  ): Promise<Either<Failure<string>, void>> {
    try {
      const docRef = doc(this.db, collection, id);
      await updateDoc(docRef, data);
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error while updating document in db",
        })
      );
    }
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
    incrementNumber?: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      if (!incrementNumber) {
        const docRef = doc(this.db, collection, id);
        await updateDoc(docRef, {
          [field]: arrayUnion(data),
        });
        return right(undefined);
      }
      const docRef = doc(this.db, collection, id);
      await updateDoc(docRef, {
        [incrementNumber]: increment(1),
        [field]: arrayUnion(data),
      });
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error while updating array in document in db",
        })
      );
    }
  }

  // A method to delete a document from a collection
  async deleteDocument(
    collection: string,
    id: string
  ): Promise<Either<Failure<string>, void>> {
    try {
      const docRef = doc(this.db, collection, id);
      await deleteDoc(docRef);
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error while deleting document from db",
        })
      );
    }
  }
}

export const FirebaseDatabase = new FirestoreDatabase({
  db: FirestoreDB,
});
