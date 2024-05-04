import { PlusIcon } from "@radix-ui/react-icons";
import { RequestFolder } from "./RequestFolder";
import { ClientRequestFolder } from "../../domain/entities/request-types";
import CustomDialog from "@/common/components/CustomDialog";
import CreateRequestForm from "./RequestForm";

export default function RequestFolderTree({
  title,
  path,
  requests,
  params,
  setSelectedRequest,
}: ClientRequestFolder) {
  return (
    <div className="w-full   sm:max-w-5xl mx-auto">
      <div className="bg-secondary rounded-lg shadow-md dark:bg-gray-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <CustomDialog title="Add File" buttonVariant="outline">
            <CreateRequestForm />
          </CustomDialog>
        </div>
        <div className="p-4 space-y-2">
          <RequestFolder
            setSelectedRequest={setSelectedRequest}
            title={title}
            params={params}
            requests={requests}
            path={path}
          />
        </div>
      </div>
    </div>
  );
}
