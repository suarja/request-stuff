import { getUserIdFromSessionCookie } from "@/features/auth/application/services/server-side-user-id";
import { fileRepositoryImplementation } from "../../infra/file-repository-impl";
import FileRepository from "../repositories/file-repository";

export default class FileUsecases {
  private fileRepository: FileRepository;
  constructor({ fileRepository }: { fileRepository: FileRepository }) {
    this.fileRepository = fileRepository;
  }

  async uploadFile(path: string, value: any): Promise<string> {
    return await this.fileRepository.uploadFile({ path, value });
  }

  async getUserFiles({ userId }: { userId: string }) {
    return await this.fileRepository.getUserFiles({ userId });
  }

  async getUserIdFromCookies({ session }: { session: string }) {
    return await getUserIdFromSessionCookie({
      sessionCookie: session,
    });
  }

  async getPathContent({ path, root }: { path: string; root: string }) {
    return await this.fileRepository.getPathContent({ path, root });
  }
  async removeFile({ path }: { path: string }) {
    return await this.fileRepository.remove({ path });
  }
}


export const fileUsecases = new FileUsecases({
  fileRepository: fileRepositoryImplementation,
});
