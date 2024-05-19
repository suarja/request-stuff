import { privateRequestSchema } from "@/features/request/domain/entities/request-schema";
import { z } from "zod";

// export type ServerReturnTypes =
//   | ReturnType<ServerUsecases["registerRequest"]>
//   | ReturnType<ServerUsecases["getUserRequests"]>;

export const baseServerReturnTypeSchema = z.object({
  error: z.boolean(),
  message: z.string(),
});

export const serverGetUserRequestsReturnTypeSchema = z.object({
  requests: z.array(privateRequestSchema),
});

export const serverRegisterRequestReturnTypeSchema = baseServerReturnTypeSchema;

export const serverReturnTypesSchema = baseServerReturnTypeSchema.extend({
  payload: serverGetUserRequestsReturnTypeSchema,
});

export type ServerReturnTypes = z.infer<typeof serverReturnTypesSchema>;
