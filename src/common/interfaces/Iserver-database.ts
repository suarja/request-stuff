import { Failure } from "fp-ddd";
import { DocumentData } from "./idatabase";
import { Either } from "fp-ts/lib/Either";

export default abstract class IServerDatabase {
  abstract verifySessionCookie({
    sessionCookie,
  }: {
    sessionCookie: string;
  }): Promise<Either<Failure<string>, string>>;

  abstract uploadFile(
    file: File,
    path: string
  ): Promise<Either<Failure<string>, string>>;
  abstract saveDocument(
    collection: string,
    data: any
  ): Promise<Either<Failure<string>, void>>;
  abstract getDocument(
    collection: string,
    id: string
  ): Promise<Either<Failure<string>, DocumentData>>;
  abstract updateDocument(
    collection: string,
    id: string,
    data: any
  ): Promise<Either<Failure<string>, void>>;
  abstract updateArray({
    collection,
    id,
    field,
    data,
    updateRest,
    rest,
  }: {
    collection: string;
    id: string;
    field: string;
    data: any;
    updateRest?: boolean | undefined;
    rest?: any;
  }): Promise<Either<Failure<string>, void>>;

  abstract deleteFile(path: string): Promise<Either<Failure<string>, void>>;

  abstract getCollection(
    collection: string
  ): Promise<Either<Failure<string>, DocumentData[]>>;
}
