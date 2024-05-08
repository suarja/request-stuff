import { Failure } from "fp-ddd";
import { DocumentData } from "./idatabase";
import { Either } from "fp-ts/lib/Either";

export default class IServerDatabase {
  uploadFile(
    file: File,
    path: string
  ): Promise<Either<Failure<string>, string>> {
    throw new Error("Method not implemented.");
  }
  saveDocument(
    collection: string,
    data: any
  ): Promise<Either<Failure<string>, void>> {
    throw new Error("Method not implemented.");
  }
  getDocument(
    collection: string,
    id: string
  ): Promise<Either<Failure<string>, DocumentData>> {
    throw new Error("Method not implemented.");
  }
  updateDocument(
    collection: string,
    id: string,
    data: any
  ): Promise<Either<Failure<string>, void>> {
    throw new Error("Method not implemented.");
  }
  updateArray({
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
  }): Promise<Either<Failure<string>, void>> {
    throw new Error("Method not implemented.");
  }
}
