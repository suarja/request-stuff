import { FirebaseStorageServiceInstance } from "../../infra/file-repository-impl";
import AuthUsecases, {
  authUsecases,
} from "@/features/auth/application/usecases/auth-usecases";
import IStorage from "@/common/interfaces/istorage";

export interface FileUsecasesOptions {
  storage: IStorage;
  auth: AuthUsecases;
}
export default class FileUsecases {
  private _storage: FileUsecasesOptions["storage"];
  private _authUsecases: FileUsecasesOptions["auth"];
  constructor(options: FileUsecasesOptions) {
    this._storage = options.storage;
    this._authUsecases = options.auth;
  }

  async uploadFile(path: string, value: any): Promise<string> {
    return await this._storage.uploadFile({ path, value });
  }

  async getUserFiles({ userId }: { userId: string }) {
    return await this._storage.getUserFiles({ userId });
  }

  async getUserIdFromCookies({ session }: { session: string }) {
    return await this._authUsecases.getUserIdFromSessionCookie({
      sessionCookie: session,
    });
  }

  async getPathContent({ path, root }: { path: string; root: string }) {
    return await this._storage.getPathContent({ path, root });
  }
  //! Add To Backend Service
  //* file related
  async removeFile({ path }: { path: string }) {
    return await this._storage.removeFile({ path });
  }
}

export const fileUsecases = new FileUsecases({
  storage: FirebaseStorageServiceInstance,
  auth: authUsecases,
});
