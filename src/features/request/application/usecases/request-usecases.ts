import { FileSenderData } from "@/features/file/application/repositories/file-repository";
import { requestRepository } from "../../infra/request-repository-impl";
import RequestRepository, {
  CreateRequest,
} from "../repositories/request-repository";

export default class RequestUsecases {
  private requestRepository: RequestRepository;

  constructor({ requestRepository }: { requestRepository: RequestRepository }) {
    this.requestRepository = requestRepository;
  }

  async createRequest({
    props,
  }: {
    props: CreateRequest;
  }): Promise<string | undefined> {
    return await this.requestRepository.createRequest({ props });
  }

  async getRequest({ requestId }: { requestId: string }) {
    return this.requestRepository.getRequest({ requestId });
  }

  async uploadFileFromRequest({
    requestId,
    file,
    fileSenderData,
  }: {
    requestId: string;
    file: File;
    fileSenderData?: FileSenderData;
  }) {
    const requestPayload = await this.requestRepository.getRequest({
      requestId,
    });
    if (!requestPayload) {
      throw new Error("Request not found");
    }
    const request = {
      id: requestId,
      userId: requestPayload.userId,
      maxFileSize: requestPayload.maxFileSize,
      dateLimit: requestPayload.dateLimit,
      name: requestPayload.name,
      description: requestPayload.description,
      maxFiles: requestPayload.maxFiles,
      path: requestPayload.path,
    };
    await this.requestRepository.uploadFileFromRequest({
      requestData: request,
      file,
      fileSenderData,
    });
  }
}

export const requestUsecases = new RequestUsecases({
  requestRepository: requestRepository,
});
