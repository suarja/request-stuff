import { Failure } from "fp-ddd";
import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import { type AuthRepository, authRepository } from "../repositories/auth";
import { BASE_URL } from "@/common/constants";
import UserEntity, { UserOptions } from "../../domain/entities/user-entity";

export interface AuthUsecasesOptions {
  authRepository: AuthRepository;
}
export default class AuthUsecases {
  private readonly _authRepository: AuthRepository;

  constructor(options: AuthUsecasesOptions) {
    this._authRepository = options.authRepository;
  }

  async getUserToken() {
    return this._authRepository.getUserIdToken();
  }

  async createUserWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>> {
    const eitherUserInfra =
      await this._authRepository.createUserWithEmailAndPassword({
        email,
        password,
      });
    if (isLeft(eitherUserInfra)) {
      return left(eitherUserInfra.left);
    }
    const result = await this._authRepository.saveUser({
      user: {
        ...eitherUserInfra.right,
        currentStorage: 0,
        maxStorage: 1000,
        subscription: "basic",
      },
    });
    return result;
  }

  async signInWithMailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Either<Failure<string>, string>> {
    const eitherId = await this._authRepository.signInWithMailAndPassword({
      email,
      password,
    });
    if (isLeft(eitherId)) {
      return left(eitherId.left);
    }

    const sessionCookie = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${eitherId.right}`,
      },
      body: JSON.stringify({
        idToken: eitherId.right,
      }),
    }).then((res) => res.json());
    console.log("id", eitherId.right);
    if (!sessionCookie || sessionCookie.error) {
      console.log("Error creating session cookie", sessionCookie);
      return left(
        Failure.invalidValue({
          invalidValue: sessionCookie,
          message: "Error creating session cookie",
        })
      );
    }

    return right(eitherId.right);
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

  async getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, UserEntity>> {
    return this._authRepository.getUser({ userId });
  }

  async updateUser({
    userId,
    user,
  }: {
    userId: string;
    user: UserOptions;
  }): Promise<Either<Failure<string>, void>> {
    return this._authRepository.updateUser({ userId, user });
  }
}

export const authUsecases = new AuthUsecases({
  authRepository,
});
