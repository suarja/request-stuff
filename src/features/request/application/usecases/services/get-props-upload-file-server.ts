import { FileSenderData } from "@/common/interfaces/istorage";
import { PublicRequest } from "@/features/request/domain/entities/request-types";
import { NextRequest } from "next/server";

export async function getPropsUploadFileServer(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for");
  const form = await request.formData();
  const file = form.get("file");
  const fileSenderData: FileSenderData = JSON.parse(
    form.get("fileSenderData") as string
  );
  const requestData: PublicRequest = JSON.parse(
    form.get("requestData") as string
  );
  if (!file || !fileSenderData || !requestData) {
    return {
      error: true,
      file: null,
      fileSenderData: null,
      requestData: null,
      ip: null,
    };
  }

  return {
    error: false,
    file,
    fileSenderData,
    requestData,
    ip,
  };
}
