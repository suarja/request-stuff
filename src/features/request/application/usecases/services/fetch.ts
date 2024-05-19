import { ServerRequestBodySchema } from "@/app/api/requests/server-request-schema";
import { ServerEndpointsKeys, getServerEndpoint } from "@/common/constants";
import { ServerReturnTypes } from "@/features/server/domain/return-types";

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
}): Promise<ServerReturnTypes> {
  return fetch(getServerEndpoint(path), {
    method,
    headers,
    body: fetchBody(bodyOptions),
    //! Create the zod schema for each serverusecase method return type so that we can validate the response instead of just assuming it's correct
  }).then((response) => response.json() as Promise<ServerReturnTypes>);
}
