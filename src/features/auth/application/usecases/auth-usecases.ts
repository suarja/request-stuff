import { Failure } from "fp-ddd";
import { Either } from "fp-ts/lib/Either";
import { AuthRepository } from "../repositories/auth";

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
}
