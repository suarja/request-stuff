export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://request-stuff.vercel.app";

export const PATHS = {
  USER: ({ userId }: { userId: string }) => `users/${userId}`,
  USER_REQUEST: ({
    userId,
    requestId,
  }: {
    userId: string;
    requestId: string;
  }) => `users/${userId}/requests/${requestId}`,
  PUBLIC_REQUEST: ({ requestId }: { requestId: string }) =>
    `requests/${requestId}`,
};
