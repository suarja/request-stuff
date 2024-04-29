import { Entity } from "fp-ddd";
import { Either, right } from "fp-ts/lib/Either";
import { Failure } from "fp-ddd";

export interface UserProps {
  name: string;
  email: string;
}
class User extends Entity<UserProps> {
  constructor(public readonly values: Either<Failure<UserProps>, UserProps>) {
    super();
  }

  get name(): string {
    return this.getOrCrash().name;
  }
}

// Usage
const user = new User(right({ name: "John Doe", email: "john@example.com" }));
console.log(user.name); // Outputs: John Doe
