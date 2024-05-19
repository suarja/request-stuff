import { ServerRequestBodySchema } from "@/app/api/requests/server-request-schema";
import { ServerEndpointsKeys, getServerEndpoint } from "@/common/constants";
import {
  ServerReturnTypes,
  serverReturnTypesSchema,
} from "@/features/server/domain/return-types";
import { Failure } from "fp-ddd";
import { Either, left, right } from "fp-ts/lib/Either";

export function fetchBody(options: ServerRequestBodySchema) {
  return JSON.stringify({
    target: options.target,
    payload: options.payload,
  });
}

export async function fetchServer({
  path = "requests",
  method = "POST",
  bodyOptions,
  headers,
}: {
  path?: ServerEndpointsKeys;
  method?: "POST" | "GET" | "PUT" | "DELETE";
  headers?: Headers;
  bodyOptions: ServerRequestBodySchema;
}): Promise<Either<Failure<string>, ServerReturnTypes>> {
  const response = await fetch(getServerEndpoint(path), {
    method,
    headers,
    body: fetchBody(bodyOptions),
    //! Create the zod schema for each serverusecase method return type so that we can validate the response instead of just assuming it's correct
    //! Also create a zod schema for the server request body so that we can validate the request before sending it
    //? Also type the return type of the fetchServer function to be the return type of the server usecase method
  });
  const data = await response.json();
  console.log({ data });
  const chekedData = serverReturnTypesSchema.safeParse(data);
  if (chekedData.success) {
    return right(chekedData.data);
  } else {
    return left(
      Failure.invalidValue({
        invalidValue: chekedData.error.errors.join(", "),
        message: "Invalid response from server",
      })
    );
  }
}
