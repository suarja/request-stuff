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
import { Textarea } from "@/common/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RequestSchema } from "../../domain/entities/request-schema";
import { CreateRequest } from "../../application/repositories/request-repository";
import useCreateRequest from "../../application/usecases/services/useCreateRequest";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CreateRequestForm() {
  const { loading, requestId, setRequestCreationProps } = useCreateRequest();
  const router = useRouter();
  const replace = useRouter().replace;
  const pathName = usePathname();
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
  const searchParams = useSearchParams();

  async function onSubmit(values: CreateRequest) {
    setRequestCreationProps(values);

    // Build the query string
    const params = new URLSearchParams();
    params.append("requestName", form.getValues("name"));
    params.append("requestDescription", form.getValues("description") || "");
    params.append(
      "maxFileSize",
      form.getValues("maxFileSize")?.toString() || "10"
    );
    params.append("maxFiles", form.getValues("maxFiles")?.toString() || "10");
    params.append("dateLimit", form.getValues("dateLimit")?.toString() || "");

    replace(`${pathName}?${params.toString()}`);

    form.reset();
  }
  useEffect(() => {
    if (requestId) {
      // Getting search params from url and redirect to the upload page
      const url = `${
        window.location.origin
      }/upload/request?requestId=${requestId}&requestName=${searchParams.get(
        "requestName"
      )}&requestDescription=${searchParams.get(
        "requestDescription"
      )}&maxFileSize=${searchParams.get(
        "maxFileSize"
      )}&maxFiles=${searchParams.get("maxFiles")}&dateLimit=${searchParams.get(
        "dateLimit"
      )}
            `;
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
