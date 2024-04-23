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
}
