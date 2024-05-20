"use client";

import RequestFolderTree from "../components/RequestFolderTree";
import { PrivateRequest } from "../../domain/entities/request-types";
import { useState } from "react";
import RequestPage from "./RequestPage";
import { cn } from "@/lib/utils";
import FormContextFactory from "../hooks/form-context";

export function useSelectRequest() {
  const [selectedRequest, setSelectedRequest] = useState<PrivateRequest | null>(
    null
  );
  return { selectedRequest, setSelectedRequest };
}

export default function RequestGrid({
  requests,
  params,
}: {
  requests: PrivateRequest[];
  params: string;
}) {
  const { selectedRequest, setSelectedRequest } = useSelectRequest();

  return (
    <FormContextFactory>
      <section
        className={cn("h-full w-full  gap-4 ", "flex flex-col items-center ")}
      >
        {selectedRequest ? (
          <>
            <RequestPage
              request={selectedRequest}
              setSelectedRequest={setSelectedRequest}
            />
          </>
        ) : (
          <RequestFolderTree
            setSelectedRequest={setSelectedRequest}
            params={params}
            title="Requests"
            requests={requests}
            path=""
          />
        )}
      </section>
    </FormContextFactory>
  );
}
