import z from "zod";

export const RequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  maxFileSize: z.number().positive().optional(),
  maxFiles: z
    .number()
    .positive()
    .max(100, "This is for security reasons")
    .optional(),
  dateLimit: z.string().optional(),
});

export const baseRequestSchema = z.object({
  id: z.string(),
  userId: z.string(),
  maxFileSize: z.number().optional(),
  dateLimit: z.union([z.number(), z.string()]).optional(),
  name: z.string(),
  description: z.string().optional(),
  maxFiles: z.number().optional(),
  numberOfUploads: z.number(),
  path: z.string(),
  url: z.string(),
});

export const uploadSchema = z.object({
  fileName: z.string(),
  senderIp: z.string().optional(),
  senderHash: z.string().optional(),
  date: z.string().optional(),
});

export const fileSenderDataSchema = z.object({
  senderName: z.string(),
  senderEmail: z.string().optional(),
  fileName: z.string(),
  message: z.string().optional(),
  uploadDate: z.string().optional(),
  fileUrl: z.string(),
});

export const publicRequestSchema = baseRequestSchema.extend({
  uploads: z.array(uploadSchema),
});

export const userUploadSchema = z.object({
  fileName: z.string(),
  fileUrl: z.string(),
  fileSenderData: fileSenderDataSchema.optional(),
});

export const privateRequestSchema = baseRequestSchema.extend({
  uploads: z.array(userUploadSchema),
});
