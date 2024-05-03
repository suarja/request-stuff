import { z } from "zod";

const userMetadataSchema = z.object({
  creationTime: z.string().optional(),
  lastSignInTime: z.string().optional(),
});

export const userInfraSchema = z.object({
  displayName: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  photoURL: z.string().nullable(),
  providerId: z.string(),
  id: z.string(),
  metadata: userMetadataSchema,
});

export const userOptionsSchema = userInfraSchema.extend({
  currentStorage: z.number(),
  maxStorage: z.number(),
  subscription: z.union([
    z.literal("free"),
    z.literal("basic"),
    z.literal("mid"),
  ]),
});
