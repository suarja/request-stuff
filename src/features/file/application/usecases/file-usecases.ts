import { UploadResult } from "firebase/storage";
import { fileRepositoryImplementation } from "../../infra/firebase-impl";
import FileRepository from "../repositories/file-repository";

export default class FileUsecases {
  private fileRepository: FileRepository;
  constructor({ fileRepository }: { fileRepository: FileRepository }) {
    this.fileRepository = fileRepository;
  }

  async uploadFile(path: string, value: any): Promise<UploadResult> {
    return await this.fileRepository.uploadFile(path, value);
  }

  async getUserFiles({ userId }: { userId: string }) {
    return await this.fileRepository.getUserFiles({ userId });
  }
}

export const fileUsecases = new FileUsecases({
  fileRepository: fileRepositoryImplementation,
});
