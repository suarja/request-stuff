"use client";
import { Card, CardHeader, CardContent } from "@/common/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { PageProps } from "@/app/upload/[slug]/page";
import CustomDialog from "@/common/components/CustomDialog";
import SenderMetadataForm from "../components/RequestSenderMetadataForm";
import NavbarLogo from "@/common/components/NavBarLogo";

const UploadView: React.FC<PageProps> = ({ searchParams }) => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileSelected(files[0]);
    } else {
      setFileSelected(null);
    }
  };
  return (
    <Card className="w-full max-w-xl shadow-lg shadow-slate-600 rounded-lg overflow-hidden bg-secondary">
      <CardHeader className="bg-tertiaryalt p-4 pt-6 text-white">
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <NavbarLogo />
          </div>
         
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 w-full">
          <dl className="pt-4 px-4 w-full grid grid-cols-2 gap-4 text-sm">
            <dt className="font-semibold">Name</dt>
            <dd className="">
              <span className="font-medium">{searchParams?.requestName}</span>
            </dd>
            {searchParams?.requestDescription && (
              <>
                <dt className="font-semibold">Description</dt>
                <dd className="w-full">
                  <span className="font-medium w-full">
                    {searchParams?.requestDescription}
                  </span>
                </dd>
              </>
            )}
            <dt className="font-semibold">Max file size</dt>
            <dd className="">
              <span className="font-medium">
                {searchParams?.maxFileSize} MB
              </span>
            </dd>

            <dt className="font-semibold">Date limit</dt>
            <dd className="">
              <span className="font-medium">
                {new Date(
                  (searchParams?.dateLimit as string) ?? new Date()
                ).toDateString()}
              </span>
            </dd>
          </dl>
        <form className=" gap-4 pt-4 px-4 flex flex-col justify-between">
            <label className="text-sm" htmlFor="files">
              Select the files to upload
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              id="files"
              name="files"
              multiple
              className="block cursor-pointer w-full text-sm file:border file:border-gray-800 file:px-4 file:py-1 file:rounded-lg file:text-sm file:font-semibold file:bg-primary file:hover:file:bg-blue-600"
            />
          <div className="flex justify-center">
            {" "}
            {fileSelected && (
              <CustomDialog
                open={open}
                setOpen={(open) => setOpen(open)}
                title="Tell us about you"
                buttonText="Upload File"
                buttonVariant="default"
                testId="sender-metadata-dialog"
              >
                <SenderMetadataForm
                  setOpen={setOpen}
                  file={fileSelected}
                  requestId={searchParams.requestId as string}
                  requestName={searchParams.requestName as string}
                />
              </CustomDialog>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadView;
