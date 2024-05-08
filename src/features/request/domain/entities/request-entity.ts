import { Entity, Failure } from "fp-ddd";
import { PublicRequest, Upload } from "./request-types";
import { Either, left, right } from "fp-ts/lib/Either";
import { publicRequestSchema } from "./request-schema";

export default class PublicRequestEntity extends Entity<PublicRequest> {
  readonly values: Either<Failure<PublicRequest>, PublicRequest>;

  private constructor(props: PublicRequest) {
    super();
    this.values = this.validate(props);
  }

  static create(props: PublicRequest): PublicRequestEntity {
    return new PublicRequestEntity(props);
  }

  validate(
    options: PublicRequest
  ): Either<Failure<PublicRequest>, PublicRequest> {
    const isValid = publicRequestSchema.safeParse(options);

    if (isValid.success) {
      return right(options);
    }
    return left(
      new Failure({
        invalidValue: options,
        message: isValid.error.errors[0].message,
      })
    );
  }

  createUpload({
    fileName,
    senderName,
    ip,
  }: {
    fileName: string;
    senderName: string;
    ip: string;
  }): Upload {
    const senderNameHashed = senderName + fileName;
    const upload: Upload = {
      fileName,
      senderHash: senderNameHashed,
      senderIp: ip,
    };
    return upload;
  }
}
