import { FirestoreDatabase } from "@/lib/firebase/firestore/firestore";
import { DocumentData } from "firebase/firestore";

export default abstract class IDatabase {
  abstract queryWhere({
    ref,
    a,
    b,
    operand,
  }: {
    ref: string;
    a: string;
    b: string | number | boolean;
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
  }): Promise<DocumentData[]>;
  abstract getDocument(
    collection: string,
    id?: string | undefined
  ): Promise<DocumentData | null>;
  abstract getCollection(collection: string): Promise<DocumentData[]>;
  abstract addDocument(
    collection: string,
    data: any,
    id?: string | undefined
  ): Promise<string>;
  abstract updateDocument(
    collection: string,
    id: string,
    data: any
  ): Promise<void>;
  abstract updateArrayInDocument({
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
  }): Promise<void>;
  abstract deleteDocument(collection: string, id: string): Promise<void>;
}
