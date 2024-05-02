import { IAuth } from "@/features/auth/application/repositories/types";
import { fileRepositoryImplementation } from "../../infra/file-repository-impl";
import FileRepository from "../repositories/file-repository";
import AuthUsecases, {
  authUsecases,
} from "@/features/auth/application/usecases/auth-usecases";

export default class FileUsecases {
  private _fileRepository: FileRepository;
  private _authUsecases: AuthUsecases;
  constructor({
    fileRepository,
    authUsecases,
  }: {
    fileRepository: FileRepository;
    authUsecases: AuthUsecases;
  }) {
    this._fileRepository = fileRepository;
    this._authUsecases = authUsecases;
  }

  async uploadFile(path: string, value: any): Promise<string> {
    return await this._fileRepository.uploadFile({ path, value });
  }

  async getUserFiles({ userId }: { userId: string }) {
    return await this._fileRepository.getUserFiles({ userId });
  }

  async getUserIdFromCookies({ session }: { session: string }) {
    return await this._authUsecases.getUserIdFromSessionCookie({
      sessionCookie: session,
    });
  }

  async getPathContent({ path, root }: { path: string; root: string }) {
    return await this._fileRepository.getPathContent({ path, root });
  }
  async removeFile({ path }: { path: string }) {
    return await this._fileRepository.remove({ path });
  }
}

export const fileUsecases = new FileUsecases({
  fileRepository: fileRepositoryImplementation,
  authUsecases: authUsecases,
});
