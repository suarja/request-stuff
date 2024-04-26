"use client";
import FolderIcon from "@/common/icons/FolderIcon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import CustomDialog from "@/common/components/CustomDialog";
import { ClientRequestFolder } from "../../domain/entities/request-types";
import useHandleFolderState from "@/features/file/application/usecases/services/useHandleFolderState";
import { Request } from "./Request";
import CreateRequestForm from "./RequestForm";

export function RequestFolder(props: ClientRequestFolder) {
  const { title, requests, setSelectedRequest} = props;

  const { open, handleToggle } = useHandleFolderState(title);

  return (
    <>
      <div className="group flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 ">
        <div className="flex items-center space-x-2">
          <FolderIcon className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 dark:text-yellow-400 dark:group-hover:text-yellow-500" />
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {title}
          </span>
          <CustomDialog title="Add File" buttonVariant="outline">
            <CreateRequestForm />
          </CustomDialog>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm dark:text-gray-400">
            {requests.length} items
          </span>
          <button
            onClick={handleToggle}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 focus:outline-none"
          >
            {open ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
            <span className="sr-only">Toggle folder</span>
          </button>
        </div>
      </div>
      {open && (
        <>
          {requests.map((requestData, index) => {
            return <Request key={index} request={requestData} setSelectedRequest={setSelectedRequest} />;
          })}
          {/* {subFolders.map((subFolder, index) => {
            return (
              <RequestSubFolder
                key={subFolder.title}
                title={subFolder.title}
                path={subFolder.path}
              />
            );
          })} */}
        </>
      )}
    </>
  );
}
