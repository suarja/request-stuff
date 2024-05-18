export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://request-stuff.vercel.app";

export const PATHS = {
  PUBLIC_REQUESTS: () => `requests`,
  USER: ({ userId }: { userId: string }) => `users/${userId}`,
  USERS: () => `users`,
  USER_REQUEST: ({
    userId,
    requestId,
  }: {
    userId: string;
    requestId: string;
  }) => `users/${userId}/requests/${requestId}`,
  USERS_REQUESTS: ({ userId }: { userId: string }) =>
    `users/${userId}/requests`,
  PUBLIC_REQUEST: ({ requestId }: { requestId: string }) =>
    `requests/${requestId}`,
  USER_REQUEST_FILE: ({
    userId,
    requestId,
    fileName,
  }: {
    userId: string;
    requestId: string;
    fileName: string;
  }) => `users/${userId}/requests/${requestId}/${fileName}`,

  USER_DELETE_FILE: ({
    userId,
    requestId,
    fileName,
  }: {
    userId: string;
    requestId: string;
    fileName: string;
  }) => `users/${userId}/requests/${requestId}/files/${fileName}`,
};

export const SERVER_ENDPOINTS = {
  ADD_PUBLIC_REQUEST: `${BASE_URL}/api/requests`,
};
