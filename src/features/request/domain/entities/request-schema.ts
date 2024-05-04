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
