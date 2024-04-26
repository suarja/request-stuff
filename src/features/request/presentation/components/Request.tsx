import { FileIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type Request } from "../../domain/entities/request-types";
import DeleteIcon from "@/common/icons/DeleteIcon";

export function Request(request: Request) {
  return (
    <div className=" pl-4 space-y-2 ">
      {/* Files in Documents folder */}
      <div className="sm:flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 ">
        <div className="flex items-center space-x-2 ">
          <span className="pl-2">
            <FileIcon className="w-5 h-5  text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-500" />
          </span>
          <Link
            href={request.url}
            className="font-medium text-gray-900 dark:text-gray-50"
          >
            {request.name}
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm dark:text-gray-400">
            {request.numberOfUploads} uploads
          </span>
          <span className="text-gray-500 text-sm dark:text-gray-400">
            date limit: {request.dateLimit}
          </span>
          <DeleteIcon />
          {/* <DeleteButton path={file.fullPath} /> */}
        </div>
      </div>
    </div>
  );
}
