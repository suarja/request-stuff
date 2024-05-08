"use client";
import { ClientRequestFolder } from "../../domain/entities/request-types";
import { Request } from "./Request";

export function RequestFolder(props: ClientRequestFolder) {
  const { requests, setSelectedRequest } = props;

  return (
    <>
      {requests.map((requestData) => {
        return (
          <Request
            key={requestData.id}
            request={requestData}
            setSelectedRequest={setSelectedRequest}
          />
        );
      })}
    </>
  );
}
