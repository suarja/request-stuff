import { Failure } from "fp-ddd";
import { Either } from "fp-ts/lib/Either";
import { AuthRepository, authRepository } from "../repositories/auth";
import { BASE_URL } from "@/common/constants";

export default class AuthUsecases {
  private readonly _authRepository: AuthRepository;

  constructor({ authRepository }: { authRepository: AuthRepository }) {
    this._authRepository = authRepository;
  }

  async signInWithMailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>> {
    return this._authRepository.signInWithMailAndPassword({
      email,
      password,
    });
  }
  async signOut() {
    await this._authRepository.signOut();
  }

  async getUserIdFromSessionCookie({
    sessionCookie,
  }: {
    sessionCookie: string;
  }): Promise<string | null> {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "GET",
      headers: {
        Cookie: `session=${sessionCookie}`,
      },
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.userId;
  }
}

export const authUsecases = new AuthUsecases({
  authRepository,
});
