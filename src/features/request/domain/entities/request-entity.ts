import { Entity, Failure } from "fp-ddd";
import { PublicRequest, Upload } from "./request-types";
import { Either, left, right } from "fp-ts/lib/Either";
import { publicRequestSchema } from "./request-schema";
import { ErrorMessage } from "@/common/interfaces/error";

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
    const upload: Upload = {
      fileName,
      senderHash: this.senderNameHash({ fileName, senderName }),
      senderIp: ip,
    };
    return upload;
  }

  senderNameHash({
    fileName,
    senderName,
  }: {
    fileName: string;
    senderName: string;
  }) {
    return senderName + fileName;
  }

  canUploadFile({ file, senderName }: { file: File; senderName: string }): {
    canUpload: boolean;
    message: ErrorMessage;
    additionalInfo?: string;
  } {
    // check ip address

    //~Check if this is valid
    if (!this.isValid()) {
      return { canUpload: false, message: "Request is not valid" };
    }

    const request = this.getOrCrash();
    // Check file size
    const fileSizeInMb = (file as File).size / 1024 ** 2;
    if (fileSizeInMb > request.maxFileSize!) {
      return {
        canUpload: false,
        message: `File is too big`,
        additionalInfo: `File should be less than: ${request.maxFileSize!}`,
      };
    }

    // check upload time
    const dateLimitFormatted = new Date(request.dateLimit!).getTime();
    if (Date.now() > dateLimitFormatted) {
      return {
        canUpload: false,
        message: `Request date limit exceeded`,
        additionalInfo: `Dead line was:  ${new Date(
          request.dateLimit!
        ).toLocaleDateString()}`,
      };
    }

    // check if file already exists
    const fileExists = request.uploads.some((upload) => {
      if (
        upload.fileName === file.name &&
        upload.senderHash ===
          this.senderNameHash({ fileName: file.name, senderName })
      ) {
        return true;
      }
    });

    if (fileExists) {
      return {
        canUpload: false,
        message: "File already exists",
      };
    }

    // check number of uploads
    if (request.numberOfUploads + 1 > request.maxFiles!) {
      return {
        canUpload: false,
        message: "Max number of files reached. ",
      };
    }

    return {
      canUpload: true,
      message: "No error",
    };
  }
}
