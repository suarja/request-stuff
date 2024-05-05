import {
  customInitApp,
  firebaseAdmin,
} from "@/common/data/firebase/admin-config";
import { ErrorMessage } from "@/common/interfaces/error";
import { FileSenderData } from "@/common/interfaces/istorage";
import UserDto from "@/features/auth/infra/dto's/user-dto";
import {
  RequestBase,
  Upload,
  UserUpload,
} from "@/features/request/domain/entities/request-types";
import { isLeft } from "fp-ts/lib/Either";
import { NextRequest, NextResponse } from "next/server";

// Init the Firebase SDK every time the server is called
customInitApp();

export async function POST(request: NextRequest, response: NextResponse) {
  const ip = request.headers.get("x-forwarded-for");
  const form = await request.formData();
  const file = form.get("file");
  const fileSenderData: FileSenderData = JSON.parse(
    form.get("fileSenderData") as string
  );
  const requestData: RequestBase = JSON.parse(
    form.get("requestData") as string
  );

  //~ Check if request options
  if (!requestData || fileSenderData === undefined || !file) {
    const message: ErrorMessage<""> = "Bad request. ";
    return NextResponse.json(
      {
        message,
        error: true,
      },
      { status: 200 }
    );
  }
  const fileSizeInMb = (file as File).size / 1024 ** 2;

  if (fileSizeInMb > requestData.maxFileSize!) {
    const message: ErrorMessage<""> = `File is too big. `;
    return NextResponse.json(
      {
        message,
        error: true,
      },
      { status: 200 }
    );
  }
  if (requestData.numberOfUploads! + 1 > requestData.maxFiles!) {
    const message: ErrorMessage<""> = `Max number of files reached. `;
    return NextResponse.json(
      {
        message,
        error: true,
      },
      { status: 200 }
    );
  }
  const dateLimitFormatted = new Date(requestData?.dateLimit!).getTime();
  const currentDate = new Date().getTime();
  if (currentDate > dateLimitFormatted) {
    const message: ErrorMessage<""> = `Request date limit exceeded. `;
    return NextResponse.json(
      {
        message,
        error: true,
      },
      { status: 200 }
    );
  }

  // Check if file already exists
  const fileExists = requestData.uploads.some(
    (upload) =>
      upload.fileName === (file as File).name &&
      upload.senderHash === fileSenderData.senderName
  );
  if (fileExists) {
    const message: ErrorMessage<""> = "File already exists";
    return NextResponse.json(
      {
        message,
        error: true,
      },
      { status: 200 }
    );
  }

//   // Check ip address is not the same as the sender
//   if (
//     requestData.uploads.some((upload) => {
//       if (ip === upload.senderIp) true;
//     })
//   ) {
//     const message: ErrorMessage<""> = "File already exists";
//     return NextResponse.json(
//       {
//         message,
//         error: true,
//       },
//       { status: 200 }
//     );
//   }

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
  const user = eitherUser.right.getOrCrash();
  if (user.currentStorage + fileSizeInMb > user.maxStorage) {
    const message: ErrorMessage<""> = `Space available insuficient `;
    return NextResponse.json(
      {
        message,
        error: true,
      },
      { status: 200 }
    );
  }

  //* Upload file
  // 1. Upload file to storage
  const fileUrl = await firebaseAdmin.uploadFile(
    file as File,
    `users/${user.id}/requests/${requestData.id}/files/${(file as File).name}`
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
  const upload: Upload = {
    fileName: (file as File).name,
    date: new Date().toISOString(),
    senderHash: fileSenderData.senderName,
    senderIp: ip ?? "unknown",
  };
  await firebaseAdmin.updateArray({
    collection: "requests",
    id: requestData.id,
    field: "uploads",
    data: {
      uploads: [upload],
    },
    updateRest: true,
    rest: {
      numberOfUploads: requestData.numberOfUploads + 1,
    },
  });

  // 3. Update request in user collection
  const userUpload: UserUpload = {
    fileName: (file as File).name,
    fileUrl: fileSenderData.fileUrl,
    fileSenderData: {
      ...fileSenderData,
    },
  };
  await firebaseAdmin.updateArray({
    collection: "users",
    id: user.id,
    field: "uploads",
    data: {
      uploads: [userUpload],
    },
    updateRest: true,
    rest: {
      numberOfUploads: requestData.numberOfUploads + 1,
    },
  });

  // 4. Update user
  await firebaseAdmin.updateDocument("users", user.id, {
    currentStorage: user.currentStorage + fileSizeInMb,
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
}
