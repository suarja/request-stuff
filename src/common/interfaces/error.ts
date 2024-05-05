export type ErrorMessage<T extends string = ""> =
  | `File not found ${T}`
  | "User not found"
  | `File is too big. ${T}`
  | `Bad request. ${T}`
  | `Max number of files reached. ${T}`
  | `Request date limit exceeded. ${T}`
  | "File already exists"
  | "Could not add file to request beacuse could not get user"
  | `Space available insuficient ${T}`
  | "An unknown error happend"
  | "File uploaded successfully.";
