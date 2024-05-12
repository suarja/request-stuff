import { DocumentData } from "@/common/interfaces/idatabase";
import { PrivateRequest } from "../../domain/entities/request-types";
import { DTO } from "@/common/interfaces/dto";
import { Failure } from "fp-ddd";
import { Either, left, right } from "fp-ts/lib/Either";
export default class RequestDto implements DTO<PrivateRequest, DocumentData> {
  fromDomain({ data }: { data: PrivateRequest }): DocumentData {
    throw new Error("Method not implemented.");
  }
  toDomain({
    data,
  }: {
    data: DocumentData;
  }): Either<Failure<string>, PrivateRequest> {
    try {
      return right({
        userId: data.userId,
        maxFileSize: data.maxFileSize,
        dateLimit: data.dateLimit,
        name: data.name,
        description: data.description,
        maxFiles: data.maxFiles,
        path: data.path,
        url: data.url,
        id: data.id,
        uploads: data.uploads ?? [],
        numberOfUploads: data.numberOfUploads ?? 0,
      });
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Could not convert data into a valid request",
        })
      );
    }
  }
}
