import { PlusIcon } from "@radix-ui/react-icons";
import { RootRequestFolderWithParams } from "../../domain/entities/request-types";

export default function RequestFolder({
  title,
  path,
  requests,
  params,
}: RootRequestFolderWithParams) {
  return (
    <div className="w-full   sm:max-w-2xl mx-auto">
      <div className="bg-secondary rounded-lg shadow-md dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 focus:outline-none">
            <PlusIcon className="w-5 h-5" />
            <span className="sr-only">Add new file</span>
          </button>
        </div>
        <div className="p-4 space-y-2"></div>
      </div>
    </div>
  );
}
