import { DocumentData } from "@/common/interfaces/idatabase";
import { Request } from "../../domain/entities/request-types";
import { DTO } from "@/common/interfaces/dto";
export default class RequestDto implements DTO<Request, DocumentData> {
  fromDomain({ data }: { data: Request }): DocumentData {
    throw new Error("Method not implemented.");
  }
  toDomain({ data }: { data: DocumentData }): Request {
    return {
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
    };
  }
}
