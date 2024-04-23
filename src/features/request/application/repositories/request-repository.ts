export default abstract class RequestRepository {
  abstract createRequest({ props }: { props: CreateRequest }): Promise<void>;
  abstract getRequest(): Promise<void>;
  abstract updateRequest(): Promise<void>;
  abstract deleteRequest(): Promise<void>;
}

export type CreateRequest = {
  userId: string;
  maxFileSize?: number;
  dateLimit?: number;
  name: string;
  description?: string;
  maxFiles?: number;
  path: string;
};
