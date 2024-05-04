import {
  ClientRequestFolder,
  Request,
} from "@/features/request/domain/entities/request-types";
import CloseIcon from "@/common/icons/CloseIcon";
import React from "react";
import { CopyToClipBoard } from "../components/CopyToClipboard";
import { UploadCard } from "../components/UploadCard";

export default function RequestPage({
  request,
  setSelectedRequest,
}: {
  request: Request;
  setSelectedRequest: ClientRequestFolder["setSelectedRequest"];
}) {
  return (
    <div className="flex flex-col w-full gap-6 md:gap-8  sm:max-w-5xl bg-secondary rounded-lg shadow-md dark:bg-gray-950 overflow-hidden px-8 py-4 pb-8 transition-opacity duration-500">
      <div
        onClick={() => setSelectedRequest(null)}
        className="flex justify-end cursor-pointer "
      >
        <CloseIcon className="h-6 w-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">File Request: {request.name} </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {request.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Request url
          </p>
          <CopyToClipBoard url={request.url} />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Maximum File Size
          </p>
          <p>{request.maxFileSize} MB</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Maximum Files
          </p>
          <p>{request.maxFiles}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Deadline
          </p>
          <p>{new Date(request.dateLimit!).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">File Uploads</h2>

        {request.uploads.length > 0 ? (
          request.uploads.map((upload, index) => (
            <UploadCard key={index} upload={upload} />
          ))
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400">
            No files uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}

