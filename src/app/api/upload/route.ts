import {
  customInitApp,
  firebaseAdmin,
} from "@/common/data/firebase/admin-config";
import { ErrorMessage } from "@/common/interfaces/error";
import { FileSenderData } from "@/common/interfaces/istorage";
import UserDto from "@/features/auth/infra/dto's/user-dto";
import { getPropsUploadFileServer } from "@/features/request/application/usecases/services/get-props-upload-file-server";
import PublicRequestEntity from "@/features/request/domain/entities/request-entity";
import {
  PublicRequest,
  Upload,
  UserUpload,
} from "@/features/request/domain/entities/request-types";
import { isLeft } from "fp-ts/lib/Either";
import { NextRequest, NextResponse } from "next/server";

// Init the Firebase SDK every time the server is called
customInitApp();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { error, file, requestData, fileSenderData, ip } =
      await getPropsUploadFileServer(request);
    
    if (!requestData || fileSenderData === undefined || !file || error) {
      const message: ErrorMessage<""> = "Bad request. ";
      return NextResponse.json(
        {
          message,
          error: true,
        },
        { status: 200 }
      );
    }
    const publicRequest = PublicRequestEntity.create(requestData);

    const canUploadFile = publicRequest.canUploadFile({
      file: file as File,
      senderName: fileSenderData.senderName,
    });
    if (!canUploadFile.canUpload) {
      return NextResponse.json(
        {
          message: canUploadFile.message,
          error: true,
          additionalInfo: canUploadFile.additionalInfo,
        },
        { status: 200 }
      );
    }

    //~ check user has enough ressources (subscription plan, storage available)
    const userId = requestData.userId;
    const userInfra = await firebaseAdmin.getDocument("users", userId);
    if (!userInfra) {
      const message: ErrorMessage<""> = "User not found";
      return NextResponse.json(
        {
          message,
          error: true,
        },
        { status: 200 }
      );
    }

    const userDto = new UserDto();
    const eitherUser = userDto.toDomain({ data: userInfra });
    if (isLeft(eitherUser)) {
      const message: ErrorMessage<""> =
        "Could not add file to request beacuse could not get user";
      return NextResponse.json(
        {
          message,
          error: true,
        },
        { status: 200 }
      );
    }
    const user = eitherUser.right;
    const userCanUpload = user.canUploadFile({
      file: file as File,
    });

    if (!userCanUpload.canUpload) {
      return NextResponse.json(
        {
          message: userCanUpload.message,
          error: true,
        },
        { status: 200 }
      );
    }

    //* Upload file
    // 1. Upload file to storage
    const fileUrl = await firebaseAdmin.uploadFile(
      file as File,
      `users/${user.getOrCrash().id}/requests/${
        publicRequest.getOrCrash().id
      }/files/${(file as File).name}`
    );
    if (!fileUrl) {
      const message: ErrorMessage<""> = "An unknown error happend";
      return NextResponse.json(
        {
          message,
          error: true,
        },
        { status: 200 }
      );
    }

    // 2. Update public request collection
    const upload: Upload = publicRequest.createUpload({
      fileName: (file as File).name,
      senderName: fileSenderData.senderName,
      ip: ip ?? "",
    });
    await firebaseAdmin.updateArray({
      collection: "requests",
      id: requestData.id,
      field: "uploads",
      data: {
        ...upload,
      },
      updateRest: true,
      rest: {
        numberOfUploads: requestData.numberOfUploads + 1,
      },
    });

    // 3. Update request in user collection
    const userUpload: UserUpload = {
      fileName: (file as File).name,
      fileUrl,
      fileSenderData: {
        ...fileSenderData,
        fileUrl,
      },
    };
    await firebaseAdmin.updateArray({
      collection: `users/${user.getOrCrash().id}/requests`,
      id: requestData.id,
      field: "uploads",
      data: {
        ...userUpload,
      },
      updateRest: true,
      rest: {
        numberOfUploads: requestData.numberOfUploads + 1,
      },
    });

    // 4. Update user
    const fileSizeInMb = (file as File).size / 1024 ** 2;
    await firebaseAdmin.updateDocument("users", user.getOrCrash().id, {
      currentStorage: user.getOrCrash().currentStorage + fileSizeInMb,
    });

    const message: ErrorMessage<""> = "File uploaded successfully.";
    return NextResponse.json(
      {
        message,
        error: false,
        fileUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "An unknown error happened",
      error: true,
    });
  }
}
