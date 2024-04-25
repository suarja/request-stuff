import { FileIcon } from "@radix-ui/react-icons";
import { Folder } from "./Folder";

export type FileProps = {
  file: Folder["files"][number];
};

export function File({ file }: FileProps) {
  return (
    <div className="pl-8 space-y-2">
      {/* Files in Documents folder */}
      <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 cursor-pointer">
        <div className="flex items-center space-x-2">
          <FileIcon className="w-5 h-5 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-500" />
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {file.name}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm dark:text-gray-400">
            12 KB
          </span>
          <span className="text-gray-500 text-sm dark:text-gray-400">
            2 days ago
          </span>
        </div>
      </div>
    </div>
  );
}
