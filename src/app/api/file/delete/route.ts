import "reflect-metadata";
import { customInitApp } from "@/common/data/firebase/admin-config";
import { ErrorMessage } from "@/common/interfaces/error";
import { getPropsUploadFileServer } from "@/features/request/application/usecases/services/get-props-upload-file-server";
import PublicRequestEntity from "@/features/request/domain/entities/request-entity";
import { NextRequest, NextResponse } from "next/server";
import { serverAdapter } from "../../upload/dependency-injection";

// Init the Firebase SDK every time the server is called
customInitApp();

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  } catch (error) {}
}
