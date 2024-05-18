import z from "zod";

const fileServerDeleteOptionsSchema = z.object({
  target: z.literal("delete"),
  userId: z.string(),
  resourcePath: z.string(),
});

const fileServerUploadOptionsSchema = z.object({
  target: z.literal("upload"),
  userId: z.string(),
  resourcePath: z.string(),
  file: z.instanceof(File),
});

const fileServerEndpointOptionsSchema = z.object({
  options: z.union([
    fileServerDeleteOptionsSchema,
    fileServerUploadOptionsSchema,
  ]),
});

export type FilesServerEndpointOptions = z.infer<
  typeof fileServerEndpointOptionsSchema
>;
