import { publicRequestSchema } from "@/features/request/domain/entities/request-schema";
import z from "zod";

export const serverRequestSchemaTargetOptions = z.union([
  z.literal("addPublicRequest"),
  z.literal("updatePublicRequest"),
  z.literal("deletePublicRequest"),
  z.literal("updatePublicRequestUploads"),
]);

export const baseServerRequestBodySchema = z.object({
  target: serverRequestSchemaTargetOptions,
});

export const serverRequestBodySchemaAddPublicRequest =
  baseServerRequestBodySchema.extend({
    target: z.literal("addPublicRequest"),
    payload: z.object({
      request: publicRequestSchema,
    }),
  });

export const serverRequestBodySchemaUpdatePublicRequest =
  baseServerRequestBodySchema.extend({
    target: z.literal("updatePublicRequest"),
    payload: z.object({
      request: z.object({
        title: z.string(),
        description: z.string(),
        fileUrl: z.string(),
        senderData: z.object({
          name: z.string(),
          email: z.string(),
          fileUrl: z.string(),
        }),
      }),
    }),
  });

export const serverRequestBodySchemaDeletePublicRequest =
  baseServerRequestBodySchema.extend({
    target: z.literal("deletePublicRequest"),
    payload: z.object({
      request: z.object({
        title: z.string(),
        description: z.string(),
        fileUrl: z.string(),
        senderData: z.object({
          name: z.string(),
          email: z.string(),
          fileUrl: z.string(),
        }),
      }),
    }),
  });

export const serverRequestBodySchemaUpdatePublicRequestUploads =
  baseServerRequestBodySchema.extend({
    target: z.literal("updatePublicRequestUploads"),
    payload: z.object({
      request: z.object({
        title: z.string(),
        description: z.string(),
        fileUrl: z.string(),
        senderData: z.object({
          name: z.string(),
          email: z.string(),
          fileUrl: z.string(),
        }),
      }),
    }),
  });

export type ServerRequestBodySchemaAddPublicRequest = z.infer<
  typeof serverRequestBodySchemaAddPublicRequest
>;

export type ServerRequestBodySchemaUpdatePublicRequest = z.infer<
  typeof serverRequestBodySchemaUpdatePublicRequest
>;

export type ServerRequestBodySchemaDeletePublicRequest = z.infer<
  typeof serverRequestBodySchemaDeletePublicRequest
>;

export type ServerRequestBodySchemaUpdatePublicRequestUploads = z.infer<
  typeof serverRequestBodySchemaUpdatePublicRequestUploads
>;

export type ServerRequestSchemaTargetOptions = z.infer<
  typeof serverRequestSchemaTargetOptions
>;

export const serverRequestBodySchema = z.union([
  serverRequestBodySchemaAddPublicRequest,
  serverRequestBodySchemaUpdatePublicRequest,
  serverRequestBodySchemaDeletePublicRequest,
  serverRequestBodySchemaUpdatePublicRequestUploads,
]);

export type ServerRequestBodySchema = z.infer<typeof serverRequestBodySchema>;
