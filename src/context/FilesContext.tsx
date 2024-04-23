import { FileFromStorage } from "@/app/features/storage/application/repositories/storage-repository";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface FileStore {
  files: FileFromStorage[];
  setFiles: ({ files }: { files: FileFromStorage[] }) => void;
  revalidate: boolean;
  setRevalidate: () => void;
}

export const filesStore = create<FileStore>()(
  persist(
    (set, get) => ({
      files: [],
      setFiles: ({ files }: { files: FileFromStorage[] }) => {
        set({
          files,
        });
      },
      revalidate: false,
      setRevalidate: () => {
        set({
          revalidate: !get().revalidate,
        });
      },
    }),
    {
      name: "files-storage",
    }
  )
);
