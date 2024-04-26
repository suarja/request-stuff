"use client";

import React, { useEffect, useState } from "react";
import useUploadFile from "../../application/usecases/services/useUploadFile";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";

type FileUploadProps = {
  path: string;
} ;

function FileUpload({ props }: { props?: FileUploadProps }) {
  const { setUploadFileProps, loading, error, success } = useUploadFile();
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const user = useAuthContext();

  useEffect(() => {
    if (success || error) {
      setFileSelected(null);
      setUploadFileProps(null);
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    } else if (loading) {
      toast.loading("Uploading...");
    }
  }, [success, error, loading]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileSelected(files[0]);
    } else {
      setFileSelected(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fileSelected) {
      // Here you would handle the file upload process to your server or Firebase
      console.log("Uploading file:", fileSelected.name);
      if (!user) {
        toast.error("User not found");
        return;
      }
      setUploadFileProps({
        file: fileSelected,
        userId: user.uid,
        path: props?.path,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4  shadow-md rounded-lg">
      <div className="flex flex-col space-y-4">
        <label htmlFor="file-upload" className="block text-sm font-medium ">
          Upload file
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-tertiary file:text-white
            hover:file:bg-[#535C91]"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-[#070F2B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Upload
        </button>
      </div>
    </form>
  );
}

export default FileUpload;
