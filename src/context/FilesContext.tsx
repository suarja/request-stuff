import { FileFromStorage } from "@/app/features/storage/application/repositories/storage-repository";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface FileStore {
  files: FileFromStorage[];
  setFiles: ({ files }: { files: FileFromStorage[] }) => void;
}

export const filesStore = create<FileStore>()(
  persist(
    (set) => ({
      files: [],
      setFiles: ({ files }: { files: FileFromStorage[] }) => {
        set({
          files,
        });
      },
    }),
    {
      name: "files-storage",
    }
  )
);
