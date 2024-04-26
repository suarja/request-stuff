"use client";
import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, z } from "zod";
import useUploadFileFromRequest, {
  UseUploadFileFromRequestProps,
} from "../../application/usecases/services/useUploadFileFromRequest";
import { useEffect } from "react";
import { toast } from "sonner";

const senderSchema = object({
  name: string().min(1, "Name is required"),
  email: string().email().optional(),
});

type SenderMetadata = z.infer<typeof senderSchema>;

export default function SenderMetadataForm({
  file,
  requestId,
  requestName,
}: {
  file: File;
  requestId: string;
  requestName: string;
}) {
  const { error, loading, succes, setUploadFileFromRequestProps } =
    useUploadFileFromRequest();

  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error("An error occurred while uploading the file");
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    } else if (succes) {
      console.log("File uploaded successfully");
      toast.success("File uploaded successfully");
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    } else if (loading) {
      console.log("Uploading file...");
      toast.loading("Uploading file...");
    }
  }, [error, succes, loading]);

  const form = useForm({
    resolver: zodResolver(senderSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleSubmit = (values: SenderMetadata) => {
    console.log("Uploading file:", file.name);
    const data: UseUploadFileFromRequestProps = {
      file,
      requestId,
      senderData: {
        senderName: form.getValues("name"),
        senderEmail: form.getValues("email"),
      },
    };

    setUploadFileFromRequestProps(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" />
                </FormControl>
                <FormDescription>
                  This is the name that will be associated with your file
                  upload.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Email (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your email (optional)" />
                </FormControl>
                <FormDescription>
                  Your email is used for receiving notifications about the file
                  upload status.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button className="mt-8" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
