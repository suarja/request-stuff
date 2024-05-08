export type ErrorMessage<T extends string = ""> =
  | `File not found ${T}`
  | "User not found"
  | `File is too big. ${T}`
  | "File is too big"
  | `Bad request. ${T}`
  | `Max number of files reached. ${T}`
  | `Request date limit exceeded. ${T}`
  | `Request date limit exceeded`
  | "File already exists"
  | "Could not add file to request beacuse could not get user"
  | `Space available insuficient ${T}`
  | "An unknown error happend"
  | "File uploaded successfully."
  | "Request is not valid"
  | "No error"
  | "User is not valid"
  | "File size is greater than user's storage capacity";
