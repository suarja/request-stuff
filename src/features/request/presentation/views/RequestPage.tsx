import {
  Request,
  UserUpload,
} from "@/features/request/domain/entities/request-types";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/common/components/ui/avatar";
import Link from "next/link";
import CopyToClipBoardIcon from "../../../../../CopyToClipboard";
import { toast } from "sonner";

export default function RequestPage({ request }: { request: Request }) {
  return (
    <div className="grid gap-6 md:gap-8 bg-secondary rounded-lg shadow-md dark:bg-gray-950 overflow-hidden px-4 py-3">
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
          <p>
            {/* Add a button to copy the url to clipboard */}
            <button
              className=" text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                navigator.clipboard.writeText(request.url);
                toast.success("Copied to clipboard");
              }}
            >
              <CopyToClipBoardIcon />
            </button>
          </p>
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
          <p>{request.dateLimit}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">File Uploads</h2>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400">
          No files uploaded yet.
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
            {request.uploads.map((upload, index) => (
              <UploadCard key={index} upload={upload} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function UploadCard({ upload }: { upload: UserUpload }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
      <Avatar>
        <AvatarFallback>
          {upload.fileSenderData?.senderName?.charAt(0) || "A"}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">
          {upload.fileSenderData?.senderName || "Anonymous"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Uploaded {upload.fileSenderData?.uploadDate || "a few seconds ago"}
        </p>
      </div>
      <Link href={upload.fileUrl}>
        <DownloadIcon className="h-4 w-4" />
        <span className="sr-only">Download </span>
      </Link>
    </div>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
