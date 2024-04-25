import { RootFolder } from "@/features/file/presentation/components/Folder";
import { useState } from "react";

interface OpenFoldersState {
  [folderName: string]: boolean;
}

const foldersExample: RootFolder[] = [{ name: "Documents", files: [] }];

export function useFolderToggle() {
  // State to manage open folders
  const [openFolders, setOpenFolders] = useState<OpenFoldersState>({});

  // Function to toggle folder open state
  const toggleFolder = (folderName: string): void => {
    setOpenFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  return { openFolders, toggleFolder };
}
