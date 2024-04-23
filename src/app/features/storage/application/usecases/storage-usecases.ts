import { UploadResult } from "firebase/storage";
import { storageRepository } from "../../infra/firebase-impl";
import StorageRepository from "../repositories/storage-repository";

export default class StorageUsecases {
  private storageRepository: StorageRepository;
  constructor({ storageRepository }: { storageRepository: StorageRepository }) {
    this.storageRepository = storageRepository;
  }

  async uploadFile(path: string, value: any): Promise<UploadResult> {
    return await this.storageRepository.uploadFile(path, value);
  }
}

export const storageUsecases = new StorageUsecases({
  storageRepository: storageRepository,
});
