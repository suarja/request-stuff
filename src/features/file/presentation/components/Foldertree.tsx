import { PlusIcon } from "@radix-ui/react-icons";
import { Folder } from "./Folder";

type TreeProps = {
  title: string;
  folders: Folder[];
};
export default function FolderTree({ folders, title }: TreeProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 focus:outline-none">
            <PlusIcon className="w-5 h-5" />
            <span className="sr-only">Add new file</span>
          </button>
        </div>
        <div className="p-4 space-y-2">
          {folders.map((folder, index) => {
            return <Folder key={index} props={folder} />;
          })}
          <Folder props={{ name: "Documents", files: [] }} />
        </div>
      </div>
    </div>
  );
}
