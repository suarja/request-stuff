"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RequestSchema } from "../../domain/entities/request-schema";
import { CreateRequest } from "../../application/repositories/request-repository";
import useCreateRequest from "../../application/usecases/services/useCreateRequest";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateRequestForm() {
  const { loading, requestId, setRequestCreationProps } = useCreateRequest();
  const router = useRouter();
  const form = useForm<CreateRequest>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      name: "",
      description: "",
      maxFileSize: 10,
      maxFiles: 10,
      dateLimit: 0,
    },
  });

  async function onSubmit(values: CreateRequest) {
    // Function to handle form submission
    // setRequestCreationProps(values);
    console.log("Submitted values:", values);

    form.reset(); // Reset form after submission
  }

  useEffect(() => {
    if (requestId) {
      // Do something after request is created
      const params = new URLSearchParams();
      params.append("requestId", requestId);
      params.append("requestName", form.getValues("name"));
      params.append("requestDescription", form.getValues("description") || "");
      params.append(
        "maxFileSize",
        form.getValues("maxFileSize")?.toString() || "10"
      );
      params.append("maxFiles", form.getValues("maxFiles")?.toString() || "10");
      params.append("dateLimit", form.getValues("dateLimit")?.toString() || "");

      const url = `${window.location.origin}/upload/${params.toString()}`;
      console.log("Request URL:", url);

      
      router.push(url);
    }
  }, [requestId]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Request Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter request name" />
                </FormControl>
                <FormDescription>
                  Specify the name for the request
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter description" />
                </FormControl>
                <FormDescription>
                  Provide a detailed description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxFileSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Max File Size (MB)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Maximum file size in MB" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxFiles"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Max Number of Files</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Maximum number of files" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Date Limit</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Set a deadline for file submissions
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
