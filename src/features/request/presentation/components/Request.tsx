import {
  ClientRequestFolder,
  type Request,
} from "../../domain/entities/request-types";
import DeleteIcon from "@/common/icons/DeleteIcon";
import { formatDate } from "@/common/utils/date-format";
import LinkIcon from "@/common/icons/LinkIcon";
import { CopyToClipBoard } from "./CopyToClipboard";

export function Request({
  request,
  setSelectedRequest,
}: {
  request: Request;
  setSelectedRequest: ClientRequestFolder["setSelectedRequest"];
}) {
  return (
    <div className=" pl-4 space-y-2 ">
      {/* Files in Documents folder */}
      <div className="sm:flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 ">
        <div className="flex items-center space-x-2 ">
          <span className="pl-2">
            <LinkIcon className="w-5 h-5  text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-500" />
          </span>
          <button
            onClick={() => setSelectedRequest(request)}
            className="font-medium text-gray-900 dark:text-gray-50"
          >
            {request.name}
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 text-sm dark:text-gray-400">
            {request.numberOfUploads} uploads
          </span>
          <span className="text-gray-500 text-sm dark:text-gray-400">
            limit: {formatDate({ date: new Date(request.dateLimit ?? 0) })}
          </span>
          <CopyToClipBoard url={request.url} props={{ className: "" }} />
          <DeleteIcon className="h-6 text-red-700" />
          {/* <DeleteButton path={file.fullPath} /> */}
        </div>
      </div>
    </div>
  );
}
