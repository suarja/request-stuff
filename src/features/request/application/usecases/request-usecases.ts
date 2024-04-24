import RequestRepository, {
  CreateRequest,
  RequestData,
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
    requestData,
    file,
  }: {
    requestData: RequestData;
    file: File;
  }) {
    await this.requestRepository.uploadFileFromRequest({ requestData, file });
  }
}
