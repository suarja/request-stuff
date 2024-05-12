import "reflect-metadata";
import { customInitApp } from "@/common/data/firebase/admin-config";
import { ErrorMessage } from "@/common/interfaces/error";
import { getPropsUploadFileServer } from "@/features/request/application/usecases/services/get-props-upload-file-server";
import PublicRequestEntity from "@/features/request/domain/entities/request-entity";
import { NextRequest, NextResponse } from "next/server";
import { serverAdapter } from "./dependency-injection";

// Init the Firebase SDK every time the server is called
customInitApp();

export async function POST(request: NextRequest) {
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
      console.log({ canUploadFile });
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
    const { user, returnOptions } = await serverAdapter.getUser({
      userId: requestData.userId,
    });
    console.log({ returnOptions });
    if (!user) {
      return NextResponse.json(returnOptions);
    }
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
    const { url, returnOptions: urlReturnOptions } =
      await serverAdapter.uploadFile({
        userId: requestData.userId,
        file: file as File,
        requestId: requestData.id,
      });
    if (!url) {
      return NextResponse.json(urlReturnOptions);
    }

    // 2. Update public request collection
    const { returnOptions: addUploadToPublicRequestReturnOptions } =
      await serverAdapter.addUploadToPublicRequest({
        request: publicRequest,
        ip: ip ?? "",
        senderName: fileSenderData.senderName,
        fileName: (file as File).name,
      });

    if (addUploadToPublicRequestReturnOptions.error) {
      return NextResponse.json(addUploadToPublicRequestReturnOptions);
    }

    // 3. Update request in user collection
    const { returnOptions: addUploadToUserRequestReturnOptions } =
      await serverAdapter.addUploadToUserRequest({
        fileName: (file as File).name,
        request: publicRequest,
        fileUrl: url,
        senderData: fileSenderData,
      });

    if (addUploadToUserRequestReturnOptions.error) {
      return NextResponse.json(addUploadToUserRequestReturnOptions);
    }

    // 4. Update user
    const { returnOptions: updateUserCurrentStorageReturnOptions } =
      await serverAdapter.updateUserCurrentStorage({
        file: file as File,
        user,
      });

    if (updateUserCurrentStorageReturnOptions.error) {
      return NextResponse.json(updateUserCurrentStorageReturnOptions);
    }

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        error: false,
        url,
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
