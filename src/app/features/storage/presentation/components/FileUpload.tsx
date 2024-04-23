import React, { useEffect, useState } from "react";
import useUploadFile from "../../application/usecases/services/useUploadFile";
import { toast } from "sonner";

function FileUpload() {
  const { setFile, loading, error, success } = useUploadFile();
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  useEffect(() => {
    if (success || error) {
      setFileSelected(null);
      setFile(null);
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
      setFile(fileSelected);
      // Add your upload logic here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-700"
        >
          Upload file
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#9290C3] file:text-white
            hover:file:bg-[#535C91]"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1B1A55] hover:bg-[#070F2B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B1A55]"
        >
          Upload
        </button>
      </div>
    </form>
  );
}

export default FileUpload;
