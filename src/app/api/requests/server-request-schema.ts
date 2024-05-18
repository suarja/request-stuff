import z from "zod";

const serverRequestSchemaTargetOptions = z.union([
  z.literal("addPublicRequest"),
  z.literal("updatePublicRequest"),
  z.literal("deletePublicRequest"),
  z.literal("updatePublicRequestUploads"),
]);

export type ServerRequestSchemaTargetOptions = z.infer<
  typeof serverRequestSchemaTargetOptions
>;
