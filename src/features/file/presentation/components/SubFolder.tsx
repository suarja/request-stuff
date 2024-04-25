import FolderIcon from "@/common/icons/FolderIcon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Folder, type SubFolder } from "./Folder";

export default function SubFolder({ name, fullPath }: SubFolder) {
  return (
    <>
      <div
        className="group pl-8 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 cursor-pointer"
        onClick={() => {}}
      >
        <div className="flex items-center space-x-2">
          <FolderIcon className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 dark:text-yellow-400 dark:group-hover:text-yellow-500" />
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {name}
          </span>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>
    </>
  );
}
