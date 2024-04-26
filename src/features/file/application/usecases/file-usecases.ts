import { UploadResult } from "firebase/storage";
import { fileRepositoryImplementation } from "../../infra/file-repository-impl";
import FileRepository from "../repositories/file-repository";
import { cookies } from "next/headers";
import { getUserIdFromSessionCookie } from "@/lib/firebase/auth/server-side-user-id";

export default class FileUsecases {
  private fileRepository: FileRepository;
  constructor({ fileRepository }: { fileRepository: FileRepository }) {
    this.fileRepository = fileRepository;
  }

  //! TODO: Remove infra return type, update props and add business logic and validation
  async uploadFile(path: string, value: any): Promise<UploadResult> {
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
}

export const fileUsecases = new FileUsecases({
  fileRepository: fileRepositoryImplementation,
});
