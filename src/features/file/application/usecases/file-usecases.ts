import { UploadResult } from "firebase/storage";
import { fileRepositoryImplementation } from "../../infra/file-repository-impl";
import FileRepository from "../repositories/file-repository";

export default class FileUsecases {
  private fileRepository: FileRepository;
  constructor({ fileRepository }: { fileRepository: FileRepository }) {
    this.fileRepository = fileRepository;
  }

  //! TODO: Remove infra return type, update props and add business logic and validation
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
