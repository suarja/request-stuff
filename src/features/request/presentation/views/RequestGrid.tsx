"use client";

import RequestFolderTree from "../components/RequestFolderTree";
import { Request } from "../../domain/entities/request-types";
import { useState } from "react";
import RequestPage from "./RequestPage";
import { cn } from "@/lib/utils";
export default function RequestGrid({
  requests,
  params,
}: {
  requests: Request[];
  params: string;
}) {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  return (
    <>
      <section
        className={cn(
          "h-full w-full  gap-4 ",
          `${
            selectedRequest === null
              ? "flex items-center flex-col justify-center"
              : "grid grid-cols-1 sm:grid-cols-2 "
          }  `
        )}
      >
        <RequestFolderTree
          setSelectedRequest={setSelectedRequest}
          params={params}
          title="Requests"
          requests={requests}
          path=""
        />
        {selectedRequest && (
          <>
            <RequestPage request={selectedRequest} />
          </>
        )}
      </section>
    </>
  );
}
