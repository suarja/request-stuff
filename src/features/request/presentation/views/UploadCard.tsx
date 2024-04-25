"use client";
import { Card, CardHeader, CardContent } from "@/common/components/ui/card";
import { Label } from "@radix-ui/react-label";
import {  useState } from "react";
import { PageProps } from "@/app/upload/[slug]/page";
import CustomDialog from "@/common/components/CustomDialog";
import SenderMetadataForm from "../components/RequestSenderMetadataForm";

const UploadCard: React.FC<PageProps> = ({ searchParams }) => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileSelected(files[0]);
    } else {
      setFileSelected(null);
    }
  };
  return (
    <Card className="w-full max-w-xl shadow-lg rounded-lg overflow-hidden bg-tertiaryalt">
      <CardHeader className="bg-primary p-4 text-white">
        <div className="space-y-1.5">
          <h2 className="text-lg font-medium tracking-tight">
            Request {searchParams?.requestId}
          </h2>
          <p className="text-sm font-medium leading-none">
            Metadata for the form at https://acme.inc/form
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <dl className="grid grid-cols-2 gap-1.5 text-sm">
            <dt className="font-semibold">Name</dt>
            <dd className="">
              <span className="font-medium">{searchParams?.requestName}</span>
            </dd>
            <dt className="font-semibold">Description</dt>
            <dd className="">
              <span className="font-medium">
                {searchParams?.requestDescription}
              </span>
            </dd>
            <dt className="font-semibold">Max file size</dt>
            <dd className="">
              <span className="font-medium">
                {searchParams?.maxFileSize} MB
              </span>
            </dd>
            <dt className="font-semibold">Max files</dt>
            <dd className="">
              <span className="font-medium">{searchParams?.maxFiles}</span>
            </dd>
            <dt className="font-semibold">Date limit</dt>
            <dd className="">
              <span className="font-medium">{searchParams?.dateLimit}</span>
            </dd>
          </dl>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm" htmlFor="files">
              Select the files to upload
            </Label>
            <input
              onChange={handleFileChange}
              type="file"
              id="files"
              name="files"
              multiple
              className="block w-full text-sm file:border file:border-gray-400 file:px-4 file:py-1 file:rounded-lg file:text-sm file:font-semibold file:bg-tertiary file:hover:file:bg-blue-600"
            />
          </div>
          {fileSelected && (
            <CustomDialog
              title="Tell us about you"
              buttonText="Upload FIle"
              buttonVariant="default"
              testId="sender-metadata-dialog"
            >
              <SenderMetadataForm
                file={fileSelected}
                requestId={searchParams.requestId as string}
                requestName={searchParams.requestName as string}
              />
            </CustomDialog>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadCard;
