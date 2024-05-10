import { Failure } from "fp-ddd";
import { Either } from "fp-ts/lib/Either";

export interface DocumentData {
  /** A mapping between a field and its value. */
  [field: string]: any;
}
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
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract getDocument(
    collection: string,
    id?: string | undefined
  ): Promise<Either<Failure<string>, DocumentData>>;

  abstract getCollection(
    collection: string
  ): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract addDocument(
    collection: string,
    data: any,
    id?: string | undefined
  ): Promise<Either<Failure<string>, string>>;

  abstract updateDocument(
    collection: string,
    id: string,
    data: any
  ): Promise<Either<Failure<string>, void>>;
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
    incrementNumber?: string;
  }): Promise<Either<Failure<string>, void>>;
  abstract deleteDocument(collection: string, id: string): Promise<Either<Failure<string>, void>>;
}
