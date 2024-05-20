export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://request-stuff.jason-suarez.com";

export const PATHS = {
  ROOT_PAGE: () => "/",
  DASHBOARD: () => `${BASE_URL}/dashboard/requests?`,
  LOGIN_API: () => `${BASE_URL}/api/login`,
  LOGIN: () => `${BASE_URL}/login`,
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
  }) => `users/${userId}/requests/${requestId}/files/${fileName}`,

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
  REQUESTS: `${BASE_URL}/api/requests`,
};

export type ServerEndpointsKeys = "requests" | "users";

export function getServerEndpoint(
  path: "requests" | "users"
):
  | "http://localhost:3000/api/requests"
  | "http://localhost:3000/api/users"
  | "https://request-stuff.jason-suarez.com/api/requests"
  | "https://request-stuff.jason-suarez.com/api/users" {
  return `${BASE_URL}/api/${path}`;
}
