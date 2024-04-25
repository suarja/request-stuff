import FolderIcon from "@/common/icons/FolderIcon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FileFromStorage } from "../../application/repositories/file-repository";
import { File } from "./File";
import { useFolderToggle } from "../folder-management";
export interface Folder {
  name: string;
  files: FileFromStorage[];
}

type File = FileFromStorage;

type FolderProps = {
  props: Folder;
};

export function Folder({ props }: FolderProps) {
  const { files, name } = props;
  const { openFolders, toggleFolder } = useFolderToggle();

  return (
    <>
      <div
        className="group flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 cursor-pointer"
        onClick={() => toggleFolder("Documents")}
      >
        <div className="flex items-center space-x-2">
          <FolderIcon className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 dark:text-yellow-400 dark:group-hover:text-yellow-500" />
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {name}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm dark:text-gray-400">
            {files.length} items
          </span>
          <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 focus:outline-none">
            {openFolders[name] ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
            <span className="sr-only">Toggle folder</span>
          </button>
        </div>
      </div>
      {openFolders[name] && (
        <>
          {files.map((file, index) => {
            return <File key={index} file={file} />;
          })}
        </>
      )}
    </>
  );
}
