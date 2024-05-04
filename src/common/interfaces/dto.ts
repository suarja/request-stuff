import { Failure } from "fp-ddd";
import { Either } from "fp-ts/lib/Either";

export abstract class DTO<T, I = void, O = unknown> {
  abstract fromDomain({ data }: { data: T }): I;
  abstract toDomain({ data }: { data: O }): Either<Failure<string>, T>;
}